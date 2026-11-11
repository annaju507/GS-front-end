import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import textos from '../data/textos.json'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import Card from '../components/Card.jsx'
import Mascote from '../components/Mascote.jsx'
import ObjetosFlutuantes from '../components/ObjetosFlutuantes.jsx'
import OndasCalcadao from '../components/OndasCalcadao.jsx'
import PerguntaTeste from '../components/PerguntaTeste.jsx'

const t = textos.inicio

// Início público (tela-modelo 19.1): hero, como funciona, faixa com
// pergunta-gancho e uma pergunta-teste do quiz.
export default function Inicio() {
  useTitulo(t.tituloAba)

  return (
    <>
      <section aria-labelledby="titulo-inicio" className="relative overflow-hidden bg-hero">
        <ObjetosFlutuantes />
        <div className="relative mx-auto flex max-w-conteudo flex-col gap-6 px-4 pb-16 pt-24 md:px-6 md:py-20 lg:px-8">
          <h1 id="titulo-inicio" className="marca-texto">
            <span>{t.marcaTexto[0]}</span>{' '}
            <br />
            <span>{t.marcaTexto[1]}</span>
          </h1>
          <p className="max-w-xl text-corpo">{t.subtitulo}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Botao variante="primario" para="/cadastro" icone={ArrowRight}>
              {t.comecar}
            </Botao>
            <Botao variante="secundario" para="/entrar">
              {t.jaTenhoConta}
            </Botao>
          </div>
        </div>
        <OndasCalcadao />
      </section>

      <section aria-labelledby="titulo-como-ajuda" className="mx-auto grid max-w-conteudo items-center gap-8 px-4 py-12 md:grid-cols-[auto_1fr] md:px-6 lg:px-8">
        <Mascote nome="capivara" expressao="explicando" tamanho="corpo" largura={240} className="mx-auto" />
        <div className="flex flex-col gap-4">
          <p className="font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2">{t.comoFunciona.titulo}</p>
          <h2 id="titulo-como-ajuda" className="uppercase tracking-[0.04em]">
            {t.comoFunciona.chamada[0]}
            <br />
            <span className="text-destaque-texto">{t.comoFunciona.chamada[1]}</span>
          </h2>
          <p className="max-w-leitura">{t.comoFunciona.texto}</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {t.comoFunciona.estatisticas.map((item) => (
              <Card key={item.rotulo} como="li" className="flex flex-col gap-1">
                <span className="font-titulo text-h2 font-extrabold text-link">{item.valor}</span>
                <span className="text-legenda text-texto-2">{item.rotulo}</span>
              </Card>
            ))}
          </ul>
          <div>
            <Botao variante="terciario" para="/como-funciona" className="-ml-6">
              {t.comoFunciona.saibaMais}
            </Botao>
          </div>
        </div>
      </section>

      <section aria-labelledby="titulo-faixa" className="bg-azul-ceu">
        <div className="mx-auto flex max-w-conteudo flex-col items-start gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <h2 id="titulo-faixa" className="text-indigo">{t.faixa.pergunta}</h2>
          <Link
            to="/previa/trilhas"
            className="inline-flex min-h-12 shrink-0 items-center rounded-full border-2 border-indigo px-6 font-titulo text-legenda font-bold uppercase tracking-[0.05em] text-indigo no-underline transition-colors duration-150 hover:bg-white/50"
          >
            {t.faixa.botao}
          </Link>
        </div>
      </section>

      <PerguntaTeste />
    </>
  )
}
