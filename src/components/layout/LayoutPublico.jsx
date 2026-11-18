import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router'
import { ehTelaDeEntrada } from '../../domain/navegacao.js'
import { useRolarAoTopo } from '../../hooks/useRolarAoTopo.js'
import PularParaConteudo from '../PularParaConteudo.jsx'
import CarregandoPagina from '../CarregandoPagina.jsx'
import CabecalhoPublico from './CabecalhoPublico.jsx'
import Rodape from './Rodape.jsx'
import TransicaoPagina from '../TransicaoPagina.jsx'

// Moldura das páginas abertas (sem login): cabeçalho, conteúdo e rodapé.
// Nas telas de entrada (Entrar e Criar conta), a página tem a altura exata da
// janela, sem rodapé; se a tela for baixa demais, só o conteúdo rola.
export default function LayoutPublico() {
  useRolarAoTopo()
  const entrada = ehTelaDeEntrada(useLocation().pathname)

  return (
    <div className={entrada ? 'flex h-dvh flex-col overflow-hidden' : 'flex min-h-screen flex-col'}>
      <PularParaConteudo />
      <CabecalhoPublico />
      <main id="conteudo" tabIndex={-1} className={`flex-1 focus:outline-none ${entrada ? 'min-h-0' : ''}`}>
        <Suspense fallback={<CarregandoPagina />}>
          <TransicaoPagina>
            <Outlet />
          </TransicaoPagina>
        </Suspense>
      </main>
      {!entrada && <Rodape />}
    </div>
  )
}
