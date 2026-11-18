import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X } from 'lucide-react'
import textos from '../../data/textos.json'
import { secaoDaRota } from '../../domain/navegacao.js'
import Logo from '../Logo.jsx'
import BotaoSair from '../BotaoSair.jsx'
import BotaoTema from '../BotaoTema.jsx'
import { GLOSSARIO, PERFIL } from './itensMenu.js'

const t = textos.app.nav

// Celular: topo com o logo e, à direita, o botão de menu (três barrinhas).
// O menu abre por cima da tela, vindo da direita, com Perfil e Glossário e,
// embaixo, o modo claro/escuro e "Sair da conta".
// Usa <dialog>: a tecla Esc fecha, o foco fica preso dentro do menu e o fundo
// escurece. Clicar fora (no fundo) também fecha.
export default function TopoApp() {
  const { pathname } = useLocation()
  const ativa = secaoDaRota(pathname)
  const [aberto, setAberto] = useState(false)
  const refMenu = useRef(null)

  // Manipulação do DOM: abre e fecha o <dialog> e trava a rolagem da página
  // enquanto o menu está aberto.
  useEffect(() => {
    const menu = refMenu.current
    if (!menu) {
      return undefined
    }
    if (aberto && !menu.open) {
      menu.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!aberto && menu.open) {
      menu.close()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [aberto])

  function fechar() {
    setAberto(false)
  }

  // Clique no fundo escuro: o alvo é o próprio <dialog>, não o painel.
  function aoClicarNoMenu(evento) {
    if (evento.target === refMenu.current) {
      fechar()
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-borda bg-superficie lg:hidden">
      <div className="flex items-center justify-between gap-2 px-4 py-1">
        <Logo para="/app" />
        <button
          type="button"
          onClick={() => setAberto(true)}
          aria-label={t.abrirMenu}
          aria-haspopup="dialog"
          aria-expanded={aberto}
          className="inline-flex size-12 items-center justify-center rounded-full text-texto transition-colors duration-150 hover:bg-lilas-claro"
        >
          <Menu size={26} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      <dialog
        ref={refMenu}
        aria-label={t.menu}
        onClose={fechar}
        onClick={aoClicarNoMenu}
        className="menu-celular m-0 ml-auto h-dvh max-h-none w-[min(20rem,85vw)] max-w-none bg-superficie p-0 text-texto backdrop:bg-black/40"
      >
        <div className="flex h-full flex-col gap-6 p-4">
          <div className="flex items-center justify-between">
            <p className="px-2 font-titulo text-h3 font-bold">{t.menu}</p>
            <button
              type="button"
              onClick={fechar}
              aria-label={t.fecharMenu}
              className="inline-flex size-12 items-center justify-center rounded-full text-texto hover:bg-lilas-claro"
            >
              <X size={24} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label={t.menu}>
            <ul className="flex flex-col gap-1">
              {[PERFIL, GLOSSARIO].map(({ chave, para, rotulo, Icone }) => (
                <li key={chave}>
                  <Link
                    to={para}
                    onClick={fechar}
                    aria-current={ativa === chave ? 'page' : undefined}
                    className={`flex min-h-12 items-center gap-2.5 rounded-full px-3 font-semibold no-underline transition-colors duration-150 ${
                      ativa === chave ? 'bg-lilas-claro font-titulo text-link' : 'text-texto hover:bg-lilas-claro'
                    }`}
                  >
                    <Icone size={24} strokeWidth={2} aria-hidden="true" />
                    {rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-3 border-t border-borda pt-4">
            <BotaoTema />
            <BotaoSair aoSair={fechar} />
          </div>
        </div>
      </dialog>
    </header>
  )
}
