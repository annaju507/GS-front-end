import { useState } from 'react'
import { validarFoto } from '../domain/foto.js'
import { reduzirFoto } from '../services/fotoPerfil.js'
import { useAuth } from './useAuth.js'

// const { foto, avatar, erro, salvando, escolherFoto, escolherAvatar, tirarFoto } = useFotoPerfil()
// A foto ou o rosto escolhido ficam no próprio usuário (login simulado, só
// neste navegador). Escolher um apaga o outro.
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
      atualizarUsuario({ foto, avatar: null })
    } catch {
      setErro('leitura')
    } finally {
      setSalvando(false)
    }
  }

  function escolherAvatar(id) {
    setErro(null)
    atualizarUsuario({ avatar: id, foto: null })
  }

  // Volta para a inicial do apelido (sem foto e sem rosto).
  function tirarFoto() {
    setErro(null)
    atualizarUsuario({ foto: null, avatar: null })
  }

  return {
    foto: usuario?.foto ?? null,
    avatar: usuario?.avatar ?? null,
    erro,
    salvando,
    escolherFoto,
    escolherAvatar,
    tirarFoto,
  }
}
