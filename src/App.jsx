import { Routes, Route } from 'react-router'
import Inicio from './pages/Inicio.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
    </Routes>
  )
}
