import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import Mascote from './Mascote.jsx'

// Barra de progresso (seção 6.7). A porcentagem sempre aparece escrita,
// então a cor não é a única informação. Na trilha, o avatar do mico anda
// na ponta do preenchimento.
export default function BarraProgresso({ valor, rotulo, grossa = true, comMico = false }) {
  const porcentagem = Math.min(100, Math.max(0, Math.round(valor)))
  const textoValor = preencher(textos.progresso.concluido, { valor: porcentagem })
  const altura = grossa ? 'h-3' : 'h-2'

  return (
    <div className="flex items-center gap-3">
      <div
        role="progressbar"
        aria-label={rotulo}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={porcentagem}
        aria-valuetext={textoValor}
        className={`relative flex-1 rounded-full bg-lilas-claro ${altura} ${comMico ? 'my-4' : ''}`}
      >
        <div
          className={`brilho-progresso rounded-full bg-lilas transition-[width] duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)] ${altura}`}
          style={{ width: `${porcentagem}%` }}
        />
        {comMico && (
          <span
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-300 ease-out"
            style={{ left: `${porcentagem}%` }}
          >
            <Mascote nome="mico" expressao="feliz" largura={36} />
          </span>
        )}
      </div>
      <p className="shrink-0 text-legenda font-semibold text-texto-2">{textoValor}</p>
    </div>
  )
}
