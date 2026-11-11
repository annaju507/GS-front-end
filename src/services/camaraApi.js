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

// Proposições de autoria de deputados do RJ, das mais novas para as mais antigas.
// codTema: lista de temas da Câmara (ver TEMAS_DA_CAMARA em domain/areas.js).
export function buscarProposicoes({ siglaTipo, keywords, codTema, itens = 10, pagina = 1, dataApresentacaoInicio } = {}) {
  return buscarJson('/proposicoes', {
    siglaUfAutor: 'RJ',
    siglaTipo,
    keywords,
    codTema,
    itens,
    pagina,
    dataApresentacaoInicio,
    ordem: 'DESC',
    ordenarPor: 'id',
  })
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
