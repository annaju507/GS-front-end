import { useState } from 'react'
import { AuthContext } from './AuthContext.js'
import { normalizarEmail } from '../domain/auth.js'
import {
  apagarSessao,
  lerSessao,
  lerUsuarios,
  resumirSenha,
  salvarSessao,
  salvarUsuarios,
} from '../services/authStorage.js'

// Nunca entrega o resumo da senha para os componentes.
function semSenha(usuario) {
  if (!usuario) {
    return null
  }
  const { resumoSenha: _resumo, ...publico } = usuario
  return publico
}

function buscarUsuario(email) {
  return lerUsuarios().find((usuario) => usuario.email === email) ?? null
}

export default function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const emailDaSessao = lerSessao()
    return emailDaSessao ? semSenha(buscarUsuario(emailDaSessao)) : null
  })

  async function cadastrar({ apelido, email, senha }) {
    const emailLimpo = normalizarEmail(email)
    if (buscarUsuario(emailLimpo)) {
      return { ok: false, erro: 'emailEmUso' }
    }
    const novo = {
      apelido: apelido.trim(),
      email: emailLimpo,
      resumoSenha: await resumirSenha(senha),
      criadoEm: new Date().toISOString(),
      boasVindasConcluidas: false,
      pontoDePartida: null,
    }
    salvarUsuarios([...lerUsuarios(), novo])
    salvarSessao(emailLimpo)
    setUsuario(semSenha(novo))
    return { ok: true, usuario: semSenha(novo) }
  }

  async function entrar({ email, senha }) {
    const encontrado = buscarUsuario(normalizarEmail(email))
    const resumo = await resumirSenha(senha)
    if (encontrado && encontrado.resumoSenha === resumo) {
      salvarSessao(encontrado.email)
      setUsuario(semSenha(encontrado))
      return { ok: true, usuario: semSenha(encontrado) }
    } else {
      return { ok: false, erro: 'credenciais' }
    }
  }

  function sair() {
    apagarSessao()
    setUsuario(null)
  }

  // Salva mudanças no usuário logado (ex.: ponto de partida, boas-vindas concluídas).
  function atualizarUsuario(campos) {
    if (!usuario) {
      return
    }
    const usuarios = lerUsuarios().map((atual) => (atual.email === usuario.email ? { ...atual, ...campos } : atual))
    salvarUsuarios(usuarios)
    setUsuario(semSenha(usuarios.find((atual) => atual.email === usuario.email)))
  }

  return (
    <AuthContext.Provider value={{ usuario, cadastrar, entrar, sair, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  )
}
