import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'
import textos from '../data/textos.json'
import FotoRepresentante from './FotoRepresentante.jsx'

const t = textos.representantes

// Card igual para todos os políticos: foto oficial, nome, partido (só texto,
// sem cor) e cargo. Sem mascote, sem destaque para ninguém.
export default function CardRepresentante({ pessoa }) {
  return (
    <Link
      to={`/app/representante/${pessoa.id}`}
      className="flex min-h-20 items-center gap-4 rounded-card-pequeno border border-borda bg-superficie p-3 text-texto no-underline transition-colors duration-150 hover:border-lilas"
    >
      <FotoRepresentante pessoa={pessoa} />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-titulo font-semibold">{pessoa.nome}</span>
        <span className="text-legenda text-texto-2">
          {t.cargos[pessoa.cargo].um} · {pessoa.partido || t.semPartido}
        </span>
      </span>
      <ChevronRight size={20} strokeWidth={2} aria-hidden="true" className="shrink-0 text-texto-2" />
    </Link>
  )
}
