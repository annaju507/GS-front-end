// Progresso de cada conta, guardado no navegador (localStorage).
import { PROGRESSO_VAZIO } from '../domain/progresso.js'

function chave(email) {
  return `demokratos-progresso:${email}`
}

export function lerProgresso(email) {
  try {
    const salvo = JSON.parse(window.localStorage.getItem(chave(email)))
    return { ...PROGRESSO_VAZIO, ...salvo }
  } catch {
    return PROGRESSO_VAZIO
  }
}

export function salvarProgresso(email, progresso) {
  try {
    window.localStorage.setItem(chave(email), JSON.stringify(progresso))
  } catch {
    // Sem armazenamento: o progresso vale só até fechar a página.
  }
}
