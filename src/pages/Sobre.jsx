import { Database, Scale, Users } from 'lucide-react'
import textos from '../data/textos.json'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'

const t = textos.sobre

// Sobre e neutralidade. Sem mascotes: página sóbria e informativa.
export default function Sobre() {
  useTitulo(t.titulo)

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-10 px-4 py-12 md:px-6">
      <header className="flex flex-col gap-3">
        <h1>{t.titulo}</h1>
        <p className="text-corpo">{t.intro}</p>
      </header>

      <section aria-labelledby="sobre-equipe" className="flex flex-col gap-3">
        <h2 id="sobre-equipe" className="flex items-center gap-3">
          <Users size={28} strokeWidth={2} aria-hidden="true" className="shrink-0 text-link" />
          {t.equipe.titulo}
        </h2>
        <p>{t.equipe.texto}</p>
      </section>

      <section aria-labelledby="sobre-dados" className="flex flex-col gap-3">
        <h2 id="sobre-dados" className="flex items-center gap-3">
          <Database size={28} strokeWidth={2} aria-hidden="true" className="shrink-0 text-link" />
          {t.dados.titulo}
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-link">
          {t.dados.itens.map((item) => (
            <li key={item.nome}>
              <span className="font-bold">{item.nome}:</span> {item.texto}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sobre-neutralidade" className="flex flex-col gap-3">
        <h2 id="sobre-neutralidade" className="flex items-center gap-3">
          <Scale size={28} strokeWidth={2} aria-hidden="true" className="shrink-0 text-link" />
          {t.neutralidade.titulo}
        </h2>
        <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-link">
          {t.neutralidade.itens.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="sobre-privacidade" className="flex flex-col gap-3">
        <h2 id="sobre-privacidade">{t.privacidade.titulo}</h2>
        <Aviso tipo="info">{t.privacidade.texto}</Aviso>
      </section>
    </div>
  )
}
