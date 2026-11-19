import { useState } from 'react'
import { BookOpen, Bus, HeartPulse, Scale, ShieldCheck } from 'lucide-react'
import textos from '../data/textos.json'
import { agruparPorArea } from '../domain/direitos.js'
import { plural, preencher } from '../domain/texto.js'
import { listarDireitos } from '../services/conteudoLocal.js'
import { useTitulo } from '../hooks/useTitulo.js'
import BalaoMascote from '../components/BalaoMascote.jsx'
import JanelaTemas from '../components/JanelaTemas.jsx'
import TopoPagina from '../components/TopoPagina.jsx'
import { coresDaArea } from '../components/coresArea.js'

const t = textos.direitos
const ICONES = { saude: HeartPulse, educacao: BookOpen, seguranca: ShieldCheck, cidade: Bus, transversal: Scale }
const TEMAS = listarDireitos().temas

function nomeDaArea(area) {
  if (area === 'transversal') {
    return t.transversal
  } else {
    return textos.areas[area]
  }
}

// Direitos: um quadrado para cada área (na cor dela, com degrau). Tocar num
// quadrado abre a janela com todos os temas daquela área, por cima da página,
// com o fundo embaçado. A onça (confere fontes e canais oficiais) apresenta.
export default function Direitos() {
  useTitulo(t.tituloAba)
  const grupos = agruparPorArea(TEMAS)
  const [aberta, setAberta] = useState(null)
  const grupoAberto = grupos.find((grupo) => grupo.area === aberta)

  return (
    <div className="mx-auto flex max-w-[64rem] flex-col gap-6">
      <TopoPagina
        imagem="feira-sao-cristovao"
        titulo={t.titulo}
        intro={t.intro}
        chips={t.chips.map((chip) => preencher(chip, { total: TEMAS.length }))}
        mascote={{ nome: 'onca', expressao: 'explicando' }}
      />

      <BalaoMascote mascote="onca" expressao="explicando">
        <p>{t.fala}</p>
      </BalaoMascote>

      <section aria-labelledby="direitos-areas" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 id="direitos-areas" className="text-h3">{t.escolhaArea.titulo}</h2>
          <p className="text-texto-2">{t.escolhaArea.texto}</p>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {grupos.map((grupo, indice) => {
            const cores = coresDaArea(grupo.area === 'transversal' ? 'neutra' : grupo.area)
            const Icone = ICONES[grupo.area] ?? Scale
            const nome = nomeDaArea(grupo.area)
            return (
              <li key={grupo.area} className="cartao-entra" style={{ animationDelay: `${indice * 80 + 150}ms` }}>
                <button
                  type="button"
                  onClick={() => setAberta(grupo.area)}
                  aria-haspopup="dialog"
                  aria-label={preencher(t.escolhaArea.abrir, { area: nome })}
                  style={{ boxShadow: `0 0.45rem 0 ${cores.degrau}` }}
                  className={`relative flex aspect-square w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border-2 p-4 text-left transition-transform duration-200 hover:-translate-y-1 hover:-rotate-1 active:translate-y-1 motion-reduce:transition-none ${cores.bloco}`}
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-card bg-superficie">
                    <Icone size={30} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className="relative flex flex-col items-start gap-1.5">
                    <span className="font-titulo text-h3 font-bold leading-tight">{nome}</span>
                    <span className="rounded-full bg-superficie px-2.5 py-0.5 font-titulo text-tag font-bold">
                      {plural(grupo.temas.length, t.escolhaArea.temaUm, t.escolhaArea.temas)}
                    </span>
                  </span>
                  <Icone size={96} strokeWidth={1.5} aria-hidden="true" className="absolute -bottom-5 -right-5 opacity-15" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {grupoAberto && (
        <JanelaTemas
          area={grupoAberto.area}
          nome={nomeDaArea(grupoAberto.area)}
          Icone={ICONES[grupoAberto.area] ?? Scale}
          temas={grupoAberto.temas}
          onFechar={() => setAberta(null)}
        />
      )}
    </div>
  )
}
