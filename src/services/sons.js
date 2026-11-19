// Toca as notas no navegador com a Web Audio API (sem arquivos de áudio).
// O navegador só libera o som depois de um toque ou tecla da pessoa: antes
// disso, o pedido é ignorado em silêncio. Se o aparelho não tiver Web Audio,
// nada acontece e o site segue normal.

// Volume baixinho e um filtro que tira o "brilho" agudo demais: o som fica
// macio, fofinho.
const VOLUME_GERAL = 0.18
const FILTRO_HZ = 3800
let contexto = null

function pegarContexto() {
  if (contexto) {
    return contexto
  }
  const Classe = window.AudioContext || window.webkitAudioContext
  if (!Classe) {
    return null
  }
  contexto = new Classe()
  return contexto
}

// Libera o áudio no primeiro toque ou tecla (regra dos navegadores).
function liberarNoPrimeiroToque() {
  const liberar = () => {
    const ctx = pegarContexto()
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {})
    }
  }
  window.addEventListener('pointerdown', liberar, { once: true })
  window.addEventListener('keydown', liberar, { once: true })
}
if (typeof window !== 'undefined') {
  liberarNoPrimeiroToque()
}

export function tocarNotas(notas) {
  try {
    const ctx = pegarContexto()
    if (!ctx || ctx.state !== 'running') {
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {})
      }
      return
    }
    const agora = ctx.currentTime + 0.01
    const filtro = ctx.createBiquadFilter()
    filtro.type = 'lowpass'
    filtro.frequency.value = FILTRO_HZ
    filtro.connect(ctx.destination)

    for (const nota of notas) {
      const oscilador = ctx.createOscillator()
      const ganho = ctx.createGain()
      const inicio = agora + nota.inicio
      const fim = inicio + nota.duracao
      oscilador.type = 'sine'
      oscilador.frequency.setValueAtTime(nota.freq, inicio)
      // "ate": o tom desliza, como uma bolhinha ("blup").
      if (nota.ate) {
        oscilador.frequency.exponentialRampToValueAtTime(nota.ate, inicio + Math.min(nota.duracao, 0.12))
      }
      // Entrada macia (sem "clique") e final que some devagar.
      ganho.gain.setValueAtTime(0.0001, inicio)
      ganho.gain.exponentialRampToValueAtTime(nota.volume * VOLUME_GERAL, inicio + 0.025)
      ganho.gain.exponentialRampToValueAtTime(0.0001, fim)
      oscilador.connect(ganho).connect(filtro)
      oscilador.start(inicio)
      oscilador.stop(fim + 0.05)
    }
  } catch {
    // Sem som neste aparelho: tudo bem.
  }
}
