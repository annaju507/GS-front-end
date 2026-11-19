import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'

const t = textos.painel

// Anel de progresso da trilha: a parte índigo enche até a porcentagem ao
// aparecer (animação em index.css, .anel-enche). A porcentagem e o "da
// trilha" ficam centralizados no meio do círculo. É uma imagem com rótulo.
// As cores são fixas (o anel fica sempre sobre o bloco lilás).
export default function AnelProgresso({ valor }) {
  const raio = 48
  const volta = 2 * Math.PI * raio
  const falta = volta - (volta * valor) / 100

  return (
    <div role="img" aria-label={preencher(t.trilhaPorcentagem, { n: valor })} className="relative size-28 shrink-0 sm:size-32">
      <svg viewBox="0 0 110 110" className="size-full -rotate-90">
        <circle cx="55" cy="55" r={raio} fill="none" strokeWidth="11" className="stroke-white/50" />
        <circle
          cx="55"
          cy="55"
          r={raio}
          fill="none"
          strokeWidth="11"
          strokeLinecap="round"
          className="anel-enche stroke-[#2A0081]"
          style={{ strokeDasharray: volta, '--volta': volta, '--falta': falta, strokeDashoffset: falta }}
        />
      </svg>
      <span aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-[#2A0081]">
        <span className="font-titulo text-[1.5rem] font-extrabold leading-none">{valor}%</span>
        <span className="font-texto text-tag font-bold leading-none">{t.daTrilha}</span>
      </span>
    </div>
  )
}
