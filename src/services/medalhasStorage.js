// Medalhas que a pessoa já viu comemoradas na trilha (localStorage), para a
// animação de conquista aparecer uma vez só para cada medalha.
function chave(email) {
  return `demokratos-medalhas-vistas:${email}`
}

// Devolve a lista de ids ou null se nunca foi salva.
export function lerMedalhasVistas(email) {
  try {
    const texto = window.localStorage.getItem(chave(email))
    if (texto === null) {
      return null
    }
    const lista = JSON.parse(texto)
    return Array.isArray(lista) ? lista : null
  } catch {
    return null
  }
}

export function salvarMedalhasVistas(email, ids) {
  try {
    window.localStorage.setItem(chave(email), JSON.stringify(ids))
  } catch {
    // Sem localStorage (janela anônima): a comemoração só não fica guardada.
  }
}
