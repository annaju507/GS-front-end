import textos from '../data/textos.json'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import Mascote from '../components/Mascote.jsx'

const t = textos.naoEncontrada

// Página 404: o caramelo (o companheiro, que orienta a navegação) ajuda a voltar.
export default function NaoEncontrada() {
  useTitulo(t.titulo)

  return (
    <div className="mx-auto flex max-w-leitura flex-col items-center gap-4 px-4 py-16 text-center md:px-6">
      <Mascote nome="caramelo" expressao="pensativo" tamanho="corpo" largura={180} />
      <h1>{t.titulo}</h1>
      <p className="text-corpo text-texto-2">{t.texto}</p>
      <Botao variante="primario" para="/">
        {t.botao}
      </Botao>
    </div>
  )
}
