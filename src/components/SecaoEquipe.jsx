import textos from '../data/textos.json'
import CardDesenvolvedor from './CardDesenvolvedor.jsx'
import Revelar from './Revelar.jsx'

const t = textos.sobre.equipe
const d = textos.sobre.destaque

// "Quem somos" (texto e o destaque azul-céu) e "Os desenvolvedores" (cards que
// viram, com o mascote de cada pessoa).
export default function SecaoEquipe() {
  return (
    <>
      <section aria-labelledby="sobre-equipe" className="mx-auto grid max-w-conteudo items-center gap-10 px-4 py-20 md:px-6 lg:grid-cols-2 lg:px-8">
        <Revelar className="flex flex-col gap-4">
          <h2 id="sobre-equipe">{t.titulo}</h2>
          <p className="text-[1.1rem]">{t.texto}</p>
        </Revelar>
        <Revelar atraso={150} className="rounded-modal bg-exemplo-fundo p-8 text-exemplo-texto">
          <p className="font-titulo text-[1.4rem] font-bold leading-snug">{d.frase}</p>
          <p className="mt-3 font-semibold">{d.texto}</p>
        </Revelar>
      </section>

      <section aria-labelledby="sobre-devs" className="bg-superficie">
        <div className="mx-auto flex max-w-conteudo flex-col gap-2 px-4 py-20 md:px-6 lg:px-8">
          <Revelar className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="sobre-devs">{t.feitoPor}</h2>
            <p className="max-w-md text-texto-2">{t.dicaVirar}</p>
          </Revelar>
          <ul className="mx-auto grid w-full max-w-sm gap-12 sm:max-w-none sm:grid-cols-3 sm:gap-8">
            {t.integrantes.map((pessoa) => (
              <CardDesenvolvedor key={pessoa.nome} pessoa={pessoa} />
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
