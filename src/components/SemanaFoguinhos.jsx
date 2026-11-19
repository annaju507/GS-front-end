import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import Foguinho from './Foguinho.jsx'

const t = textos.painel.semana

// "Sua semana": os últimos 7 dias, com um foguinho nos dias em que a pessoa
// estudou. A bolinha de hoje pulsa. Perdeu um dia? Mensagem sem culpa.
export default function SemanaFoguinhos({ semana, className = '' }) {
  return (
    <section aria-labelledby="painel-semana" className={`flex flex-col gap-3 rounded-card border border-borda bg-superficie p-4 shadow-card dark:shadow-none md:p-5 ${className}`}>
      <h2 id="painel-semana" className="flex items-center gap-2 text-h3">
        <Foguinho tamanho={26} />
        {t.titulo}
      </h2>
      <ol className="grid grid-cols-7 gap-1">
        {semana.map((dia) => {
          let bolinha = 'border-2 border-dashed border-borda bg-lilas-claro'
          if (dia.estudou) {
            bolinha = 'border-2 border-mico bg-[#FFE9DC] dark:bg-[#3A1E12]'
          }
          let rotulo = preencher(t.naoEstudou, { letra: dia.letra })
          if (dia.estudou) {
            rotulo = preencher(t.estudou, { letra: dia.letra })
          }
          return (
            <li key={dia.data} className="flex flex-col items-center gap-1 font-titulo text-tag font-bold text-texto-2">
              <span className={`grid size-10 place-items-center rounded-full ${bolinha} ${dia.hoje ? 'dia-hoje' : ''}`}>
                {dia.estudou && <Foguinho tamanho={20} />}
              </span>
              <span aria-hidden="true">{dia.letra}</span>
              <span className="sr-only">
                {rotulo} {dia.hoje ? t.hoje : ''}
              </span>
            </li>
          )
        })}
      </ol>
      <p className="text-legenda text-texto-2">{t.texto}</p>
    </section>
  )
}
