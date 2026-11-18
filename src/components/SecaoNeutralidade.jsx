import { Scale } from 'lucide-react'
import textos from '../data/textos.json'
import MascoteInterativo from './MascoteInterativo.jsx'
import Revelar from './Revelar.jsx'

const t = textos.neutralidade

// "A gente mostra os fatos. A conclusão é sua." Faixa preta (como os cards da
// trilha) com a balança balançando, o texto da neutralidade e os três passos
// de como a informação chega até você; o último (a sua conclusão) em destaque.
// A onça (investigadora, confere as fontes) acompanha. "children": conteúdo
// extra embaixo (no Sobre, as regras de neutralidade).
export default function SecaoNeutralidade({ children }) {
  return (
    <section aria-labelledby="titulo-neutralidade" className="bg-[#1A1A1A] text-white">
      <div className="relative mx-auto flex max-w-conteudo flex-col gap-12 px-4 py-20 md:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Revelar className="flex flex-col items-start gap-5">
            <p className="inline-flex items-center gap-2 rounded-full bg-azul-ceu px-3 py-1 font-titulo text-tag font-bold uppercase tracking-[0.1em] text-[#1A1A1A]">
              <Scale size={18} strokeWidth={2.5} aria-hidden="true" className="balancar" />
              {t.rotulo}
            </p>
            <h2 id="titulo-neutralidade" className="text-[2.25rem] leading-[1.08] text-white md:text-[3.25rem]">
              {t.titulo[0]}
              <br />
              <span className="text-azul-ceu">{t.titulo[1]}</span>
            </h2>
            <p className="max-w-xl text-[1.15rem] text-[#D4D0DC]">{t.texto}</p>
          </Revelar>

          <div className="relative">
            <span className="absolute -top-24 right-0 hidden md:block">
              <MascoteInterativo nome="onca" expressao="alerta" expressaoReacao="feliz" largura={140} />
            </span>
            <p className="mb-4 font-titulo text-tag font-bold uppercase tracking-[0.1em] text-[#B9B3C9]">{t.passosRotulo}</p>
            <ol className="flex flex-col gap-3">
              {t.passos.map((passo, indice) => {
                const final = indice === t.passos.length - 1
                return (
                  <Revelar
                    key={passo.titulo}
                    como="li"
                    atraso={indice * 180}
                    className={`flex items-start gap-4 rounded-card p-4 transition-transform duration-200 hover:translate-x-1 ${
                      final ? 'bg-azul-ceu text-[#1A1A1A] shadow-[0_0.3rem_0_#7FC3E3]' : 'border border-white/15 bg-white/5'
                    }`}
                  >
                    <span
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full font-titulo font-extrabold ${
                        final ? 'bg-[#1A1A1A] text-azul-ceu' : 'bg-white/10 text-white'
                      }`}
                    >
                      {indice + 1}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-titulo text-h3 font-semibold">{passo.titulo}</span>
                      <span className={final ? 'text-[#1A1A1A]' : 'text-[#D4D0DC]'}>{passo.texto}</span>
                    </span>
                  </Revelar>
                )
              })}
            </ol>
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}
