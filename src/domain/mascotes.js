// Mascotes e expressões disponíveis (arquivos em src/assets/mascotes).

export const MASCOTES = ['caramelo', 'capivara', 'arara', 'onca', 'mico']

export const EXPRESSOES = ['alerta', 'comemorando', 'explicando', 'feliz', 'pensativo']

// Tamanho real dos arquivos (quadrados), usado em width/height das imagens.
export const TAMANHO_ARQUIVO = { avatar: 192, corpo: 1024 }

// Não existe arte de "ops": o erro no quiz usa a expressão pensativa.
export function escolherExpressao(expressao) {
  if (expressao === 'ops') {
    return 'pensativo'
  } else if (EXPRESSOES.includes(expressao)) {
    return expressao
  } else {
    return 'feliz'
  }
}

export function validarMascote(mascote) {
  if (MASCOTES.includes(mascote)) {
    return mascote
  } else {
    return 'caramelo'
  }
}
