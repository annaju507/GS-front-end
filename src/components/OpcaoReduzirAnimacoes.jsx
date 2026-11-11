import { Pause } from 'lucide-react'
import textos from '../data/textos.json'
import { usePreferencias } from '../hooks/usePreferencias.js'

const t = textos.preferencias.animacoes

// Interruptor (role="switch") para desligar as animações do site.
export default function OpcaoReduzirAnimacoes() {
  const { animacoes } = usePreferencias()

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        role="switch"
        aria-checked={animacoes.opcaoDoSite}
        onClick={animacoes.alternarReduzirAnimacoes}
        className="inline-flex min-h-12 items-center gap-3 self-start rounded-full px-2 font-titulo text-rotulo font-semibold text-texto"
      >
        <Pause size={20} strokeWidth={2} aria-hidden="true" />
        {t.rotulo}
        <span
          aria-hidden="true"
          className={`relative h-7 w-12 rounded-full border-2 transition-colors duration-150 ${
            animacoes.opcaoDoSite ? 'border-botao bg-botao' : 'border-borda-campo bg-superficie'
          }`}
        >
          <span
            className={`absolute top-0.5 size-5 rounded-full transition-transform duration-150 ${
              animacoes.opcaoDoSite ? 'translate-x-5 bg-botao-texto' : 'translate-x-0.5 bg-borda-campo'
            }`}
          />
        </span>
      </button>
      {animacoes.sistemaPedeMenos && <p className="text-legenda text-texto-2">{t.sistemaPede}</p>}
    </div>
  )
}
