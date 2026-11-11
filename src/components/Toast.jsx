import { useEffect } from 'react'
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react'
import textos from '../data/textos.json'

// Toast (seção 6.8): aviso rápido no rodapé (celular) ou no canto inferior
// direito (desktop). Some em 4 segundos, tem botão de fechar e é anunciado
// pelo leitor de tela. Sem mascote. A região aria-live fica sempre na página,
// para o anúncio funcionar quando a mensagem aparece.
const DURACAO_MS = 4000

const TIPOS = {
  sucesso: { Icone: CircleCheck, cor: 'text-sucesso border-sucesso' },
  erro: { Icone: CircleAlert, cor: 'text-erro border-erro' },
  alerta: { Icone: TriangleAlert, cor: 'text-alerta border-alerta' },
  info: { Icone: Info, cor: 'text-info border-info' },
}

export default function Toast({ mensagem, tipo = 'sucesso', onFechar }) {
  useEffect(() => {
    if (!mensagem) {
      return undefined
    }
    const temporizador = setTimeout(onFechar, DURACAO_MS)
    return () => clearTimeout(temporizador)
  }, [mensagem, onFechar])

  const { Icone, cor } = TIPOS[tipo] ?? TIPOS.info

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-40 flex justify-center md:inset-x-auto md:right-6 md:bottom-6"
    >
      {mensagem && (
        <div
          className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-card-pequeno border-2 bg-superficie py-2 pl-4 pr-2 shadow-modal ${cor}`}
        >
          <Icone size={20} strokeWidth={2} aria-hidden="true" className="shrink-0" />
          <p className="flex-1 font-semibold text-texto">{mensagem}</p>
          <button
            type="button"
            onClick={onFechar}
            aria-label={textos.botoes.fecharAviso}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-texto hover:bg-lilas-claro"
          >
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
