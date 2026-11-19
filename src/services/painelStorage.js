// Memória do Início (localStorage): o dia em que a animação do foguinho já
// apareceu e as mensagens já lidas. Sem localStorage (janela anônima), tudo
// continua funcionando, só não fica guardado.
function chaveEntrada(email) {
  return `demokratos-foguinho-visto:${email}`
}

function chaveMensagens(email) {
  return `demokratos-mensagens-lidas:${email}`
}

export function lerEntradaVista(email) {
  try {
    return window.localStorage.getItem(chaveEntrada(email))
  } catch {
    return null
  }
}

export function salvarEntradaVista(email, dataIso) {
  try {
    window.localStorage.setItem(chaveEntrada(email), dataIso)
  } catch {
    // Sem localStorage: a animação pode aparecer de novo, sem problema.
  }
}

export function lerMensagensLidas(email) {
  try {
    const lista = JSON.parse(window.localStorage.getItem(chaveMensagens(email)) ?? '[]')
    return Array.isArray(lista) ? lista : []
  } catch {
    return []
  }
}

export function salvarMensagensLidas(email, ids) {
  try {
    // Guarda só as 50 mais recentes, para a lista não crescer para sempre.
    window.localStorage.setItem(chaveMensagens(email), JSON.stringify(ids.slice(-50)))
  } catch {
    // Sem localStorage: a mensagem só volta a aparecer como nova.
  }
}
