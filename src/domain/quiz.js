// Regras do quiz (funções puras).

// Estado visual de cada opção: antes de responder, só "selecionada" ou "normal".
// Depois de responder, a certa fica "correta" e a escolhida errada fica "errada".
export function estadoDaOpcao(indice, selecionada, correta, respondido) {
  if (!respondido) {
    return indice === selecionada ? 'selecionada' : 'normal'
  } else if (indice === correta) {
    return 'correta'
  } else if (indice === selecionada) {
    return 'errada'
  } else {
    return 'apagada'
  }
}
