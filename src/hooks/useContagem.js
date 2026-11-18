import { useEffect, useState } from 'react'
import { usePreferencias } from './usePreferencias.js'

// Número que sobe de 0 até o alvo (desacelerando no fim), para a tela de
// conquista. Com "reduzir animações", mostra o valor final direto.
export function useContagem(alvo, duracao = 900, atraso = 0) {
  const { animacoes } = usePreferencias()
  const [valor, setValor] = useState(0)

  useEffect(() => {
    if (animacoes.reduzir) {
      return undefined
    }
    let quadro
    const inicio = performance.now() + atraso
    function passo(agora) {
      const progresso = Math.min(1, Math.max(0, (agora - inicio) / duracao))
      const suave = 1 - Math.pow(1 - progresso, 3)
      setValor(Math.round(alvo * suave))
      if (progresso < 1) {
        quadro = requestAnimationFrame(passo)
      }
    }
    quadro = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(quadro)
  }, [alvo, duracao, atraso, animacoes.reduzir])

  if (animacoes.reduzir) {
    return alvo
  } else {
    return valor
  }
}
