import { ArrowRight } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import { useAuth } from '../hooks/useAuth.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import Carimbo from '../components/Carimbo.jsx'
import ImagemRio from '../components/ImagemRio.jsx'
import IndicadorPassos from '../components/IndicadorPassos.jsx'
import Mascote from '../components/Mascote.jsx'

const t = textos.boasVindas.inicio

// Passo 1 da primeira visita: um cartão-postal do Rio. Na frente, a vista da
// Baía; no verso, as boas-vindas, o selo, o carimbo e um recado do caramelo.
// O papel do postal é sempre claro, nos dois temas.
export default function BoasVindas() {
  useTitulo(t.tituloAba)
  const { usuario } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <IndicadorPassos atual={1} total={3} />

      <article className="grid -rotate-1 rounded-card bg-[#FFFDF8] text-[#1A1A1A] shadow-modal sm:grid-cols-2">
        <div className="p-3 pb-0 sm:pb-3">
          <ImagemRio nome="vista-baia-sem-cristo" prioridade className="h-40 w-full rounded-card-pequeno sm:h-full sm:min-h-80" />
        </div>

        <div className="relative mx-3 mt-3 flex flex-col gap-3 border-t-2 border-dashed border-[#D9D0F7] px-2 pb-6 pt-5 sm:m-0 sm:border-l-2 sm:border-t-0 sm:px-6 sm:pt-24">
          {/* Selo e carimbo: só enfeite. */}
          <span aria-hidden="true" className="absolute -top-12 right-4 w-12 rotate-[4deg] drop-shadow-md sm:top-4 sm:w-16">
            <span className="selo-picotado block bg-white">
              <ImagemRio nome="bondinho-pao-de-acucar" className="aspect-[5/6] w-full" />
            </span>
          </span>
          <Carimbo linhas={t.carimbo} posicao="absolute" exibicao="hidden sm:flex" className="-left-12 top-4" />

          <h1 className="text-[#1A1A1A]">{preencher(t.titulo, { apelido: usuario.apelido })}</h1>
          <p>{t.texto}</p>

          {/* A fala do caramelo como recado escrito à mão, assinado por ele. */}
          <div className="mt-1 flex items-start gap-3">
            <Mascote nome="caramelo" expressao="feliz" tamanho="corpo" largura={88} />
            <p className="font-mao text-[1.375rem] leading-tight text-[#4B2BB5]">
              {t.fala}
              <span className="mt-1 block text-[#8A5A1E]">{textos.mascotes.caramelo}</span>
            </p>
          </div>
        </div>
      </article>

      <div>
        <Botao variante="primario" para="/boas-vindas/ponto-de-partida" icone={ArrowRight}>
          {t.botao}
        </Botao>
      </div>
    </div>
  )
}
