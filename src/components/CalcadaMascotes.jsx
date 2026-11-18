import { useEffect, useRef } from 'react'
import textos from '../data/textos.json'
import { usePreferencias } from '../hooks/usePreferencias.js'
import Mascote from './Mascote.jsx'

// Os cinco mascotes, na ordem da caminhada, com a cor das pegadas.
const BICHOS = [
  { nome: 'caramelo', expressao: 'feliz', cor: '#EE9A2E' },
  { nome: 'capivara', expressao: 'explicando', cor: '#A47551' },
  { nome: 'arara', expressao: 'feliz', cor: '#2F7FD8' },
  { nome: 'onca', expressao: 'alerta', cor: '#D9B23A' },
  { nome: 'mico', expressao: 'comemorando', cor: '#E8622A' },
]

const VELOCIDADE = 70 // px por segundo
const ESPACO = 260 // distância entre um bicho e o outro, em px
const PASSO = 32 // a cada quantos px fica uma pegada

// Pegadinha que fica na calçada e some sozinha.
function deixarPegada(calcada, x, lado, cor) {
  const pegada = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  pegada.setAttribute('viewBox', '0 0 24 24')
  pegada.setAttribute('class', 'pegada-calcada')
  pegada.innerHTML =
    '<ellipse cx="12" cy="16.5" rx="5" ry="4.2" fill="currentColor"/><ellipse cx="5.6" cy="10" rx="1.9" ry="2.4" fill="currentColor"/><ellipse cx="9.6" cy="6" rx="2" ry="2.6" fill="currentColor"/><ellipse cx="14.4" cy="6" rx="2" ry="2.6" fill="currentColor"/><ellipse cx="18.4" cy="10" rx="1.9" ry="2.4" fill="currentColor"/>'
  pegada.style.left = `${x + 50 + (lado ? 14 : 0)}px`
  pegada.style.bottom = `${lado ? 22 : 30}px`
  pegada.style.color = cor
  calcada.appendChild(pegada)
  setTimeout(() => pegada.remove(), 3600)
}

// Calçada onde os mascotes atravessam a tela andando, deixando pegadas. Com o
// mouse em cima (ou um toque), o bicho para, se vira e mostra o nome e o
// papel num balão. É enfeite (aria-hidden): os papéis estão no Como funciona.
// Com "reduzir animações", os bichos ficam parados, lado a lado.
export default function CalcadaMascotes() {
  const refCalcada = useRef(null)
  const refBichos = useRef([])
  const { animacoes } = usePreferencias()

  // Manipulação do DOM: a posição de cada bicho muda a cada quadro direto no
  // style, sem redesenhar o React; a caminhada pausa fora da tela.
  useEffect(() => {
    const calcada = refCalcada.current
    const elementos = refBichos.current
    if (!calcada) {
      return undefined
    }
    const estado = BICHOS.map((_, indice) => ({ x: -150 - indice * ESPACO, parado: false, passo: 0 }))
    const desfazer = []

    elementos.forEach((elemento, indice) => {
      const parar = () => {
        estado[indice].parado = true
        elemento.classList.add('parado')
      }
      const seguir = () => {
        estado[indice].parado = false
        elemento.classList.remove('parado')
      }
      elemento.addEventListener('pointerenter', parar)
      elemento.addEventListener('pointerleave', seguir)
      desfazer.push(() => {
        elemento.removeEventListener('pointerenter', parar)
        elemento.removeEventListener('pointerleave', seguir)
      })
    })

    if (animacoes.reduzir) {
      const largura = calcada.clientWidth
      elementos.forEach((elemento, indice) => {
        elemento.style.transform = `translateX(${24 + indice * (largura / BICHOS.length)}px)`
      })
      return () => desfazer.forEach((funcao) => funcao())
    }

    let visivel = true
    const observador = new IntersectionObserver((entradas) => {
      visivel = entradas[0].isIntersecting
    })
    observador.observe(calcada)

    let quadro
    let ultimo = performance.now()
    function andar(agora) {
      const segundos = Math.min(0.05, (agora - ultimo) / 1000)
      ultimo = agora
      if (visivel) {
        const largura = calcada.clientWidth
        const volta = Math.max(BICHOS.length * ESPACO, largura + 300)
        estado.forEach((bicho, indice) => {
          if (!bicho.parado) {
            bicho.x += VELOCIDADE * segundos
            if (bicho.x > largura + 40) {
              bicho.x -= volta
            }
            const passo = Math.floor(bicho.x / PASSO)
            if (passo !== bicho.passo && bicho.x > -40 && bicho.x < largura) {
              bicho.passo = passo
              deixarPegada(calcada, bicho.x, passo % 2 === 0, BICHOS[indice].cor)
            }
          }
          elementos[indice].style.transform = `translateX(${bicho.x}px)`
        })
      }
      quadro = requestAnimationFrame(andar)
    }
    quadro = requestAnimationFrame(andar)

    return () => {
      cancelAnimationFrame(quadro)
      observador.disconnect()
      desfazer.forEach((funcao) => funcao())
    }
  }, [animacoes.reduzir])

  return (
    <div ref={refCalcada} aria-hidden="true" className="calcada relative h-64 overflow-hidden border-y-2 border-calcada-linha bg-calcada">
      <span className="absolute inset-x-0 bottom-9 border-t-[3px] border-dashed border-calcada-linha" />
      {BICHOS.map((bicho, indice) => (
        <div
          key={bicho.nome}
          ref={(elemento) => {
            refBichos.current[indice] = elemento
          }}
          className="andante absolute bottom-6 left-0 size-34"
          style={{ transform: `translateX(${-150 - indice * ESPACO}px)` }}
        >
          <div className="balao-andante pointer-events-none absolute bottom-full left-1/2 whitespace-nowrap rounded-card border-2 border-lilas bg-superficie px-3 py-1.5 text-legenda text-texto shadow-card">
            <span className="block font-titulo font-semibold">{textos.mascotes[bicho.nome]}</span>
            {textos.comoFunciona.papeis[bicho.nome].papel}: {textos.comoFunciona.papeis[bicho.nome].texto.toLowerCase()}
          </div>
          <div className="corpo-andante size-full">
            <Mascote nome={bicho.nome} expressao={bicho.expressao} tamanho="corpo" largura={null} className="size-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
