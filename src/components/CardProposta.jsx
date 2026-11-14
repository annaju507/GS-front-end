import { ArrowRight } from 'lucide-react'
import textos from '../data/textos.json'
import { formatarData } from '../domain/datas.js'
import { preencher } from '../domain/texto.js'
import Card from './Card.jsx'
import Etiqueta from './Etiqueta.jsx'

const t = textos.cardProposta

// Card padrão de proposta, igual em todo o site: etiquetas de área e de
// situação, "PL 1234/2026: título simples", resumo e a data de apresentação.
// Com "link", o card inteiro leva à página da proposta. Sem mascote e sem
// autor: o tom é só informativo e todas as propostas aparecem do mesmo jeito.
export default function CardProposta({ proposta, link = true, como = 'div' }) {
  const conteudo = (
    <>
      <span className="flex flex-wrap gap-2">
        <Etiqueta tipo="area" valor={proposta.area} />
        <Etiqueta tipo="status" valor={proposta.etapa} />
      </span>
      <span className="font-titulo text-h3 font-bold">
        {proposta.sigla}: {proposta.titulo}
      </span>
      <span className="text-texto-2">{proposta.resumo}</span>
      <span className="text-legenda text-texto-2">{preencher(t.apresentadaEm, { data: formatarData(proposta.apresentadaEm) })}</span>
      {link && (
        <span className="inline-flex items-center gap-1.5 font-semibold text-link underline underline-offset-4">
          {t.ver}
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </span>
      )}
    </>
  )

  if (link) {
    return (
      <Card para={`/app/proposta/${proposta.id}`} className="flex h-full flex-col gap-3">
        {conteudo}
      </Card>
    )
  }

  return (
    <Card como={como} className="flex h-full flex-col gap-3">
      {conteudo}
    </Card>
  )
}
