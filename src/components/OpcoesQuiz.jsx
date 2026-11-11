import { CircleAlert, CircleCheck } from 'lucide-react'
import { estadoDaOpcao } from '../domain/quiz.js'

// Opções do quiz (seção 6.4) como grupo de rádio: fieldset + legend.
// A pergunta aparece no balão do mascote; a legend repete a pergunta para o
// leitor de tela (fica escondida na tela, com sr-only).
const ESTILOS = {
  normal: 'border-borda bg-superficie shadow-[0_0.1875rem_0_var(--borda)] hover:border-lilas',
  selecionada: 'border-link bg-lilas-claro shadow-[0_0.1875rem_0_var(--link)]',
  correta: 'border-sucesso bg-sucesso-fundo text-sucesso shadow-[0_0.1875rem_0_var(--sucesso)] animar-acerto',
  errada: 'border-erro bg-erro-fundo text-erro shadow-[0_0.1875rem_0_var(--erro)] animar-erro',
  apagada: 'border-borda bg-superficie text-texto-2',
}

const ICONES = { correta: CircleCheck, errada: CircleAlert }

export default function OpcoesQuiz({ nome, pergunta, opcoes, selecionada, correta, respondido, onSelecionar }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="sr-only">{pergunta}</legend>
      {opcoes.map((opcao, indice) => {
        const estado = estadoDaOpcao(indice, selecionada, correta, respondido)
        const Icone = ICONES[estado]
        return (
          <label
            key={opcao}
            className={`flex min-h-14 items-center justify-center gap-2 rounded-card border-[1.5px] px-4 py-3 text-center font-semibold has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-foco ${
              respondido ? 'cursor-default' : 'cursor-pointer'
            } ${ESTILOS[estado]}`}
          >
            <input
              type="radio"
              name={nome}
              value={indice}
              checked={selecionada === indice}
              disabled={respondido}
              onChange={() => onSelecionar(indice)}
              className="sr-only"
            />
            {Icone && <Icone size={20} strokeWidth={2} aria-hidden="true" className="shrink-0" />}
            {opcao}
          </label>
        )
      })}
    </fieldset>
  )
}
