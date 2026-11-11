// Resumo (hash) de um texto: o mesmo texto sempre dá o mesmo resumo, mas
// não dá para voltar ao texto original. Usado para não guardar a senha
// como foi digitada e para não mandar o e-mail para o MockAPI.
export async function resumirTexto(texto) {
  if (window.crypto?.subtle) {
    const bytes = new TextEncoder().encode(texto)
    const resumo = await window.crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(resumo), (byte) => byte.toString(16).padStart(2, '0')).join('')
  }
  // Plano B simples (crypto.subtle só existe em https e em localhost).
  let valor = 5381
  for (const letra of texto) {
    valor = (valor * 33) ^ letra.charCodeAt(0)
  }
  return `b${(valor >>> 0).toString(16)}`
}
