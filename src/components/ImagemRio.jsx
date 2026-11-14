// O Vite troca cada arquivo por uma URL com hash (só baixa o que aparece na tela).
const IMAGENS = import.meta.glob('../assets/rio/*.webp', { eager: true, import: 'default' })

// Tamanho real de cada arquivo: com largura e altura, a página não pula
// enquanto a imagem carrega.
const DIMENSOES = {
  'vista-baia': [1600, 900],
  'calcadao-copacabana': [1600, 960],
  'arcos-lapa': [1536, 1024],
  'escadaria-selaron': [512, 509],
  'theatro-municipal': [511, 508],
  'bondinho-pao-de-acucar': [1586, 992],
  'museu-do-amanha': [510, 509],
  'palmeiras-jardim-botanico': [1024, 1536],
  'vidigal-dois-irmaos': [1448, 1086],
  'roda-gigante-porto': [900, 675],
  'vista-baia-sem-cristo': [900, 675],
  'bonde-rua-santa-teresa': [1400, 1050],
  'pao-de-acucar-perto': [700, 525],
  'parque-lage-fachada': [900, 675],
  'museu-nacional': [700, 525],
  'feira-sao-cristovao': [900, 675],
  'ilha-fiscal': [900, 675],
  'sambodromo': [900, 675],
  'vista-chinesa': [900, 675],
}

// Ilustração de um lugar do Rio. É decorativa (alt=""): nenhuma informação
// depende dela, e nenhum texto fica por cima. "prioridade" só para a imagem
// do topo da página, que aparece antes de rolar.
export default function ImagemRio({ nome, prioridade = false, className = '' }) {
  const [largura, altura] = DIMENSOES[nome]

  return (
    <img
      src={IMAGENS[`../assets/rio/${nome}.webp`]}
      alt=""
      width={largura}
      height={altura}
      loading={prioridade ? 'eager' : 'lazy'}
      fetchPriority={prioridade ? 'high' : undefined}
      decoding="async"
      className={`block object-cover ${className}`}
    />
  )
}
