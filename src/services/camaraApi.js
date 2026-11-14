// Acesso à API de Dados Abertos da Câmara dos Deputados (só leitura).
// Documentação: https://dadosabertos.camara.leg.br/swagger/api.html

import { pedirJson } from './http.js'

const BASE = 'https://dadosabertos.camara.leg.br/api/v2'

async function buscarJson(caminho, parametros = {}) {
  const url = new URL(BASE + caminho)
  for (const [chave, valor] of Object.entries(parametros)) {
    if (Array.isArray(valor)) {
      // Vários valores: repete o parâmetro (ex.: codTema=41&codTema=61).
      valor.forEach((item) => url.searchParams.append(chave, item))
    } else if (valor !== undefined && valor !== null && valor !== '') {
      url.searchParams.set(chave, valor)
    }
  }
  const corpo = await pedirJson(url)
  return corpo.dados
}

export function buscarProposicao(id) {
  return buscarJson(`/proposicoes/${id}`)
}

export function buscarAutores(id) {
  return buscarJson(`/proposicoes/${id}/autores`)
}

export function buscarTramitacoes(id) {
  return buscarJson(`/proposicoes/${id}/tramitacoes`)
}

// Deputados federais eleitos pelo RJ, em ordem alfabética.
export function buscarDeputadosRJ() {
  return buscarJson('/deputados', { siglaUf: 'RJ', ordem: 'ASC', ordenarPor: 'nome', itens: 100 })
}

// Proposições de autoria de um deputado, das mais novas para as mais antigas.
export function buscarProposicoesDoDeputado(idDeputado, itens = 5) {
  return buscarJson('/proposicoes', {
    idDeputadoAutor: idDeputado,
    siglaTipo: ['PL', 'PEC', 'PLP'],
    ordem: 'DESC',
    ordenarPor: 'id',
    itens,
  })
}

// Um deputado pelo número. Usa a lista filtrada (GET /deputados?id=), porque
// o endereço de detalhe (/deputados/{id}) não libera o acesso pelo navegador (CORS).
export async function buscarDeputado(id) {
  const lista = await buscarJson('/deputados', { id })
  return lista[0] ?? null
}
