// Geometria do caminho da trilha (funções puras, em pixels).

// Curva suave que passa por todos os pontos: cada trecho é um "S" que sai e
// chega na vertical, então o caminho flui sem quinas entre as paradas e as
// pegadas saem por baixo da parada (onde ficam as estrelas), não de lado.
// Devolve um trecho por par de paradas: { p0, c1, c2, p1 }.
export function curvaSuave(pontos) {
  const trechos = []
  for (let i = 0; i < pontos.length - 1; i++) {
    const p0 = pontos[i]
    const p1 = pontos[i + 1]
    const meio = (p1.y - p0.y) / 2
    trechos.push({
      p0,
      c1: { x: p0.x, y: p0.y + meio },
      c2: { x: p1.x, y: p1.y - meio },
      p1,
    })
  }
  return trechos
}

// Ponto e direção da curva de Bézier no instante t (de 0 a 1).
function pontoNaCurva({ p0, c1, c2, p1 }, t) {
  const u = 1 - t
  const x = u * u * u * p0.x + 3 * u * u * t * c1.x + 3 * u * t * t * c2.x + t * t * t * p1.x
  const y = u * u * u * p0.y + 3 * u * u * t * c1.y + 3 * u * t * t * c2.y + t * t * t * p1.y
  const dx = 3 * u * u * (c1.x - p0.x) + 6 * u * t * (c2.x - c1.x) + 3 * t * t * (p1.x - c2.x)
  const dy = 3 * u * u * (c1.y - p0.y) + 6 * u * t * (c2.y - c1.y) + 3 * t * t * (p1.y - c2.y)
  return { x, y, dx, dy }
}

// Pegadas ao longo de um trecho, uma a cada "espaco" px, alternando pé
// esquerdo e direito. Não pisa em cima das paradas: deixa "margemInicio" px
// depois da parada de saída (onde ficam as estrelas) e "margemFim" antes da chegada.
// Cada pegada: { x, y, angulo } (ângulo em graus, apontando para onde anda).
export function pegadasDoTrecho(trecho, { espaco, margemInicio, margemFim, desvio }) {
  // Mede o comprimento da curva somando pedacinhos.
  const AMOSTRAS = 80
  const pontos = []
  let comprimento = 0
  let anterior = pontoNaCurva(trecho, 0)
  pontos.push({ ...anterior, distancia: 0 })
  for (let i = 1; i <= AMOSTRAS; i++) {
    const atual = pontoNaCurva(trecho, i / AMOSTRAS)
    comprimento += Math.hypot(atual.x - anterior.x, atual.y - anterior.y)
    pontos.push({ ...atual, distancia: comprimento })
    anterior = atual
  }

  const util = comprimento - margemInicio - margemFim
  if (util <= 0) {
    return []
  }
  const quantas = Math.max(1, Math.round(util / espaco))
  const passo = util / quantas
  const pegadas = []
  let indice = 0
  for (let n = 0; n <= quantas; n++) {
    const alvo = margemInicio + n * passo
    while (indice < pontos.length - 1 && pontos[indice + 1].distancia < alvo) {
      indice++
    }
    const ponto = pontos[Math.min(indice + 1, pontos.length - 1)]
    const tamanhoDirecao = Math.hypot(ponto.dx, ponto.dy) || 1
    // Desloca para o lado (perpendicular à direção), alternando os pés.
    const lado = n % 2 === 0 ? 1 : -1
    const nx = (-ponto.dy / tamanhoDirecao) * desvio * lado
    const ny = (ponto.dx / tamanhoDirecao) * desvio * lado
    const angulo = (Math.atan2(ponto.dy, ponto.dx) * 180) / Math.PI + 90
    pegadas.push({ x: ponto.x + nx, y: ponto.y + ny, angulo })
  }
  return pegadas
}
