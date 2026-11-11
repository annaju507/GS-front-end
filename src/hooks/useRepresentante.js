import { useEffect, useState } from 'react'
import textos from '../data/textos.json'
import { deputadoFederalDaApi, senadorDaApi } from '../domain/representantes.js'
import { resumirProposicao } from '../domain/proposicoes.js'
import { dataLocalIso } from '../domain/progresso.js'
import { buscarDeputado, buscarProposicoesDoDeputado } from '../services/camaraApi.js'
import { buscarSenadoresRJ } from '../services/senadoApi.js'
import { buscarRepresentanteLocal } from '../services/conteudoLocal.js'

const t = textos.representantes.fontes

// Busca o perfil conforme a origem do código: "camara-", "senado-" ou local.
async function buscarPerfil(id) {
  const [origem, codigo] = id.split(/-(.+)/)
  const hoje = dataLocalIso(new Date())
  if (origem === 'camara') {
    const [dados, proposicoes] = await Promise.all([buscarDeputado(codigo), buscarProposicoesDoDeputado(codigo)])
    if (!dados) {
      return null
    }
    const pessoa = deputadoFederalDaApi(dados)
    return {
      pessoa,
      proposicoes: proposicoes.map(resumirProposicao),
      fonte: { instituicao: t.camara, documento: t.perfil, trecho: '', url: pessoa.url, consultadoEm: hoje },
    }
  } else if (origem === 'senado') {
    const senadores = await buscarSenadoresRJ()
    const encontrado = senadores.find((senador) => senador.IdentificacaoParlamentar.CodigoParlamentar === codigo)
    if (!encontrado) {
      return null
    }
    const pessoa = senadorDaApi(encontrado)
    return { pessoa, proposicoes: null, fonte: { instituicao: t.senado, documento: t.perfil, trecho: '', url: pessoa.url, consultadoEm: hoje } }
  } else {
    const local = buscarRepresentanteLocal(id)
    if (!local) {
      return null
    }
    const instituicao = local.pessoa.instituicao ?? local.fonte.instituicao
    return {
      pessoa: local.pessoa,
      proposicoes: null,
      fonte: { instituicao, documento: t.perfil, trecho: '', url: local.pessoa.url, consultadoEm: local.consultadoEm },
    }
  }
}

// Perfil de um representante (estados: carregando, erro, naoEncontrado, dados).
export function useRepresentante(id) {
  const [tentativa, setTentativa] = useState(0)
  const chave = `${id}#${tentativa}`
  const [resposta, setResposta] = useState({ chave: null, erro: null, dados: null })

  useEffect(() => {
    let ativo = true
    const [idPedido] = chave.split('#')
    buscarPerfil(idPedido)
      .then((dados) => {
        if (ativo) {
          setResposta({ chave, erro: dados ? null : 'naoEncontrado', dados })
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
