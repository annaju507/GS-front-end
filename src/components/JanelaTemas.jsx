import { useEffect, useId, useRef } from 'react'
import { Link } from 'react-router'
import { ChevronRight, X } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import { coresDaArea } from './coresArea.js'

const t = textos.direitos

// Janela com todos os temas de uma área de Direitos: abre por cima, com o
// fundo escurecido e embaçado, e cada tema leva ao seu passo a passo. Usa o
// <dialog> nativo (foco preso dentro, Esc fecha); clicar fora também fecha.
// Ao fechar, o foco volta para o quadrado que abriu (o navegador cuida disso).
export default function JanelaTemas({ area, nome, Icone, temas, onFechar }) {
  const dialogoRef = useRef(null)
  const idTitulo = useId()
  const cores = coresDaArea(area === 'transversal' ? 'neutra' : area)

  // Manipulação do DOM: abre o <dialog> ao montar.
  useEffect(() => {
    const dialogo = dialogoRef.current
    if (!dialogo.open) {
      dialogo.showModal()
    }
  }, [])

  function clicarFora(evento) {
    if (evento.target === dialogoRef.current) {
      onFechar()
    }
  }

  return (
    <dialog
      ref={dialogoRef}
      aria-labelledby={idTitulo}
      onCancel={(evento) => {
        evento.preventDefault()
        onFechar()
      }}
      onClick={clicarFora}
      className="janela-conta m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-modal border border-borda bg-superficie p-0 text-texto shadow-modal"
    >
      <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
        <div className={`flex items-center gap-3 border-b-2 px-4 py-3 md:px-5 ${cores.bloco}`}>
          <span className="grid size-12 shrink-0 place-items-center rounded-card bg-superficie">
            <Icone size={26} strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id={idTitulo} className="text-h3 text-current">{nome}</h2>
            <p className="text-legenda font-bold">{preencher(t.janela.qtd, { n: temas.length })}</p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="grid size-11 shrink-0 place-items-center rounded-full bg-superficie text-texto hover:bg-lilas-claro"
          >
            <X size={22} strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">{t.janela.fechar}</span>
          </button>
        </div>
        <ul className="flex flex-col gap-2.5 overflow-y-auto p-4 md:p-5">
          {temas.map((tema, indice) => (
            <li key={tema.id} className="cartao-entra" style={{ animationDelay: `${indice * 60 + 100}ms` }}>
              <Link
                to={`/app/direitos/${tema.id}`}
                className="flex items-center gap-3 rounded-card border-2 border-borda bg-superficie p-3.5 text-texto no-underline transition-[border-color,transform] duration-150 hover:translate-x-1 hover:border-lilas motion-reduce:transition-none"
              >
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="font-titulo font-bold">{tema.titulo}</span>
                  <span className="text-legenda text-texto-2">{tema.resumo}</span>
                </span>
                <ChevronRight size={22} strokeWidth={2} aria-hidden="true" className="shrink-0 text-link" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  )
}
