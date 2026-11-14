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

// Medalha (seção 10) em formato de selo postal picotado, com o ícone no centro e
// o fundo na cor do mascote que entrega. Ainda não ganha: cinza, com cadeado e
// o que falta para conquistar. Na coleção, os selos ficam levemente inclinados.
export default function Medalha({ medalha, como: Tag = 'li' }) {
  const Icone = medalha.ganha ? (ICONES[medalha.id] ?? Award) : Lock
  const selo = medalha.ganha
    ? `text-texto ${FUNDOS[medalha.mascote]}`
    : 'bg-desativado text-texto-2'

  return (
    <Tag className="flex flex-col items-center gap-2 text-center">
      <span className="selo-medalha selo-picotado bg-white drop-shadow-[0_0.1875rem_0.25rem_rgb(42_0_129/0.22)]">
        <span className={`flex h-20 w-16 items-center justify-center ${selo}`}>
          <Icone size={30} strokeWidth={2} aria-hidden="true" />
        </span>
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
