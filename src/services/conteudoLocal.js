// Acesso ao conteúdo educativo guardado em JSON no próprio projeto
// (lições, quiz, trilha, glossário, direitos, representantes e propostas).
import trilha from '../data/trilha.json'
import dadosLicoes from '../data/licoes.json'
import dadosQuiz from '../data/quiz.json'
import dadosGlossario from '../data/glossario.json'
import dadosDireitos from '../data/direitos.json'
import dadosExecutivo from '../data/representantes/executivo.json'
import dadosMunicipio from '../data/representantes/municipio.json'
import dadosEstado from '../data/representantes/estado.json'
import selecaoDePropostas from '../data/propostas.json'
import propostasOficiais from '../data/propostas-oficiais.json'
import { montarProposta, ordenarPorData } from '../domain/propostas.js'

export const UNIDADES = trilha.unidades

export function buscarLicao(id) {
  return dadosLicoes.licoes.find((licao) => licao.id === id) ?? null
}

export function perguntasDaLicao(licao) {
  return licao.quiz.map((id) => dadosQuiz.perguntas.find((pergunta) => pergunta.id === id)).filter(Boolean)
}

export function listarTermos() {
  return dadosGlossario.termos
}

export function buscarTermo(id) {
  return dadosGlossario.termos.find((termo) => termo.id === id) ?? null
}

// Representantes guardados no projeto (Executivo escrito à mão; vereadores e
// deputados estaduais gerados por scripts/coleta-representantes.js).
export const REPRESENTANTES_LOCAIS = {
  executivo: dadosExecutivo,
  municipio: dadosMunicipio,
  estado: dadosEstado,
}

export function buscarRepresentanteLocal(id) {
  for (const dados of Object.values(REPRESENTANTES_LOCAIS)) {
    const pessoa = dados.pessoas.find((item) => item.id === id)
    if (pessoa) {
      return { pessoa, consultadoEm: dados.consultadoEm, fonte: dados.fonte }
    }
  }
  return null
}

export function listarDireitos() {
  return dadosDireitos
}

export function buscarDireito(id) {
  return dadosDireitos.temas.find((tema) => tema.id === id) ?? null
}

// Seleção fixa de propostas: texto simples da equipe + dados oficiais da
// Câmara (gerados por scripts/coleta-propostas.js), das mais novas para as mais antigas.
const PROPOSTAS = ordenarPorData(
  selecaoDePropostas.propostas.map((item) => montarProposta(item, propostasOficiais.propostas[item.id])).filter(Boolean),
)

export const PROPOSTAS_CONSULTADAS_EM = propostasOficiais.consultadoEm

export function listarPropostas() {
  return PROPOSTAS
}

export function buscarPropostaLocal(id) {
  return PROPOSTAS.find((proposta) => String(proposta.id) === String(id)) ?? null
}
