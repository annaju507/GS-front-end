import textos from '../data/textos.json'
import { plural } from '../domain/texto.js'
import Foguinho from './Foguinho.jsx'

const t = textos.painel.sequencia

// Sequência de dias (seção 10): o foguinho animado + número.
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
      <Foguinho tamanho={30} />
      <p className="flex flex-col">
        <span aria-hidden="true" className="font-titulo text-h2 font-extrabold leading-none">{dias}</span>
        <span className="text-legenda font-semibold text-texto-2">{mensagem}</span>
      </p>
    </div>
  )
}
