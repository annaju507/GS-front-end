// Prévias públicas: amostras de Trilhas, Agora e Direitos.

export const AREAS_PREVIA = ['trilhas', 'agora', 'direitos']

export function ehAreaPrevia(area) {
  return AREAS_PREVIA.includes(area)
}

// Linha do tempo simplificada da prévia do Agora: 5 passos, de apresentada a
// virou lei. Devolve o índice do passo atual, ou -1 quando a proposta saiu do
// caminho (rejeitada, arquivada ou vetada): aí nenhum passo fica marcado.
export function passoDaEtapa(etapa) {
  if (etapa === 'apresentada') {
    return 0
  } else if (etapa === 'emAnalise' || etapa === 'emConjunto') {
    return 1
  } else if (etapa === 'comissao') {
    return 2
  } else if (['votacao', 'aprovada', 'enviada', 'aguardandoSancao'].includes(etapa)) {
    return 3
  } else if (['sancionada', 'virouLei', 'vetoDerrubado', 'emVigor'].includes(etapa)) {
    return 4
  } else {
    return -1
  }
}
