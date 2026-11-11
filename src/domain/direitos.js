// Regras da aba Direitos (funções puras).
import { AREAS } from './areas.js'

// Ordem dos grupos: as 4 áreas e, por último, o que vale para todas.
export const GRUPOS_DE_DIREITOS = [...AREAS, 'transversal']

export function agruparPorArea(temas) {
  return GRUPOS_DE_DIREITOS.map((area) => ({ area, temas: temas.filter((tema) => tema.area === area) })).filter(
    (grupo) => grupo.temas.length > 0,
  )
}
