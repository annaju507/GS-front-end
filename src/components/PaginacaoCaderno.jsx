import { ChevronLeft, ChevronRight } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'

const PADRAO = textos.caderno.paginacao

// Setas para ir e voltar (no caderno, entre as propostas; no Agora, entre as
// páginas), o número "2 de 7" e uma barra que mostra em que ponto a pessoa
// está. Nas pontas, a seta fica desativada. O número é anunciado pelo leitor
// de tela (aria-live). "rotulos" troca os textos (padrão: os do caderno).
export default function PaginacaoCaderno({ indice, total, onMudar, rotulos = PADRAO }) {
  const t = rotulos
  const primeira = indice === 0
  const ultima = indice === total - 1
  const porcentagem = ((indice + 1) / total) * 100

  const seta =
    'grid size-11 shrink-0 place-items-center rounded-full border-2 border-secundario-borda bg-superficie text-secundario-texto transition-colors duration-150 hover:bg-lilas-claro disabled:border-borda disabled:text-texto-desativado disabled:hover:bg-superficie'

  return (
    <nav aria-label={t.rotulo} className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => onMudar(indice - 1)} disabled={primeira} className={seta}>
          <ChevronLeft size={22} strokeWidth={2.5} aria-hidden="true" />
          <span className="sr-only">{t.anterior}</span>
        </button>
        <p aria-live="polite" className="font-titulo text-rotulo font-bold">
          <span aria-hidden="true">{preencher(t.posicao, { n: indice + 1, total })}</span>
          <span className="sr-only">{preencher(t.posicaoLeitor, { n: indice + 1, total })}</span>
        </p>
        <button type="button" onClick={() => onMudar(indice + 1)} disabled={ultima} className={seta}>
          <ChevronRight size={22} strokeWidth={2.5} aria-hidden="true" />
          <span className="sr-only">{t.proxima}</span>
        </button>
      </div>
      <div aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-lilas-claro">
        <div className="h-full rounded-full bg-indigo transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${porcentagem}%` }} />
      </div>
    </nav>
  )
}
