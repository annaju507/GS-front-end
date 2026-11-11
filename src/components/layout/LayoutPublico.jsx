import { Outlet } from 'react-router'
import { useRolarAoTopo } from '../../hooks/useRolarAoTopo.js'
import PularParaConteudo from '../PularParaConteudo.jsx'
import CabecalhoPublico from './CabecalhoPublico.jsx'
import Rodape from './Rodape.jsx'

// Moldura das páginas abertas (sem login): cabeçalho, conteúdo e rodapé.
export default function LayoutPublico() {
  useRolarAoTopo()

  return (
    <div className="flex min-h-screen flex-col">
      <PularParaConteudo />
      <CabecalhoPublico />
      <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Rodape />
    </div>
  )
}
