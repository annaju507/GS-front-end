import { useEffect, useState } from 'react'
import { buscarProposicoes } from '../services/camaraApi.js'
import { resumirProposicao } from '../domain/proposicoes.js'

// Lista de proposições de deputados do RJ (com filtros da API da Câmara).
// Cada resposta guarda de qual busca ela é: se os filtros mudam, a tela
// mostra "carregando" na hora, em vez da lista antiga.
export function useProposicoes(filtros) {
  const [tentativa, setTentativa] = useState(0)
  const chave = `${JSON.stringify(filtros)}#${tentativa}`
  const [resposta, setResposta] = useState({ chave: null, erro: null, lista: [] })

  useEffect(() => {
    let ativo = true
    const [filtrosEmTexto] = chave.split('#')
    buscarProposicoes(JSON.parse(filtrosEmTexto))
      .then((itens) => {
        if (ativo) {
          setResposta({ chave, erro: null, lista: itens.map(resumirProposicao) })
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
