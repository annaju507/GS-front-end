import { useRef } from 'react'
import { usePreferencias } from '../hooks/usePreferencias.js'
import ImagemRio from './ImagemRio.jsx'

const PRINTS = import.meta.glob('../assets/prints/*.webp', { eager: true, import: 'default' })

// Ilustração do Rio (nome) ou print do app (print + alt) com um zoom lento e
// contínuo, que inclina de leve conforme o mouse. Com "reduzir animações",
// fica parada.
export default function ImagemViva({ nome, print, alt = '', prioridade = false, className = '', classeImagem = '' }) {
  const ref = useRef(null)
  const { animacoes } = usePreferencias()

  // Manipulação do DOM: a inclinação vai direto em variáveis CSS do elemento,
  // sem redesenhar o componente a cada movimento do mouse.
  function aoMover(evento) {
    if (animacoes.reduzir || !ref.current) {
      return
    }
    const caixa = ref.current.getBoundingClientRect()
    const x = (evento.clientX - caixa.left) / caixa.width - 0.5
    const y = (evento.clientY - caixa.top) / caixa.height - 0.5
    ref.current.style.setProperty('--inclina-y', `${x * 8}deg`)
    ref.current.style.setProperty('--inclina-x', `${-y * 8}deg`)
  }

  function aoSair() {
    if (ref.current) {
      ref.current.style.setProperty('--inclina-y', '0deg')
      ref.current.style.setProperty('--inclina-x', '0deg')
    }
  }

  return (
    <div ref={ref} onMouseMove={aoMover} onMouseLeave={aoSair} className={`imagem-viva overflow-hidden rounded-modal shadow-modal ${className}`}>
      {print ? (
        <img
          src={PRINTS[`../assets/prints/${print}.webp`]}
          alt={alt}
          width={960}
          height={535}
          loading={prioridade ? 'eager' : 'lazy'}
          decoding="async"
          className={`block size-full object-cover object-top ${classeImagem}`}
        />
      ) : (
        <ImagemRio nome={nome} prioridade={prioridade} className={`size-full ${classeImagem}`} />
      )}
    </div>
  )
}
