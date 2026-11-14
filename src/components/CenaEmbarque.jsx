import textos from '../data/textos.json'
import Carimbo from './Carimbo.jsx'
import ImagemRio from './ImagemRio.jsx'

// Fundo das telas Entrar e Criar conta: o bonde de Santa Teresa ocupa a tela
// e o formulário fica num cartão branco por cima (o texto nunca fica sobre a
// foto). No celular, o bonde vira uma faixa acima do formulário.
export default function CenaEmbarque({ children }) {
  return (
    <div className="relative">
      <ImagemRio
        nome="bonde-rua-santa-teresa"
        prioridade
        className="h-44 w-full object-[center_55%] sm:h-56 md:absolute md:inset-0 md:h-full"
      />
      <div className="relative mx-auto max-w-conteudo px-4 pb-12 md:px-6 md:py-14 lg:px-8">
        <div className="-mt-10 rounded-card shadow-modal md:mt-0 md:max-w-md">{children}</div>
      </div>
      <Carimbo linhas={textos.auth.carimbo} posicao="absolute" exibicao="hidden md:flex" className="bottom-8 right-8" />
    </div>
  )
}
