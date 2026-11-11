import { resumirTexto } from './resumo.js'

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

// A senha nunca é guardada como foi digitada: só o resumo (hash).
export function resumirSenha(senha) {
  return resumirTexto(`demokratos:${senha}`)
}
