import { Link, useLocation } from 'react-router'
import textos from '../../data/textos.json'
import { secaoDaRota } from '../../domain/navegacao.js'
import { SECOES } from './itensMenu.js'

// Celular: barra fixa embaixo com as 5 abas, só com os ícones. O nome de cada
// aba fica no aria-label (leitor de tela) e no title (ao segurar ou passar o
// mouse). Aba ativa: pílula lilás-clara atrás do ícone, em índigo.
// O rótulo de Representantes tem um hífen opcional invisível: sai do nome.
export default function BarraInferior() {
  const { pathname } = useLocation()
  const ativa = secaoDaRota(pathname)

  return (
    <nav aria-label={textos.app.nav.rotulo} className="fixed inset-x-0 bottom-0 z-30 border-t border-borda bg-superficie lg:hidden">
      <ul className="grid grid-cols-5">
        {SECOES.map(({ chave, para, rotulo, Icone }) => {
          const marcada = ativa === chave
          const nome = rotulo.replace('\u00AD', '')
          return (
            <li key={chave}>
              <Link
                to={para}
                aria-current={marcada ? 'page' : undefined}
                aria-label={nome}
                title={nome}
                className={`flex min-h-14 items-center justify-center no-underline ${marcada ? 'text-link' : 'text-texto-2'}`}
              >
                <span
                  className={`flex h-10 w-14 items-center justify-center rounded-full transition-colors duration-150 ${marcada ? 'bg-lilas-claro' : ''}`}
                >
                  <Icone size={26} strokeWidth={2} aria-hidden="true" />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
