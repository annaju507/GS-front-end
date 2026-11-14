// Filtros da área Agora (funções puras).
import { ehAreaDaProposta } from './areas.js'

export const TIPOS_DE_PROPOSTA = ['PL', 'PEC', 'PLP']

// Lê os filtros do endereço (?area=saude&tipo=PL&busca=escola&pagina=2),
// ignorando valores que não existem.
export function lerFiltros(parametros) {
  const area = parametros.get('area')
  const tipo = parametros.get('tipo')
  const pagina = Number(parametros.get('pagina'))
  return {
    area: ehAreaDaProposta(area) ? area : '',
    tipo: TIPOS_DE_PROPOSTA.includes(tipo) ? tipo : '',
    busca: (parametros.get('busca') ?? '').trim(),
    pagina: Number.isInteger(pagina) && pagina > 1 ? pagina : 1,
  }
}
