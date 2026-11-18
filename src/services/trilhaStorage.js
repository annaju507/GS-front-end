// Última lição liberada que a pessoa viu na trilha (localStorage), para
// saber quando mostrar as pegadas andando até a próxima.
function chave(email) {
  return `demokratos-trilha-vista:${email}`
}

export function lerUltimaVista(email) {
  try {
    return window.localStorage.getItem(chave(email))
  } catch {
    return null
  }
}

export function salvarUltimaVista(email, idLicao) {
  try {
    if (idLicao) {
      window.localStorage.setItem(chave(email), idLicao)
    }
  } catch {
    // Sem localStorage (janela anônima): a animação só não aparece.
  }
}
