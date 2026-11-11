import { TAMANHO_ARQUIVO, escolherExpressao, validarMascote } from '../domain/mascotes.js'

// O Vite troca cada arquivo por uma URL com hash (só baixa o que aparece na tela).
const IMAGENS = import.meta.glob('../assets/mascotes/*/*.webp', { eager: true, import: 'default' })

function caminhoDaImagem(nome, expressao, tamanho) {
  return IMAGENS[`../assets/mascotes/${tamanho}/${nome}-${expressao}-${tamanho}.webp`]
}

// Imagem de um mascote. alt="" quando está ao lado de um balão com o texto
// (decorativo); alt descritivo só quando o mascote transmite algo sozinho.
// "largura" é em pixels de referência e vira rem (cresce com o A+).
export default function Mascote({
  nome,
  expressao = 'feliz',
  tamanho = 'avatar',
  largura = 96,
  alt = '',
  prioridade = false,
  className = '',
}) {
  const mascote = validarMascote(nome)
  const expressaoFinal = escolherExpressao(expressao)
  const tamanhoArquivo = TAMANHO_ARQUIVO[tamanho] ?? TAMANHO_ARQUIVO.avatar
  const fundo = tamanho === 'avatar' ? 'rounded-full dark:bg-halo-mascote' : 'sombra-chao'

  return (
    <img
      src={caminhoDaImagem(mascote, expressaoFinal, tamanho)}
      width={tamanhoArquivo}
      height={tamanhoArquivo}
      alt={alt}
      loading={prioridade ? 'eager' : 'lazy'}
      decoding="async"
      style={{ width: `${largura / 16}rem`, height: 'auto' }}
      className={`shrink-0 ${fundo} ${className}`}
    />
  )
}
