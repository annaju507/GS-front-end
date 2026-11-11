import { CircleAlert, CircleCheck, Info, Lightbulb, TriangleAlert } from 'lucide-react'
import textos from '../data/textos.json'
import { useTitulo } from '../hooks/useTitulo.js'
import PularParaConteudo from '../components/PularParaConteudo.jsx'
import BotaoTema from '../components/BotaoTema.jsx'
import ControleTamanhoLetra from '../components/ControleTamanhoLetra.jsx'
import OpcaoReduzirAnimacoes from '../components/OpcaoReduzirAnimacoes.jsx'

// Página TEMPORÁRIA da etapa 1: mostra os tokens e as preferências de leitura.
// Será trocada pela página de Início de verdade na etapa 3.
const t = textos.previaEstilos

const AREAS = [
  { chave: 'saude', classes: 'bg-area-saude-fundo text-area-saude border-area-saude-borda' },
  { chave: 'educacao', classes: 'bg-area-educacao-fundo text-area-educacao border-area-educacao-borda' },
  { chave: 'seguranca', classes: 'bg-area-seguranca-fundo text-area-seguranca border-area-seguranca-borda' },
  { chave: 'cidade', classes: 'bg-area-cidade-fundo text-area-cidade border-area-cidade-borda' },
]

const FEEDBACK = [
  { chave: 'sucesso', Icone: CircleCheck, classes: 'bg-sucesso-fundo text-sucesso border-sucesso' },
  { chave: 'erro', Icone: CircleAlert, classes: 'bg-erro-fundo text-erro border-erro' },
  { chave: 'alerta', Icone: TriangleAlert, classes: 'bg-alerta-fundo text-alerta border-alerta' },
  { chave: 'info', Icone: Info, classes: 'bg-info-fundo text-info border-info' },
]

const CORES_MARCA = ['bg-lilas', 'bg-indigo', 'bg-azul-ceu', 'bg-lilas-claro', 'bg-fundo', 'bg-superficie']

export default function Inicio() {
  useTitulo(t.tituloPagina)

  return (
    <>
      <PularParaConteudo />
      <header className="border-b border-borda bg-superficie">
        <div className="mx-auto flex max-w-conteudo flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
          <p className="font-titulo text-h3 font-extrabold text-link">{textos.site.nome}</p>
          <BotaoTema />
        </div>
      </header>

      <main id="conteudo" className="mx-auto flex max-w-conteudo flex-col gap-8 px-4 py-8 md:px-6 lg:px-8">
        <section aria-labelledby="titulo-pagina" className="flex flex-col gap-4">
          <h1 id="titulo-pagina">{t.tituloPagina}</h1>
          <p className="marca-texto">
            <span>{t.marcaTexto[0]}</span>
            <br />
            <span>{t.marcaTexto[1]}</span>
          </p>
          <p className="text-texto-2">{textos.site.slogan}</p>
        </section>

        <section aria-labelledby="titulo-ajustes" className="flex flex-col gap-4 rounded-card border border-borda bg-superficie p-4 shadow-card md:p-6">
          <h2 id="titulo-ajustes">{textos.preferencias.titulo}</h2>
          <div>
            <BotaoTema />
          </div>
          <ControleTamanhoLetra />
          <OpcaoReduzirAnimacoes />
        </section>

        <section aria-labelledby="titulo-tipografia" className="flex max-w-leitura flex-col gap-3">
          <h2 id="titulo-tipografia">{t.tipografia.titulo}</h2>
          <h3>{t.tipografia.h3}</h3>
          <p>{t.tipografia.corpo}</p>
          <p className="text-legenda text-texto-2">{t.tipografia.legenda}</p>
          <p>
            <a href="#conteudo">{t.tipografia.link}</a>
          </p>
        </section>

        <section aria-labelledby="titulo-cores" className="flex flex-col gap-4">
          <h2 id="titulo-cores">{t.cores.titulo}</h2>

          <h3>{t.cores.marca}</h3>
          <ul className="flex flex-wrap gap-3">
            {CORES_MARCA.map((classe) => (
              <li key={classe} className={`size-14 rounded-card-pequeno border border-borda ${classe}`} aria-hidden="true" />
            ))}
          </ul>

          <h3>{t.cores.areas}</h3>
          <ul className="flex flex-wrap gap-2">
            {AREAS.map((area) => (
              <li key={area.chave} className={`rounded-full border px-3 py-1 text-tag font-bold ${area.classes}`}>
                {t.areas[area.chave]}
              </li>
            ))}
          </ul>

          <h3>{t.cores.feedback}</h3>
          <ul className="flex flex-col gap-2">
            {FEEDBACK.map(({ chave, Icone, classes }) => (
              <li key={chave} className={`flex items-center gap-2 rounded-card-pequeno border px-4 py-3 font-semibold ${classes}`}>
                <Icone size={20} strokeWidth={2} aria-hidden="true" />
                {t.feedback[chave]}
              </li>
            ))}
          </ul>

          <p className="flex max-w-leitura gap-3 rounded-card border-2 border-exemplo-borda bg-exemplo-fundo p-4 text-exemplo-texto">
            <Lightbulb size={24} strokeWidth={2} aria-hidden="true" className="shrink-0" />
            {t.exemplo}
          </p>
        </section>
      </main>
    </>
  )
}
