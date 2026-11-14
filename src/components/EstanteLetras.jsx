import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'

const t = textos.glossario

// Cores das lombadas, sempre com contraste de pelo menos 4,5:1 entre a
// letra e o fundo. São fixas (não mudam no modo escuro), como livros.
const LOMBADAS = [
  'bg-indigo text-white',
  'bg-lilas text-indigo',
  'bg-mico text-[#1A1A1A]',
  'bg-[#7A4A2A] text-white',
  'bg-azul-ceu text-indigo',
  'bg-lilas-sombra text-white',
  'bg-bloco-pessego text-[#7A4A2A]',
]

// Alturas variadas, para parecer uma prateleira de verdade.
const ALTURAS = ['h-[5.25rem]', 'h-[4.5rem]', 'h-[5rem]', 'h-[4.25rem]', 'h-[5.5rem]', 'h-[4.75rem]']

// Letras do glossário como lombadas de livro numa prateleira.
// Tocar numa lombada leva até os termos daquela letra. No celular, cada
// fileira de lombadas ganha a sua própria prateleira.
export default function EstanteLetras({ letras }) {
  function irParaLetra(evento, letra) {
    const secao = document.getElementById(`secao-${letra}`)
    if (secao) {
      evento.preventDefault()
      const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      secao.scrollIntoView({ behavior: reduzir ? 'auto' : 'smooth', block: 'start' })
      // Leva o foco junto, para quem navega pelo teclado continuar dali.
      const titulo = document.getElementById(`letra-${letra}`)
      titulo.setAttribute('tabindex', '-1')
      titulo.focus({ preventScroll: true })
    }
  }

  return (
    <nav aria-label={t.estante} className="flex flex-col gap-2">
      <p className="font-titulo text-rotulo font-bold">{t.estante}</p>
      <ul className="flex flex-wrap items-end gap-y-3 sm:border-b-8 sm:border-[#7A4A2A] sm:px-2">
        {letras.map((letra, indice) => (
          <li key={letra} className="border-b-8 border-[#7A4A2A] px-0.5 sm:border-b-0">
            <a
              href={`#secao-${letra}`}
              onClick={(evento) => irParaLetra(evento, letra)}
              aria-label={preencher(t.irParaLetra, { letra })}
              className={`flex w-11 flex-col items-center justify-between rounded-t-[0.25rem] pb-2 pt-1.5 font-titulo text-[1.0625rem] font-extrabold no-underline shadow-[inset_-0.25rem_0_0_rgb(0_0_0/0.14)] transition-transform duration-150 hover:-translate-y-1 motion-reduce:transition-none ${LOMBADAS[indice % LOMBADAS.length]} ${ALTURAS[indice % ALTURAS.length]}`}
            >
              <span aria-hidden="true">{letra}</span>
              <span aria-hidden="true" className="block h-[0.1875rem] w-3/4 rounded-full bg-current opacity-40" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
