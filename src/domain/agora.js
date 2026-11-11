// Filtros da área Agora (funções puras).
import { TEMAS_DA_CAMARA, ehAreaValida } from './areas.js'

export const TIPOS_DE_PROPOSTA = ['PL', 'PEC', 'PLP']
export const ITENS_POR_PAGINA = 10

// Lê os filtros do endereço (?area=saude&tipo=PL&busca=escola&pagina=2),
// ignorando valores que não existem.
export function lerFiltros(parametros) {
  const area = parametros.get('area')
  const tipo = parametros.get('tipo')
  const pagina = Number(parametros.get('pagina'))
  return {
    area: ehAreaValida(area) ? area : '',
    tipo: TIPOS_DE_PROPOSTA.includes(tipo) ? tipo : '',
    busca: (parametros.get('busca') ?? '').trim(),
    pagina: Number.isInteger(pagina) && pagina > 1 ? pagina : 1,
  }
}

// Transforma os filtros da tela nos parâmetros da API da Câmara.
export function filtrosParaApi({ area, tipo, busca, pagina }) {
  return {
    // Sem tipo escolhido: só projetos de lei e PECs (sem requerimentos e outros papéis internos).
    siglaTipo: tipo || TIPOS_DE_PROPOSTA,
    keywords: busca || undefined,
    codTema: area ? TEMAS_DA_CAMARA[area] : undefined,
    pagina,
    itens: ITENS_POR_PAGINA,
  }
}

// Tem mais página? Se a Câmara devolveu a página cheia, provavelmente sim.
export function temMaisPaginas(quantidade) {
  return quantidade === ITENS_POR_PAGINA
}
