import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { CHAVES, TEMA_CLARO, TEMA_ESCURO, decidirTemaInicial } from '../domain/preferencias.js'
import { lerPreferencia, salvarPreferencia, sistemaPrefereEscuro } from '../services/preferenciasStorage.js'

// Modo claro/escuro. A classe "dark" no <html> liga o tema escuro no site todo.
export function useTheme() {
  const [tema, setTema] = useState(() =>
    decidirTemaInicial(lerPreferencia(CHAVES.tema), sistemaPrefereEscuro()),
  )

  // Garante que o <html> está de acordo com o tema decidido na primeira visita.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === TEMA_ESCURO)
  }, [tema])

  // Manipulação do DOM: liga/desliga a classe e salva a escolha.
  function trocar() {
    const ficouEscuro = document.documentElement.classList.toggle('dark')
    const novoTema = ficouEscuro ? TEMA_ESCURO : TEMA_CLARO
    salvarPreferencia(CHAVES.tema, novoTema)
    // flushSync: o React atualiza na hora, para a animação já pegar a tela nova.
    flushSync(() => setTema(novoTema))
  }

  // A cor nova se espalha num círculo que sai do botão clicado (View
  // Transitions). Sem suporte do navegador ou com "reduzir animações", troca
  // direto.
  function alternarTema(evento) {
    const raiz = document.documentElement
    const reduzir = raiz.classList.contains('reduzir-animacoes') || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reduzir) {
      trocar()
      return
    }
    const botao = evento?.currentTarget
    if (botao instanceof HTMLElement) {
      const caixa = botao.getBoundingClientRect()
      raiz.style.setProperty('--tema-x', `${caixa.left + caixa.width / 2}px`)
      raiz.style.setProperty('--tema-y', `${caixa.top + caixa.height / 2}px`)
    } else {
      raiz.style.setProperty('--tema-x', '50%')
      raiz.style.setProperty('--tema-y', '50%')
    }
    document.startViewTransition(trocar)
  }

  return { tema, escuro: tema === TEMA_ESCURO, alternarTema }
}
