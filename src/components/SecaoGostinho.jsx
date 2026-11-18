import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import textos from '../data/textos.json'
import MascoteEspiando from './MascoteEspiando.jsx'
import Revelar from './Revelar.jsx'

const t = textos.gostinho
const PRINTS = import.meta.glob('../assets/prints/*.webp', { eager: true, import: 'default' })

// "Um gostinho do que tem lá dentro": quatro cards com o print de verdade de
// cada área. Ao passar o mouse (ou focar), o print rola e mostra mais da tela.
// O card inteiro é um link para a prévia daquela área.
export default function SecaoGostinho() {
  return (
    <section aria-labelledby="titulo-gostinho" className="bg-lilas-claro">
      <div className="relative mx-auto flex max-w-conteudo flex-col gap-3 px-4 py-20 md:px-6 lg:px-8">
        <MascoteEspiando nome="mico" expressao="alerta" posicao="right-4 top-4 hidden md:block" largura={120} />
        <Revelar>
          <h2 id="titulo-gostinho">{t.titulo}</h2>
          <p className="mt-2 text-texto-2">{t.texto}</p>
        </Revelar>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.itens.map((item, indice) => (
            <Revelar key={item.chave} como="li" atraso={indice * 120}>
              <Link
                to={item.para}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-borda bg-superficie text-texto no-underline shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-modal dark:shadow-none"
              >
                <span className="block h-40 overflow-hidden border-b border-borda bg-lilas-claro">
                  <img
                    src={PRINTS[`../assets/prints/${item.chave}.webp`]}
                    alt=""
                    width={960}
                    height={535}
                    loading="lazy"
                    decoding="async"
                    className="block w-full object-cover object-top transition-transform duration-[2400ms] ease-in-out group-hover:-translate-y-1/4 group-focus-visible:-translate-y-1/4"
                  />
                </span>
                <span className="flex flex-1 flex-col gap-1.5 p-4">
                  <span className="font-titulo text-tag font-bold uppercase tracking-[0.07em] text-link">{item.tag}</span>
                  <span className="font-titulo text-h3 font-semibold">{item.titulo}</span>
                  <span className="text-legenda text-texto-2">{item.texto}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-2 font-semibold text-link">
                    {t.verMais}
                    <ArrowRight size={18} strokeWidth={2} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </span>
              </Link>
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  )
}
