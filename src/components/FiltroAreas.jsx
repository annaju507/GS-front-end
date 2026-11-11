import { BookOpen, Bus, HeartPulse, LayoutGrid, ShieldCheck } from 'lucide-react'
import textos from '../data/textos.json'
import { AREAS } from '../domain/areas.js'

const ICONES = { todas: LayoutGrid, saude: HeartPulse, educacao: BookOpen, seguranca: ShieldCheck, cidade: Bus }

// Filtro por área temática: botões que ficam marcados (aria-pressed).
// "valor" vazio significa todas as áreas.
export default function FiltroAreas({ valor, onMudar, rotulo }) {
  const opcoes = [{ chave: '', nome: textos.agora.filtros.todas, Icone: ICONES.todas }].concat(
    AREAS.map((area) => ({ chave: area, nome: textos.areas[area], Icone: ICONES[area] })),
  )

  return (
    <div role="group" aria-label={rotulo} className="flex flex-wrap gap-2">
      {opcoes.map(({ chave, nome, Icone }) => {
        const marcado = valor === chave
        return (
          <button
            key={chave || 'todas'}
            type="button"
            aria-pressed={marcado}
            onClick={() => onMudar(chave)}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 font-semibold transition-colors duration-150 ${
              marcado ? 'border-link bg-lilas-claro text-link' : 'border-borda bg-superficie text-texto hover:border-lilas'
            }`}
          >
            <Icone size={18} strokeWidth={2} aria-hidden="true" />
            {nome}
          </button>
        )
      })}
    </div>
  )
}
