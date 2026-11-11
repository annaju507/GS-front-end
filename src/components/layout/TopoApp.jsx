import { Link, useLocation } from 'react-router'
import { secaoDaRota } from '../../domain/navegacao.js'
import Logo from '../Logo.jsx'
import BotaoTema from '../BotaoTema.jsx'
import { GLOSSARIO, PERFIL } from './itensMenu.js'

// Celular: topo com o logo e, à direita, tema, Glossário e Perfil.
// Em telas muito estreitas (menos de 360px) o rótulo fica só para o leitor de tela.
export default function TopoApp() {
  const ativa = secaoDaRota(useLocation().pathname)

  return (
    <header className="sticky top-0 z-20 border-b border-borda bg-superficie lg:hidden">
      <div className="flex items-center justify-between gap-2 px-4 py-1">
        <Logo para="/app" />
        <div className="flex items-center gap-1">
          <BotaoTema compacto />
          {[GLOSSARIO, PERFIL].map(({ chave, para, rotulo, Icone }) => (
            <Link
              key={chave}
              to={para}
              aria-current={ativa === chave ? 'page' : undefined}
              className={`flex min-h-12 min-w-12 flex-col items-center justify-center rounded-card-pequeno px-1 text-tag font-semibold leading-tight no-underline hover:bg-lilas-claro ${
                ativa === chave ? 'bg-lilas-claro text-link' : 'text-texto'
              }`}
            >
              <Icone size={22} strokeWidth={2} aria-hidden="true" />
              <span className="max-[359px]:sr-only">{rotulo}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
