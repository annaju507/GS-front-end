import textos from '../data/textos.json'
import Carimbo from './Carimbo.jsx'
import ImagemRio from './ImagemRio.jsx'

// Fundo das telas Entrar e Criar conta: o bonde de Santa Teresa ocupa a tela
// e o formulário fica num cartão branco por cima (o texto nunca fica sobre a
// foto). No celular e no tablet, o bonde vira uma faixa acima do formulário.
export default function CenaEmbarque({ children }) {
  return (
    <div className="relative">
      <ImagemRio
        nome="bonde-rua-santa-teresa"
        prioridade
        className="h-44 w-full object-[center_55%] sm:h-72 lg:absolute lg:inset-0 lg:h-full"
      />
      {/* Como na prévia aprovada: o cartão encosta à esquerda, mais largo e
          mais baixo, para o bonde aparecer inteiro à direita. */}
      <div className="relative mx-auto max-w-[32rem] px-4 pb-12 lg:mx-0 lg:max-w-none lg:px-[5%] lg:py-10">
        <div className="-mt-10 rounded-card shadow-modal lg:mt-0 lg:w-[24rem] xl:w-[28rem]">{children}</div>
      </div>
      <Carimbo linhas={textos.auth.carimbo} posicao="absolute" exibicao="hidden lg:flex" className="bottom-8 right-[5%] opacity-90" />
    </div>
  )
}
