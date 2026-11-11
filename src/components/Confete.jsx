import { usePreferencias } from '../hooks/usePreferencias.js'

// Confete da conquista (seção 9): lilás, índigo, azul-céu e as cores dos
// mascotes, por 1,2s. Com "reduzir animações", não aparece.
const CORES = ['bg-lilas', 'bg-indigo', 'bg-azul-ceu', 'bg-caramelo', 'bg-arara', 'bg-onca', 'bg-mico', 'bg-capivara']

const PEDACOS = Array.from({ length: 28 }, (_, indice) => ({
  cor: CORES[indice % CORES.length],
  esquerda: `${(indice * 37) % 100}%`,
  atraso: `${(indice % 7) * 0.06}s`,
  largura: indice % 3 === 0 ? '0.5rem' : '0.375rem',
}))

export default function Confete() {
  const { animacoes } = usePreferencias()
  if (animacoes.reduzir) {
    return null
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {PEDACOS.map((pedaco, indice) => (
        <span
          key={indice}
          className={`confete absolute top-0 h-3 rounded-sm opacity-0 ${pedaco.cor}`}
          style={{ left: pedaco.esquerda, width: pedaco.largura, animationDelay: pedaco.atraso }}
        />
      ))}
    </div>
  )
}
