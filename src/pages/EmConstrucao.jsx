import textos from '../data/textos.json'
import { useTitulo } from '../hooks/useTitulo.js'
import BalaoMascote from '../components/BalaoMascote.jsx'
import Botao from '../components/Botao.jsx'

const t = textos.emConstrucao

// Página PROVISÓRIA das áreas que chegam nas etapas 5 a 7.
// Quem avisa é a arara (a mensageira, que traz as novidades).
export default function EmConstrucao({ area }) {
  const titulo = t.titulos[area]
  useTitulo(titulo)

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-6 py-8">
      <h1>{titulo}</h1>
      <BalaoMascote mascote="arara" expressao="explicando">
        <p>{t.texto}</p>
      </BalaoMascote>
      <div>
        <Botao variante="secundario" para="/app">{t.voltar}</Botao>
      </div>
    </div>
  )
}
