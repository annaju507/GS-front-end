import { Link, useLocation } from 'react-router'
import textos from '../../data/textos.json'
import { secaoDaRota } from '../../domain/navegacao.js'
import Logo from '../Logo.jsx'
import BotaoTema from '../BotaoTema.jsx'
import ControleTamanhoLetra from '../ControleTamanhoLetra.jsx'
import { GLOSSARIO, PERFIL, SECOES } from './itensMenu.js'

function ItemMenu({ item, ativa }) {
  const { chave, para, rotulo, Icone } = item
  const marcada = ativa === chave
  return (
    <li>
      <Link
        to={para}
        aria-current={marcada ? 'page' : undefined}
        className={`flex min-h-12 items-center gap-3 rounded-full px-4 no-underline transition-colors duration-150 ${
          marcada ? 'bg-lilas-claro font-titulo font-semibold text-link' : 'font-semibold text-texto hover:bg-lilas-claro'
        }`}
      >
        <Icone size={24} strokeWidth={2} aria-hidden="true" />
        {rotulo}
      </Link>
    </li>
  )
}

// Desktop: barra lateral fixa de 240px com logo, as 5 seções, Glossário e,
// embaixo, Perfil, tema e tamanho da letra.
export default function BarraLateral() {
  const ativa = secaoDaRota(useLocation().pathname)

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-barra-lateral flex-col gap-6 overflow-y-auto border-r border-borda bg-superficie p-4 lg:flex">
      <div className="px-2">
        <Logo para="/app" />
      </div>
      <nav aria-label={textos.app.nav.rotulo}>
        <ul className="flex flex-col gap-1">
          {SECOES.map((item) => (
            <ItemMenu key={item.chave} item={item} ativa={ativa} />
          ))}
          <ItemMenu item={GLOSSARIO} ativa={ativa} />
        </ul>
      </nav>
      <div className="mt-auto flex flex-col gap-3 border-t border-borda pt-4">
        <ul>
          <ItemMenu item={PERFIL} ativa={ativa} />
        </ul>
        <BotaoTema />
        <ControleTamanhoLetra />
      </div>
    </aside>
  )
}
