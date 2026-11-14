import { useRef } from 'react'
import { Compass, GraduationCap, Megaphone, Search, Trophy } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import Mascote from './Mascote.jsx'

const t = textos.comoFunciona

// Ícone do papel e cores de cada mascote. "tinta" é o fundo claro da frente;
// "cor" é a bolinha do ícone (com ícone escuro, contraste acima de 4,5:1).
const VISUAL = {
  caramelo: { Icone: Compass, cor: 'bg-[#EE9A2E]', tinta: 'bg-[#FCE7C8]' },
  capivara: { Icone: GraduationCap, cor: 'bg-[#C9A07E]', tinta: 'bg-[#EFE1D3]' },
  arara: { Icone: Megaphone, cor: 'bg-[#7FB6F0]', tinta: 'bg-[#DCEBFB]' },
  onca: { Icone: Search, cor: 'bg-[#D9B23A]', tinta: 'bg-[#F6EBC4]' },
  mico: { Icone: Trophy, cor: 'bg-[#F08A5D]', tinta: 'bg-[#FDE0D2]' },
}

// Quanto o dedo/mouse precisa andar até contar como arrasto (em px).
const LIMITE_ARRASTO = 6

// Card que vira: na frente, o mascote e o nome; no verso, o papel dele.
// Vira ao passar o mouse, ao clicar (ou Enter/Espaço no botão) e ao arrastar
// para o lado, acompanhando o dedo e encaixando na face mais perto.
export default function CardMascoteVirar({ mascote }) {
  const { Icone, cor, tinta } = VISUAL[mascote]
  const nome = textos.mascotes[mascote]
  const { papel, texto } = t.papeis[mascote]

  const refInterno = useRef(null)
  const refBotao = useRef(null)
  // Estado do giro guardado fora do React: muda a cada movimento do mouse
  // e não precisa redesenhar o componente.
  const giro = useRef({ angulo: 0, virado: false, emCima: false, arrasto: null, arrastou: false })

  function aplicarAngulo(angulo, comMola) {
    const interno = refInterno.current
    if (comMola) {
      interno.classList.add('virar-mola')
    } else {
      interno.classList.remove('virar-mola')
    }
    giro.current.angulo = angulo
    interno.style.transform = `rotateY(${angulo}deg)`
  }

  // Vai para a face certa pelo caminho mais curto (sem dar voltas a mais).
  function atualizarFace() {
    const estado = giro.current
    const face = estado.virado || estado.emCima ? 180 : 0
    const voltas = Math.round((estado.angulo - face) / 360)
    aplicarAngulo(face + voltas * 360, true)
    refBotao.current.setAttribute('aria-expanded', String(face === 180))
  }

  function aoEntrar(evento) {
    if (evento.pointerType === 'mouse' && window.matchMedia('(hover: hover)').matches) {
      giro.current.emCima = true
      if (!giro.current.arrasto) {
        atualizarFace()
      }
    }
  }

  function aoSair(evento) {
    if (evento.pointerType === 'mouse') {
      giro.current.emCima = false
      if (!giro.current.arrasto) {
        atualizarFace()
      }
    }
  }

  function aoApertar(evento) {
    if (evento.button > 0) {
      return
    }
    giro.current.arrasto = {
      x: evento.clientX,
      inicio: giro.current.angulo,
      ultimo: evento.clientX,
      tempo: performance.now(),
      velocidade: 0,
      moveu: false,
      id: evento.pointerId,
    }
  }

  function aoMover(evento) {
    const arrasto = giro.current.arrasto
    if (!arrasto || evento.pointerId !== arrasto.id) {
      return
    }
    const distancia = evento.clientX - arrasto.x
    if (!arrasto.moveu && Math.abs(distancia) < LIMITE_ARRASTO) {
      return
    }
    if (!arrasto.moveu) {
      arrasto.moveu = true
      evento.currentTarget.setPointerCapture(evento.pointerId)
    }
    const agora = performance.now()
    arrasto.velocidade = (evento.clientX - arrasto.ultimo) / Math.max(1, agora - arrasto.tempo)
    arrasto.ultimo = evento.clientX
    arrasto.tempo = agora
    // Arrastar a largura inteira do card vira meia volta (180 graus).
    const largura = Math.max(evento.currentTarget.clientWidth, 120)
    aplicarAngulo(arrasto.inicio + distancia * (180 / largura), false)
  }

  function aoSoltar() {
    const estado = giro.current
    const arrasto = estado.arrasto
    if (arrasto && arrasto.moveu) {
      // Um empurrão rápido termina o giro sozinho.
      const empurrao = Math.max(-90, Math.min(90, arrasto.velocidade * 140))
      const meiasVoltas = Math.round((estado.angulo + empurrao) / 180)
      estado.virado = Math.abs(meiasVoltas) % 2 === 1
      estado.emCima = false
      estado.arrastou = true
      aplicarAngulo(meiasVoltas * 180, true)
      refBotao.current.setAttribute('aria-expanded', String(estado.virado))
    }
    estado.arrasto = null
  }

  function aoClicar() {
    const estado = giro.current
    if (estado.arrastou) {
      estado.arrastou = false
      return
    }
    // O clique fixa o verso (fica virado mesmo quando o mouse sai);
    // clicar de novo desvira.
    if (estado.virado) {
      estado.virado = false
      estado.emCima = false
    } else {
      estado.virado = true
    }
    atualizarFace()
  }

  function aoTeclar(evento) {
    if (evento.key === 'Escape' && giro.current.virado) {
      giro.current.virado = false
      atualizarFace()
    }
  }

  return (
    <li
      className="virar relative aspect-[3/4] cursor-grab select-none active:cursor-grabbing"
      onPointerEnter={aoEntrar}
      onPointerLeave={aoSair}
      onPointerDown={aoApertar}
      onPointerMove={aoMover}
      onPointerUp={aoSoltar}
      onPointerCancel={aoSoltar}
    >
      <div ref={refInterno} className="virar-interno virar-mola">
        {/* Frente: o mascote sobre o fundo claro e uma faixa branca com o nome. */}
        <div className={`virar-face group shadow-card ${tinta}`}>
          <div className="absolute inset-x-[4%] bottom-[22%] transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none">
            <Mascote nome={mascote} expressao="feliz" tamanho="corpo" largura={null} className="w-full" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-white py-3 pl-3 pr-2.5 text-[#1A1A1A] sm:pl-4 sm:pr-3">
            <h3 className="font-titulo text-[1.0625rem] font-extrabold sm:text-[1.25rem]">{nome}</h3>
            <span aria-hidden="true" className={`grid size-11 shrink-0 place-items-center rounded-full ${cor}`}>
              <Icone size={22} strokeWidth={2} />
            </span>
          </div>
        </div>

        {/* Verso: o papel do mascote, em fundo índigo. */}
        <div className="virar-face virar-verso flex flex-col justify-between bg-indigo p-5 text-white shadow-card">
          <span aria-hidden="true" className={`grid size-13 place-items-center rounded-card text-[#1A1A1A] ${cor}`}>
            <Icone size={28} strokeWidth={2} />
          </span>
          <p>
            <span className="block font-titulo text-[0.75rem] font-bold uppercase tracking-[0.08em] text-[#D9D0F7]">{papel}</span>
            <span aria-hidden="true" className="mt-1 block font-titulo text-[1.375rem] font-extrabold">{nome}</span>
            <span className="mt-2 block text-[1.0625rem] leading-normal">{texto}</span>
          </p>
        </div>
      </div>

      {/* Botão transparente por cima do card: dá foco pelo teclado e o
          anel de foco aparece nas duas faces. */}
      <button
        ref={refBotao}
        type="button"
        aria-expanded="false"
        aria-label={preencher(t.virar, { nome })}
        onClick={aoClicar}
        onKeyDown={aoTeclar}
        className="absolute inset-0 z-10 cursor-[inherit] rounded-modal"
      />
    </li>
  )
}
