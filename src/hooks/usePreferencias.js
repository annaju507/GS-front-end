import { useContext } from 'react'
import { PreferenciasContext } from '../contexts/PreferenciasContext.js'

// Lê as preferências de qualquer componente: const { tema } = usePreferencias()
export function usePreferencias() {
  const preferencias = useContext(PreferenciasContext)
  if (preferencias === null) {
    throw new Error('usePreferencias precisa estar dentro do PreferenciasProvider.')
  }
  return preferencias
}
