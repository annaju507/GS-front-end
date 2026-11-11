// Pedido HTTP com limite de tempo e erros que a tela entende.
// Usado pela API da Câmara e pela API do caderno (MockAPI).

const LIMITE_MS = 12000

// Erro com um "tipo": semConexao, naoEncontrado ou servidor.
export class ErroApi extends Error {
  constructor(tipo) {
    super(tipo)
    this.tipo = tipo
  }
}

export async function pedirJson(url, { metodo = 'GET', corpo } = {}) {
  const controle = new AbortController()
  const temporizador = setTimeout(() => controle.abort(), LIMITE_MS)
  try {
    const resposta = await fetch(url, {
      method: metodo,
      headers: corpo ? { Accept: 'application/json', 'Content-Type': 'application/json' } : { Accept: 'application/json' },
      body: corpo ? JSON.stringify(corpo) : undefined,
      signal: controle.signal,
    })
    if (resposta.status === 404) {
      throw new ErroApi('naoEncontrado')
    } else if (!resposta.ok) {
      throw new ErroApi('servidor')
    }
    return await resposta.json()
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
