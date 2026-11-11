import { Moon, Sun } from 'lucide-react'
import textos from '../data/textos.json'
import { usePreferencias } from '../hooks/usePreferencias.js'

// Liga e desliga o modo escuro. aria-pressed diz ao leitor de tela se está ligado.
export default function BotaoTema() {
  const { tema } = usePreferencias()
  const Icone = tema.escuro ? Moon : Sun

  return (
    <button
      type="button"
      onClick={tema.alternarTema}
      aria-pressed={tema.escuro}
      className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-secundario-borda bg-secundario px-4 font-titulo text-rotulo font-semibold text-secundario-texto transition-colors duration-150 hover:bg-lilas-claro"
    >
      <Icone size={20} strokeWidth={2} aria-hidden="true" />
      {textos.preferencias.tema.rotulo}
    </button>
  )
}
