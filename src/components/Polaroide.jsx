import ImagemRio from './ImagemRio.jsx'

// Foto do Rio em moldura de polaroide, com fita lilás opcional. Decorativa.
// "inclinacao" é uma classe de rotação do Tailwind (ex.: -rotate-6).
// "posicao" é relative por padrão; no leque, as fotos usam absolute.
export default function Polaroide({ imagem, fita = false, inclinacao = '', posicao = 'relative', classeImagem = 'h-28', className = '' }) {
  return (
    <div className={`polaroide ${posicao} ${inclinacao} ${className}`}>
      {fita && <span aria-hidden="true" className="polaroide-fita" />}
      <ImagemRio nome={imagem} className={`w-full ${classeImagem}`} />
    </div>
  )
}
