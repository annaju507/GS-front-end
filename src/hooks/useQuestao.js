import { useEffect, useRef, useState } from 'react'
import { corrigirQuestao } from '../domain/quiz.js'

// Estado de UMA questão de múltipla escolha: o que foi escolhido, se já foi
// verificada e o resultado. Depois de verificar, leva o foco e a rolagem
// até o feedback (manipulação do DOM com useRef).
export function useQuestao(correta) {
  const [selecionada, setSelecionada] = useState(null)
  const [resultado, setResultado] = useState(null)
  const feedbackRef = useRef(null)

  const respondido = resultado === 'acertou' || resultado === 'errou'

  useEffect(() => {
    if (resultado !== null && feedbackRef.current) {
      feedbackRef.current.focus()
      feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [resultado])

  function selecionar(indice) {
    setSelecionada(indice)
    if (resultado === 'semResposta') {
      setResultado(null)
    }
  }

  function verificar() {
    setResultado(corrigirQuestao(selecionada, correta))
  }

  function reiniciar() {
    setSelecionada(null)
    setResultado(null)
  }

  return { selecionada, resultado, respondido, feedbackRef, selecionar, verificar, reiniciar }
}
