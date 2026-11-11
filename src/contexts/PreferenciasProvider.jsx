import { PreferenciasContext } from './PreferenciasContext.js'
import { useTheme } from '../hooks/useTheme.js'
import { useTamanhoLetra } from '../hooks/useTamanhoLetra.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'

export default function PreferenciasProvider({ children }) {
  const tema = useTheme()
  const letra = useTamanhoLetra()
  const animacoes = useReducedMotion()

  return (
    <PreferenciasContext.Provider value={{ tema, letra, animacoes }}>
      {children}
    </PreferenciasContext.Provider>
  )
}
