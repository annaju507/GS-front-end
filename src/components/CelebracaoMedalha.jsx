import { useEffect, useId, useRef, useState } from 'react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import { usePreferencias } from '../hooks/usePreferencias.js'
import Botao from './Botao.jsx'
import Confete from './Confete.jsx'
import IconePremio from './IconePremio.jsx'

const t = textos.medalhas

// Comemoração de medalha nova na trilha: a janela abre por cima com o fundo
// embaçado, o prêmio entra girando e quicando, com raios de luz atrás e
// confete. Se forem várias, mostra uma de cada vez ("Ver a próxima").
// Usa o <dialog> nativo (foco preso dentro, Esc fecha). Com "reduzir
// animações", aparece parado.
export default function CelebracaoMedalha({ medalhas, onFechar }) {
  const dialogoRef = useRef(null)
  const idTitulo = useId()
  const [indice, setIndice] = useState(0)
  const medalha = medalhas[indice]
  const ultima = indice === medalhas.length - 1
  const { tocar } = usePreferencias().sons

  // Fanfarra a cada medalha mostrada.
  useEffect(() => {
    tocar('medalha')
  }, [indice, tocar])

  // Manipulação do DOM: abre o <dialog> ao montar.
  useEffect(() => {
    const dialogo = dialogoRef.current
    if (!dialogo.open) {
      dialogo.showModal()
    }
  }, [])

  function avancar() {
    if (ultima) {
      dialogoRef.current.close()
      onFechar()
    } else {
      setIndice(indice + 1)
    }
  }

  return (
    <dialog
      ref={dialogoRef}
      aria-labelledby={idTitulo}
      onCancel={(evento) => {
        evento.preventDefault()
        dialogoRef.current.close()
        onFechar()
      }}
      className="janela-conta m-auto w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-modal border border-borda bg-superficie p-0 text-center text-texto shadow-modal"
    >
      <div className="relative flex flex-col items-center gap-3 px-6 pb-6 pt-8">
        <Confete />
        {/* key: a animação roda de novo a cada medalha */}
        <div key={medalha.id} className="relative grid size-44 place-items-center">
          <span aria-hidden="true" className="premio-raios absolute inset-0 rounded-full" />
          <span aria-hidden="true" className="premio-brilho absolute inset-6 rounded-full bg-lilas-claro" />
          <IconePremio medalha={medalha.id} tamanho={128} className="premio-entra relative" />
        </div>
        <p className="font-titulo text-tag font-bold uppercase tracking-[0.08em] text-link">{t.celebracao.titulo}</p>
        <h2 id={idTitulo} className="text-h2">{t.nomes[medalha.id]}</h2>
        <p className="text-texto-2">{preencher(t.entreguePor, { mascote: textos.mascotes[medalha.mascote] })}</p>
        {medalhas.length > 1 && (
          <p className="text-legenda text-texto-2">{preencher(t.celebracao.deQuantas, { n: indice + 1, total: medalhas.length })}</p>
        )}
        <Botao variante="primario" onClick={avancar} autoFocus className="mt-2 w-full">
          {ultima ? t.celebracao.continuar : t.celebracao.proxima}
        </Botao>
      </div>
    </dialog>
  )
}
