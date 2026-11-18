import { useLocation } from 'react-router'

// Cada página nova aparece suave (só opacidade). A chave muda com o endereço,
// então a animação roda de novo a cada navegação.
export default function TransicaoPagina({ children }) {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="entrar-pagina h-full">
      {children}
    </div>
  )
}
