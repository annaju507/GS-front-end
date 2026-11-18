import { Link } from 'react-router'
import { BookA, Lock } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import ImagemRio from './ImagemRio.jsx'

const t = textos.trilha

// Cabeçalho de unidade disponível (seção 10): card preto com degrau e letras
// azul-céu (contraste de cerca de 14:1), "UNIDADE 3", o nome e o atalho para o
// glossário. Fica preto nos dois temas; no escuro ganha uma borda azul-céu
// fina para não sumir no fundo.
export function CabecalhoUnidade({ unidade }) {
  // Nome do atalho com o número e o título da unidade: com vários na página,
  // quem navega pelo Tab sabe de qual unidade é cada glossário.
  const nomeGlossario = preencher(t.glossarioDaUnidade, { numero: unidade.id, titulo: unidade.titulo })
  return (
    <div className="flex items-center justify-between gap-3 rounded-card bg-[#1A1A1A] p-4 text-azul-ceu shadow-[0_0.25rem_0_#000] md:p-5 dark:border-2 dark:border-azul-ceu">
      {unidade.capa && <ImagemRio nome={unidade.capa} className="size-16 shrink-0 rounded-card-pequeno md:size-20" />}
      <div className="flex-1">
        <p className="font-titulo text-tag font-bold uppercase tracking-[0.05em]">{preencher(t.unidade, { numero: unidade.id })}</p>
        <h2 className="text-h3 font-extrabold text-azul-ceu">{unidade.titulo}</h2>
      </div>
      <Link
        to="/app/glossario"
        aria-label={nomeGlossario}
        title={nomeGlossario}
        className="degrau flex size-12 shrink-0 items-center justify-center rounded-card-pequeno bg-azul-ceu text-[#1A1A1A] shadow-[0_0.25rem_0_var(--color-bloco-ceu-degrau)]"
      >
        <BookA size={24} strokeWidth={2} aria-hidden="true" />
      </Link>
    </div>
  )
}

// Divisória de unidade que ainda não abriu: linha com o rótulo no centro.
export function DivisoriaUnidade({ unidade }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span aria-hidden="true" className="h-px flex-1 bg-borda-campo" />
      <h2 className="flex flex-col items-center gap-1 text-center font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2">
        <span>
          {preencher(t.unidade, { numero: unidade.id })} · {unidade.titulo}
        </span>
        <span className="inline-flex items-center gap-1.5 normal-case tracking-normal">
          <Lock size={16} strokeWidth={2} aria-hidden="true" />
          {t.emBreve}
        </span>
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-borda-campo" />
    </div>
  )
}
