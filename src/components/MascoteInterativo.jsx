import { useState } from 'react'
import Mascote from './Mascote.jsx'

// Mascote que reage quando o mouse passa (ou o dedo toca): troca de pose e dá
// um pulinho. É enfeite (o Mascote já vem escondido do leitor de tela).
// Com largura={null}, o tamanho vem da caixa de fora (className).
export default function MascoteInterativo({ nome, expressao = 'feliz', expressaoReacao = 'comemorando', largura = 160, className = '' }) {
  const [reagindo, setReagindo] = useState(false)
  return (
    <span
      onPointerEnter={() => setReagindo(true)}
      onPointerLeave={() => setReagindo(false)}
      className={`inline-block transition-transform duration-300 ease-out ${reagindo ? '-translate-y-2 scale-105' : ''} ${className}`}
    >
      <Mascote nome={nome} expressao={reagindo ? expressaoReacao : expressao} tamanho="corpo" largura={largura} className={largura ? '' : 'w-full'} />
    </span>
  )
}
