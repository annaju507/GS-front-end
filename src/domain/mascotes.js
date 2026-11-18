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

// Só o mascote de corpo inteiro tem animação (o avatar é um recorte do rosto,
// que a animação não tem). Sem animação quando a pessoa pede menos movimento.
export function deveAnimar(tamanho, animado, reduzir) {
  if (reduzir) {
    return false
  } else if (tamanho !== 'corpo') {
    return false
  } else {
    return animado
  }
}

// Arquivo da animação em public/animacoes (ex.: "capivara-feliz").
export function arquivoDaAnimacao(mascote, expressao) {
  return `${validarMascote(mascote)}-${escolherExpressao(expressao)}`
}

// Pose da capivara enquanto faz a pergunta do quiz: pensa esperando a
// resposta, chama a atenção se ninguém escolheu, fica feliz no acerto e
// volta a explicar no erro.
export function poseDaPergunta(resultado) {
  if (resultado === 'acertou') {
    return 'feliz'
  } else if (resultado === 'errou') {
    return 'explicando'
  } else if (resultado === 'semResposta') {
    return 'alerta'
  } else {
    return 'pensativo'
  }
}

// Pose do mico na tela de conquista, conforme o resultado do quiz.
export function poseDaConquista(avaliacao) {
  if (avaliacao === 'perfeito') {
    return 'comemorando'
  } else if (avaliacao === 'bom') {
    return 'feliz'
  } else {
    return 'pensativo'
  }
}
