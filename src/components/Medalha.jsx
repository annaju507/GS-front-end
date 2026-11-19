import { Lock } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import IconePremio from './IconePremio.jsx'

const t = textos.medalhas

// Medalha (seção 10) num cartão: o prêmio, o nome e quem entregou. Ganha:
// cartão dourado com degrau. Ainda não ganha: borda tracejada, prêmio
// apagado, a etiqueta "Falta" com cadeado e o que fazer para conquistar.
// As cores vêm dos tokens (dourado claro no tema claro, dourado escuro no
// escuro), então o texto fica legível nos dois.
export default function Medalha({ medalha, como: Tag = 'li', className = '', style }) {
  if (medalha.ganha) {
    return (
      <Tag
        style={style}
        className={`flex flex-col items-center gap-1.5 rounded-modal border-2 border-ouro-borda bg-ouro-fundo px-3 py-4 text-center shadow-[0_0.3rem_0_var(--ouro-borda)] transition-transform duration-200 hover:-translate-y-1 hover:rotate-2 motion-reduce:transition-none ${className}`}
      >
        <IconePremio medalha={medalha.id} tamanho={56} />
        <span className="font-titulo text-legenda font-bold leading-tight">{t.nomes[medalha.id]}</span>
        <span className="text-tag font-semibold text-texto-2">{preencher(t.entreguePor, { mascote: textos.mascotes[medalha.mascote] })}</span>
      </Tag>
    )
  }

  return (
    <Tag
      style={style}
      className={`flex flex-col items-center gap-1.5 rounded-modal border-2 border-dashed border-borda bg-superficie px-3 py-4 text-center ${className}`}
    >
      <IconePremio medalha={medalha.id} tamanho={56} className="opacity-35 grayscale" />
      <span className="font-titulo text-legenda font-bold leading-tight">{t.nomes[medalha.id]}</span>
      <span className="inline-flex items-center gap-1 rounded-full bg-lilas-claro px-2 py-0.5 font-titulo text-tag font-bold text-texto-2">
        <Lock size={12} strokeWidth={2.5} aria-hidden="true" />
        {t.falta}
        <span className="sr-only">: {t.bloqueada}</span>
      </span>
      <span className="text-tag font-semibold text-texto-2">{t.comoGanhar[medalha.id]}</span>
    </Tag>
  )
}
