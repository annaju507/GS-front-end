import { useState } from 'react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import Mascote from './Mascote.jsx'

const t = textos.sobre.equipe
const FOTOS = import.meta.glob('../assets/equipe/*.webp', { eager: true, import: 'default' })

// Card de quem desenvolveu o Demokratos. Na frente, foto e nome; no verso, o
// que a pessoa fez, com o mascote dela explicando. Vira ao passar o mouse, ao
// clicar ou com Enter (o botão diz se está virado, com aria-expanded); Esc
// desvira. Ao chegar perto, o mascote surge por trás do card para cumprimentar.
export default function CardDesenvolvedor({ pessoa }) {
  const [virado, setVirado] = useState(false)
  const idVerso = `verso-${pessoa.foto}`

  function aoTeclar(evento) {
    if (evento.key === 'Escape' && virado) {
      setVirado(false)
    }
  }

  return (
    <li className={`card-dev relative pt-16 [perspective:75rem] ${virado ? 'virado' : ''}`}>
      <span aria-hidden="true" className="dev-espia pointer-events-none absolute left-1/2 top-16 z-0">
        <Mascote nome={pessoa.mascote} expressao="feliz" tamanho="corpo" largura={128} />
      </span>

      <div className="dev-miolo relative z-10 grid">
        {/* Frente */}
        <div className="dev-face flex flex-col overflow-hidden rounded-card border border-borda bg-superficie shadow-card dark:shadow-none">
          <img
            src={FOTOS[`../assets/equipe/${pessoa.foto}.webp`]}
            width={400}
            height={500}
            alt=""
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover"
          />
          <h3 className="p-4">{pessoa.nome}</h3>
        </div>
        {/* Verso */}
        <div
          id={idVerso}
          aria-hidden={!virado}
          className="dev-face dev-verso flex flex-col justify-end gap-3 rounded-card bg-lilas p-6 text-[#1A1A1A]"
        >
          <p className="font-titulo text-h3 font-semibold">{pessoa.curto}</p>
          <p className="rounded-card-pequeno bg-white/45 p-3 font-semibold">{pessoa.papel || t.papelVazio}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setVirado(!virado)}
        onKeyDown={aoTeclar}
        aria-expanded={virado}
        aria-controls={idVerso}
        aria-label={preencher(t.virar, { nome: pessoa.curto })}
        className="absolute inset-x-0 bottom-0 top-16 z-20 rounded-card"
      />
    </li>
  )
}
