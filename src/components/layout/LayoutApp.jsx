import { Outlet } from 'react-router'
import { useRolarAoTopo } from '../../hooks/useRolarAoTopo.js'
import PularParaConteudo from '../PularParaConteudo.jsx'
import BarraLateral from './BarraLateral.jsx'
import BarraInferior from './BarraInferior.jsx'
import TopoApp from './TopoApp.jsx'

// Moldura da área interna (com login): barra lateral no desktop,
// topo e barra inferior no celular.
export default function LayoutApp() {
  useRolarAoTopo()

  return (
    <div className="min-h-screen">
      <PularParaConteudo />
      <BarraLateral />
      <div className="lg:pl-barra-lateral">
        <TopoApp />
        <main id="conteudo" tabIndex={-1} className="mx-auto max-w-conteudo px-4 pb-28 pt-6 focus:outline-none md:px-6 lg:px-8 lg:pb-12 lg:pt-10">
          <Outlet />
        </main>
      </div>
      <BarraInferior />
    </div>
  )
}
