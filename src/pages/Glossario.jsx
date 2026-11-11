import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import { useGlossario } from '../hooks/useGlossario.js'
import { useTitulo } from '../hooks/useTitulo.js'
import BalaoMascote from '../components/BalaoMascote.jsx'
import CampoTexto from '../components/CampoTexto.jsx'
import EstadoVazio from '../components/EstadoVazio.jsx'

const t = textos.glossario

// Glossário de A a Z com busca em tempo real (a lista filtra a cada letra).
// A capivara (professora) apresenta; a busca vazia mostra a onça procurando.
export default function Glossario() {
  useTitulo(t.tituloAba)
  const { busca, setBusca, grupos, encontrados, total } = useGlossario()

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1>{t.titulo}</h1>
        <p className="text-corpo">{t.intro}</p>
      </header>

      <BalaoMascote mascote="capivara" expressao="explicando">
        <p>{t.fala}</p>
      </BalaoMascote>

      <div role="search">
        <CampoTexto
          rotulo={t.busca}
          dica={t.buscaDica}
          type="search"
          autoComplete="off"
          valor={busca}
          onChange={(evento) => setBusca(evento.target.value)}
        />
      </div>

      <p aria-live="polite" className="text-legenda font-semibold text-texto-2">
        {preencher(t.contagem, { n: encontrados, total })}
      </p>

      {grupos.length === 0 ? (
        <EstadoVazio
          mascote="onca"
          expressao="pensativo"
          titulo={preencher(t.vazio, { busca })}
          acao={{ rotulo: t.limparBusca, onClick: () => setBusca('') }}
        />
      ) : (
        grupos.map((grupo) => (
          <section key={grupo.letra} aria-labelledby={`letra-${grupo.letra}`} className="flex flex-col gap-2">
            <h2 id={`letra-${grupo.letra}`} className="text-h3 text-link">
              <span className="sr-only">{preencher(t.letra, { letra: grupo.letra })}</span>
              <span aria-hidden="true">{grupo.letra}</span>
            </h2>
            <ul className="flex flex-col gap-2">
              {grupo.termos.map((termo) => (
                <li key={termo.id}>
                  <Link
                    to={`/app/glossario/${termo.id}`}
                    className="flex min-h-12 items-center justify-between gap-3 rounded-card-pequeno border border-borda bg-superficie px-4 py-3 text-texto no-underline transition-colors duration-150 hover:border-lilas"
                  >
                    <span>
                      <span className="font-titulo font-semibold">{termo.termo}</span>
                      {termo.sigla && <span className="text-texto-2"> ({termo.sigla})</span>}
                    </span>
                    <ChevronRight size={20} strokeWidth={2} aria-hidden="true" className="shrink-0 text-texto-2" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  )
}
