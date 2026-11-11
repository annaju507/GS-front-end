// Acesso ao localStorage do navegador. Em janela anônima ou com o
// armazenamento bloqueado, o acesso pode falhar: nesse caso o site
// segue com o padrão, sem quebrar.

export function lerPreferencia(chave) {
  try {
    return window.localStorage.getItem(chave)
  } catch {
    return null
  }
}

export function salvarPreferencia(chave, valor) {
  try {
    window.localStorage.setItem(chave, String(valor))
  } catch {
    // Sem armazenamento: a escolha vale só até fechar a página.
  }
}

// Preferências do sistema (aparelho da pessoa).
export function sistemaPrefereEscuro() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const CONSULTA_MENOS_MOVIMENTO = '(prefers-reduced-motion: reduce)'
