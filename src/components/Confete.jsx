import Animacao from './Animacao.jsx'

// Confete da conquista (seção 9), tocado uma vez (animação Lottie). Cobre a
// tela inteira e cai até embaixo, por cima do conteúdo, sem atrapalhar cliques.
// Com "reduzir animações", não aparece.
export default function Confete() {
  return <Animacao arquivo="extra/confete" repetir={false} cobrir className="fixed inset-0 z-30 overflow-hidden" />
}
