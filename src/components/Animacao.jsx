import { Suspense, lazy } from 'react'
import { usePreferencias } from '../hooks/usePreferencias.js'
import { useNaTela } from '../hooks/useNaTela.js'

const AnimacaoLottie = lazy(() => import('./AnimacaoLottie.jsx'))

// Animação decorativa (confete, medalha, carregando). Só baixa quando chega
// perto da tela e some quando a pessoa pede menos movimento.
export default function Animacao({ arquivo, repetir = true, cobrir = false, className = '' }) {
  const { animacoes } = usePreferencias()
  const [ref, naTela] = useNaTela()

  if (animacoes.reduzir) {
    return null
  }

  return (
    <span ref={ref} aria-hidden="true" className={`pointer-events-none block ${className}`}>
      {naTela && (
        <Suspense fallback={null}>
          <AnimacaoLottie arquivo={arquivo} repetir={repetir} cobrir={cobrir} className="block size-full" />
        </Suspense>
      )}
    </span>
  )
}
