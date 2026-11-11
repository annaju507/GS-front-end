import { Award, Columns3, FileSignature, Flag, Flame, Footprints, Layers, Lock, Newspaper, NotebookPen, SearchCheck } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'

const t = textos.medalhas

const ICONES = {
  primeiraLicao: Footprints,
  tresPoderes: Columns3,
  esferas: Layers,
  comoNasceUmaLei: FileSignature,
  chequeiAFonte: SearchCheck,
  primeiraProposta: Newspaper,
  primeiraAnotacao: NotebookPen,
  tresDias: Flame,
  seteDias: Flame,
  trilhaConcluida: Flag,
}

const FUNDOS = {
  caramelo: 'bg-caramelo-fundo',
  capivara: 'bg-capivara-fundo',
  arara: 'bg-arara-fundo',
  onca: 'bg-onca-fundo',
  mico: 'bg-mico-fundo',
}

// Medalha (seção 10): selo redondo com borda lilás, ícone no centro e fundo
// na cor do mascote que entrega. Ainda não ganha: cinza, com cadeado e o
// que falta para conquistar.
export default function Medalha({ medalha, como: Tag = 'li' }) {
  const Icone = medalha.ganha ? (ICONES[medalha.id] ?? Award) : Lock
  const selo = medalha.ganha
    ? `border-lilas text-texto ${FUNDOS[medalha.mascote]}`
    : 'border-borda-campo bg-desativado text-texto-2'

  return (
    <Tag className="flex flex-col items-center gap-2 text-center">
      <span className={`flex size-20 items-center justify-center rounded-full border-4 ${selo}`}>
        <Icone size={32} strokeWidth={2} aria-hidden="true" />
      </span>
      <span className="font-titulo text-tag font-semibold">{t.nomes[medalha.id]}</span>
      <span className="text-tag text-texto-2">
        {medalha.ganha
          ? preencher(t.entreguePor, { mascote: textos.mascotes[medalha.mascote] })
          : `${t.bloqueada}. ${t.comoGanhar[medalha.id]}`}
      </span>
    </Tag>
  )
}
