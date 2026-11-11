import { useEffect, useState } from 'react'
import { montarAnotacao, prepararAnotacao } from '../domain/caderno.js'
import {
  atualizarAnotacao,
  criarAnotacao,
  excluirAnotacao,
  gerarCodigoDono,
  listarAnotacoes,
} from '../services/cadernoApi.js'
import { useAuth } from './useAuth.js'

// CRUD do Caderno cívico com a API externa (MockAPI).
// Estados da lista: carregando, erro (com tentarDeNovo), vazio e lista.
// As ações devolvem { ok } para a tela mostrar o aviso certo.
export function useCaderno() {
  const { usuario } = useAuth()
  const [tentativa, setTentativa] = useState(0)
  const chave = `${usuario.email}#${tentativa}`
  const [resposta, setResposta] = useState({ chave: null, erro: null, anotacoes: [], dono: null })

  useEffect(() => {
    let ativo = true
    const [email] = chave.split('#')
    gerarCodigoDono(email)
      .then(async (dono) => {
        const registros = await listarAnotacoes(dono)
        if (ativo) {
          setResposta({ chave, erro: null, anotacoes: registros.map(prepararAnotacao), dono })
        }
      })
      .catch((erro) => {
        if (ativo) {
          setResposta({ chave, erro: erro.tipo ?? 'servidor', anotacoes: [], dono: null })
        }
      })
    return () => {
      ativo = false
    }
  }, [chave])

  const carregando = resposta.chave !== chave

  // Create: salva a proposta com a anotação da pessoa.
  async function salvar(proposta, texto) {
    try {
      const dono = resposta.dono ?? (await gerarCodigoDono(usuario.email))
      const registro = await criarAnotacao(montarAnotacao({ dono, proposta, texto, agora: new Date().toISOString() }))
      setResposta((atual) => ({ ...atual, anotacoes: [prepararAnotacao(registro), ...atual.anotacoes] }))
      return { ok: true }
    } catch {
      return { ok: false }
    }
  }

  // Update: muda só o texto da anotação.
  async function editar(id, texto) {
    try {
      const registro = await atualizarAnotacao(id, { anotacao: texto.trim() })
      setResposta((atual) => ({
        ...atual,
        anotacoes: atual.anotacoes.map((anotacao) => (anotacao.id === id ? prepararAnotacao(registro) : anotacao)),
      }))
      return { ok: true }
    } catch {
      return { ok: false }
    }
  }

  // Delete
  async function excluir(id) {
    try {
      await excluirAnotacao(id)
      setResposta((atual) => ({ ...atual, anotacoes: atual.anotacoes.filter((anotacao) => anotacao.id !== id) }))
      return { ok: true }
    } catch {
      return { ok: false }
    }
  }

  return {
    carregando,
    erro: carregando ? null : resposta.erro,
    anotacoes: carregando ? [] : resposta.anotacoes,
    tentarDeNovo: () => setTentativa(tentativa + 1),
    salvar,
    editar,
    excluir,
  }
}
