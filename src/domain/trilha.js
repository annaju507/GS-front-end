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
