import { useEffect, useId, useRef } from 'react'
import { Check, ImageUp, X } from 'lucide-react'
import textos from '../data/textos.json'
import { AVATARES } from '../domain/avatares.js'
import Botao from './Botao.jsx'
import ImagemAvatar from './ImagemAvatar.jsx'

const t = textos.perfil.avatar

// Janela para escolher o avatar: a grade de rostos, "Enviar uma foto" e
// "Usar a inicial do apelido". Usa o <dialog> nativo (foco preso dentro,
// Esc fecha, fundo embaçado). O rosto atual fica marcado (aria-pressed).
export default function ModalAvatar({ atual, onEscolher, onEnviarFoto, onUsarInicial, onFechar }) {
  const dialogoRef = useRef(null)
  const idTitulo = useId()
  const idIntro = useId()

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
      aria-describedby={idIntro}
      onCancel={(evento) => {
        evento.preventDefault()
        onFechar()
      }}
      onClick={clicarFora}
      className="janela-conta m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-modal border border-borda bg-superficie p-0 text-texto shadow-modal"
    >
      <div className="flex flex-col gap-4 p-5 md:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h2 id={idTitulo} className="text-h3">{t.titulo}</h2>
            <p id={idIntro} className="text-legenda text-texto-2">{t.intro}</p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-lilas-claro"
          >
            <X size={22} strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">{t.fechar}</span>
          </button>
        </div>

        <ul aria-label={t.rotuloGrade} className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {AVATARES.map((id) => {
            const escolhido = id === atual
            let borda = 'border-transparent hover:border-lilas'
            if (escolhido) {
              borda = 'border-indigo bg-lilas-claro'
            }
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onEscolher(id)}
                  aria-pressed={escolhido}
                  aria-label={t.nomes[id]}
                  className={`relative grid aspect-square w-full place-items-center rounded-card border-[3px] p-1 transition-transform duration-150 hover:scale-105 motion-reduce:transition-none ${borda}`}
                >
                  <ImagemAvatar id={id} tamanho={72} className="size-full" />
                  {escolhido && (
                    <span aria-hidden="true" className="absolute right-0.5 top-0.5 grid size-6 place-items-center rounded-full bg-indigo text-white">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        <div className="flex flex-col gap-3 border-t border-borda pt-4 sm:flex-row sm:justify-between">
          <Botao variante="secundario" icone={ImageUp} onClick={onEnviarFoto}>
            {t.enviarFoto}
          </Botao>
          <Botao variante="primario" onClick={onUsarInicial}>
            {t.usarInicial}
          </Botao>
        </div>
      </div>
    </dialog>
  )
}
