// Reduz a foto escolhida para um quadrado pequeno (JPEG), para caber no
// localStorage junto com a conta simulada. A foto não sai do navegador.

const LADO = 256
const QUALIDADE = 0.82

function carregarImagem(arquivo) {
  return new Promise((resolver, rejeitar) => {
    const endereco = URL.createObjectURL(arquivo)
    const imagem = new Image()
    imagem.onload = () => {
      URL.revokeObjectURL(endereco)
      resolver(imagem)
    }
    imagem.onerror = () => {
      URL.revokeObjectURL(endereco)
      rejeitar(new Error('Não deu para abrir a imagem.'))
    }
    imagem.src = endereco
  })
}

// Recorta o centro da foto em quadrado e devolve como texto (data URL).
export async function reduzirFoto(arquivo) {
  const imagem = await carregarImagem(arquivo)
  const menorLado = Math.min(imagem.naturalWidth, imagem.naturalHeight)
  const origemX = (imagem.naturalWidth - menorLado) / 2
  const origemY = (imagem.naturalHeight - menorLado) / 2

  const tela = document.createElement('canvas')
  tela.width = LADO
  tela.height = LADO
  const contexto = tela.getContext('2d')
  contexto.drawImage(imagem, origemX, origemY, menorLado, menorLado, 0, 0, LADO, LADO)
  return tela.toDataURL('image/jpeg', QUALIDADE)
}
