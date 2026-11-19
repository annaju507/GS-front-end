import { useEffect, useState } from 'react'
import { medalhasParaComemorar } from '../domain/conquistas.js'
import { lerMedalhasVistas, salvarMedalhasVistas } from '../services/medalhasStorage.js'

// const { novas, marcarVistas } = useMedalhasNovas(email, medalhas)
// Medalhas ganhas que a trilha ainda não comemorou. A conta é feita uma vez,
// ao abrir a página; marcarVistas guarda todas as ganhas como já vistas.
export function useMedalhasNovas(email, medalhas) {
  const [novas, setNovas] = useState(() => medalhasParaComemorar(medalhas, lerMedalhasVistas(email)))

  function marcarVistas() {
    salvarMedalhasVistas(
      email,
      medalhas.filter((medalha) => medalha.ganha).map((medalha) => medalha.id),
    )
    setNovas([])
  }

  // Primeira visita com essa função: guarda as que a pessoa já tinha, sem festa.
  useEffect(() => {
    if (lerMedalhasVistas(email) === null) {
      salvarMedalhasVistas(
        email,
        medalhas.filter((medalha) => medalha.ganha).map((medalha) => medalha.id),
      )
    }
  }, [email, medalhas])

  return { novas, marcarVistas }
}
