import { useParams } from 'react-router'
import { ArrowLeft, Building2, ExternalLink, Globe, IdCard, ListChecks, ListOrdered, MessageSquare, Phone, UserCheck } from 'lucide-react'
import textos from '../data/textos.json'
import { formatarData } from '../domain/datas.js'
import { preencher } from '../domain/texto.js'
import { buscarDireito, listarDireitos } from '../services/conteudoLocal.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import Botao from '../components/Botao.jsx'
import EtiquetaDireito from '../components/EtiquetaDireito.jsx'
import FonteOficial from '../components/FonteOficial.jsx'
import NaoEncontrada from './NaoEncontrada.jsx'

const t = textos.direitos

function Secao({ id, titulo, Icone, children }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-2">
      <h2 id={id} className="flex items-center gap-2 text-h3">
        <Icone size={24} strokeWidth={2} aria-hidden="true" className="shrink-0 text-link" />
        {titulo}
      </h2>
      {children}
    </section>
  )
}

// Um canal oficial: site (link externo), telefone (tel:) ou SMS (sms:).
function Canal({ canal }) {
  const base = 'flex min-h-12 items-center gap-3 rounded-card-pequeno border border-borda bg-superficie px-4 py-2 font-semibold'
  if (canal.tipo === 'telefone') {
    return (
      <a href={`tel:${canal.valor}`} className={base}>
        <Phone size={20} strokeWidth={2} aria-hidden="true" className="shrink-0" />
        <span>
          {canal.rotulo}: {preencher(t.canais.telefone, { valor: canal.valor })}
        </span>
      </a>
    )
  } else if (canal.tipo === 'sms') {
    return (
      <a href={`sms:${canal.valor}`} className={base}>
        <MessageSquare size={20} strokeWidth={2} aria-hidden="true" className="shrink-0" />
        <span>
          {canal.rotulo}: {preencher(t.canais.sms, { valor: canal.valor })}
        </span>
      </a>
    )
  } else {
    return (
      <a href={canal.url} target="_blank" rel="noopener noreferrer" className={base}>
        <Globe size={20} strokeWidth={2} aria-hidden="true" className="shrink-0" />
        <span className="flex-1">{canal.rotulo}</span>
        <ExternalLink size={16} strokeWidth={2} aria-hidden="true" className="shrink-0" />
        <span className="sr-only">{textos.acessibilidade.abreNovaAba}</span>
      </a>
    )
  }
}

// Página de um direito (documento de conteúdo 2.2): nunca só "você tem
// direito"; sempre quem tem, requisitos, como pedir, órgão, fonte e data.
export default function DireitoTema() {
  const { tema: id } = useParams()
  const tema = buscarDireito(id)
  useTitulo(tema ? tema.titulo : textos.naoEncontrada.titulo)

  if (!tema) {
    return <NaoEncontrada />
  }

  return (
    <article className="mx-auto flex max-w-leitura flex-col gap-6">
      <Botao variante="terciario" para="/app/direitos" icone={ArrowLeft} className="-ml-6 self-start">
        {t.voltar}
      </Botao>

      <header className="flex flex-col gap-3">
        <div>
          <EtiquetaDireito area={tema.area} />
        </div>
        <h1>{tema.titulo}</h1>
      </header>

      <Aviso tipo="alerta">{preencher(t.aviso, { data: formatarData(listarDireitos().consultadoEm) })}</Aviso>

      <Secao id="direito-quem" titulo={t.secoes.quemTemDireito} Icone={UserCheck}>
        <p>{tema.quemTemDireito}</p>
      </Secao>

      <Secao id="direito-requisitos" titulo={t.secoes.requisitos} Icone={ListChecks}>
        <ul className="flex list-disc flex-col gap-1 pl-6 marker:text-link">
          {tema.requisitos.map((requisito) => (
            <li key={requisito}>{requisito}</li>
          ))}
        </ul>
      </Secao>

      <Secao id="direito-documentos" titulo={t.secoes.documentos} Icone={IdCard}>
        <ul className="flex list-disc flex-col gap-1 pl-6 marker:text-link">
          {tema.documentos.map((documento) => (
            <li key={documento}>{documento}</li>
          ))}
        </ul>
      </Secao>

      <Secao id="direito-como" titulo={t.secoes.comoPedir} Icone={ListOrdered}>
        <ol className="flex list-decimal flex-col gap-2 pl-6 marker:font-bold marker:text-link">
          {tema.comoPedir.map((passo) => (
            <li key={passo}>{passo}</li>
          ))}
        </ol>
      </Secao>

      <Secao id="direito-orgao" titulo={t.secoes.orgao} Icone={Building2}>
        <p className="font-semibold">{tema.orgaoResponsavel}</p>
      </Secao>

      <Secao id="direito-canais" titulo={t.secoes.canais} Icone={Globe}>
        <ul className="flex flex-col gap-2">
          {tema.canais.map((canal) => (
            <li key={canal.rotulo}>
              <Canal canal={canal} />
            </li>
          ))}
        </ul>
      </Secao>

      <p className="text-texto-2">{t.limite}</p>

      <section aria-labelledby="direito-fontes" className="flex flex-col gap-2">
        <h2 id="direito-fontes" className="text-h3">{t.secoes.fontes}</h2>
        {tema.fontes.map((fonte) => (
          <FonteOficial key={`${fonte.documento}-${fonte.trecho}`} fonte={fonte} />
        ))}
      </section>
    </article>
  )
}
