import { Outlet } from 'react-router'
import { useRolarAoTopo } from '../../hooks/useRolarAoTopo.js'
import PularParaConteudo from '../PularParaConteudo.jsx'
import Logo from '../Logo.jsx'
import BotaoTema from '../BotaoTema.jsx'
import OndasCalcadao from '../OndasCalcadao.jsx'

// Moldura da boas-vindas (primeira visita): só o logo e o tema, sem menu,
// para a pessoa focar nos três passos.
export default function LayoutBoasVindas() {
  useRolarAoTopo()

  return (
    <div className="flex min-h-screen flex-col bg-hero">
      <PularParaConteudo />
      <header className="mx-auto flex w-full max-w-conteudo items-center justify-between px-4 py-2 md:px-6 lg:px-8">
        <Logo para="/app" />
        <BotaoTema compacto />
      </header>
      <main id="conteudo" tabIndex={-1} className="mx-auto w-full max-w-leitura flex-1 px-4 pb-12 pt-4 focus:outline-none md:px-6">
        <Outlet />
      </main>
      <OndasCalcadao />
    </div>
  )
}
