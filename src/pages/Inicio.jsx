import { Link } from 'react-router'
import { ArrowRight, Scale } from 'lucide-react'
import textos from '../data/textos.json'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import CalcadaMascotes from '../components/CalcadaMascotes.jsx'
import Contador from '../components/Contador.jsx'
import ImagemRio from '../components/ImagemRio.jsx'
import MascoteEspiando from '../components/MascoteEspiando.jsx'
import PerguntaTeste from '../components/PerguntaTeste.jsx'
import Revelar from '../components/Revelar.jsx'
import SecaoGostinho from '../components/SecaoGostinho.jsx'
import SecaoNeutralidade from '../components/SecaoNeutralidade.jsx'
import VitrineApp from '../components/VitrineApp.jsx'

const t = textos.inicio

// Início público (tela-modelo 19.1), em faixas largas: hero com a foto da
// Baía, como o Demokratos ajuda (neutralidade, números que sobem e mascotes
// andando na calçada), a vitrine com prints
// do app, um gostinho de cada área, a neutralidade ("a conclusão é sua"), a
// faixa do calçadão, a pergunta-gancho e uma pergunta-teste do quiz.
export default function Inicio() {
  useTitulo(t.tituloAba)

  return (
    <>
      {/* Topo: a vista da Baía ocupa a largura toda e o texto fica num cartão
          (nunca direto sobre a foto, para manter o contraste). No celular, a
          imagem vem primeiro e o cartão sobe um pouco por cima dela. O caramelo
          (boas-vindas) espia por cima do cartão. */}
      <section aria-labelledby="titulo-inicio" className="relative overflow-hidden bg-hero">
        <ImagemRio
          nome="vista-baia"
          prioridade
          className="h-56 w-full object-[center_40%] sm:h-72 md:absolute md:inset-0 md:h-full"
        />
        <div className="relative mx-auto max-w-conteudo px-4 pb-10 md:px-6 md:py-20 lg:px-8 lg:py-28">
          <div className="relative -mt-12 flex flex-col gap-6 rounded-modal bg-superficie p-6 shadow-modal md:mt-0 md:max-w-[34rem] md:p-8">
            <MascoteEspiando nome="caramelo" expressao="feliz" posicao="-top-20 right-2" largura={112} />
            <h1 id="titulo-inicio" className="marca-texto">
              <span>{t.marcaTexto[0]}</span>{' '}
              <br />
              <span>{t.marcaTexto[1]}</span>
            </h1>
            <p className="text-corpo">{t.subtitulo}</p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Botao variante="primario" para="/cadastro" icone={ArrowRight}>
                {t.comecar}
              </Botao>
              <Botao variante="secundario" para="/entrar">
                {t.jaTenhoConta}
              </Botao>
            </div>
          </div>
        </div>
      </section>

      {/* Como o Demokratos ajuda: a neutralidade em destaque, os números que
          sobem e a calçada com os mascotes andando. */}
      <section aria-labelledby="titulo-como-ajuda">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 pb-12 pt-20 text-center md:px-6">
          <Revelar className="flex flex-col items-center gap-5">
            <p className="inline-flex items-center gap-2 font-titulo text-tag font-bold uppercase tracking-[0.08em] text-texto-2">
              <Scale size={18} strokeWidth={2.5} aria-hidden="true" className="balancar text-link" />
              {t.comoFunciona.titulo}
            </p>
            <h2 id="titulo-como-ajuda" className="text-[2rem] leading-[1.12] md:text-[3.1rem]">
              {t.comoFunciona.chamada[0]}{' '}
              <span className="marca-neutra">{t.comoFunciona.chamada[1]}</span>
            </h2>
            <p className="max-w-2xl text-[1.15rem]">
              {t.comoFunciona.texto} <strong className="text-link">{t.comoFunciona.textoDestaque}</strong>
            </p>
          </Revelar>
          <ul className="mt-2 grid w-full gap-4 sm:grid-cols-3">
            {t.comoFunciona.estatisticas.map((item, indice) => (
              <Revelar
                key={item.rotulo}
                como="li"
                atraso={indice * 140}
                className="flex flex-col items-center gap-1 rounded-card border border-borda bg-superficie p-5 shadow-card transition-transform duration-200 hover:-translate-y-1 dark:shadow-none"
              >
                <Contador valor={item.valor} className="font-titulo text-[2.6rem] font-extrabold leading-none text-link" />
                <span className="text-legenda text-texto-2">{item.rotulo}</span>
              </Revelar>
            ))}
          </ul>
          <Botao variante="primario" para="/como-funciona" icone={ArrowRight} className="mt-2">
            {t.comoFunciona.saibaMais}
          </Botao>
        </div>
        <CalcadaMascotes />
        <p className="px-4 pb-6 pt-3 text-center text-legenda text-texto-2">{t.comoFunciona.calcadaDica}</p>
      </section>

      {/* Veja por dentro: prints de verdade, trocando sozinhos (com pausa). */}
      <section aria-labelledby="titulo-vitrine" className="border-t border-borda">
        <div className="relative mx-auto flex max-w-conteudo flex-col gap-3 px-4 py-20 md:px-6 lg:px-8">
          <MascoteEspiando nome="capivara" expressao="feliz" posicao="right-4 top-6 hidden md:block" largura={112} />
          <Revelar>
            <h2 id="titulo-vitrine">{textos.previa.vitrine.titulo}</h2>
            <p className="mb-5 mt-2 text-texto-2">{textos.previa.vitrine.texto}</p>
          </Revelar>
          <Revelar atraso={120}>
            <VitrineApp />
          </Revelar>
        </div>
      </section>

      <SecaoGostinho />

      <SecaoNeutralidade />

      {/* Faixa decorativa: o calçadão de Copacabana, deslizando devagar. */}
      <div className="panoramica h-24 overflow-hidden md:h-36" aria-hidden="true">
        <ImagemRio nome="calcadao-copacabana" className="h-full object-[center_62%]" />
      </div>

      <section aria-labelledby="titulo-faixa" className="bg-azul-ceu">
        <div className="mx-auto flex max-w-conteudo flex-col items-start gap-4 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <h2 id="titulo-faixa" className="text-indigo">{t.faixa.pergunta}</h2>
          <Link
            to="/previa/trilhas"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full border-2 border-indigo px-6 font-titulo text-legenda font-bold uppercase tracking-[0.05em] text-indigo no-underline transition-[background-color,transform] duration-150 hover:-translate-y-0.5 hover:bg-white/50"
          >
            {t.faixa.botao}
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <PerguntaTeste />
    </>
  )
}
