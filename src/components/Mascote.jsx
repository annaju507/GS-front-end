import { Suspense, lazy, useState } from 'react'
import { TAMANHO_ARQUIVO, arquivoDaAnimacao, deveAnimar, escolherExpressao, validarMascote } from '../domain/mascotes.js'
import { usePreferencias } from '../hooks/usePreferencias.js'
import { useNaTela } from '../hooks/useNaTela.js'
import LimiteAnimacao from './LimiteAnimacao.jsx'

// O Vite troca cada arquivo por uma URL com hash (só baixa o que aparece na tela).
const IMAGENS = import.meta.glob('../assets/mascotes/*/*.webp', { eager: true, import: 'default' })

// A animação (lottie-web) fica num pedaço separado do código.
const AnimacaoLottie = lazy(() => import('./AnimacaoLottie.jsx'))

function caminhoDaImagem(nome, expressao, tamanho) {
  return IMAGENS[`../assets/mascotes/${tamanho}/${nome}-${expressao}-${tamanho}.webp`]
}

// Mascote. Aceita nome/expressao ou bicho/pose: <Mascote bicho="capivara" pose="feliz" />.
// alt="" quando está ao lado de um balão com o texto (decorativo); com alt, o
// mascote vira uma imagem com aria-label em português.
// "largura" é em pixels de referência e vira rem (cresce com o A+).
// Com largura={null}, quem define o tamanho é a className.
// De corpo inteiro, o mascote se mexe (animado={false} desliga). A imagem
// parada aparece enquanto a animação carrega e para quem pediu menos movimento.
export default function Mascote({
  nome,
  bicho,
  expressao = 'feliz',
  pose,
  tamanho = 'avatar',
  largura = 96,
  alt = '',
  prioridade = false,
  animado = true,
  className = '',
}) {
  const mascote = validarMascote(bicho ?? nome)
  const expressaoFinal = escolherExpressao(pose ?? expressao)
  const tamanhoArquivo = TAMANHO_ARQUIVO[tamanho] ?? TAMANHO_ARQUIVO.avatar
  const fundo = tamanho === 'avatar' ? 'rounded-full dark:bg-halo-mascote' : 'sombra-chao'
  const estiloLargura = largura ? { width: `${largura / 16}rem`, height: 'auto' } : undefined

  const { animacoes } = usePreferencias()
  const [refCaixa, naTela] = useNaTela()
  const arquivo = arquivoDaAnimacao(mascote, expressaoFinal)
  // Guarda qual arquivo terminou de carregar: ao trocar de pose, a imagem
  // parada volta até a nova animação ficar pronta.
  const [carregado, setCarregado] = useState(null)
  const animacaoPronta = carregado === arquivo
  const marcarCarregado = () => setCarregado(arquivo)

  const imagem = (
    <img
      src={caminhoDaImagem(mascote, expressaoFinal, tamanho)}
      width={tamanhoArquivo}
      height={tamanhoArquivo}
      alt={alt}
      loading={prioridade ? 'eager' : 'lazy'}
      decoding="async"
      style={estiloLargura}
      className={`shrink-0 ${fundo} ${className}`}
    />
  )

  if (!deveAnimar(tamanho, animado, animacoes.reduzir)) {
    return imagem
  }

  return (
    <span
      ref={refCaixa}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : 'true'}
      style={estiloLargura}
      className={`relative inline-block shrink-0 align-top ${className}`}
    >
      <img
        src={caminhoDaImagem(mascote, expressaoFinal, tamanho)}
        width={tamanhoArquivo}
        height={tamanhoArquivo}
        alt=""
        loading={prioridade ? 'eager' : 'lazy'}
        decoding="async"
        className={`block h-auto w-full ${fundo} ${animacaoPronta ? 'opacity-0' : ''}`}
      />
      {naTela && (
        <LimiteAnimacao>
          <Suspense fallback={null}>
            <AnimacaoLottie
              key={arquivo}
              arquivo={arquivo}
              aoCarregar={marcarCarregado}
              className="absolute inset-0 size-full"
            />
          </Suspense>
        </LimiteAnimacao>
      )}
    </span>
  )
}
