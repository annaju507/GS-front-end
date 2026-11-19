// Regras do Caderno cívico (funções puras).
import { semTravessao } from './texto.js'

export const LIMITE_ANOTACAO = 280

// Decide se a anotação pode ser salva e qual erro mostrar.
export function validarAnotacao(texto) {
  if (texto.trim() === '') {
    return 'vazia'
  } else if (texto.length > LIMITE_ANOTACAO) {
    return 'longa'
  } else {
    return null
  }
}

// Monta o registro que vai para a API a partir da proposta e do texto.
export function montarAnotacao({ dono, proposta, texto, agora }) {
  return {
    dono,
    propostaId: Number(proposta.id),
    sigla: proposta.sigla,
    ementa: proposta.ementa,
    anotacao: texto.trim(),
    criadoEm: agora,
  }
}

// Organiza o que veio da API para a tela.
export function prepararAnotacao(registro) {
  return {
    id: registro.id,
    propostaId: registro.propostaId,
    sigla: semTravessao(registro.sigla),
    ementa: semTravessao(registro.ementa),
    anotacao: semTravessao(registro.anotacao),
    criadoEm: registro.criadoEm,
  }
}

export function buscarAnotacaoDaProposta(anotacoes, propostaId) {
  return anotacoes.find((anotacao) => anotacao.propostaId === Number(propostaId)) ?? null
}

// Página do caderno (uma proposta por página): mantém o número dentro do
// total. Ex.: depois de excluir a última, volta para a anterior.
export function limitarPagina(indice, total) {
  if (total <= 0) {
    return 0
  } else if (indice >= total) {
    return total - 1
  } else if (indice < 0) {
    return 0
  } else {
    return indice
  }
}
