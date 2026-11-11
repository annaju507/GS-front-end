import { Scale } from 'lucide-react'
import textos from '../data/textos.json'
import Etiqueta from './Etiqueta.jsx'

// Etiqueta de um tema de Direitos: a área temática ou, quando o direito
// vale para todas as áreas, uma etiqueta neutra.
export default function EtiquetaDireito({ area }) {
  if (area !== 'transversal') {
    return <Etiqueta tipo="area" valor={area} />
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-borda bg-superficie px-3 py-1 text-tag font-bold text-link">
      <Scale size={16} strokeWidth={2} aria-hidden="true" />
      {textos.direitos.transversal}
    </span>
  )
}
