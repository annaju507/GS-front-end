import { useId, useState } from 'react'
import { ChevronDown, CircleAlert, CircleCheck, Lightbulb } from 'lucide-react'
import textos from '../data/textos.json'
import Botao from './Botao.jsx'
import ExemploCarioca from './ExemploCarioca.jsx'
import FonteOficial from './FonteOficial.jsx'
import Mascote from './Mascote.jsx'

const t = textos.quiz

// Gaveta de feedback (seção 9): sobe depois de responder, com a cor do
// resultado, a reação do mascote (mico comemora / capivara "ops"),
// "POR QUÊ?" (explicação, analogia e fonte) e "CONTINUAR".
// O foco vai para CONTINUAR (continuarRef vem do useQuiz).
export default function GavetaFeedback({ resultado, pergunta, ultima, continuarRef, onContinuar }) {
  const [abrirPorQue, setAbrirPorQue] = useState(false)
  const idPorQue = useId()
  const acertou = resultado === 'acertou'
  const Icone = acertou ? CircleCheck : CircleAlert

  return (
    <div
      className={`subir-gaveta fixed inset-x-0 bottom-0 z-40 max-h-[85vh] overflow-y-auto rounded-t-modal border-t-2 shadow-modal ${
        acertou ? 'border-sucesso bg-sucesso-fundo' : 'border-erro bg-erro-fundo'
      }`}
    >
      <div className="mx-auto flex max-w-leitura flex-col gap-4 px-4 pb-6 pt-2 md:px-6">
        <span aria-hidden="true" className="mx-auto h-1 w-8 rounded-full bg-borda-campo" />

        <div className="flex items-center gap-3">
          <Mascote nome={acertou ? 'mico' : 'capivara'} expressao={acertou ? 'comemorando' : 'ops'} tamanho="corpo" largura={88} />
          <div className={acertou ? 'text-sucesso' : 'text-erro'}>
            <p className="flex items-center gap-2 font-titulo text-h3 font-extrabold">
              <Icone size={24} strokeWidth={2} aria-hidden="true" />
              {acertou ? t.acertou : t.errou}
            </p>
            <p className="font-semibold">{acertou ? t.fraseAcertou : t.fraseErrou}</p>
          </div>
        </div>

        {abrirPorQue && (
          <section id={idPorQue} aria-label={t.porQueTitulo} className="flex flex-col gap-3 rounded-card bg-superficie p-4 text-texto">
            <h2 className="flex items-center gap-2 text-h3">
              <Lightbulb size={22} strokeWidth={2} aria-hidden="true" className="text-link" />
              {t.porQueTitulo}
            </h2>
            <p>{pergunta.explicacao}</p>
            <ExemploCarioca>
              <p>{pergunta.analogia}</p>
            </ExemploCarioca>
            <FonteOficial fonte={pergunta.fonte} />
          </section>
        )}

        <div className="flex gap-3">
          <Botao
            variante="secundario"
            onClick={() => setAbrirPorQue(!abrirPorQue)}
            aria-expanded={abrirPorQue}
            aria-controls={idPorQue}
            className="shrink-0"
          >
            {textos.botoes.porQue}
            <ChevronDown
              size={20}
              strokeWidth={2}
              aria-hidden="true"
              className={`transition-transform duration-150 ${abrirPorQue ? 'rotate-180' : ''}`}
            />
          </Botao>
          <Botao ref={continuarRef} variante={acertou ? 'acerto' : 'erro'} onClick={onContinuar} className="flex-1">
            {ultima ? t.verResultado : t.continuar}
          </Botao>
        </div>
      </div>
    </div>
  )
}
