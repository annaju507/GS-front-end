import { useEffect, useState } from 'react'
import { CHAVES, TEMA_CLARO, TEMA_ESCURO, decidirTemaInicial } from '../domain/preferencias.js'
import { lerPreferencia, salvarPreferencia, sistemaPrefereEscuro } from '../services/preferenciasStorage.js'

// Modo claro/escuro. A classe "dark" no <html> liga o tema escuro no site todo.
export function useTheme() {
  const [tema, setTema] = useState(() =>
    decidirTemaInicial(lerPreferencia(CHAVES.tema), sistemaPrefereEscuro()),
  )

  // Garante que o <html> está de acordo com o tema decidido na primeira visita.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === TEMA_ESCURO)
  }, [tema])

  // Manipulação do DOM: liga/desliga a classe e salva a escolha.
  function alternarTema() {
    const ficouEscuro = document.documentElement.classList.toggle('dark')
    const novoTema = ficouEscuro ? TEMA_ESCURO : TEMA_CLARO
    salvarPreferencia(CHAVES.tema, novoTema)
    setTema(novoTema)
  }

  return { tema, escuro: tema === TEMA_ESCURO, alternarTema }
}
