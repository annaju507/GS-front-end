import { useEffect, useState } from 'react'
import { CHAVES, calcularNivelLetra, decidirNivelLetraInicial } from '../domain/preferencias.js'
import { lerPreferencia, salvarPreferencia } from '../services/preferenciasStorage.js'

// A+ / A-: muda o tamanho da letra do site todo (100%, 115% e 130%).
// Como o layout usa rem, tudo cresce junto.
export function useTamanhoLetra() {
  const [nivel, setNivel] = useState(() => decidirNivelLetraInicial(lerPreferencia(CHAVES.letra)))
  const [limite, setLimite] = useState(null)

  // Manipulação do DOM: o tamanho da letra fica no <html>.
  useEffect(() => {
    document.documentElement.style.fontSize = `${nivel}%`
  }, [nivel])

  function mudarLetra(direcao) {
    const resultado = calcularNivelLetra(nivel, direcao)
    setLimite(resultado.limite)
    if (resultado.nivel !== nivel) {
      salvarPreferencia(CHAVES.letra, resultado.nivel)
      setNivel(resultado.nivel)
    }
  }

  return {
    nivel,
    limite,
    aumentar: () => mudarLetra('aumentar'),
    diminuir: () => mudarLetra('diminuir'),
  }
}
