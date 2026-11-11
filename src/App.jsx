import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router'
import LayoutPublico from './components/layout/LayoutPublico.jsx'
import LayoutBoasVindas from './components/layout/LayoutBoasVindas.jsx'
import LayoutApp from './components/layout/LayoutApp.jsx'
import LayoutFoco from './components/layout/LayoutFoco.jsx'
import RotaProtegida from './components/RotaProtegida.jsx'
import Inicio from './pages/Inicio.jsx'
import ComoFunciona from './pages/ComoFunciona.jsx'
import Sobre from './pages/Sobre.jsx'
import Previa from './pages/Previa.jsx'
import Entrar from './pages/Entrar.jsx'
import Cadastro from './pages/Cadastro.jsx'
import BoasVindas from './pages/BoasVindas.jsx'
import PontoDePartida from './pages/PontoDePartida.jsx'
import AjustesLeitura from './pages/AjustesLeitura.jsx'
import Painel from './pages/Painel.jsx'
import Trilha from './pages/Trilha.jsx'
import Licao from './pages/Licao.jsx'
import Quiz from './pages/Quiz.jsx'
import Conquista from './pages/Conquista.jsx'
import Proposta from './pages/Proposta.jsx'
import Perfil from './pages/Perfil.jsx'
import EmConstrucao from './pages/EmConstrucao.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'

// Vitrine de componentes: só existe no modo de desenvolvimento (npm run dev).
// No site publicado, o Vite troca import.meta.env.DEV por false e remove isto.
const VitrineComponentes = import.meta.env.DEV ? lazy(() => import('./pages/VitrineComponentes.jsx')) : null

export default function App() {
  return (
    <Routes>
      {/* Área pública (sem login) */}
      <Route element={<LayoutPublico />}>
        <Route index element={<Inicio />} />
        <Route path="como-funciona" element={<ComoFunciona />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="previa/:area" element={<Previa />} />
        <Route path="entrar" element={<Entrar />} />
        <Route path="cadastro" element={<Cadastro />} />
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
        <Route path="agora" element={<EmConstrucao area="agora" />} />
        <Route path="representantes/*" element={<EmConstrucao area="representantes" />} />
        <Route path="direitos/*" element={<EmConstrucao area="direitos" />} />
        <Route path="caderno" element={<EmConstrucao area="caderno" />} />
        <Route path="glossario/*" element={<EmConstrucao area="glossario" />} />
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
  )
}
