import { useEffect } from 'react'

// Atalhos de teclado do quiz: 1, 2, 3... escolhem a opção e Enter verifica.
// Depois de responder, o foco já está no CONTINUAR (Enter funciona sozinho).
// Manipulação do DOM: o ouvinte de teclado fica na janela enquanto a tela existe.
export function useAtalhosQuiz({ totalOpcoes, respondido, onSelecionar, onVerificar }) {
  useEffect(() => {
    function aoApertar(evento) {
      const alvo = evento.target
      const digitando = alvo instanceof HTMLElement && (alvo.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(alvo.tagName) && alvo.type !== 'radio')
      if (digitando || evento.altKey || evento.ctrlKey || evento.metaKey) {
        return
      }
      const numero = Number(evento.key)
      if (respondido) {
        return
      } else if (Number.isInteger(numero) && numero >= 1 && numero <= totalOpcoes) {
        evento.preventDefault()
        onSelecionar(numero - 1)
      } else if (evento.key === 'Enter' && !(alvo instanceof HTMLButtonElement) && !(alvo instanceof HTMLAnchorElement)) {
        evento.preventDefault()
        onVerificar()
      }
    }
    window.addEventListener('keydown', aoApertar)
    return () => window.removeEventListener('keydown', aoApertar)
  }, [totalOpcoes, respondido, onSelecionar, onVerificar])
}
