import { Flame } from 'lucide-react'
import textos from '../data/textos.json'
import { plural } from '../domain/texto.js'

const t = textos.painel.sequencia

// Sequência de dias (seção 10): chama laranja do mico + número.
// Perdeu a sequência? Mensagem gentil, sem culpa.
export default function SequenciaDias({ dias, perdida = false }) {
  let mensagem = plural(dias, t.um, t.varios)
  if (dias === 0 && perdida) {
    mensagem = t.perdida
  } else if (dias === 0) {
    mensagem = t.nenhum
  }

  return (
    <div className="flex items-center gap-3">
      <Flame size={32} strokeWidth={2} aria-hidden="true" className="shrink-0 text-mico" />
      <p className="flex flex-col">
        <span aria-hidden="true" className="font-titulo text-h2 font-extrabold leading-none">{dias}</span>
        <span className="text-legenda font-semibold text-texto-2">{mensagem}</span>
      </p>
    </div>
  )
}
