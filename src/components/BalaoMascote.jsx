import { X } from 'lucide-react'
import textos from '../data/textos.json'
import { validarMascote } from '../domain/mascotes.js'
import Mascote from './Mascote.jsx'
import Botao from './Botao.jsx'

// Balão de fala (seções 5.5 e 5.5.1). Fundo na cor clara do mascote, borda de
// 2px na cor de assinatura e setinha apontando para o avatar. No máximo 2 frases.
// "pergunta": a quina de cima fica reta, como no quiz.
// O nome do mascote fica na cor do texto: algumas cores de assinatura (como o
// dourado da onça) não têm contraste suficiente para texto.
const CORES = {
  caramelo: { balao: 'bg-caramelo-fundo border-caramelo', seta: 'before:bg-caramelo-fundo before:border-caramelo', marca: 'bg-caramelo', painel: 'bg-caramelo-fundo', borda: 'border-caramelo' },
  capivara: { balao: 'bg-capivara-fundo border-capivara', seta: 'before:bg-capivara-fundo before:border-capivara', marca: 'bg-capivara', painel: 'bg-capivara-fundo', borda: 'border-capivara' },
  arara: { balao: 'bg-arara-fundo border-arara', seta: 'before:bg-arara-fundo before:border-arara', marca: 'bg-arara', painel: 'bg-arara-fundo', borda: 'border-arara' },
  onca: { balao: 'bg-onca-fundo border-onca', seta: 'before:bg-onca-fundo before:border-onca', marca: 'bg-onca', painel: 'bg-onca-fundo', borda: 'border-onca' },
  mico: { balao: 'bg-mico-fundo border-mico', seta: 'before:bg-mico-fundo before:border-mico', marca: 'bg-mico', painel: 'bg-mico-fundo', borda: 'border-mico' },
}

export default function BalaoMascote({
  mascote,
  expressao = 'explicando',
  pergunta = false,
  acao,
  onFechar,
  anunciar = false,
  corpoInteiro = false,
  id,
  children,
}) {
  const nome = validarMascote(mascote)
  const cores = CORES[nome]

  // Corpo inteiro (lições): o mascote animado ao lado do balão, num painel na
  // cor clara dele. No celular, o balão fica em cima e aponta para baixo.
  if (corpoInteiro) {
    return (
      <div className={`flex flex-col items-center gap-3 rounded-card px-4 pt-4 sm:flex-row sm:items-end sm:gap-5 sm:px-5 ${cores.painel}`}>
        <Mascote nome={nome} expressao={expressao} tamanho="corpo" largura={176} className="order-2 -mb-1 sm:order-1" />
        <div
          className={`balao-corpo relative order-1 flex w-full min-w-0 flex-col gap-2 rounded-card border-2 bg-superficie p-4 text-texto sm:order-2 sm:mb-8 sm:w-auto sm:flex-1 ${cores.borda}`}
          aria-live={anunciar ? 'polite' : undefined}
        >
          <p className="flex items-center gap-2 font-titulo text-tag font-semibold">
            <span aria-hidden="true" className={`size-2.5 rounded-full ${cores.marca}`} />
            {textos.mascotes[nome]}
          </p>
          <div id={id} className="text-corpo">
            {children}
          </div>
        </div>
      </div>
    )
  }
  const forma = pergunta
    ? 'rounded-card rounded-tl-[0.25rem]'
    : `rounded-card before:absolute before:-left-[0.5625rem] before:top-5 before:size-4 before:rotate-45 before:border-b-2 before:border-l-2 before:content-[''] ${cores.seta}`

  return (
    <div className="flex items-start gap-3">
      <Mascote nome={nome} expressao={expressao} largura={pergunta ? 46 : 56} />
      <div
        className={`relative flex min-w-0 flex-1 flex-col gap-2 border-2 p-4 text-texto ${cores.balao} ${forma}`}
        aria-live={anunciar ? 'polite' : undefined}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="flex items-center gap-2 font-titulo text-tag font-semibold">
            <span aria-hidden="true" className={`size-2.5 rounded-full ${cores.marca}`} />
            {textos.mascotes[nome]}
          </p>
          {onFechar && (
            <button
              type="button"
              onClick={onFechar}
              aria-label={textos.botoes.fecharMensagem}
              className="-mr-2 -mt-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-superficie/60"
            >
              <X size={20} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
        <div id={id} className="text-corpo">
          {children}
        </div>
        {acao && (
          <div>
            <Botao variante="secundario" onClick={acao.onClick}>
              {acao.rotulo}
            </Botao>
          </div>
        )}
      </div>
    </div>
  )
}
