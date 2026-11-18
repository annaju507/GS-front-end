import { useEffect, useState } from 'react'

// Largura e altura reais de um elemento, em px, atualizadas quando a tela
// muda de tamanho ou a letra aumenta (A+). Devolve uma ref de função.
export function useTamanho() {
  const [elemento, setElemento] = useState(null)
  const [tamanho, setTamanho] = useState({ largura: 0, altura: 0 })

  useEffect(() => {
    if (!elemento || !('ResizeObserver' in window)) {
      return undefined
    }
    const observador = new ResizeObserver((entradas) => {
      const caixa = entradas[0].contentRect
      setTamanho({ largura: caixa.width, altura: caixa.height })
    })
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [elemento])

  return [setElemento, tamanho]
}
