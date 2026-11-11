import { ALargeSmall } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import { usePreferencias } from '../hooks/usePreferencias.js'

const t = textos.preferencias.letra

const estiloBotao =
  'inline-flex min-h-12 min-w-12 items-center justify-center rounded-botao border-2 border-secundario-borda bg-secundario font-titulo text-rotulo font-bold text-secundario-texto transition-colors duration-150 hover:bg-lilas-claro'

// A+ / A-. Os botões ficam sempre ativos; no limite, um aviso explica.
export default function ControleTamanhoLetra() {
  const { letra } = usePreferencias()

  let aviso = preencher(t.atual, { valor: letra.nivel })
  if (letra.limite === 'maximo') {
    aviso = t.noMaximo
  } else if (letra.limite === 'minimo') {
    aviso = t.noMinimo
  }

  return (
    <div role="group" aria-label={t.grupo} className="flex flex-wrap items-center gap-2">
      <ALargeSmall size={24} strokeWidth={2} aria-hidden="true" className="text-texto-2" />
      <button type="button" onClick={letra.diminuir} aria-label={t.diminuirRotulo} className={estiloBotao}>
        {t.diminuir}
      </button>
      <button type="button" onClick={letra.aumentar} aria-label={t.aumentarRotulo} className={estiloBotao}>
        {t.aumentar}
      </button>
      <p aria-live="polite" className="text-legenda text-texto-2">
        {aviso}
      </p>
    </div>
  )
}
