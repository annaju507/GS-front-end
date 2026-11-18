import Mascote from './Mascote.jsx'

// Mascote que espia pela borda de uma seção, balançando de leve. É enfeite
// (aria-hidden pelo Mascote) e não pega cliques. "posicao": classes de lugar.
export default function MascoteEspiando({ nome, expressao, posicao = '', largura = 136 }) {
  return (
    <span className={`espiando pointer-events-none absolute z-10 ${posicao}`}>
      <Mascote nome={nome} expressao={expressao} tamanho="corpo" largura={largura} />
    </span>
  )
}
