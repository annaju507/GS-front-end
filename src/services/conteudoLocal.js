// Acesso ao conteúdo educativo guardado em JSON no próprio projeto
// (lições, perguntas do quiz, unidades da trilha e glossário).
import trilha from '../data/trilha.json'
import dadosLicoes from '../data/licoes.json'
import dadosQuiz from '../data/quiz.json'
import dadosGlossario from '../data/glossario.json'

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
