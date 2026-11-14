import { useId, useState } from 'react'
import { NavLink } from 'react-router'
import { Menu, X } from 'lucide-react'
import textos from '../../data/textos.json'
import { useAuth } from '../../hooks/useAuth.js'
import Logo from '../Logo.jsx'
import Botao from '../Botao.jsx'
import BotaoTema from '../BotaoTema.jsx'
import ControleTamanhoLetra from '../ControleTamanhoLetra.jsx'

const t = textos.publico.nav

const LINKS = [
  { para: '/como-funciona', rotulo: t.comoFunciona },
  { para: '/sobre', rotulo: t.sobre },
  { para: '/previa/trilhas', rotulo: t.trilhas },
  { para: '/previa/agora', rotulo: t.agora },
  { para: '/previa/direitos', rotulo: t.direitos },
]

function estiloLink({ isActive }) {
  const base =
    'inline-flex min-h-11 items-center rounded-full px-3 font-titulo text-tag font-bold uppercase tracking-[0.05em] no-underline transition-colors duration-150 hover:bg-lilas-claro'
  return isActive ? `${base} bg-lilas-claro text-link` : `${base} text-texto`
}

// Barra superior pública: logo, links das páginas abertas e ENTRAR.
// No celular, os links ficam num menu que abre e fecha (aria-expanded).
export default function CabecalhoPublico() {
  const { usuario } = useAuth()
  const [menuAberto, setMenuAberto] = useState(false)
  const idMenu = useId()

  const acaoConta = usuario ? { para: '/app', rotulo: t.irParaPainel } : { para: '/entrar', rotulo: t.entrar }

  function fecharMenu() {
    setMenuAberto(false)
  }

  function fecharComEsc(evento) {
    if (evento.key === 'Escape' && menuAberto) {
      setMenuAberto(false)
    }
  }

  return (
    <header className="relative z-30 border-b border-borda bg-superficie" onKeyDown={fecharComEsc}>
      <div className="mx-auto flex max-w-conteudo items-center justify-between gap-3 px-4 py-2 md:px-6 lg:px-8">
        <Logo />

        <nav aria-label={t.rotulo} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {LINKS.map((link) => (
              <li key={link.para}>
                <NavLink to={link.para} className={estiloLink}>
                  {link.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="-mr-2 flex items-center gap-0 sm:mr-0 sm:gap-2">
          <BotaoTema compacto />
          <span className="hidden sm:block">
            <Botao variante="pilula" para={acaoConta.para}>
              {acaoConta.rotulo}
            </Botao>
          </span>
          <button
            type="button"
            onClick={() => setMenuAberto(!menuAberto)}
            aria-expanded={menuAberto}
            aria-controls={idMenu}
            className="inline-flex size-11 items-center justify-center rounded-full text-texto hover:bg-lilas-claro lg:hidden"
          >
            {menuAberto ? <X size={20} strokeWidth={2} aria-hidden="true" /> : <Menu size={20} strokeWidth={2} aria-hidden="true" />}
            <span className="sr-only">{menuAberto ? t.fecharMenu : t.abrirMenu}</span>
          </button>
        </div>
      </div>

      {menuAberto && (
        <div id={idMenu} className="border-t border-borda bg-superficie px-4 pb-6 pt-3 md:px-6 lg:hidden">
          <nav aria-label={t.rotulo}>
            <ul className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <li key={link.para}>
                  <NavLink to={link.para} className={estiloLink} onClick={fecharMenu}>
                    {link.rotulo}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 flex flex-col gap-4 border-t border-borda pt-4">
            <Botao variante="primario" para={acaoConta.para} onClick={fecharMenu} className="sm:hidden">
              {acaoConta.rotulo}
            </Botao>
            <ControleTamanhoLetra />
          </div>
        </div>
      )}
    </header>
  )
}
