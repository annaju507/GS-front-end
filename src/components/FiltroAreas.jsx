import { BookOpen, Bus, HeartPulse, LayoutGrid, Shapes, ShieldCheck } from 'lucide-react'
import textos from '../data/textos.json'
import { AREAS } from '../domain/areas.js'
import { coresDaArea } from './coresArea.js'

const ICONES = { todas: LayoutGrid, saude: HeartPulse, educacao: BookOpen, seguranca: ShieldCheck, cidade: Bus, outros: Shapes }

// Filtro por área temática: pílulas grandes na cor de cada área, com degrau.
// A marcada fica cheia de cor (aria-pressed). "valor" vazio significa todas
// as áreas. "areas": quais áreas mostrar (as propostas usam também "outros").
export default function FiltroAreas({ valor, onMudar, rotulo, areas = AREAS }) {
  const opcoes = [{ chave: '', nome: textos.agora.filtros.todas, Icone: ICONES.todas }].concat(
    areas.map((area) => ({ chave: area, nome: textos.areas[area], Icone: ICONES[area] })),
  )

  return (
    <div role="group" aria-label={rotulo} className="flex flex-wrap gap-2.5 pb-1">
      {opcoes.map(({ chave, nome, Icone }) => {
        const marcado = valor === chave
        const cores = coresDaArea(chave || 'neutra')
        let classes = cores.bloco
        let degrau = cores.degrau
        if (marcado) {
          classes = cores.cheio
          degrau = 'var(--texto)'
        }
        return (
          <button
            key={chave || 'todas'}
            type="button"
            aria-pressed={marcado}
            onClick={() => onMudar(chave)}
            style={{ boxShadow: `0 0.25rem 0 ${degrau}` }}
            className={`inline-flex min-h-11 items-center gap-2 rounded-full border-2 px-4 font-titulo text-legenda font-bold transition-transform duration-150 hover:-translate-y-0.5 motion-reduce:transition-none ${classes}`}
          >
            <Icone size={18} strokeWidth={2.25} aria-hidden="true" />
            {nome}
          </button>
        )
      })}
    </div>
  )
}
