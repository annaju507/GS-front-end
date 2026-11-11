import { useEffect } from 'react'
import { useLocation } from 'react-router'

// Ao trocar de página, volta para o topo (o React Router não faz isso sozinho).
export function useRolarAoTopo() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}
