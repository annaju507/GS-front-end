import { useMemo, useState } from 'react'
import { agruparPorLetra, filtrarTermos } from '../domain/glossario.js'
import { listarTermos } from '../services/conteudoLocal.js'

// Glossário com busca em tempo real: a cada letra digitada, a lista filtra.
export function useGlossario() {
  const [busca, setBusca] = useState('')
  const termos = listarTermos()

  const grupos = useMemo(() => agruparPorLetra(filtrarTermos(termos, busca)), [termos, busca])
  const encontrados = grupos.reduce((total, grupo) => total + grupo.termos.length, 0)

  return { busca, setBusca, grupos, encontrados, total: termos.length }
}
