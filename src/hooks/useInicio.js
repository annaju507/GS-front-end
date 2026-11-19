import { useState } from 'react'
import { deveMostrarEntrada } from '../domain/painel.js'
import { lerEntradaVista, lerMensagensLidas, salvarEntradaVista, salvarMensagensLidas } from '../services/painelStorage.js'

// const { mostrarEntrada, abrirEntrada, fecharEntrada, lidas, lerMensagem } = useInicio(email, hoje, sequencia)
// Estado do Início: a comemoração do foguinho (uma vez por dia, ao entrar, ou
// quando a pessoa toca no chip) e as mensagens já lidas.
export function useInicio(email, hoje, sequencia) {
  const [mostrarEntrada, setMostrarEntrada] = useState(() => deveMostrarEntrada(lerEntradaVista(email), hoje, sequencia))
  const [lidas, setLidas] = useState(() => lerMensagensLidas(email))

  function abrirEntrada() {
    setMostrarEntrada(true)
  }

  function fecharEntrada() {
    salvarEntradaVista(email, hoje)
    setMostrarEntrada(false)
  }

  function lerMensagem(id) {
    if (lidas.includes(id)) {
      return
    }
    const novas = [...lidas, id]
    salvarMensagensLidas(email, novas)
    setLidas(novas)
  }

  return { mostrarEntrada, abrirEntrada, fecharEntrada, lidas, lerMensagem }
}
