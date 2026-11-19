import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import textos from '../data/textos.json'
import { proximaMetaSequencia } from '../domain/painel.js'
import { preencher } from '../domain/texto.js'
import IconePremio from './IconePremio.jsx'
import Mascote from './Mascote.jsx'

const t = textos.painel.conquistas

// "Suas conquistas" no Início: o mico (conquistas) comemorando e uma
// prateleira com os prêmios. As ganhas ficam douradas; as que faltam,
// apagadas. Sem barra de rolagem: duas setinhas passam a prateleira (pelo
// DOM, com scrollBy) e ficam desativadas nas pontas.
export default function PrateleiraConquistas({ medalhas, sequencia, className = '' }) {
  const prateleiraRef = useRef(null)
  const [noInicio, setNoInicio] = useState(true)
  const [noFim, setNoFim] = useState(false)
  const ganhas = medalhas.filter((medalha) => medalha.ganha).length
  const meta = proximaMetaSequencia(sequencia)

  // Confere se dá para ir para algum lado (nas pontas, a seta desativa).
  function conferirPontas() {
    const prateleira = prateleiraRef.current
    setNoInicio(prateleira.scrollLeft <= 4)
    setNoFim(prateleira.scrollLeft + prateleira.clientWidth >= prateleira.scrollWidth - 4)
  }

  useEffect(() => {
    conferirPontas()
    window.addEventListener('resize', conferirPontas)
    return () => window.removeEventListener('resize', conferirPontas)
  }, [])

  function passar(direcao) {
    const prateleira = prateleiraRef.current
    const reduzir = document.documentElement.classList.contains('reduzir-animacoes') || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    prateleira.scrollBy({ left: direcao * prateleira.clientWidth * 0.8, behavior: reduzir ? 'auto' : 'smooth' })
  }

  const seta =
    'grid size-11 shrink-0 place-items-center rounded-full border-2 border-secundario-borda bg-superficie text-secundario-texto transition-colors duration-150 hover:bg-lilas-claro disabled:border-borda disabled:text-texto-desativado disabled:hover:bg-superficie'

  return (
    <section
      aria-labelledby="painel-conquistas"
      className={`grid grid-cols-1 items-center gap-4 rounded-card border border-borda bg-superficie p-4 shadow-card dark:shadow-none sm:grid-cols-[auto_minmax(0,1fr)] md:p-5 ${className}`}
    >
      <span className="mico-pula hidden sm:block">
        <Mascote nome="mico" expressao="comemorando" tamanho="corpo" largura={140} />
      </span>
      <div className="flex min-w-0 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="painel-conquistas" className="flex items-center gap-2 text-h3">
            <IconePremio nome="roseta" tamanho={30} />
            {t.titulo}
          </h2>
          <p className="font-titulo text-h2 font-extrabold leading-none text-link">
            {ganhas} <span className="text-legenda font-bold text-texto-2">{preencher(t.deTotal, { total: medalhas.length })}</span>
          </p>
          <div className="ml-auto flex gap-2">
            <button type="button" onClick={() => passar(-1)} disabled={noInicio} className={seta}>
              <ChevronLeft size={22} strokeWidth={2.5} aria-hidden="true" />
              <span className="sr-only">{t.anterior}</span>
            </button>
            <button type="button" onClick={() => passar(1)} disabled={noFim} className={seta}>
              <ChevronRight size={22} strokeWidth={2.5} aria-hidden="true" />
              <span className="sr-only">{t.proxima}</span>
            </button>
          </div>
        </div>

        <ul ref={prateleiraRef} onScroll={conferirPontas} className="prateleira-sem-barra flex gap-4 overflow-x-auto border-b-8 border-[#7A4A2A] px-1 pb-3 pt-2">
          {medalhas.map((medalha, indice) => {
            let selo = 'bg-lilas-claro'
            let premio = 'opacity-35 grayscale'
            let nome = 'font-semibold text-texto-2'
            if (medalha.ganha) {
              selo = 'bg-[#FFF6D6] shadow-[inset_0_0_0_0.1875rem_#FFDC56] dark:bg-[#3A3320]'
              premio = ''
              nome = 'font-bold'
            }
            return (
              <li
                key={medalha.id}
                className="medalha-cai flex w-24 shrink-0 flex-col items-center gap-1.5 text-center"
                style={{ animationDelay: `${indice * 90 + 400}ms` }}
              >
                <span className={`selo-prateleira grid size-20 place-items-center rounded-[1.1rem] ${selo}`}>
                  <IconePremio medalha={medalha.id} tamanho={56} className={premio} />
                </span>
                <span className={`text-tag leading-tight ${nome}`}>
                  {textos.medalhas.nomes[medalha.id]}
                  {!medalha.ganha && <span className="sr-only">, {t.bloqueada}</span>}
                </span>
              </li>
            )
          })}
        </ul>

        {meta && (
          <div className="flex items-center gap-3 text-legenda font-bold">
            <span>{preencher(t.proximaMeta, { nome: textos.medalhas.nomes[meta.medalha] })}</span>
            <span aria-hidden="true" className="h-2.5 flex-1 overflow-hidden rounded-full bg-lilas-claro">
              <span className="barra-meta block h-full rounded-full bg-mico" style={{ width: `${(meta.atual / meta.meta) * 100}%` }} />
            </span>
            <span>{preencher(t.metaValor, { atual: meta.atual, meta: meta.meta })}</span>
          </div>
        )}
      </div>
    </section>
  )
}
