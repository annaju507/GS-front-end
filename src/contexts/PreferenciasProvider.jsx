import { PreferenciasContext } from './PreferenciasContext.js'
import { useTheme } from '../hooks/useTheme.js'
import { useTamanhoLetra } from '../hooks/useTamanhoLetra.js'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import { useSons } from '../hooks/useSons.js'

export default function PreferenciasProvider({ children }) {
  const tema = useTheme()
  const letra = useTamanhoLetra()
  const animacoes = useReducedMotion()
  const sons = useSons()

  return (
    <PreferenciasContext.Provider value={{ tema, letra, animacoes, sons }}>
      {children}
    </PreferenciasContext.Provider>
  )
}
