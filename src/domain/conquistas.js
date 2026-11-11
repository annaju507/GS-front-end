// Medalhas (funções puras). Sem ranking e sem pontos totais: só marcos
// pessoais, cada um "entregue" por um mascote.
import { ordemDasLicoes, unidadeConcluida } from './trilha.js'

export const MEDALHAS = [
  { id: 'primeiraLicao', mascote: 'caramelo' },
  { id: 'tresPoderes', mascote: 'capivara' },
  { id: 'esferas', mascote: 'capivara' },
  { id: 'comoNasceUmaLei', mascote: 'capivara' },
  { id: 'chequeiAFonte', mascote: 'onca' },
  { id: 'primeiraProposta', mascote: 'arara' },
  { id: 'tresDias', mascote: 'mico' },
  { id: 'seteDias', mascote: 'mico' },
  { id: 'trilhaConcluida', mascote: 'mico' },
]

// Medalha da sequência de dias (a maior que a pessoa alcançou).
export function escolherMedalhaSequencia(dias) {
  if (dias >= 7) {
    return 'seteDias'
  } else if (dias >= 3) {
    return 'tresDias'
  } else {
    return null
  }
}

function unidadePorId(unidades, id) {
  return unidades.find((unidade) => unidade.id === id)
}

// Lista quais medalhas já foram ganhas.
export function medalhasGanhas(progresso, sequencia, unidades) {
  const concluidas = progresso.licoes
  const ordem = ordemDasLicoes(unidades)
  const medalhaDaSequencia = escolherMedalhaSequencia(sequencia)

  const ganhas = new Set()
  if (Object.keys(concluidas).length > 0) ganhas.add('primeiraLicao')
  if (unidadeConcluida(unidadePorId(unidades, 3), concluidas)) ganhas.add('tresPoderes')
  if (unidadeConcluida(unidadePorId(unidades, 5), concluidas)) ganhas.add('esferas')
  if (unidadeConcluida(unidadePorId(unidades, 7), concluidas)) ganhas.add('comoNasceUmaLei')
  if (progresso.fontesConsultadas > 0) ganhas.add('chequeiAFonte')
  if (progresso.propostasLidas.length > 0) ganhas.add('primeiraProposta')
  if (medalhaDaSequencia === 'seteDias') ganhas.add('seteDias')
  if (medalhaDaSequencia !== null) ganhas.add('tresDias')
  if (ordem.length > 0 && ordem.every((idLicao) => concluidas[idLicao])) ganhas.add('trilhaConcluida')

  return MEDALHAS.map((medalha) => ({ ...medalha, ganha: ganhas.has(medalha.id) }))
}

// Medalhas que a pessoa acabou de ganhar (comparando antes e depois).
export function medalhasNovas(antes, depois) {
  const jaTinha = new Set(antes.filter((medalha) => medalha.ganha).map((medalha) => medalha.id))
  return depois.filter((medalha) => medalha.ganha && !jaTinha.has(medalha.id))
}
