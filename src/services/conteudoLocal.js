// Acesso ao conteúdo educativo guardado em JSON no próprio projeto
// (lições, quiz, trilha, glossário, direitos e representantes).
import trilha from '../data/trilha.json'
import dadosLicoes from '../data/licoes.json'
import dadosQuiz from '../data/quiz.json'
import dadosGlossario from '../data/glossario.json'
import dadosDireitos from '../data/direitos.json'
import dadosExecutivo from '../data/representantes/executivo.json'
import dadosMunicipio from '../data/representantes/municipio.json'
import dadosEstado from '../data/representantes/estado.json'

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
