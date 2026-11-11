import { useContext } from 'react'
import { ProgressoContext } from '../contexts/ProgressoContext.js'

// const { progresso, sequencia, medalhas, concluirLicao } = useProgresso()
export function useProgresso() {
  const progresso = useContext(ProgressoContext)
  if (progresso === null) {
    throw new Error('useProgresso precisa estar dentro do ProgressoProvider.')
  }
  return progresso
}
