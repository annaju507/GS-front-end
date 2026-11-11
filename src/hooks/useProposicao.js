import { useEffect, useState } from 'react'
import { buscarAutores, buscarProposicao, buscarTramitacoes } from '../services/camaraApi.js'
import { detalharProposicao, listarAutores, ultimasTramitacoes } from '../domain/proposicoes.js'

const CARREGANDO = { carregando: true, erro: null, dados: null }

// Uma proposição da Câmara com autores e tramitação.
// Estados: carregando, erro (com tentarDeNovo) e dados.
export function useProposicao(id) {
  const [estado, setEstado] = useState(CARREGANDO)
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    Promise.all([buscarProposicao(id), buscarAutores(id), buscarTramitacoes(id)])
      .then(([dados, autores, tramitacoes]) => {
        if (ativo) {
          setEstado({
            carregando: false,
            erro: null,
            dados: {
              ...detalharProposicao(dados),
              autores: listarAutores(autores),
              tramitacoes: ultimasTramitacoes(tramitacoes),
            },
          })
        }
      })
      .catch((erro) => {
        if (ativo) {
          setEstado({ carregando: false, erro: erro.tipo ?? 'servidor', dados: null })
        }
      })
    return () => {
      ativo = false
    }
  }, [id, tentativa])

  function tentarDeNovo() {
    setEstado(CARREGANDO)
    setTentativa(tentativa + 1)
  }

  return { ...estado, tentarDeNovo }
}
