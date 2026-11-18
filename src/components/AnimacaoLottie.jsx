import { useCallback } from 'react'
import { DotLottieReact, setWasmUrl } from '@lottiefiles/dotlottie-react'

// O motor do LottieFiles (.wasm) é servido pelo próprio site, sem depender de
// outro endereço. Ao atualizar a biblioteca, copie de novo o arquivo
// node_modules/@lottiefiles/dotlottie-web/dist/dotlottie-player.wasm.
setWasmUrl('/lottie/dotlottie-player.wasm')

// Toca um arquivo de public/animacoes. Este arquivo é carregado sob demanda
// (lazy), então a biblioteca só é baixada quando alguma animação aparece.
export default function AnimacaoLottie({ arquivo, repetir = true, cobrir = false, aoCarregar, className = '' }) {
  const receberInstancia = useCallback(
    (instancia) => {
      if (instancia && aoCarregar) {
        instancia.addEventListener('load', aoCarregar)
      }
    },
    [aoCarregar],
  )

  return (
    <DotLottieReact
      src={`/animacoes/${arquivo}.json`}
      loop={repetir}
      autoplay
      layout={{ fit: cobrir ? 'cover' : 'contain', align: [0.5, 0.5] }}
      dotLottieRefCallback={receberInstancia}
      aria-hidden="true"
      className={className}
    />
  )
}
