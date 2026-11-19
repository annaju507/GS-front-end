import { Volume2 } from 'lucide-react'
import textos from '../data/textos.json'
import { usePreferencias } from '../hooks/usePreferencias.js'

const t = textos.preferencias.sons

// Interruptor (role="switch") para ligar e desligar os sons da trilha
// (acerto, erro, comemoração e a "fala" dos mascotes). Começa ligado.
export default function OpcaoSons() {
  const { sons } = usePreferencias()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={sons.ligado}
      onClick={sons.alternarSons}
      className="inline-flex min-h-12 items-center gap-3 self-start rounded-full px-2 font-titulo text-rotulo font-semibold text-texto"
    >
      <Volume2 size={20} strokeWidth={2} aria-hidden="true" />
      {t.rotulo}
      <span
        aria-hidden="true"
        className={`relative h-7 w-12 rounded-full border-2 transition-colors duration-150 ${
          sons.ligado ? 'border-botao bg-botao' : 'border-borda-campo bg-superficie'
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 size-5 rounded-full transition-[translate] duration-150 ${
            sons.ligado ? 'translate-x-5 bg-botao-texto' : 'translate-x-0 bg-borda-campo'
          }`}
        />
      </span>
    </button>
  )
}
