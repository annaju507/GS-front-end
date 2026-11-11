// API externa do Caderno cívico (MockAPI): Create, Read, Update e Delete.
// Recurso "anotacoes": { id, dono, propostaId, sigla, ementa, anotacao, criadoEm }.
// "dono" é um código gerado a partir da conta: o e-mail não sai do navegador.
import { ErroApi, pedirJson } from './http.js'
import { resumirTexto } from './resumo.js'

const URL_ANOTACOES = 'https://6af3f50755a1de7dcf037144.mockapi.io/api/v1/anotacoes'

export async function gerarCodigoDono(email) {
  const resumo = await resumirTexto(`demokratos-caderno:${email}`)
  return resumo.slice(0, 24)
}

// Read: anotações de uma pessoa, das mais novas para as mais antigas.
export async function listarAnotacoes(dono) {
  const url = new URL(URL_ANOTACOES)
  url.searchParams.set('dono', dono)
  url.searchParams.set('sortBy', 'criadoEm')
  url.searchParams.set('order', 'desc')
  try {
    return await pedirJson(url)
  } catch (erro) {
    // O MockAPI pode responder "não encontrado" quando a busca não acha nada.
    if (erro instanceof ErroApi && erro.tipo === 'naoEncontrado') {
      return []
    }
    throw erro
  }
}

// Create
export function criarAnotacao(anotacao) {
  return pedirJson(URL_ANOTACOES, { metodo: 'POST', corpo: anotacao })
}

// Update
export function atualizarAnotacao(id, campos) {
  return pedirJson(`${URL_ANOTACOES}/${id}`, { metodo: 'PUT', corpo: campos })
}

// Delete
export function excluirAnotacao(id) {
  return pedirJson(`${URL_ANOTACOES}/${id}`, { metodo: 'DELETE' })
}
