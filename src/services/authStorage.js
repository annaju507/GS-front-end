// Login SIMULADO no navegador (localStorage). Não há servidor: as contas
// ficam só neste navegador. A senha nunca é guardada como foi digitada,
// só um resumo (hash). Ainda assim, o site avisa para não usar senha real.

const CHAVE_USUARIOS = 'demokratos-usuarios'
const CHAVE_SESSAO = 'demokratos-sessao'

function lerJson(chave, padrao) {
  try {
    const texto = window.localStorage.getItem(chave)
    return texto ? JSON.parse(texto) : padrao
  } catch {
    return padrao
  }
}

function salvarJson(chave, valor) {
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor))
  } catch {
    // Sem armazenamento: a conta vale só até fechar a página.
  }
}

export function lerUsuarios() {
  const usuarios = lerJson(CHAVE_USUARIOS, [])
  return Array.isArray(usuarios) ? usuarios : []
}

export function salvarUsuarios(usuarios) {
  salvarJson(CHAVE_USUARIOS, usuarios)
}

export function lerSessao() {
  return lerJson(CHAVE_SESSAO, null)
}

export function salvarSessao(email) {
  salvarJson(CHAVE_SESSAO, email)
}

export function apagarSessao() {
  try {
    window.localStorage.removeItem(CHAVE_SESSAO)
  } catch {
    // Nada a fazer.
  }
}

// Resumo SHA-256 da senha (crypto.subtle existe em https e em localhost).
export async function resumirSenha(senha) {
  if (window.crypto?.subtle) {
    const bytes = new TextEncoder().encode(`demokratos:${senha}`)
    const resumo = await window.crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(resumo), (byte) => byte.toString(16).padStart(2, '0')).join('')
  }
  // Plano B simples, só para não guardar a senha como foi digitada.
  let valor = 5381
  for (const letra of `demokratos:${senha}`) {
    valor = (valor * 33) ^ letra.charCodeAt(0)
  }
  return `b${(valor >>> 0).toString(16)}`
}
