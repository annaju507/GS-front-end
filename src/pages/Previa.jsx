import { NavLink, useParams } from 'react-router'
import { Lock } from 'lucide-react'
import textos from '../data/textos.json'
import trilha from '../data/trilha.json'
import direitos from '../data/direitos.json'
import { AREAS_PREVIA, ehAreaPrevia } from '../domain/previas.js'
import { preencher } from '../domain/texto.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import Botao from '../components/Botao.jsx'
import Card from '../components/Card.jsx'
import Etiqueta from '../components/Etiqueta.jsx'
import EtiquetaDireito from '../components/EtiquetaDireito.jsx'
import ImagemRio from '../components/ImagemRio.jsx'
import NaoEncontrada from './NaoEncontrada.jsx'

const t = textos.previa

// Rota de entrada de cada prévia: depois de entrar, a pessoa vai direto para a área.
const DESTINO_APOS_ENTRAR = { trilhas: '/app/trilha', agora: '/app/agora', direitos: '/app/direitos' }

function estiloAba({ isActive }) {
  const base =
    'inline-flex min-h-11 items-center rounded-full border-2 px-4 font-titulo text-tag font-bold uppercase tracking-[0.05em] no-underline transition-colors duration-150'
  return isActive ? `${base} border-link bg-lilas-claro text-link` : `${base} border-borda text-texto hover:bg-lilas-claro`
}

function PreviaTrilhas() {
  return (
    <ol className="grid gap-3 md:grid-cols-2">
      {trilha.unidades.map((unidade) => (
        <Card key={unidade.id} como="li" destaque={unidade.disponivel && unidade.id === 1} className="flex flex-col gap-2 overflow-hidden">
          {unidade.capa && (
            <ImagemRio nome={unidade.capa} className="-mx-4 -mt-4 mb-2 h-36 w-[calc(100%+2rem)] max-w-none md:-mx-6 md:-mt-6 md:h-40 md:w-[calc(100%+3rem)]" />
          )}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2">
              {preencher(t.unidade, { numero: unidade.id })}
            </span>
            {unidade.disponivel ? (
              <span className="rounded-full bg-lilas-claro px-3 py-1 text-tag font-bold text-link">{t.disponivel}</span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-borda px-3 py-1 text-tag font-bold text-texto-2">
                <Lock size={16} strokeWidth={2} aria-hidden="true" />
                {t.emBreve}
              </span>
            )}
          </div>
          <h2 className="text-h3">{unidade.titulo}</h2>
          <p className="text-texto-2">{unidade.descricao}</p>
        </Card>
      ))}
    </ol>
  )
}

function PreviaAgora() {
  return (
    <>
      <Aviso tipo="info">{t.agora.nota}</Aviso>
      <ul className="grid gap-3 md:grid-cols-2">
        {t.agora.exemplos.map((exemplo) => (
          <Card key={exemplo.titulo} como="li" className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <Etiqueta tipo="area" valor={exemplo.area} />
              <Etiqueta tipo="status" valor={exemplo.status} />
            </div>
            <h2 className="text-h3">{exemplo.titulo}</h2>
            <p className="text-texto-2">{exemplo.resumo}</p>
          </Card>
        ))}
      </ul>
    </>
  )
}

function PreviaDireitos() {
  return (
    <ul className="grid gap-3 md:grid-cols-3">
      {direitos.temas.slice(0, 3).map((exemplo) => (
        <Card key={exemplo.titulo} como="li" className="flex flex-col gap-3">
          <div>
            <EtiquetaDireito area={exemplo.area} />
          </div>
          <h2 className="text-h3">{exemplo.titulo}</h2>
          <p className="text-texto-2">{exemplo.resumo}</p>
        </Card>
      ))}
    </ul>
  )
}

const CONTEUDO = { trilhas: PreviaTrilhas, agora: PreviaAgora, direitos: PreviaDireitos }

// Prévias públicas: uma amostra de cada área, sempre terminando no convite
// para entrar. Nenhuma prévia dá acesso ao conteúdo interno.
export default function Previa() {
  const { area } = useParams()
  const valida = ehAreaPrevia(area)
  useTitulo(valida ? t[area].titulo : textos.naoEncontrada.titulo)

  if (!valida) {
    return <NaoEncontrada />
  }

  const Conteudo = CONTEUDO[area]

  return (
    <div className="mx-auto flex max-w-conteudo flex-col gap-8 px-4 py-12 md:px-6 lg:px-8">
      <nav aria-label={t.rotuloNav}>
        <ul className="flex flex-wrap gap-2">
          {AREAS_PREVIA.map((chave) => (
            <li key={chave}>
              <NavLink to={`/previa/${chave}`} className={estiloAba}>
                {textos.publico.nav[chave]}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <header className="flex max-w-leitura flex-col gap-3">
        <p className="self-start rounded-full bg-lilas-claro px-3 py-1 font-titulo text-tag font-bold uppercase tracking-[0.05em] text-link">
          {t.selo}
        </p>
        <h1>{t[area].titulo}</h1>
        <p className="text-corpo">{t[area].intro}</p>
      </header>

      <Conteudo />

      <section aria-labelledby="previa-convite" className="flex flex-col items-start gap-4 rounded-card bg-hero p-6 md:p-8">
        <h2 id="previa-convite">{t.convite.titulo}</h2>
        <p className="max-w-leitura">{t.convite.texto}</p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Botao variante="primario" para="/entrar" state={{ paginaPedida: DESTINO_APOS_ENTRAR[area] }}>
            {t.convite.entrar}
          </Botao>
          <Botao variante="secundario" para="/cadastro">
            {t.convite.criarConta}
          </Botao>
        </div>
      </section>
    </div>
  )
}
