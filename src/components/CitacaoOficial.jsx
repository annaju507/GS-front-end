import { Quote } from 'lucide-react'
import textos from '../data/textos.json'
import FonteOficial from './FonteOficial.jsx'

// Citação de documento oficial (seção 3.3): barra lateral de 4px, fundo
// lilás-claro e a fonte embaixo.
export default function CitacaoOficial({ texto, fonte }) {
  return (
    <figure className="flex flex-col gap-3 rounded-r-card-pequeno border-l-4 border-link bg-lilas-claro p-4">
      <figcaption className="flex items-center gap-2 font-titulo text-tag font-bold uppercase tracking-[0.05em] text-link">
        <Quote size={18} strokeWidth={2} aria-hidden="true" />
        {textos.licao.textoOficial}
      </figcaption>
      <blockquote>
        <p>{texto}</p>
      </blockquote>
      <FonteOficial fonte={fonte} />
    </figure>
  )
}
