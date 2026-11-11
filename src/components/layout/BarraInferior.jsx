import { Link, useLocation } from 'react-router'
import textos from '../../data/textos.json'
import { secaoDaRota } from '../../domain/navegacao.js'
import { SECOES } from './itensMenu.js'

// Celular: barra fixa embaixo com as 5 abas, sempre com rótulo.
// Aba ativa: pílula lilás-clara atrás do ícone, ícone e rótulo em índigo.
export default function BarraInferior() {
  const { pathname } = useLocation()
  const ativa = secaoDaRota(pathname)

  return (
    <nav aria-label={textos.app.nav.rotulo} className="fixed inset-x-0 bottom-0 z-30 border-t border-borda bg-superficie lg:hidden">
      <ul className="grid grid-cols-5">
        {SECOES.map(({ chave, para, rotulo, Icone }) => {
          const marcada = ativa === chave
          return (
            <li key={chave}>
              <Link
                to={para}
                aria-current={marcada ? 'page' : undefined}
                className={`flex min-h-16 flex-col items-center justify-center gap-0.5 px-0.5 py-1.5 no-underline ${
                  marcada ? 'text-link' : 'text-texto-2'
                }`}
              >
                <span className={`flex h-8 w-12 items-center justify-center rounded-full ${marcada ? 'bg-lilas-claro' : ''}`}>
                  <Icone size={24} strokeWidth={2} aria-hidden="true" />
                </span>
                <span
                  lang="pt-BR"
                  className={`w-full text-center text-tag leading-tight hyphens-auto break-words ${marcada ? 'font-extrabold' : 'font-semibold'}`}
                >
                  {rotulo}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
