// As 4 áreas temáticas, na ordem oficial do projeto.
// Direitos, benefícios e cidadania são uma camada transversal, não uma quinta área.

export const AREAS = ['saude', 'educacao', 'seguranca', 'cidade']

export function ehAreaValida(area) {
  return AREAS.includes(area)
}

// As propostas da seleção usam as 4 áreas e mais "outros", para assuntos
// que não se encaixam em nenhuma delas (sem forçar uma área errada).
export const AREAS_DAS_PROPOSTAS = [...AREAS, 'outros']

export function ehAreaDaProposta(area) {
  return AREAS_DAS_PROPOSTAS.includes(area)
}
