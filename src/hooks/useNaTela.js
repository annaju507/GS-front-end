import { useEffect, useState } from 'react'

// Avisa quando o elemento chega perto da tela (uma vez só). Serve para
// baixar a animação apenas quando ela vai aparecer.
// Devolve uma ref de função: o efeito roda de novo quando o elemento aparece
// (por exemplo, quando o mascote deixa de ser imagem parada).
export function useNaTela(margem = '200px') {
  const [elemento, setElemento] = useState(null)
  // Navegador sem IntersectionObserver: mostra direto.
  const [naTela, setNaTela] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    if (naTela || !elemento) {
      return undefined
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) {
          setNaTela(true)
          observador.disconnect()
        }
      },
      { rootMargin: margem },
    )
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [elemento, naTela, margem])

  return [setElemento, naTela]
}
