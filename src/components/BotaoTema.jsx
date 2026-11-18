import { Moon, Sun } from 'lucide-react'
import textos from '../data/textos.json'
import { usePreferencias } from '../hooks/usePreferencias.js'

const t = textos.preferencias.tema

// Liga e desliga o modo escuro. Ao trocar, a cor nova se espalha a partir do
// botão e o ícone gira (ver useTheme e index.css).
// "compacto": só o ícone (sol/lua, ação universal), com aria-label e title;
// aria-pressed diz ao leitor de tela se o modo escuro está ligado.
// Completo: o nome mostra o modo atual ("Modo claro" ou "Modo escuro") e o
// leitor de tela ouve também o que o toque faz.
export default function BotaoTema({ compacto = false }) {
  const { tema } = usePreferencias()
  const Icone = tema.escuro ? Moon : Sun

  if (compacto) {
    return (
      <button
        type="button"
        onClick={tema.alternarTema}
        aria-pressed={tema.escuro}
        aria-label={t.rotulo}
        title={t.rotulo}
        className="inline-flex size-11 items-center justify-center rounded-full text-texto transition-colors duration-150 hover:bg-lilas-claro"
      >
        <Icone key={tema.escuro ? 'lua' : 'sol'} size={20} strokeWidth={2} aria-hidden="true" className="girar-icone" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={tema.alternarTema}
      className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-secundario-borda bg-secundario px-4 font-titulo text-rotulo font-semibold text-secundario-texto transition-colors duration-150 hover:bg-lilas-claro"
    >
      <Icone key={tema.escuro ? 'lua' : 'sol'} size={20} strokeWidth={2} aria-hidden="true" className="girar-icone" />
      <span key={tema.escuro ? 'escuro' : 'claro'} className="entrar-pagina">
        {tema.escuro ? t.escuro : t.claro}
      </span>
      <span className="sr-only">. {tema.escuro ? t.trocarParaClaro : t.trocarParaEscuro}</span>
    </button>
  )
}
