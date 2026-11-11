// Etapas da tramitação de uma proposta. O status é informativo:
// nunca usa verde ou vermelho, nem diz se é "bom" ou "ruim".

export const ETAPAS = [
  'apresentada',
  'emAnalise',
  'comissao',
  'emConjunto',
  'votacao',
  'aprovada',
  'enviada',
  'rejeitada',
  'aguardandoSancao',
  'sancionada',
  'virouLei',
  'vetada',
  'vetoDerrubado',
  'arquivada',
  'emVigor',
]

export function ehEtapaValida(etapa) {
  return ETAPAS.includes(etapa)
}

// Traduz a situação oficial da Câmara para uma etapa simples.
// A situação oficial sempre aparece junto, escrita como veio da fonte.
export function classificarSituacao(situacaoOficial) {
  const situacao = String(situacaoOficial ?? '').toLowerCase()
  if (situacao === '') {
    return 'apresentada'
  } else if (situacao.includes('arquivad') || situacao.includes('retirad') || situacao.includes('devolvid')) {
    return 'arquivada'
  } else if (situacao.includes('norma jurídica')) {
    return 'virouLei'
  } else if (situacao.includes('sanção')) {
    return 'aguardandoSancao'
  } else if (situacao.includes('vetad')) {
    return 'vetada'
  } else if (situacao.includes('senado')) {
    return 'enviada'
  } else if (situacao.includes('em conjunto')) {
    return 'emConjunto'
  } else if (situacao.includes('pauta') || situacao.includes('deliberação') || situacao.includes('votação')) {
    return 'votacao'
  } else if (situacao.includes('parecer') || situacao.includes('relator') || situacao.includes('comiss')) {
    return 'comissao'
  } else {
    return 'emAnalise'
  }
}
