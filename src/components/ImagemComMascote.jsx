import ImagemRio from './ImagemRio.jsx'
import Mascote from './Mascote.jsx'

// Ilustração do Rio com um mascote "entrando" na cena, apoiado numa borda.
// O mascote fica num invólucro posicionado (a classe de sombra do mascote
// já usa position: relative). Os dois são decorativos.
export default function ImagemComMascote({
  imagem,
  mascote,
  expressao = 'feliz',
  largura = 96,
  posicaoMascote = '-bottom-4 -left-6',
  classeImagem = '',
  className = '',
}) {
  return (
    <div className={`relative ${className}`}>
      <ImagemRio nome={imagem} className={`w-full rounded-card ${classeImagem}`} />
      {mascote && (
        <span className={`pointer-events-none absolute ${posicaoMascote}`}>
          <Mascote nome={mascote} expressao={expressao} tamanho="corpo" largura={largura} />
        </span>
      )}
    </div>
  )
}
