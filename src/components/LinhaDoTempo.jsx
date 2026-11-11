import textos from '../data/textos.json'
import { formatarData } from '../domain/datas.js'

// Linha do tempo da tramitação (seção 11.2), vertical, da mais nova para a
// mais antiga. A primeira é a situação atual (nó maior em lilás).
export default function LinhaDoTempo({ passos }) {
  return (
    <ol className="flex flex-col">
      {passos.map((passo, indice) => {
        const atual = indice === 0
        const ultimo = indice === passos.length - 1
        return (
          <li key={passo.sequencia} className="relative flex gap-4 pb-5">
            {!ultimo && <span aria-hidden="true" className="absolute left-[0.6875rem] top-6 h-full w-0.5 bg-borda-campo" />}
            <span
              aria-hidden="true"
              className={`relative z-10 mt-1 shrink-0 rounded-full ${atual ? 'size-6 border-4 border-lilas-claro bg-lilas' : 'ml-1 size-4 bg-link'}`}
            />
            <div className="flex flex-col gap-0.5">
              {atual && (
                <span className="font-titulo text-tag font-bold uppercase tracking-[0.05em] text-link">
                  {textos.proposta.passoAtual}
                </span>
              )}
              <span className="font-semibold">{passo.descricao}</span>
              <span className="text-legenda text-texto-2">
                <time dateTime={passo.data}>{formatarData(passo.data)}</time> · {passo.orgao}
              </span>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
