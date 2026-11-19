import { useState } from 'react'
import { Link } from 'react-router'
import { Building2, ChevronRight, Landmark, Map as IconeMapa, Scale } from 'lucide-react'
import textos from '../data/textos.json'
import { ESFERAS_DA_ROTA } from '../domain/representantes.js'
import { useTitulo } from '../hooks/useTitulo.js'
import CirculosEsferas from '../components/CirculosEsferas.jsx'
import TopoPagina from '../components/TopoPagina.jsx'

const t = textos.representantes
const ICONES = { municipio: Building2, estado: IconeMapa, pais: Landmark }

// Blocos com degrau, em cores claras e neutras (nenhuma de partido). O texto é
// sempre escuro sobre essas cores fixas, então fica legível nos dois temas.
const BLOCOS = {
  municipio: 'bg-[#A186EF] shadow-[0_0.4rem_0_#6E52C9]',
  estado: 'bg-[#B7E7FC] shadow-[0_0.4rem_0_#7FC3E3]',
  pais: 'bg-[#FFE5D4] shadow-[0_0.4rem_0_#E8B896]',
}

// Escolha da esfera: município, estado ou país, do mais perto ao mais longe.
// O desenho dos círculos e os blocos acendem juntos. Sem mascotes nesta área
// (regra de neutralidade: nada de mascote perto de perfis de políticos).
export default function Representantes() {
  useTitulo(t.tituloAba)
  const [ativa, setAtiva] = useState(null)

  return (
    <div className="mx-auto flex max-w-[64rem] flex-col gap-8">
      <TopoPagina imagem="vista-chinesa" titulo={t.titulo} intro={t.intro} chips={t.chips} />

      <section aria-labelledby="representantes-esferas" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="representantes-esferas" className="text-h3">{t.perto.titulo}</h2>
          <p className="text-texto-2">{t.perto.texto}</p>
        </div>
        <div className="grid items-center gap-6 md:grid-cols-[17rem_minmax(0,1fr)]">
          <CirculosEsferas ativa={ativa} onMarcar={setAtiva} />
          <ul className="flex flex-col gap-4">
            {Object.keys(ESFERAS_DA_ROTA).map((esfera) => {
              const Icone = ICONES[esfera]
              let realce = ''
              if (ativa === esfera) {
                realce = '-translate-y-1 -rotate-[0.5deg]'
              }
              return (
                <li key={esfera}>
                  <Link
                    to={`/app/representantes/${esfera}`}
                    onMouseEnter={() => setAtiva(esfera)}
                    onMouseLeave={() => setAtiva(null)}
                    onFocus={() => setAtiva(esfera)}
                    onBlur={() => setAtiva(null)}
                    className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-modal p-4 text-[#1A1A1A] no-underline transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none ${BLOCOS[esfera]} ${realce}`}
                  >
                    <span className="grid size-14 place-items-center rounded-card bg-white/60 text-[#2A0081]">
                      <Icone size={30} strokeWidth={2} aria-hidden="true" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-titulo text-h3 font-bold">{t.esferas[esfera].titulo}</span>
                      <span className="text-legenda">{t.esferasCuidam[esfera]}</span>
                      <span className="mt-1 flex flex-wrap gap-1.5">
                        {t.cargosEsfera[esfera].map((cargo) => (
                          <span key={cargo} className="rounded-full bg-white/70 px-2.5 py-0.5 font-titulo text-tag font-bold">
                            {cargo}
                          </span>
                        ))}
                      </span>
                    </span>
                    <ChevronRight size={24} strokeWidth={2} aria-hidden="true" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="representantes-como-ler" className="flex flex-col gap-4">
        <h2 id="representantes-como-ler" className="text-h3">{t.comoLer.titulo}</h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {t.comoLer.passos.map((passo, indice) => (
            <li key={passo.titulo} className="flex flex-col gap-1.5 rounded-modal border border-borda bg-superficie p-4">
              <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-link font-titulo font-extrabold text-superficie">
                {indice + 1}
              </span>
              <span className="font-titulo font-bold">{passo.titulo}</span>
              <span className="text-legenda text-texto-2">{passo.texto}</span>
            </li>
          ))}
        </ol>
      </section>

      <p className="flex items-start gap-3 rounded-modal border border-borda bg-superficie p-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-card-pequeno bg-lilas-claro text-link">
          <Scale size={24} strokeWidth={2} aria-hidden="true" />
        </span>
        <span>
          <strong className="font-titulo">{t.semLado.titulo}</strong> {t.semLado.texto}
        </span>
      </p>
    </div>
  )
}
