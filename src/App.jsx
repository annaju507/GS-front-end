import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router'
import LayoutPublico from './components/layout/LayoutPublico.jsx'
import LayoutBoasVindas from './components/layout/LayoutBoasVindas.jsx'
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

      {/* Área interna (com login). Painel provisório até a etapa 4. */}
      <Route
        path="app/*"
        element={
          <RotaProtegida>
            <Painel />
          </RotaProtegida>
        }
      />

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
