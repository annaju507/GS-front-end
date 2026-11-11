import { useEffect, useRef, useState } from 'react'
import { PONTOS_POR_ACERTO, corrigirQuestao } from '../domain/quiz.js'

// Estado do quiz de uma lição: pergunta atual, resposta, pontos e acertos.
// Depois de verificar, o foco vai para a gaveta de feedback (useRef + focus).
export function useQuiz(perguntas) {
  const [indice, setIndice] = useState(0)
  const [selecionada, setSelecionada] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [pontos, setPontos] = useState(0)
  const [acertos, setAcertos] = useState(0)
  const [inicio] = useState(() => Date.now())
  const feedbackRef = useRef(null)

  const atual = perguntas[indice]
  const respondido = resultado === 'acertou' || resultado === 'errou'
  const ultima = indice === perguntas.length - 1

  useEffect(() => {
    if (resultado !== null && feedbackRef.current) {
      feedbackRef.current.focus()
    }
  }, [resultado])

  function selecionar(opcao) {
    setSelecionada(opcao)
    if (resultado === 'semResposta') {
      setResultado(null)
    }
  }

  // Interação principal do quiz: o if/else decide acerto ou erro e soma os pontos.
  function verificar() {
    const correcao = corrigirQuestao(selecionada, atual.correta)
    setResultado(correcao)
    if (correcao === 'acertou') {
      setPontos(pontos + PONTOS_POR_ACERTO)
      setAcertos(acertos + 1)
    } else if (correcao === 'errou') {
      // Sem perder pontos: a gaveta mostra a explicação e a fonte.
    }
  }

  // Vai para a próxima pergunta. Na última, devolve o resultado final.
  function continuar() {
    if (ultima) {
      return { acertos, total: perguntas.length, pontos, segundos: (Date.now() - inicio) / 1000 }
    }
    setIndice(indice + 1)
    setSelecionada(null)
    setResultado(null)
    return null
  }

  return {
    indice,
    total: perguntas.length,
    atual,
    selecionada,
    resultado,
    respondido,
    ultima,
    pontos,
    acertos,
    feedbackRef,
    selecionar,
    verificar,
    continuar,
  }
}
