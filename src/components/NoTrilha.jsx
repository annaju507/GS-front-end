import { Link } from 'react-router'
import { Check, Lock, Play } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'

const t = textos.trilha

// Deslocamento do zigue-zague, repetindo a cada 8 nós (em rem).
const DESLOCAMENTO = [0, 1.5, 2.5, 1.5, 0, -1.5, -2.5, -1.5]

const ESTILOS = {
  concluida: 'size-14 bg-lilas text-marca-botao-texto shadow-[0_0.25rem_0_var(--color-lilas-sombra)]',
  atual: 'size-16 bg-botao text-botao-texto shadow-[0_0.25rem_0_var(--botao-degrau)] ring-[0.3125rem] ring-lilas-claro',
  bloqueada: 'size-14 bg-desativado text-texto-2 shadow-[0_0.25rem_0_var(--borda-campo)]',
}

const ICONES = { concluida: Check, atual: Play, bloqueada: Lock }

// Nó do mapa da trilha (seção 10): círculo com degrau 3D e o nome ao lado.
// Concluída e atual são links; bloqueada não é clicável (não leva a lugar nenhum).
export default function NoTrilha({ licao, numero, estado, posicao }) {
  const Icone = ICONES[estado]
  const modeloRotulo = { concluida: t.noConcluido, atual: t.noAtual, bloqueada: t.noBloqueado }[estado]
  const rotulo = preencher(modeloRotulo, { ordem: numero, titulo: licao.titulo })
  const circulo = `degrau flex shrink-0 items-center justify-center rounded-full ${ESTILOS[estado]}`
  const deslocar = { transform: `translateX(${DESLOCAMENTO[posicao % DESLOCAMENTO.length]}rem)` }

  const conteudo = (
    <>
      <span className={circulo}>
        <Icone size={estado === 'atual' ? 28 : 24} strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span aria-hidden="true" className="flex flex-col">
        {estado === 'atual' && (
          <span className="font-titulo text-tag font-extrabold uppercase tracking-[0.05em] text-link">{t.comecar}</span>
        )}
        <span className={`font-titulo text-tag font-bold ${estado === 'bloqueada' ? 'text-texto-2' : 'text-texto'}`}>
          {licao.titulo}
        </span>
      </span>
    </>
  )

  return (
    <li className="flex justify-center">
      {estado === 'bloqueada' ? (
        <span role="img" aria-label={rotulo} className="flex w-52 items-center gap-3" style={deslocar}>
          {conteudo}
        </span>
      ) : (
        <Link to={`/app/licao/${licao.id}`} aria-label={rotulo} className="flex w-52 items-center gap-3 rounded-full no-underline" style={deslocar}>
          {conteudo}
        </Link>
      )}
    </li>
  )
}
