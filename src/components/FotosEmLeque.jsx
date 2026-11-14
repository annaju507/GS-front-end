import Polaroide from './Polaroide.jsx'

// Três fotos do Rio abertas em leque, como fotos de viagem (boas-vindas).
// Só enfeite: o leitor de tela pula o grupo inteiro.
export default function FotosEmLeque({ centro, esquerda, direita, className = '' }) {
  return (
    <div aria-hidden="true" className={`relative mx-auto h-52 w-full max-w-md sm:h-60 ${className}`}>
      <Polaroide imagem={esquerda} inclinacao="-rotate-[10deg]" classeImagem="h-24 sm:h-28" posicao="absolute" className="left-0 top-8 w-32 sm:w-40" />
      <Polaroide imagem={direita} inclinacao="rotate-[9deg]" classeImagem="h-24 sm:h-28" posicao="absolute" className="right-0 top-10 w-32 sm:w-40" />
      <Polaroide imagem={centro} fita inclinacao="-rotate-1" classeImagem="h-28 sm:h-32" posicao="absolute" className="left-1/2 top-0 z-10 w-36 -translate-x-1/2 sm:w-44" />
    </div>
  )
}
