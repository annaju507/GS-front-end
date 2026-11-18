import { CircleAlert, CircleCheck } from 'lucide-react'
import { estadoDaOpcao } from '../domain/quiz.js'

// Opções do quiz (seção 6.4) como grupo de rádio: fieldset + legend.
// A pergunta aparece no balão do mascote; a legend repete a pergunta para o
// leitor de tela (fica escondida na tela, com sr-only).
// Atalhos: as teclas 1, 2, 3 escolhem a opção (ver useAtalhosQuiz).
// Cada opção tem a borda de baixo mais grossa (degrau) e afunda ao clicar.
const ESTILOS = {
  normal: 'apertavel border-borda bg-superficie shadow-[0_0.25rem_0_var(--borda)] hover:border-lilas hover:bg-lilas-claro/40',
  selecionada: 'apertavel border-link bg-lilas-claro shadow-[0_0.25rem_0_var(--link)]',
  correta: 'border-sucesso bg-sucesso-fundo text-sucesso shadow-[0_0.25rem_0_var(--sucesso)] animar-acerto',
  errada: 'border-erro bg-erro-fundo text-erro shadow-[0_0.25rem_0_var(--erro)] animar-erro',
  apagada: 'border-borda bg-superficie text-texto-2',
}

// Número da tecla de atalho (1, 2, 3) no canto da opção.
const ESTILOS_TECLA = {
  normal: 'border-borda text-texto-2',
  selecionada: 'border-link text-link',
  correta: 'border-sucesso text-sucesso',
  errada: 'border-erro text-erro',
  apagada: 'border-borda text-texto-2',
}

const ICONES = { correta: CircleCheck, errada: CircleAlert }

export default function OpcoesQuiz({ nome, pergunta, opcoes, selecionada, correta, respondido, onSelecionar }) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="sr-only">{pergunta}</legend>
      {opcoes.map((opcao, indice) => {
        const estado = estadoDaOpcao(indice, selecionada, correta, respondido)
        const Icone = ICONES[estado]
        return (
          <label
            key={opcao}
            className={`flex min-h-14 items-center gap-3 rounded-card border-2 px-3 py-3 text-center font-semibold has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-foco ${
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
              aria-keyshortcuts={String(indice + 1)}
              className="sr-only"
            />
            <span
              aria-hidden="true"
              className={`flex size-8 shrink-0 items-center justify-center rounded-lg border-2 font-titulo text-tag font-bold ${ESTILOS_TECLA[estado]}`}
            >
              {indice + 1}
            </span>
            <span className="flex flex-1 items-center justify-center gap-2">
              {Icone && <Icone size={20} strokeWidth={2} aria-hidden="true" className="shrink-0" />}
              {opcao}
            </span>
            {/* Espaço do mesmo tamanho do número, para o texto ficar no centro. */}
            <span aria-hidden="true" className="size-8 shrink-0" />
          </label>
        )
      })}
    </fieldset>
  )
}
