import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { useRolarAoTopo } from '../../hooks/useRolarAoTopo.js'
import PularParaConteudo from '../PularParaConteudo.jsx'
import CarregandoPagina from '../CarregandoPagina.jsx'
import CabecalhoPublico from './CabecalhoPublico.jsx'
import Rodape from './Rodape.jsx'
import TransicaoPagina from '../TransicaoPagina.jsx'

// Moldura das páginas abertas (sem login): cabeçalho, conteúdo e rodapé.
// Entrar e Criar conta não são páginas: abrem numa janela por cima (ModalConta).
export default function LayoutPublico() {
  useRolarAoTopo()

  return (
    <div className="flex min-h-screen flex-col">
      <PularParaConteudo />
      <CabecalhoPublico />
      <main id="conteudo" tabIndex={-1} className="flex-1 focus:outline-none">
        <Suspense fallback={<CarregandoPagina />}>
          <TransicaoPagina>
            <Outlet />
          </TransicaoPagina>
        </Suspense>
      </main>
      <Rodape />
    </div>
  )
}
