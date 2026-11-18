import { useEffect, useRef } from 'react'
import lottie from 'lottie-web/build/player/lottie_light'

// Toca um arquivo Lottie de public/animacoes com o lottie-web em SVG: o
// navegador move as imagens com a placa de vídeo, então fica mais liso.
// Versão "light": sem expressões (as animações do projeto não usam).
// Este arquivo é carregado sob demanda (lazy), então a biblioteca só é
// baixada quando alguma animação aparece.
export default function AnimacaoLottie({ arquivo, repetir = true, cobrir = false, aoCarregar, className = '' }) {
  const caixa = useRef(null)

  // O aviso "carregou" fica guardado à parte: se a página se redesenhar (por
  // exemplo, com os números da conquista subindo), a animação não recomeça.
  const avisoRef = useRef(aoCarregar)
  useEffect(() => {
    avisoRef.current = aoCarregar
  }, [aoCarregar])

  // Manipulação do DOM: o lottie-web desenha o SVG dentro da caixa e só é
  // desmontado quando o componente sai da tela ou troca de arquivo.
  useEffect(() => {
    const animacao = lottie.loadAnimation({
      container: caixa.current,
      renderer: 'svg',
      loop: repetir,
      autoplay: true,
      path: `/animacoes/${arquivo}.json`,
      rendererSettings: { preserveAspectRatio: cobrir ? 'xMidYMid slice' : 'xMidYMid meet' },
    })
    function avisarCarregou() {
      if (avisoRef.current) {
        avisoRef.current()
      }
    }
    animacao.addEventListener('DOMLoaded', avisarCarregou)
    return () => animacao.destroy()
  }, [arquivo, repetir, cobrir])

  return <span ref={caixa} aria-hidden="true" className={`block ${className}`} />
}
