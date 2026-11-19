import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { ehTelaDeEntrada } from './domain/navegacao.js'
import LayoutPublico from './components/layout/LayoutPublico.jsx'
import LayoutBoasVindas from './components/layout/LayoutBoasVindas.jsx'
import LayoutApp from './components/layout/LayoutApp.jsx'
import LayoutFoco from './components/layout/LayoutFoco.jsx'
import RotaProtegida from './components/RotaProtegida.jsx'
import ModalConta from './components/ModalConta.jsx'
import Inicio from './pages/Inicio.jsx'

// Cada página é baixada só quando a pessoa abre (divide o JavaScript em
// pedaços menores). O Início vem junto, porque é a primeira página.
const ComoFunciona = lazy(() => import('./pages/ComoFunciona.jsx'))
const Sobre = lazy(() => import('./pages/Sobre.jsx'))
const Previa = lazy(() => import('./pages/Previa.jsx'))
const BoasVindas = lazy(() => import('./pages/BoasVindas.jsx'))
const PontoDePartida = lazy(() => import('./pages/PontoDePartida.jsx'))
const AjustesLeitura = lazy(() => import('./pages/AjustesLeitura.jsx'))
const Painel = lazy(() => import('./pages/Painel.jsx'))
const Trilha = lazy(() => import('./pages/Trilha.jsx'))
const Licao = lazy(() => import('./pages/Licao.jsx'))
const Quiz = lazy(() => import('./pages/Quiz.jsx'))
const Conquista = lazy(() => import('./pages/Conquista.jsx'))
const Proposta = lazy(() => import('./pages/Proposta.jsx'))
const Perfil = lazy(() => import('./pages/Perfil.jsx'))
const Agora = lazy(() => import('./pages/Agora.jsx'))
const Glossario = lazy(() => import('./pages/Glossario.jsx'))
const Termo = lazy(() => import('./pages/Termo.jsx'))
const Caderno = lazy(() => import('./pages/Caderno.jsx'))
const Representantes = lazy(() => import('./pages/Representantes.jsx'))
const RepresentantesEsfera = lazy(() => import('./pages/RepresentantesEsfera.jsx'))
const Representante = lazy(() => import('./pages/Representante.jsx'))
const Direitos = lazy(() => import('./pages/Direitos.jsx'))
const DireitoTema = lazy(() => import('./pages/DireitoTema.jsx'))
const NaoEncontrada = lazy(() => import('./pages/NaoEncontrada.jsx'))

// Vitrine de componentes: só existe no modo de desenvolvimento (npm run dev).
// No site publicado, o Vite troca import.meta.env.DEV por false e remove isto.
const VitrineComponentes = import.meta.env.DEV ? lazy(() => import('./pages/VitrineComponentes.jsx')) : null

// Página que fica no fundo quando Entrar ou Criar conta é aberto direto pelo
// endereço (sem vir de outra página do site).
const FUNDO_PADRAO = { pathname: '/', search: '', hash: '', state: null, key: 'fundo' }

export default function App() {
  const local = useLocation()

  // Entrar e Criar conta abrem numa janela por cima da página em que a pessoa
  // estava (ela vem no state do link). As rotas desenham essa página de fundo,
  // que continua no mesmo ponto da rolagem, e a janela vem por cima.
  let localDaPagina = local
  const contaAberta = ehTelaDeEntrada(local.pathname)
  if (contaAberta) {
    localDaPagina = local.state?.fundo ?? FUNDO_PADRAO
  }

  return (
    <>
      <Routes location={localDaPagina}>
        {/* Área pública (sem login) */}
        <Route element={<LayoutPublico />}>
          <Route index element={<Inicio />} />
          <Route path="como-funciona" element={<ComoFunciona />} />
          <Route path="sobre" element={<Sobre />} />
          <Route path="previa/:area" element={<Previa />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>

        {/* Primeira visita (com login) */}
        <Route
          element={
            <RotaProtegida>
              <LayoutBoasVindas />
            </RotaProtegida>
          }
        >
          <Route path="boas-vindas" element={<BoasVindas />} />
          <Route path="boas-vindas/ponto-de-partida" element={<PontoDePartida />} />
          <Route path="boas-vindas/ajustes" element={<AjustesLeitura />} />
        </Route>

        {/* Área interna (com login), com a navegação do app */}
        <Route
          path="app"
          element={
            <RotaProtegida>
              <LayoutApp />
            </RotaProtegida>
          }
        >
          <Route index element={<Painel />} />
          <Route path="trilha" element={<Trilha />} />
          <Route path="licao/:id" element={<Licao />} />
          <Route path="proposta/:id" element={<Proposta />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="agora" element={<Agora />} />
          <Route path="representantes" element={<Representantes />} />
          <Route path="representantes/:esfera" element={<RepresentantesEsfera />} />
          <Route path="representante/:id" element={<Representante />} />
          <Route path="direitos" element={<Direitos />} />
          <Route path="direitos/:tema" element={<DireitoTema />} />
          <Route path="caderno" element={<Caderno />} />
          <Route path="glossario" element={<Glossario />} />
          <Route path="glossario/:termo" element={<Termo />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>

        {/* Quiz e conquista: sem menu, para focar */}
        <Route
          path="app"
          element={
            <RotaProtegida>
              <LayoutFoco />
            </RotaProtegida>
          }
        >
          <Route path="quiz/:id" element={<Quiz />} />
          <Route path="conquista/:id" element={<Conquista />} />
        </Route>

        {VitrineComponentes && (
          <Route
            path="componentes"
            element={
              <Suspense fallback={null}>
                <VitrineComponentes />
              </Suspense>
            }
          />
        )}
      </Routes>
      {contaAberta && <ModalConta />}
    </>
  )
}
