// Sons da trilha (funções puras): quais notas tocar em cada momento. Todos
// são fofinhos: só ondas suaves (sine), como bolhinhas e caixinha de música,
// com entrada macia e final que some devagar. Nada aqui toca som: o serviço
// (services/sons.js) é que toca.
// Cada nota: { freq } em Hz, { ate } (opcional, o tom desliza até ele),
// { inicio } e { duracao } em segundos e { volume } de 0 a 1.

export const SONS = {
  // Acerto: duas bolhinhas subindo ("blup blup!") e um brilho bem baixinho.
  acerto: [
    { freq: 660, ate: 990, inicio: 0, duracao: 0.14, volume: 0.6 },
    { freq: 990, ate: 1480, inicio: 0.12, duracao: 0.18, volume: 0.55 },
    { freq: 2960, inicio: 0.22, duracao: 0.3, volume: 0.08 },
  ],
  // Erro: um "blup" macio descendo, sem susto (errar faz parte).
  erro: [
    { freq: 520, ate: 400, inicio: 0, duracao: 0.22, volume: 0.45 },
  ],
  // Comemoração (fim da lição): caixinha de música subindo, notas que se
  // misturam umas nas outras.
  comemoracao: [
    { freq: 1047, inicio: 0, duracao: 0.5, volume: 0.4 },
    { freq: 1319, inicio: 0.12, duracao: 0.5, volume: 0.4 },
    { freq: 1568, inicio: 0.24, duracao: 0.55, volume: 0.4 },
    { freq: 2093, inicio: 0.36, duracao: 0.8, volume: 0.35 },
  ],
  // Medalha nova: sininhos ("dlim dlim dlim!") com brilho no final.
  medalha: [
    { freq: 1568, inicio: 0, duracao: 0.45, volume: 0.35 },
    { freq: 2093, inicio: 0.14, duracao: 0.45, volume: 0.35 },
    { freq: 2637, inicio: 0.28, duracao: 0.9, volume: 0.32 },
    { freq: 3136, ate: 3320, inicio: 0.42, duracao: 0.6, volume: 0.1 },
  ],
}

// Cada número da contagem do foguinho é uma bolhinha um pouco mais aguda.
export function somDaContagem(numero) {
  const freq = Math.min(520 + numero * 70, 1600)
  return [{ freq, ate: freq * 1.4, inicio: 0, duracao: 0.1, volume: 0.45 }]
}
