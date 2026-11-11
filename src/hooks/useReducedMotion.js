import { useEffect, useState } from 'react'
import { CHAVES, decidirReduzirAnimacoes } from '../domain/preferencias.js'
import { CONSULTA_MENOS_MOVIMENTO, lerPreferencia, salvarPreferencia } from '../services/preferenciasStorage.js'

// "Reduzir animações": junta a opção do site com a preferência do aparelho.
// Componentes com Motion/GSAP usam o valor "reduzir" para trocar movimento por cor.
export function useReducedMotion() {
  const [opcaoDoSite, setOpcaoDoSite] = useState(() => lerPreferencia(CHAVES.reduzirAnimacoes) === 'sim')
  const [sistemaPedeMenos, setSistemaPedeMenos] = useState(
    () => window.matchMedia(CONSULTA_MENOS_MOVIMENTO).matches,
  )

  // Acompanha se a pessoa muda a configuração do aparelho com o site aberto.
  useEffect(() => {
    const consulta = window.matchMedia(CONSULTA_MENOS_MOVIMENTO)
    const aoMudar = (evento) => setSistemaPedeMenos(evento.matches)
    consulta.addEventListener('change', aoMudar)
    return () => consulta.removeEventListener('change', aoMudar)
  }, [])

  // Manipulação do DOM: a classe no <html> desliga as animações via CSS.
  useEffect(() => {
    if (opcaoDoSite) {
      document.documentElement.classList.add('reduzir-animacoes')
    } else {
      document.documentElement.classList.remove('reduzir-animacoes')
    }
  }, [opcaoDoSite])

  function alternarReduzirAnimacoes() {
    const novoValor = !opcaoDoSite
    salvarPreferencia(CHAVES.reduzirAnimacoes, novoValor ? 'sim' : 'nao')
    setOpcaoDoSite(novoValor)
  }

  return {
    reduzir: decidirReduzirAnimacoes(opcaoDoSite, sistemaPedeMenos),
    opcaoDoSite,
    sistemaPedeMenos,
    alternarReduzirAnimacoes,
  }
}
