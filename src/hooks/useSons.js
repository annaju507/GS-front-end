import { useCallback, useEffect, useRef, useState } from 'react'
import { CHAVES } from '../domain/preferencias.js'
import { SONS, somDaContagem } from '../domain/sons.js'
import { lerPreferencia, salvarPreferencia } from '../services/preferenciasStorage.js'
import { tocarNotas } from '../services/sons.js'

// Estado dos sons (fica no PreferenciasProvider). Começa ligado; a escolha
// da pessoa fica guardada. Uso nas telas:
// const { sons } = usePreferencias(); sons.tocar('acerto')
// As funções não mudam entre renderizações (podem ir em dependências de
// useEffect sem tocar o som de novo); elas leem o "ligado" atual por um ref.
export function useSons() {
  const [ligado, setLigado] = useState(() => lerPreferencia(CHAVES.sons) !== 'nao')
  const ligadoRef = useRef(ligado)

  useEffect(() => {
    ligadoRef.current = ligado
  }, [ligado])

  function alternarSons() {
    const novoValor = !ligado
    salvarPreferencia(CHAVES.sons, novoValor ? 'sim' : 'nao')
    setLigado(novoValor)
  }

  const tocar = useCallback((momento) => {
    if (ligadoRef.current && SONS[momento]) {
      tocarNotas(SONS[momento])
    }
  }, [])

  const contar = useCallback((numero) => {
    if (ligadoRef.current) {
      tocarNotas(somDaContagem(numero))
    }
  }, [])

  return { ligado, alternarSons, tocar, contar }
}
