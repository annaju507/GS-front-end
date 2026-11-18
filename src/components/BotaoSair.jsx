import { useNavigate } from 'react-router'
import { LogOut } from 'lucide-react'
import textos from '../data/textos.json'
import { useAuth } from '../hooks/useAuth.js'

// "Sair da conta": botão preto com letra branca (no escuro, com borda branca
// para não sumir no fundo). Sai e volta para a página inicial do site.
export default function BotaoSair({ aoSair }) {
  const { sair } = useAuth()
  const navegar = useNavigate()

  function sairDaConta() {
    if (aoSair) {
      aoSair()
    }
    sair()
    navegar('/', { replace: true })
  }

  return (
    <button
      type="button"
      onClick={sairDaConta}
      className="degrau inline-flex min-h-12 items-center gap-2 rounded-full bg-[#1A1A1A] px-4 font-titulo text-rotulo font-semibold text-white shadow-[0_0.25rem_0_#000] dark:border-2 dark:border-white"
    >
      <LogOut size={20} strokeWidth={2} aria-hidden="true" />
      {textos.perfil.sair}
    </button>
  )
}
