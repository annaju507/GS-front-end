import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import { usePreferencias } from '../hooks/usePreferencias.js'

const t = textos.previa.vitrine
const PRINTS = import.meta.glob('../assets/prints/*.webp', { eager: true, import: 'default' })
const TEMPO_POR_TELA = 4000

// "Veja por dentro": prints de verdade do app num quadro de navegador. Troca
// sozinha a cada 4s (com botão de pausa) ou ao escolher um passo. Para de
// trocar sozinha com "reduzir animações" ou quando a pessoa escolhe um passo.
export default function VitrineApp() {
  const { animacoes } = usePreferencias()
  const [atual, setAtual] = useState(0)
  const [pausado, setPausado] = useState(false)
  const refBarra = useRef(null)
  const trocaAutomatica = !pausado && !animacoes.reduzir

  // Manipulação do DOM: a barrinha de tempo cresce a cada quadro e, ao
  // completar, passa para a próxima tela.
  useEffect(() => {
    if (!trocaAutomatica) {
      return undefined
    }
    let quadro
    const inicio = performance.now()
    function passo(agora) {
      const progresso = Math.min(1, (agora - inicio) / TEMPO_POR_TELA)
      if (refBarra.current) {
        refBarra.current.style.width = `${progresso * 100}%`
      }
      if (progresso >= 1) {
        setAtual((anterior) => (anterior + 1) % t.telas.length)
      } else {
        quadro = requestAnimationFrame(passo)
      }
    }
    quadro = requestAnimationFrame(passo)
    return () => cancelAnimationFrame(quadro)
  }, [atual, trocaAutomatica])

  function escolher(indice) {
    setAtual(indice)
    setPausado(true)
  }

  return (
    <div className="grid items-center gap-6 lg:grid-cols-[17rem_1fr] lg:gap-8">
      <div role="group" aria-label={t.rotulo} className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {t.telas.map((tela, indice) => (
          <button
            key={tela.chave}
            type="button"
            onClick={() => escolher(indice)}
            aria-pressed={atual === indice}
            className={`flex min-h-12 shrink-0 items-center gap-3 rounded-card border-2 px-3 py-2 text-left transition-colors duration-200 ${
              atual === indice ? 'border-lilas bg-superficie' : 'border-transparent hover:bg-superficie/60'
            }`}
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lilas font-titulo text-legenda font-extrabold text-marca-botao-texto">
              {indice + 1}
            </span>
            <span className="flex flex-col">
              <span className="font-titulo font-semibold">{tela.nome}</span>
              <span className="hidden text-legenda leading-snug text-texto-2 lg:block">{tela.texto}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="overflow-hidden rounded-card border border-borda bg-superficie shadow-modal">
          <div className="flex items-center gap-1.5 border-b border-borda px-3 py-2" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-borda" />
            <span className="size-2.5 rounded-full bg-borda" />
            <span className="size-2.5 rounded-full bg-borda" />
            <span className="ml-3 flex-1 rounded-full bg-lilas-claro px-3 text-tag text-texto-2">
              {preencher(t.endereco, { tela: t.telas[atual].nome.toLowerCase() })}
            </span>
          </div>
          <div className="relative aspect-[960/535]">
            {t.telas.map((tela, indice) => (
              <img
                key={tela.chave}
                src={PRINTS[`../assets/prints/${tela.chave}.webp`]}
                alt={atual === indice ? tela.alt : ''}
                aria-hidden={atual === indice ? undefined : 'true'}
                width={960}
                height={535}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-500 ${
                  atual === indice ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-lilas-claro" aria-hidden="true">
            <span ref={refBarra} className="block h-full rounded-full bg-lilas" style={{ width: trocaAutomatica ? '0%' : '100%' }} />
          </div>
          {!animacoes.reduzir && (
            <button
              type="button"
              onClick={() => setPausado(!pausado)}
              aria-label={pausado ? t.continuar : t.pausar}
              title={pausado ? t.continuar : t.pausar}
              className="inline-flex size-11 items-center justify-center rounded-full border-2 border-borda bg-superficie text-texto hover:bg-lilas-claro"
            >
              {pausado ? <Play size={18} strokeWidth={2} aria-hidden="true" /> : <Pause size={18} strokeWidth={2} aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
