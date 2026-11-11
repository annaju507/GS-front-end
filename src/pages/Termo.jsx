import { Link, useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import textos from '../data/textos.json'
import { buscarTermo } from '../services/conteudoLocal.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import ExemploCarioca from '../components/ExemploCarioca.jsx'
import FonteOficial from '../components/FonteOficial.jsx'
import NaoEncontrada from './NaoEncontrada.jsx'

const t = textos.glossario.termo

// Página de um termo: definição, exemplo carioca, fonte e termos relacionados.
export default function Termo() {
  const { termo: id } = useParams()
  const termo = buscarTermo(id)
  useTitulo(termo ? termo.termo : textos.naoEncontrada.titulo)

  if (!termo) {
    return <NaoEncontrada />
  }

  const relacionados = termo.relacionados.map(buscarTermo).filter(Boolean)

  return (
    <article className="mx-auto flex max-w-leitura flex-col gap-6">
      <Botao variante="terciario" para="/app/glossario" icone={ArrowLeft} className="-ml-6 self-start">
        {t.voltar}
      </Botao>

      <header className="flex flex-col gap-1">
        <h1>{termo.termo}</h1>
        {termo.sigla && <p className="font-titulo text-h3 font-semibold text-link">{termo.sigla}</p>}
      </header>

      <p className="text-corpo">{termo.definicao}</p>

      <ExemploCarioca>
        <p>{termo.exemplo}</p>
      </ExemploCarioca>

      <FonteOficial fonte={termo.fonte} />

      {relacionados.length > 0 && (
        <section aria-labelledby="termo-relacionados" className="flex flex-col gap-2">
          <h2 id="termo-relacionados" className="text-h3">{t.relacionados}</h2>
          <ul className="flex flex-wrap gap-2">
            {relacionados.map((relacionado) => (
              <li key={relacionado.id}>
                <Link
                  to={`/app/glossario/${relacionado.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border-2 border-borda bg-superficie px-4 font-semibold text-glossario no-underline hover:border-lilas"
                >
                  {relacionado.termo}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  )
}
