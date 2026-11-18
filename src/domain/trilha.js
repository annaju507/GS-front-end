// Regras da trilha (funções puras). As lições se liberam em sequência:
// uma lição só abre quando a anterior foi concluída.

// Lista as lições na ordem da trilha (só das unidades disponíveis).
export function ordemDasLicoes(unidades) {
  return unidades.filter((unidade) => unidade.disponivel).flatMap((unidade) => unidade.licoes)
}

export function estadoDaLicao(idLicao, ordem, concluidas) {
  const posicao = ordem.indexOf(idLicao)
  if (posicao === -1) {
    return 'inexistente'
  } else if (concluidas[idLicao]) {
    return 'concluida'
  } else if (posicao === 0 || concluidas[ordem[posicao - 1]]) {
    return 'atual'
  } else {
    return 'bloqueada'
  }
}

// Primeira lição ainda não concluída (ou null se a trilha acabou).
export function proximaLicao(ordem, concluidas) {
  return ordem.find((idLicao) => !concluidas[idLicao]) ?? null
}

export function porcentagemConcluida(ordem, concluidas) {
  if (ordem.length === 0) {
    return 0
  }
  const feitas = ordem.filter((idLicao) => concluidas[idLicao]).length
  return Math.round((feitas / ordem.length) * 100)
}

export function unidadeDaLicao(unidades, idLicao) {
  return unidades.find((unidade) => unidade.licoes.includes(idLicao)) ?? null
}

export function unidadeConcluida(unidade, concluidas) {
  return unidade.licoes.length > 0 && unidade.licoes.every((idLicao) => concluidas[idLicao])
}

// Estrelas de uma lição concluída, pelos acertos no quiz (3 perguntas):
// acertou todas = 3, 2 de 3 = 2, alguma = 1, nenhuma = 0.
export function contarEstrelas(resultado) {
  if (!resultado || !resultado.total) {
    return 0
  }
  const proporcao = resultado.acertos / resultado.total
  if (proporcao === 1) {
    return 3
  } else if (proporcao >= 2 / 3) {
    return 2
  } else if (proporcao > 0) {
    return 1
  } else {
    return 0
  }
}

// Posição de cada lição no caminho sinuoso, em % da largura. O caminho vai e
// volta; nas unidades ímpares ele é espelhado, para alternar os lados.
const CAMINHO = [50, 78, 50, 22]

export function posicaoNoCaminho(indiceNaUnidade, indiceDaUnidade) {
  const base = CAMINHO[indiceNaUnidade % CAMINHO.length]
  const espelhar = indiceDaUnidade % 2 === 1
  const x = espelhar ? 100 - base : base
  // O nome fica do lado que tem mais espaço.
  let lado
  if (x > 50) {
    lado = 'esquerda'
  } else if (x < 50) {
    lado = 'direita'
  } else {
    lado = espelhar ? 'esquerda' : 'direita'
  }
  return { x, lado }
}

// Cada unidade da trilha deixa as pegadas de um mascote, em rodízio.
const BICHOS_DAS_PEGADAS = ['caramelo', 'capivara', 'arara', 'onca', 'mico']

export function bichoDaUnidade(indiceDaUnidade) {
  return BICHOS_DAS_PEGADAS[indiceDaUnidade % BICHOS_DAS_PEGADAS.length]
}

// A pessoa terminou uma lição desde a última vez que viu a trilha? Então as
// pegadas andam até a nova lição liberada. Devolve o id dela, ou null.
export function licaoParaDesbloquear(ultimaVista, atual, concluidas) {
  if (!ultimaVista || !atual) {
    return null
  } else if (ultimaVista === atual) {
    return null
  } else if (concluidas[ultimaVista]) {
    return atual
  } else {
    return null
  }
}
