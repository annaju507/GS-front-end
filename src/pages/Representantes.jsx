import { Building2, ChevronRight, Landmark, Map as IconeMapa } from 'lucide-react'
import textos from '../data/textos.json'
import { ESFERAS_DA_ROTA } from '../domain/representantes.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Card from '../components/Card.jsx'
import Etiqueta from '../components/Etiqueta.jsx'

const t = textos.representantes
const ICONES = { municipio: Building2, estado: IconeMapa, pais: Landmark }

// Escolha da esfera: município, estado ou país. Sem mascotes nesta área.
export default function Representantes() {
  useTitulo(t.tituloAba)

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1>{t.titulo}</h1>
        <p className="text-corpo">{t.intro}</p>
      </header>

      <section aria-labelledby="representantes-esferas" className="flex flex-col gap-3">
        <h2 id="representantes-esferas" className="text-h3">{t.escolha}</h2>
        <ul className="flex flex-col gap-3">
          {Object.keys(ESFERAS_DA_ROTA).map((esfera) => {
            const Icone = ICONES[esfera]
            return (
              <li key={esfera}>
                <Card para={`/app/representantes/${esfera}`} className="flex items-center gap-4">
                  <Icone size={40} strokeWidth={2} aria-hidden="true" className="shrink-0 text-link" />
                  <span className="flex flex-1 flex-col gap-1">
                    <span className="font-titulo text-h3 font-semibold">{t.esferas[esfera].titulo}</span>
                    <span className="text-texto-2">{t.esferas[esfera].texto}</span>
                    <span>
                      <Etiqueta tipo="esfera" valor={ESFERAS_DA_ROTA[esfera]} />
                    </span>
                  </span>
                  <ChevronRight size={24} strokeWidth={2} aria-hidden="true" className="shrink-0 text-texto-2" />
                </Card>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
