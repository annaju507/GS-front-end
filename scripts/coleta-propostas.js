// Busca na API de Dados Abertos da Câmara os dados oficiais das propostas
// escolhidas em src/data/propostas.json e gera src/data/propostas-oficiais.json.
//
// Por que um script: a lista de propostas é fixa (escolhida pela equipe) e os
// textos simples são escritos à mão. Só as últimas movimentações de cada
// proposta continuam sendo buscadas ao vivo, na página da proposta.
//
// Como usar: npm run coleta-propostas
// Rodar de novo para atualizar a situação e a data da consulta.

import { readFileSync, writeFileSync } from 'node:fs'
import { semTravessao } from '../src/domain/texto.js'
import { classificarSituacao } from '../src/domain/tramitacao.js'

const BASE = 'https://dadosabertos.camara.leg.br/api/v2'
const HOJE = new Date().toISOString().slice(0, 10)
const ENTRADA = 'src/data/propostas.json'
const SAIDA = 'src/data/propostas-oficiais.json'

const esperar = (ms) => new Promise((resolver) => setTimeout(resolver, ms))

async function buscar(caminho) {
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    const resposta = await fetch(BASE + caminho, { headers: { Accept: 'application/json' } })
    if (resposta.ok) {
      return (await resposta.json()).dados
    }
    console.warn(`Tentativa ${tentativa} falhou (${resposta.status}): ${caminho}`)
    await esperar(1500 * tentativa)
  }
  throw new Error(`Não foi possível ler ${caminho}`)
}

// Texto da API sempre limpo: sem travessão e sem espaços sobrando.
function limpar(texto) {
  return semTravessao(String(texto ?? '').replace(/\s+/g, ' ').trim())
}

// Autor deputado: busca partido e estado pela lista filtrada (GET /deputados?id=).
async function descreverAutor(autor) {
  const descricao = { nome: limpar(autor.nome), tipo: limpar(autor.tipo), partido: '', uf: '' }
  const codigo = String(autor.uri ?? '').match(/\/deputados\/(\d+)/)?.[1]
  if (codigo) {
    const [deputado] = await buscar(`/deputados?id=${codigo}`)
    descricao.partido = deputado?.siglaPartido ?? ''
    descricao.uf = deputado?.siglaUf ?? ''
  }
  return descricao
}

const { propostas } = JSON.parse(readFileSync(ENTRADA, 'utf8'))
const oficiais = {}

for (const { id } of propostas) {
  const dados = await buscar(`/proposicoes/${id}`)
  const autores = await buscar(`/proposicoes/${id}/autores`)
  const status = dados.statusProposicao ?? {}

  oficiais[id] = {
    id,
    siglaTipo: dados.siglaTipo,
    numero: dados.numero,
    ano: dados.ano,
    ementa: limpar(dados.ementa),
    dataApresentacao: dados.dataApresentacao?.slice(0, 10) ?? null,
    // Sem situação informada pela Câmara, a proposta acabou de ser apresentada.
    situacao: {
      etapa: classificarSituacao(status.descricaoSituacao ?? ''),
      descricao: limpar(status.descricaoSituacao ?? ''),
      ultimaTramitacao: limpar(status.descricaoTramitacao ?? ''),
      orgao: status.siglaOrgao ?? '',
      data: status.dataHora?.slice(0, 10) ?? null,
    },
    autores: await Promise.all(autores.slice(0, 3).map(descreverAutor)),
    totalAutores: autores.length,
    urlCamara: `https://www.camara.leg.br/propostas-legislativas/${id}`,
    urlInteiroTeor: dados.urlInteiroTeor ?? null,
    consultadoEm: HOJE,
  }
  console.log(`ok ${dados.siglaTipo} ${dados.numero}/${dados.ano}`)
  await esperar(250)
}

writeFileSync(
  SAIDA,
  JSON.stringify(
    {
      _sobre: 'Gerado por scripts/coleta-propostas.js a partir da API de Dados Abertos da Câmara dos Deputados. Não editar à mão: rodar o script de novo.',
      fonte: { instituicao: 'Câmara dos Deputados', documento: 'API de Dados Abertos', url: 'https://dadosabertos.camara.leg.br' },
      consultadoEm: HOJE,
      propostas: oficiais,
    },
    null,
    2,
  ) + '\n',
)
console.log(`\n${Object.keys(oficiais).length} propostas gravadas em ${SAIDA}`)
