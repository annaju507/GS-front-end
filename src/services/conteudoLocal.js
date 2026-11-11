// Acesso ao conteúdo educativo guardado em JSON no próprio projeto
// (lições, perguntas do quiz e unidades da trilha).
import trilha from '../data/trilha.json'
import dadosLicoes from '../data/licoes.json'
import dadosQuiz from '../data/quiz.json'

export const UNIDADES = trilha.unidades

export function buscarLicao(id) {
  return dadosLicoes.licoes.find((licao) => licao.id === id) ?? null
}

export function perguntasDaLicao(licao) {
  return licao.quiz.map((id) => dadosQuiz.perguntas.find((pergunta) => pergunta.id === id)).filter(Boolean)
}
