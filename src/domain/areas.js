// As 4 áreas temáticas, na ordem oficial do projeto.
// Direitos, benefícios e cidadania são uma camada transversal, não uma quinta área.

export const AREAS = ['saude', 'educacao', 'seguranca', 'cidade']

export function ehAreaValida(area) {
  return AREAS.includes(area)
}
