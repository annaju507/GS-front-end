import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

// Rotas internas: quem não fez login vai para Entrar e, depois de entrar,
// volta para a página que tinha pedido.
export default function RotaProtegida({ children }) {
  const { usuario } = useAuth()
  const local = useLocation()

  if (!usuario) {
    return <Navigate to="/entrar" replace state={{ paginaPedida: local.pathname }} />
  }
  return children
}
