import Animacao from './Animacao.jsx'

// Confete da conquista (seção 9), tocado uma vez com LottieFiles por cima da
// cena. Com "reduzir animações", não aparece.
export default function Confete() {
  return <Animacao arquivo="extra/confete" repetir={false} cobrir className="absolute inset-0 overflow-hidden" />
}
