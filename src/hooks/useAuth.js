import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext.js'

// const { usuario, entrar, cadastrar, sair } = useAuth()
export function useAuth() {
  const auth = useContext(AuthContext)
  if (auth === null) {
    throw new Error('useAuth precisa estar dentro do AuthProvider.')
  }
  return auth
}
