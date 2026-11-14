import { useState } from 'react'
import { validarFoto } from '../domain/foto.js'
import { reduzirFoto } from '../services/fotoPerfil.js'
import { useAuth } from './useAuth.js'

// const { foto, erro, salvando, escolherFoto, tirarFoto } = useFotoPerfil()
// A foto fica no próprio usuário (login simulado, só neste navegador).
export function useFotoPerfil() {
  const { usuario, atualizarUsuario } = useAuth()
  const [erro, setErro] = useState(null)
  const [salvando, setSalvando] = useState(false)

  async function escolherFoto(arquivo) {
    const problema = validarFoto(arquivo)
    if (problema === 'nenhuma') {
      return
    }
    if (problema) {
      setErro(problema)
      return
    }
    setErro(null)
    setSalvando(true)
    try {
      const foto = await reduzirFoto(arquivo)
      atualizarUsuario({ foto })
    } catch {
      setErro('leitura')
    } finally {
      setSalvando(false)
    }
  }

  function tirarFoto() {
    setErro(null)
    atualizarUsuario({ foto: null })
  }

  return { foto: usuario?.foto ?? null, erro, salvando, escolherFoto, tirarFoto }
}
