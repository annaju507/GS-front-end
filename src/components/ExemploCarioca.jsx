import { Lightbulb } from 'lucide-react'
import textos from '../data/textos.json'

// Bloco de exemplo carioca / analogia (azul-céu no claro, contorno no escuro).
export default function ExemploCarioca({ children }) {
  return (
    <aside className="flex max-w-leitura gap-3 rounded-card border-2 border-exemplo-borda bg-exemplo-fundo p-4 text-exemplo-texto">
      <Lightbulb size={24} strokeWidth={2} aria-hidden="true" className="shrink-0" />
      <div className="flex flex-col gap-1">
        <p className="font-titulo text-tag font-bold uppercase tracking-[0.05em]">{textos.exemplo.titulo}</p>
        <div>{children}</div>
      </div>
    </aside>
  )
}
