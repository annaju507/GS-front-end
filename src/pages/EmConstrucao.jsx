import textos from '../data/textos.json'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import Mascote from '../components/Mascote.jsx'

const t = textos.emConstrucao

// Página PROVISÓRIA das áreas que chegam nas etapas 5 a 7.
export default function EmConstrucao({ area }) {
  const titulo = t.titulos[area]
  useTitulo(titulo)

  return (
    <div className="mx-auto flex max-w-leitura flex-col items-center gap-4 py-8 text-center">
      <Mascote nome="caramelo" expressao="pensativo" tamanho="corpo" largura={160} />
      <h1>{titulo}</h1>
      <p className="text-texto-2">{t.texto}</p>
      <Botao variante="secundario" para="/app">{t.voltar}</Botao>
    </div>
  )
}
