import { ArrowRight } from 'lucide-react'
import textos from '../data/textos.json'
import { agruparPorArea } from '../domain/direitos.js'
import { listarDireitos } from '../services/conteudoLocal.js'
import { useTitulo } from '../hooks/useTitulo.js'
import BalaoMascote from '../components/BalaoMascote.jsx'
import Card from '../components/Card.jsx'
import EtiquetaDireito from '../components/EtiquetaDireito.jsx'

const t = textos.direitos

// Lista de direitos por área. Quem apresenta é o caramelo (o companheiro).
export default function Direitos() {
  useTitulo(t.tituloAba)
  const grupos = agruparPorArea(listarDireitos().temas)

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1>{t.titulo}</h1>
        <p className="text-corpo">{t.intro}</p>
      </header>

      <BalaoMascote mascote="onca" expressao="explicando">
        <p>{t.fala}</p>
      </BalaoMascote>

      {grupos.map((grupo) => (
        <section key={grupo.area} aria-labelledby={`direitos-${grupo.area}`} className="flex flex-col gap-3">
          <h2 id={`direitos-${grupo.area}`} className="text-h3">
            {grupo.area === 'transversal' ? t.transversal : textos.areas[grupo.area]}
          </h2>
          <ul className="flex flex-col gap-3">
            {grupo.temas.map((tema) => (
              <li key={tema.id}>
                <Card para={`/app/direitos/${tema.id}`} className="flex flex-col gap-2">
                  <span>
                    <EtiquetaDireito area={tema.area} />
                  </span>
                  <span className="font-titulo text-h3 font-semibold">{tema.titulo}</span>
                  <span className="text-texto-2">{tema.resumo}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-link underline underline-offset-4">
                    {t.ver}
                    <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                  </span>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
