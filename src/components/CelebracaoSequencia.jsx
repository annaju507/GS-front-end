import { useEffect, useId, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import textos from '../data/textos.json'
import { fraseDaSequencia } from '../domain/painel.js'
import { preencher } from '../domain/texto.js'
import { usePreferencias } from '../hooks/usePreferencias.js'
import Botao from './Botao.jsx'
import Foguinho from './Foguinho.jsx'

const t = textos.painel.entrada

// Posição de cada faísca (fixa, para não mudar a cada desenho da tela).
const FAISCAS = [
  { esquerda: '38%', desvio: '-3rem', atraso: '0s' },
  { esquerda: '46%', desvio: '1.5rem', atraso: '0.4s' },
  { esquerda: '55%', desvio: '3rem', atraso: '0.9s' },
  { esquerda: '62%', desvio: '-1rem', atraso: '0.2s' },
  { esquerda: '42%', desvio: '2.5rem', atraso: '1.3s' },
  { esquerda: '58%', desvio: '-2.5rem', atraso: '0.7s' },
  { esquerda: '50%', desvio: '0.5rem', atraso: '1.6s' },
  { esquerda: '35%', desvio: '-1.5rem', atraso: '1.1s' },
]

// Comemoração da sequência ao entrar: o foguinho acende e solta faíscas, o
// número de dias sobe de 0 até o total e as bolinhas da semana acendem uma a
// uma. Nas cores do site: cartão lilás-claro, número índigo e botão preto.
// Usa o <dialog> nativo (foco preso dentro, Esc fecha, fundo embaçado). Com
// "reduzir animações", já aparece com o número final, sem contagem.
export default function CelebracaoSequencia({ dias, semana, onFechar }) {
  const dialogoRef = useRef(null)
  const idTitulo = useId()
  const { animacoes, sons } = usePreferencias()
  const reduzir = animacoes.reduzir
  const { contar, tocar } = sons
  const [contados, setContados] = useState(reduzir ? dias : 0)

  // Manipulação do DOM: abre o <dialog> ao montar.
  useEffect(() => {
    const dialogo = dialogoRef.current
    if (!dialogo.open) {
      dialogo.showModal()
    }
  }, [])

  // Contagem: um número por vez (mais rápido quando são muitos dias).
  useEffect(() => {
    if (reduzir || contados >= dias) {
      return undefined
    }
    const espera = dias > 7 ? 110 : 260
    const relogio = setTimeout(() => setContados(contados + 1), contados === 0 ? 700 : espera)
    return () => clearTimeout(relogio)
  }, [contados, dias, reduzir])

  // Som: um "toc" mais agudo a cada número e o arpejo quando chega ao total.
  useEffect(() => {
    if (contados === 0) {
      return
    }
    if (contados >= dias) {
      tocar('comemoracao')
    } else {
      contar(contados)
    }
  }, [contados, dias, contar, tocar])

  function fechar() {
    dialogoRef.current.close()
    onFechar()
  }

  // A bolinha acende quando a contagem passa pelos dias estudados da semana.
  const estudados = semana.filter((dia) => dia.estudou).length
  let acesas = Math.min(contados, estudados)
  if (reduzir) {
    acesas = estudados
  }

  const tipoFrase = fraseDaSequencia(dias)
  const frase = preencher(t[tipoFrase], { proximo: dias + 1 })

  return (
    <dialog
      ref={dialogoRef}
      aria-labelledby={idTitulo}
      onCancel={(evento) => {
        evento.preventDefault()
        fechar()
      }}
      className="janela-conta m-auto w-[calc(100%-2rem)] max-w-sm overflow-hidden rounded-modal border-2 border-lilas bg-hero p-0 text-center text-texto shadow-[0_0.5rem_0_var(--color-lilas-sombra)]"
    >
      <div className="relative flex flex-col items-center gap-1 px-6 pb-6 pt-6">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {FAISCAS.map((faisca) => (
            <span
              key={faisca.esquerda + faisca.atraso}
              className="foguinho-faisca"
              style={{ left: faisca.esquerda, '--desvio': faisca.desvio, animationDelay: faisca.atraso }}
            />
          ))}
        </div>
        <Foguinho tamanho={150} className="foguinho-acende relative" />
        <p
          key={contados}
          aria-hidden="true"
          className="foguinho-numero relative -mt-2 font-titulo text-[4.5rem] font-extrabold leading-none text-indigo dark:text-link"
        >
          {contados}
        </p>
        <h2 id={idTitulo} className="relative text-h2">
          <span className="sr-only">{dias} </span>
          {dias === 1 ? t.diaSeguido : t.diasSeguidos}
        </h2>
        <p className="relative mt-1 font-semibold text-texto-2">{frase}</p>

        <ol aria-label={t.semanaRotulo} className="relative my-4 flex justify-center gap-1.5">
          {semana.map((dia, indice) => {
            const posicaoEstudada = semana.slice(0, indice + 1).filter((d) => d.estudou).length
            const acesa = dia.estudou && posicaoEstudada <= acesas
            let bolinha = 'border-2 border-dashed border-lilas bg-superficie'
            if (acesa) {
              bolinha = 'scale-110 border-2 border-indigo bg-indigo text-white'
            }
            return (
              <li key={dia.data} className="flex w-9 flex-col items-center gap-1 font-titulo text-tag font-bold text-texto-2">
                <span className={`grid size-8 place-items-center rounded-full transition-all duration-300 motion-reduce:transition-none ${bolinha}`}>
                  {acesa && <Check size={16} strokeWidth={3} aria-hidden="true" />}
                </span>
                <span aria-hidden="true">{dia.letra}</span>
                <span className="sr-only">{dia.estudou ? preencher(textos.painel.semana.estudou, { letra: dia.letra }) : preencher(textos.painel.semana.naoEstudou, { letra: dia.letra })}</span>
              </li>
            )
          })}
        </ol>

        <Botao variante="primario" onClick={fechar} autoFocus className="relative w-full">
          {t.botao}
        </Botao>
      </div>
    </dialog>
  )
}
