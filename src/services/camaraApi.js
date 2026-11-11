// Acesso à API de Dados Abertos da Câmara dos Deputados (só leitura).
// Documentação: https://dadosabertos.camara.leg.br/swagger/api.html

const BASE = 'https://dadosabertos.camara.leg.br/api/v2'
const LIMITE_MS = 12000

// Erro com um "tipo" que a tela entende: semConexao, naoEncontrado, servidor.
export class ErroApi extends Error {
  constructor(tipo) {
    super(tipo)
    this.tipo = tipo
  }
}

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

  const controle = new AbortController()
  const temporizador = setTimeout(() => controle.abort(), LIMITE_MS)
  try {
    const resposta = await fetch(url, { headers: { Accept: 'application/json' }, signal: controle.signal })
    if (resposta.status === 404) {
      throw new ErroApi('naoEncontrado')
    } else if (!resposta.ok) {
      throw new ErroApi('servidor')
    }
    const corpo = await resposta.json()
    return corpo.dados
  } catch (erro) {
    if (erro instanceof ErroApi) {
      throw erro
    } else if (!navigator.onLine || erro instanceof TypeError) {
      throw new ErroApi('semConexao')
    } else {
      throw new ErroApi('servidor')
    }
  } finally {
    clearTimeout(temporizador)
  }
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
