import { useEffect, useState } from 'react'
import { buscarTramitacoes } from '../services/camaraApi.js'
import { ultimasTramitacoes } from '../domain/proposicoes.js'

// Últimas movimentações de uma proposta, ao vivo na API da Câmara.
// É a única parte das propostas da seleção que é buscada na hora.
// Estados: carregando, erro (com tentarDeNovo) e lista. A resposta guarda
// de qual pedido ela é, para não mostrar dados de outra proposta.
export function useMovimentacoes(id) {
  const [tentativa, setTentativa] = useState(0)
  const chave = `${id}#${tentativa}`
  const [resposta, setResposta] = useState({ chave: null, erro: null, lista: [] })

  useEffect(() => {
    let ativo = true
    const [idPedido] = chave.split('#')
    buscarTramitacoes(idPedido)
      .then((tramitacoes) => {
        if (ativo) {
          setResposta({ chave, erro: null, lista: ultimasTramitacoes(tramitacoes) })
        }
      })
      .catch((erro) => {
        if (ativo) {
          setResposta({ chave, erro: erro.tipo ?? 'servidor', lista: [] })
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
    lista: carregando ? [] : resposta.lista,
    tentarDeNovo: () => setTentativa(tentativa + 1),
  }
}
