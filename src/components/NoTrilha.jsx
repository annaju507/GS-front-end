import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Lock, Star } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'

const t = textos.trilha

// Altura de cada parada do caminho, em rem (usada também pelo traçado).
export const ALTURA_PARADA = 8

// Cor da face e da lateral (--lado) de cada parada. O relevo vem da classe
// .botao-trilha (index.css).
const ESTILOS = {
  concluida: 'bg-lilas text-marca-botao-texto [--lado:var(--color-lilas-sombra)]',
  atual: 'bg-botao text-botao-texto [--lado:var(--botao-degrau)] outline outline-[0.3125rem] outline-lilas-claro',
  bloqueada: 'bg-desativado text-texto-2 [--lado:var(--borda-campo)]',
}

// Três estrelas embaixo da parada: cheias conforme os acertos no quiz.
function Estrelas({ quantas }) {
  return (
    <span aria-hidden="true" className="absolute left-1/2 top-full mt-3.5 flex -translate-x-1/2 gap-0.5">
      {[1, 2, 3].map((posicao) => (
        <Star
          key={posicao}
          size={18}
          strokeWidth={2}
          className={posicao <= quantas ? 'fill-onca text-onca' : 'fill-superficie text-borda-campo'}
        />
      ))}
    </span>
  )
}

// Parada do caminho da trilha (seção 10): círculo numerado com degrau 3D, o
// nome ao lado e as estrelas embaixo. Concluída e atual são links. Bloqueada é
// um botão indisponível (aria-disabled): não leva a lugar nenhum, mas o Tab
// para nela e o leitor de tela lê o nome e que está bloqueada.
// "x" é a posição em % da largura e "lado", onde fica o nome.
// "desbloqueando": a lição acabou de ser liberada; ela pula depois que as
// pegadas chegam ("atrasoDesbloqueio", em ms) e a página rola até ela.
export default function NoTrilha({ licao, numero, estado, estrelas, x, lado, linha, desbloqueando = false, atrasoDesbloqueio = 0 }) {
  const refParada = useRef(null)

  // Manipulação do DOM: leva a lição recém-liberada para o meio da tela.
  useEffect(() => {
    if (desbloqueando && refParada.current) {
      const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      refParada.current.scrollIntoView({ block: 'center', behavior: reduzir ? 'auto' : 'smooth' })
    }
  }, [desbloqueando])

  const modeloRotulo = { concluida: t.noConcluido, atual: t.noAtual, bloqueada: t.noBloqueado }[estado]
  const rotulo = preencher(modeloRotulo, { ordem: numero, titulo: licao.titulo, estrelas })
  const nomeNaEsquerda = lado === 'esquerda'

  // A parada fica presa pelo centro do círculo e ocupa o espaço até a borda
  // do lado livre, onde o nome pode crescer (até 10rem) antes de quebrar.
  const posicao = nomeNaEsquerda
    ? { top: `${(linha + 0.5) * ALTURA_PARADA}rem`, right: `calc(${100 - x}% - 2rem)`, width: `calc(${x}% + 2rem)` }
    : { top: `${(linha + 0.5) * ALTURA_PARADA}rem`, left: `calc(${x}% - 2rem)`, width: `calc(${100 - x}% + 2rem)` }

  const conteudo = (
    <>
      <span
        className={`relative shrink-0 ${desbloqueando ? 'desbloqueando' : estado === 'atual' ? 'chamar' : ''}`}
        style={desbloqueando ? { animationDelay: `${atrasoDesbloqueio}ms` } : undefined}
      >
        <span
          className={`botao-trilha flex size-16 items-center justify-center rounded-full font-titulo text-h3 font-extrabold ${ESTILOS[estado]}`}
        >
          {numero}
          {estado === 'bloqueada' && (
            <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-superficie text-texto-2 shadow">
              <Lock size={14} strokeWidth={2.5} aria-hidden="true" />
            </span>
          )}
        </span>
        {estado === 'concluida' && <Estrelas quantas={estrelas} />}
        <span ref={refParada} aria-hidden="true" className="absolute inset-0" />
      </span>
      <span aria-hidden="true" className={`flex min-w-0 max-w-40 flex-col ${nomeNaEsquerda ? 'text-right' : ''}`}>
        {estado === 'atual' && (
          <span className="font-titulo text-tag font-extrabold uppercase tracking-[0.05em] text-link">{t.comecar}</span>
        )}
        <span className={`font-titulo text-tag font-bold ${estado === 'bloqueada' ? 'text-texto-2' : 'text-texto'}`}>
          {licao.titulo}
        </span>
      </span>
    </>
  )

  const classes = `group flex w-fit max-w-full -translate-y-1/2 items-center gap-3 ${nomeNaEsquerda ? 'flex-row-reverse' : ''}`

  return (
    <li className={`absolute flex ${nomeNaEsquerda ? 'justify-end' : ''}`} style={posicao}>
      {estado === 'bloqueada' ? (
        <button type="button" aria-disabled="true" aria-label={rotulo} className={`${classes.replace('group ', '')} cursor-not-allowed rounded-full text-left`}>
          {conteudo}
        </button>
      ) : (
        <Link to={`/app/licao/${licao.id}`} aria-label={rotulo} className={`${classes} rounded-full no-underline`}>
          {conteudo}
        </Link>
      )}
    </li>
  )
}
