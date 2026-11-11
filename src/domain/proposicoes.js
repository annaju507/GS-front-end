// Organiza os dados de proposições da API da Câmara para a tela
// (funções puras). Todo texto da API passa por semTravessao().
import { semTravessao } from './texto.js'
import { classificarSituacao } from './tramitacao.js'

export function urlPaginaCamara(id) {
  return `https://www.camara.leg.br/propostas-legislativas/${id}`
}

// Item de lista (GET /proposicoes).
export function resumirProposicao(item) {
  return {
    id: item.id,
    sigla: `${item.siglaTipo} ${item.numero}/${item.ano}`,
    ementa: semTravessao(item.ementa),
    apresentadaEm: item.dataApresentacao,
  }
}

// Detalhe (GET /proposicoes/{id}).
export function detalharProposicao(dados) {
  const status = dados.statusProposicao ?? {}
  const situacaoOficial = semTravessao(status.descricaoSituacao ?? '')
  return {
    id: dados.id,
    sigla: `${dados.siglaTipo} ${dados.numero}/${dados.ano}`,
    siglaTipo: dados.siglaTipo,
    ementa: semTravessao(dados.ementa),
    apresentadaEm: dados.dataApresentacao,
    situacaoOficial,
    etapa: classificarSituacao(situacaoOficial),
    ultimaAtualizacao: status.dataHora,
    urlTexto: dados.urlInteiroTeor,
    urlPagina: urlPaginaCamara(dados.id),
  }
}

export function listarAutores(autores) {
  return autores.map((autor) => ({ nome: semTravessao(autor.nome), tipo: semTravessao(autor.tipo) }))
}

// Últimas movimentações, da mais nova para a mais antiga.
export function ultimasTramitacoes(tramitacoes, quantidade = 5) {
  return [...tramitacoes]
    .sort((a, b) => b.sequencia - a.sequencia)
    .slice(0, quantidade)
    .map((passo) => ({
      sequencia: passo.sequencia,
      data: passo.dataHora,
      orgao: semTravessao(passo.siglaOrgao),
      descricao: semTravessao(passo.descricaoTramitacao),
    }))
}
