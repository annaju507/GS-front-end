import { useId, useState } from 'react'
import { ChevronDown, CircleAlert, CircleCheck, Lightbulb } from 'lucide-react'
import textos from '../data/textos.json'
import Botao from './Botao.jsx'
import ExemploCarioca from './ExemploCarioca.jsx'
import FonteOficial from './FonteOficial.jsx'
import Mascote from './Mascote.jsx'

const t = textos.quiz

// Gaveta de feedback (seção 9): sobe depois de responder, com a cor do
// resultado (sem mascote: quem reage é a capivara da pergunta), "POR QUÊ?"
// (a capivara explicando, com a explicação, a analogia e a fonte) e "CONTINUAR".
// O foco vai para CONTINUAR (continuarRef vem do useQuiz).
// A altura máxima deixa o topo da tela livre: a pergunta e a capivara
// continuam à mostra mesmo com o "Por quê?" aberto (ele rola por dentro).
export default function GavetaFeedback({ resultado, pergunta, ultima, continuarRef, onContinuar }) {
  const [abrirPorQue, setAbrirPorQue] = useState(false)
  const idPorQue = useId()
  const acertou = resultado === 'acertou'
  const Icone = acertou ? CircleCheck : CircleAlert

  return (
    <div
      className={`subir-gaveta fixed inset-x-0 bottom-0 z-40 max-h-[min(85vh,calc(100dvh-17rem))] overflow-y-auto rounded-t-modal border-t-2 shadow-modal ${
        acertou ? 'border-sucesso bg-sucesso-fundo' : 'border-erro bg-erro-fundo'
      }`}
    >
      <div className="mx-auto flex max-w-leitura flex-col gap-4 px-4 pb-6 pt-2 md:px-6">
        <span aria-hidden="true" className="mx-auto h-1 w-8 rounded-full bg-borda-campo" />

        <div>
          <div className={acertou ? 'text-sucesso' : 'text-erro'}>
            <p className="flex items-center gap-2 font-titulo text-h3 font-extrabold">
              <Icone size={24} strokeWidth={2} aria-hidden="true" className="surgir-selo" />
              {acertou ? t.acertou : t.errou}
            </p>
            <p className="font-semibold">{acertou ? t.fraseAcertou : t.fraseErrou}</p>
          </div>
        </div>

        {/* "Por quê?" abre e fecha deslizando: a altura vai de 0 ao tamanho do
            conteúdo (truque das linhas do grid) e o texto aparece aos poucos.
            Fechado, fica inerte: não recebe foco nem é lido. */}
        <div
          className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out motion-reduce:transition-none ${
            abrirPorQue ? 'grid-rows-[1fr] opacity-100' : '-mt-4 grid-rows-[0fr] opacity-0'
          }`}
          inert={!abrirPorQue}
        >
          <div className="min-h-0 overflow-hidden">
            <section id={idPorQue} aria-label={t.porQueTitulo} className="flex flex-col gap-3 rounded-card bg-superficie p-4 text-texto">
              {/* A capivara (professora) explica o porquê. */}
              <div className="flex items-center gap-3">
                <Mascote nome="capivara" expressao="explicando" tamanho="corpo" largura={88} />
                <div className="flex min-w-0 flex-col gap-2">
                  <h2 className="flex items-center gap-2 text-h3">
                    <Lightbulb size={22} strokeWidth={2} aria-hidden="true" className="text-link" />
                    {t.porQueTitulo}
                  </h2>
                  <p>{pergunta.explicacao}</p>
                </div>
              </div>
              <ExemploCarioca>
                <p>{pergunta.analogia}</p>
              </ExemploCarioca>
              <FonteOficial fonte={pergunta.fonte} />
            </section>
          </div>
        </div>

        <div className="flex gap-3">
          <Botao
            variante="secundario"
            onClick={() => setAbrirPorQue(!abrirPorQue)}
            aria-expanded={abrirPorQue}
            aria-controls={idPorQue}
            className="shrink-0 hover:bg-secundario!"
          >
            {textos.botoes.porQue}
            <ChevronDown
              size={20}
              strokeWidth={2}
              aria-hidden="true"
              className={`transition-transform duration-300 ease-out ${abrirPorQue ? 'rotate-180' : ''}`}
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
