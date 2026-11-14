// Regras das propostas da seleção fixa (funções puras).
// Cada proposta junta o texto simples escrito pela equipe (propostas.json)
// com os dados oficiais coletados na Câmara (propostas-oficiais.json).
import { semTravessao } from './texto.js'

export const PROPOSTAS_POR_PAGINA = 10

// Junta texto simples e dados oficiais. Sem dado oficial, a proposta não aparece.
export function montarProposta(item, oficial) {
  if (!oficial) {
    return null
  }
  return {
    id: item.id,
    area: item.area,
    titulo: item.titulo,
    resumo: item.resumo,
    sigla: `${oficial.siglaTipo} ${oficial.numero}/${oficial.ano}`,
    siglaTipo: oficial.siglaTipo,
    ementa: semTravessao(oficial.ementa),
    apresentadaEm: oficial.dataApresentacao,
    etapa: oficial.situacao.etapa,
    situacaoOficial: semTravessao(oficial.situacao.descricao),
    situacaoEm: oficial.situacao.data,
    autores: oficial.autores,
    totalAutores: oficial.totalAutores,
    urlPagina: oficial.urlCamara,
    urlTexto: oficial.urlInteiroTeor,
    consultadoEm: oficial.consultadoEm,
  }
}

// Tira acentos e maiúsculas, para "saúde" achar "Saude" e vice-versa.
function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
}

// Filtra por área, tipo (PL, PEC, PLP) e palavra-chave no título, no resumo e na ementa.
export function filtrarPropostas(lista, { area, tipo, busca }) {
  const termo = normalizar(busca).trim()
  return lista.filter((proposta) => {
    if (area && proposta.area !== area) {
      return false
    } else if (tipo && proposta.siglaTipo !== tipo) {
      return false
    } else if (termo) {
      return normalizar(`${proposta.sigla} ${proposta.titulo} ${proposta.resumo} ${proposta.ementa}`).includes(termo)
    } else {
      return true
    }
  })
}

// Das mais novas para as mais antigas (pela data de apresentação).
export function ordenarPorData(lista) {
  return [...lista].sort((a, b) => String(b.apresentadaEm).localeCompare(String(a.apresentadaEm)))
}

// Uma página da lista. A página pedida fica entre 1 e a última.
export function paginar(lista, pagina, porPagina = PROPOSTAS_POR_PAGINA) {
  const totalPaginas = Math.max(1, Math.ceil(lista.length / porPagina))
  const paginaAtual = Math.min(Math.max(1, pagina), totalPaginas)
  const inicio = (paginaAtual - 1) * porPagina
  return { itens: lista.slice(inicio, inicio + porPagina), paginaAtual, totalPaginas }
}

// Proposta do dia: muda a cada dia, sempre a mesma para a mesma data.
// A escolha é automática (pela data), não é destaque nem recomendação.
export function escolherPropostaDoDia(lista, dataIso) {
  if (lista.length === 0) {
    return null
  }
  const numero = Number(String(dataIso).replace(/\D/g, ''))
  return lista[numero % lista.length]
}
