import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router'
import textos from '../data/textos.json'
import { separarTermos } from '../domain/glossario.js'
import { preencher } from '../domain/texto.js'
import { buscarTermo } from '../services/conteudoLocal.js'
import { usePreferencias } from '../hooks/usePreferencias.js'
import BalaoMascote from './BalaoMascote.jsx'

const t = textos.glossario.naLicao

// Parágrafo de lição com termos do glossário ([[id|rótulo]]). Clicar no termo
// abre a explicação logo abaixo, com a capivara, e a página rola até ela
// (manipulação do DOM: scrollIntoView + focus). Fechar devolve o foco ao termo.
export default function TextoComTermos({ texto }) {
  const [aberto, setAberto] = useState(null)
  const painelRef = useRef(null)
  const botoesRef = useRef({})
  const idPainel = useId()
  const { animacoes } = usePreferencias()

  useEffect(() => {
    if (aberto && painelRef.current) {
      painelRef.current.scrollIntoView({ behavior: animacoes.reduzir ? 'auto' : 'smooth', block: 'nearest' })
      painelRef.current.focus({ preventScroll: true })
    }
  }, [aberto, animacoes.reduzir])

  function alternar(id) {
    if (aberto === id) {
      setAberto(null)
    } else {
      setAberto(id)
    }
  }

  function fechar() {
    const id = aberto
    setAberto(null)
    botoesRef.current[id]?.focus()
  }

  const termoAberto = aberto ? buscarTermo(aberto) : null

  return (
    <div className="flex flex-col gap-3">
      <p>
        {separarTermos(texto).map((pedaco, indice) => {
          if (pedaco.tipo === 'texto') {
            return <span key={indice}>{pedaco.texto}</span>
          }
          const termo = buscarTermo(pedaco.id)
          if (!termo) {
            return <span key={indice}>{pedaco.rotulo}</span>
          }
          return (
            <button
              key={indice}
              type="button"
              ref={(elemento) => {
                botoesRef.current[pedaco.id] = elemento
              }}
              onClick={() => alternar(pedaco.id)}
              aria-expanded={aberto === pedaco.id}
              aria-controls={idPainel}
              title={preencher(t.abrir, { termo: termo.termo })}
              className="inline cursor-help rounded-sm font-semibold text-glossario underline decoration-dotted decoration-2 underline-offset-4"
            >
              {pedaco.rotulo}
            </button>
          )
        })}
      </p>

      {termoAberto && (
        <div id={idPainel} ref={painelRef} tabIndex={-1} className="rounded-card focus:outline-none">
          <BalaoMascote mascote="capivara" expressao="explicando" onFechar={fechar}>
            <p className="font-titulo font-bold">
              {termoAberto.termo}
              {termoAberto.sigla && ` (${termoAberto.sigla})`}
            </p>
            <p>{termoAberto.definicao}</p>
            <Link to={`/app/glossario/${termoAberto.id}`} className="mt-1 inline-flex min-h-11 items-center font-semibold">
              {t.verNoGlossario}
            </Link>
          </BalaoMascote>
        </div>
      )}
    </div>
  )
}
