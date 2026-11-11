import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'

// "Passo 2 de 3" com bolinhas. O texto é o que vale; as bolinhas são apoio.
export default function IndicadorPassos({ atual, total }) {
  const passos = Array.from({ length: total }, (_, indice) => indice + 1)

  return (
    <div className="flex items-center gap-3">
      <p className="font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2">
        {preencher(textos.boasVindas.passo, { atual, total })}
      </p>
      <ol aria-hidden="true" className="flex gap-1.5">
        {passos.map((passo) => (
          <li
            key={passo}
            className={`h-2 rounded-full ${passo <= atual ? 'w-6 bg-lilas' : 'w-2 bg-borda-campo'}`}
          />
        ))}
      </ol>
    </div>
  )
}
