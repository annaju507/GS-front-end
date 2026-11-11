import { CircleSlash } from 'lucide-react'
import textos from '../data/textos.json'

// Selo de voto (seção 2.4 e Inventário D6). Usa letras (S, N, A) em vez de
// ✓ e ✕, que no quiz significam certo e errado. O rótulo escrito aparece
// sempre; o símbolo é só apoio visual (aria-hidden).
const CIRCULO = 'inline-flex size-7 shrink-0 items-center justify-center rounded-full font-titulo text-tag font-bold'

const SIMBOLOS = {
  sim: `${CIRCULO} border-2 border-voto-sim text-voto-sim`,
  nao: `${CIRCULO} border-2 border-voto-nao text-voto-nao`,
  abstencao: `${CIRCULO} border-2 border-voto-abstencao text-voto-abstencao`,
  obstrucao: `${CIRCULO} text-voto-obstrucao`,
  ausencia: `${CIRCULO} hachura-ausencia border-2 border-voto-contorno`,
  naoVotou: `${CIRCULO} border-2 border-dashed border-voto-contorno text-voto-contorno`,
}

function Simbolo({ tipo }) {
  if (tipo === 'obstrucao') {
    return (
      <span aria-hidden="true" className={SIMBOLOS.obstrucao}>
        <CircleSlash size={28} strokeWidth={2} />
      </span>
    )
  } else if (tipo === 'naoVotou') {
    return (
      <span aria-hidden="true" className={SIMBOLOS.naoVotou}>
        ?
      </span>
    )
  } else {
    return (
      <span aria-hidden="true" className={SIMBOLOS[tipo]}>
        {textos.votos.letras[tipo] ?? ''}
      </span>
    )
  }
}

export default function SeloVoto({ tipo }) {
  const rotulo = textos.votos.rotulos[tipo]
  if (!rotulo) {
    return null
  }

  return (
    <span className="inline-flex items-center gap-2 font-semibold text-texto">
      <Simbolo tipo={tipo} />
      {rotulo}
    </span>
  )
}
