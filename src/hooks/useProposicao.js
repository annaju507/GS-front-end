import { useEffect, useState } from 'react'
import { buscarAutores, buscarProposicao, buscarTramitacoes } from '../services/camaraApi.js'
import { detalharProposicao, listarAutores, ultimasTramitacoes } from '../domain/proposicoes.js'

// Uma proposição da Câmara com autores e tramitação.
// Estados: carregando, erro (com tentarDeNovo) e dados. Como em
// useProposicoes, a resposta guarda de qual pedido ela é.
export function useProposicao(id) {
  const [tentativa, setTentativa] = useState(0)
  const chave = `${id}#${tentativa}`
  const [resposta, setResposta] = useState({ chave: null, erro: null, dados: null })

  useEffect(() => {
    let ativo = true
    const [idPedido] = chave.split('#')
    Promise.all([buscarProposicao(idPedido), buscarAutores(idPedido), buscarTramitacoes(idPedido)])
      .then(([dados, autores, tramitacoes]) => {
        if (ativo) {
          setResposta({
            chave,
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
          setResposta({ chave, erro: erro.tipo ?? 'servidor', dados: null })
        }
      })
    return () => {
      ativo = false
    }
  }, [chave])

  const carregando = resposta.chave !== chave

  return {
    carregando,
    erro: carregando ? null : resposta.erro,
    dados: carregando ? null : resposta.dados,
    tentarDeNovo: () => setTentativa(tentativa + 1),
  }
}
