// Etapas da tramitação de uma proposta. O status é informativo:
// nunca usa verde ou vermelho, nem diz se é "bom" ou "ruim".

export const ETAPAS = [
  'apresentada',
  'comissao',
  'votacao',
  'aprovada',
  'enviada',
  'rejeitada',
  'sancionada',
  'vetada',
  'vetoDerrubado',
  'arquivada',
  'emVigor',
]

export function ehEtapaValida(etapa) {
  return ETAPAS.includes(etapa)
}
