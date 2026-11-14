import {
  Archive,
  BadgeCheck,
  Ban,
  BookOpen,
  Building2,
  Bus,
  Clock,
  FileCheck2,
  FilePlus2,
  FileX2,
  HeartPulse,
  Hourglass,
  Landmark,
  Layers,
  Map as IconeMapa,
  PenLine,
  Shapes,
  ArrowRightLeft,
  ShieldCheck,
  Undo2,
  Users,
  Vote,
} from 'lucide-react'
import textos from '../data/textos.json'
import { ehAreaValida } from '../domain/areas.js'
import { ehEsferaValida } from '../domain/esferas.js'
import { ehEtapaValida } from '../domain/tramitacao.js'

// Etiquetas em pílula (seção 6.6): área temática, esfera de governo e
// status da tramitação. O status nunca usa verde ou vermelho.
// "outros" (só nas propostas) usa o estilo neutro: não é uma quinta área.
const AREAS = {
  saude: { Icone: HeartPulse, classes: 'bg-area-saude-fundo text-area-saude border-area-saude-borda' },
  educacao: { Icone: BookOpen, classes: 'bg-area-educacao-fundo text-area-educacao border-area-educacao-borda' },
  seguranca: { Icone: ShieldCheck, classes: 'bg-area-seguranca-fundo text-area-seguranca border-area-seguranca-borda' },
  cidade: { Icone: Bus, classes: 'bg-area-cidade-fundo text-area-cidade border-area-cidade-borda' },
}

const ESFERAS = { municipal: Building2, estadual: IconeMapa, federal: Landmark }

const ETAPAS = {
  apresentada: FilePlus2,
  emAnalise: Clock,
  comissao: Users,
  emConjunto: Layers,
  votacao: Vote,
  aprovada: FileCheck2,
  enviada: ArrowRightLeft,
  rejeitada: FileX2,
  aguardandoSancao: Hourglass,
  sancionada: PenLine,
  virouLei: BadgeCheck,
  vetada: Ban,
  vetoDerrubado: Undo2,
  arquivada: Archive,
  emVigor: BadgeCheck,
}

const NEUTRA = 'bg-superficie text-link border-borda'
const STATUS = 'bg-lilas-claro text-link border-lilas-claro'

function escolherEstilo(tipo, valor) {
  if (tipo === 'area' && ehAreaValida(valor)) {
    return { ...AREAS[valor], rotulo: textos.areas[valor] }
  } else if (tipo === 'area' && valor === 'outros') {
    return { Icone: Shapes, classes: NEUTRA, rotulo: textos.areas.outros }
  } else if (tipo === 'esfera' && ehEsferaValida(valor)) {
    return { Icone: ESFERAS[valor], classes: NEUTRA, rotulo: textos.esferas[valor] }
  } else if (tipo === 'status' && ehEtapaValida(valor)) {
    return { Icone: ETAPAS[valor], classes: STATUS, rotulo: textos.tramitacao[valor] }
  } else {
    return null
  }
}

export default function Etiqueta({ tipo, valor, como: Tag = 'span' }) {
  const estilo = escolherEstilo(tipo, valor)
  if (estilo === null) {
    return null
  }
  const { Icone, classes, rotulo } = estilo

  return (
    <Tag className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-tag font-bold ${classes}`}>
      <Icone size={16} strokeWidth={2} aria-hidden="true" className="shrink-0" />
      {rotulo}
    </Tag>
  )
}
