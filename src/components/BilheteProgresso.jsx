import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import ImagemRio from './ImagemRio.jsx'

const t = textos.trilha.bilhete

// Progresso da trilha em forma de bilhete: foto do Museu Nacional, o total de
// unidades e lições e um canhoto picotado com a porcentagem. A barra é um
// progressbar de verdade, e a porcentagem sempre aparece escrita.
export default function BilheteProgresso({ valor, rotulo, unidades, licoes }) {
  const porcentagem = Math.min(100, Math.max(0, Math.round(valor)))

  return (
    <div className="flex overflow-hidden rounded-card bg-superficie shadow-modal">
      <ImagemRio nome="museu-nacional" className="hidden w-32 shrink-0 sm:block" />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-4">
        <p className="font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2">{t.rotulo}</p>
        <p className="font-titulo font-bold">{preencher(t.resumo, { unidades, licoes })}</p>
        <div
          role="progressbar"
          aria-label={rotulo}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={porcentagem}
          aria-valuetext={preencher(textos.progresso.concluido, { valor: porcentagem })}
          className="h-2.5 rounded-full bg-lilas-claro"
        >
          <div className="h-2.5 rounded-full bg-lilas transition-[width] duration-300 ease-out" style={{ width: `${porcentagem}%` }} />
        </div>
      </div>
      <div aria-hidden="true" className="flex w-24 shrink-0 flex-col items-center justify-center border-l-4 border-dashed border-white/80 bg-indigo px-2 text-center text-white">
        <span className="font-titulo text-h2 font-extrabold leading-none">{porcentagem}%</span>
        <span className="mt-1 font-titulo text-[0.625rem] font-bold uppercase tracking-[0.06em]">{t.concluido}</span>
      </div>
    </div>
  )
}
