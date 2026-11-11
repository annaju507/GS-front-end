// As 4 áreas temáticas, na ordem oficial do projeto.
// Direitos, benefícios e cidadania são uma camada transversal, não uma quinta área.

export const AREAS = ['saude', 'educacao', 'seguranca', 'cidade']

export function ehAreaValida(area) {
  return AREAS.includes(area)
}

// Temas oficiais da Câmara que entram em cada área (códigos de
// /referencias/proposicoes/codTema). Usados no filtro da área Agora.
export const TEMAS_DA_CAMARA = {
  saude: [56],
  educacao: [46, 35],
  seguranca: [57],
  cidade: [41, 61],
}
