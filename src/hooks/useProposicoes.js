import { useEffect, useState } from 'react'
import { buscarProposicoes } from '../services/camaraApi.js'
import { resumirProposicao } from '../domain/proposicoes.js'

const CARREGANDO = { carregando: true, erro: null, lista: [] }

// Lista de proposições de deputados do RJ (com filtros da API da Câmara).
// "filtros" vira texto para o efeito só rodar de novo quando eles mudarem.
export function useProposicoes(filtros) {
  const chave = JSON.stringify(filtros)
  const [estado, setEstado] = useState(CARREGANDO)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    buscarProposicoes(JSON.parse(chave))
      .then((itens) => {
        if (ativo) {
          setEstado({ carregando: false, erro: null, lista: itens.map(resumirProposicao) })
        }
      })
      .catch((erro) => {
        if (ativo) {
          setEstado({ carregando: false, erro: erro.tipo ?? 'servidor', lista: [] })
        }
      })
    return () => {
      ativo = false
    }
  }, [chave, tentativa])

  function tentarDeNovo() {
    setEstado(CARREGANDO)
    setTentativa(tentativa + 1)
  }

  return { ...estado, tentarDeNovo }
}
