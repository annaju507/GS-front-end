import { Outlet } from 'react-router'
import { useRolarAoTopo } from '../../hooks/useRolarAoTopo.js'
import PularParaConteudo from '../PularParaConteudo.jsx'

// Moldura sem menu, para o quiz e a conquista: a pessoa foca na pergunta.
export default function LayoutFoco() {
  useRolarAoTopo()

  return (
    <div className="min-h-screen">
      <PularParaConteudo />
      <Outlet />
    </div>
  )
}
