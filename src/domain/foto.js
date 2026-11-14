// Regras da foto do perfil (funções puras).

// Arquivos maiores que isso nem são lidos: a foto é reduzida antes de
// guardar, mas ler um arquivo enorme trava o celular.
export const FOTO_TAMANHO_MAXIMO = 10 * 1024 * 1024

// Devolve a chave do erro (texto no textos.json) ou null se a foto serve.
export function validarFoto(arquivo) {
  if (!arquivo) {
    return 'nenhuma'
  } else if (!String(arquivo.type).startsWith('image/')) {
    return 'tipo'
  } else if (arquivo.size > FOTO_TAMANHO_MAXIMO) {
    return 'tamanho'
  } else {
    return null
  }
}

// Primeira letra do apelido, para a bolinha sem foto. "anna" -> "A".
export function inicialDoApelido(apelido) {
  const limpo = String(apelido ?? '').trim()
  if (limpo === '') {
    return '?'
  } else {
    return limpo.charAt(0).toLocaleUpperCase('pt-BR')
  }
}

// '2026-11-14T...' -> 'novembro de 2026'.
export function mesEAno(dataIso) {
  const data = new Date(dataIso)
  if (Number.isNaN(data.getTime())) {
    return ''
  } else {
    return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
  }
}
