// Regras do glossário (funções puras).

// Tira acentos e maiúsculas para a busca: "orcamento" acha "Orçamento".
export function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

// Filtra pelo nome ou pela sigla. Busca vazia mostra todos.
export function filtrarTermos(termos, busca) {
  const procurado = normalizar(busca)
  if (procurado === '') {
    return termos
  }
  return termos.filter(
    (termo) => normalizar(termo.termo).includes(procurado) || normalizar(termo.sigla).includes(procurado),
  )
}

// Agrupa em ordem alfabética pela primeira letra (sem acento): [{ letra, termos }].
export function agruparPorLetra(termos) {
  const ordenados = [...termos].sort((a, b) => a.termo.localeCompare(b.termo, 'pt-BR'))
  const grupos = []
  for (const termo of ordenados) {
    const letra = normalizar(termo.termo).charAt(0).toUpperCase()
    const ultimo = grupos[grupos.length - 1]
    if (ultimo && ultimo.letra === letra) {
      ultimo.termos.push(termo)
    } else {
      grupos.push({ letra, termos: [termo] })
    }
  }
  return grupos
}

// Separa um texto com marcações [[id|rótulo]] em pedaços de texto e de termo.
export function separarTermos(texto) {
  const pedacos = []
  const padrao = /\[\[([\w-]+)\|([^\]]+)\]\]/g
  let inicio = 0
  for (const encontrado of texto.matchAll(padrao)) {
    if (encontrado.index > inicio) {
      pedacos.push({ tipo: 'texto', texto: texto.slice(inicio, encontrado.index) })
    }
    pedacos.push({ tipo: 'termo', id: encontrado[1], rotulo: encontrado[2] })
    inicio = encontrado.index + encontrado[0].length
  }
  if (inicio < texto.length) {
    pedacos.push({ tipo: 'texto', texto: texto.slice(inicio) })
  }
  return pedacos
}
