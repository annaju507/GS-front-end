import { Link } from 'react-router'
import { ArrowRight, BookOpen, Bus, HeartPulse, Shapes, ShieldCheck } from 'lucide-react'
import textos from '../data/textos.json'
import { formatarData } from '../domain/datas.js'
import { passoDaEtapa } from '../domain/previas.js'
import { preencher } from '../domain/texto.js'
import { coresDaArea } from './coresArea.js'

const t = textos.cardProposta
const ETAPAS = textos.previa.agora.etapas
const ICONES = { saude: HeartPulse, educacao: BookOpen, seguranca: ShieldCheck, cidade: Bus, outros: Shapes }

// Cartão padrão de proposta, igual em todo o site: faixa na cor da área com o
// ícone e o número (PL 1234/2026), o título simples, o resumo, a barrinha das
// 5 etapas e a data. Com "link", o cartão inteiro leva à página da proposta.
// Sem mascote e sem autor: o tom é só informativo e todas aparecem iguais.
// A barrinha usa índigo/lilás, nunca verde ou vermelho.
export default function CardProposta({ proposta, link = true, como: Tag = 'div' }) {
  const cores = coresDaArea(proposta.area)
  const Icone = ICONES[proposta.area] ?? Shapes
  const passo = passoDaEtapa(proposta.etapa)
  const nomeEtapa = passo >= 0 ? ETAPAS[passo] : (textos.tramitacao[proposta.etapa] ?? '')

  const classes = `flex h-full flex-col overflow-hidden rounded-modal border-2 bg-superficie text-texto no-underline ${cores.bloco.split(' ').filter((c) => c.startsWith('border-')).join(' ')}`
  const estilo = { boxShadow: `0 0.35rem 0 ${cores.degrau}` }

  const conteudo = (
    <>
      <span className={`flex items-center gap-2 px-4 py-2.5 font-titulo text-tag font-bold uppercase tracking-[0.05em] ${cores.bloco}`}>
        <Icone size={18} strokeWidth={2.25} aria-hidden="true" />
        {textos.areas[proposta.area] ?? textos.areas.outros}
        <span className="ml-auto text-legenda normal-case tracking-normal">{proposta.sigla}</span>
      </span>
      <span className="flex flex-1 flex-col gap-2 p-4">
        <span className="font-titulo text-h3 font-bold leading-snug">{proposta.titulo}</span>
        <span className="flex-1 text-legenda text-texto-2">{proposta.resumo}</span>
        <span className="mt-1 flex gap-1" aria-hidden="true">
          {ETAPAS.map((nome, indice) => (
            <span key={nome} className={`h-1.5 flex-1 rounded-full ${indice <= passo ? 'bg-link' : 'bg-lilas-claro'}`} />
          ))}
        </span>
        <span className="text-tag font-bold text-texto-2">
          {preencher(textos.agora.etapaAgora, { etapa: nomeEtapa })}
          {proposta.apresentadaEm && <> · {preencher(t.apresentadaEm, { data: formatarData(proposta.apresentadaEm) })}</>}
        </span>
        {link && (
          <span className="mt-1 inline-flex items-center gap-1.5 font-semibold text-link underline underline-offset-4">
            {t.ver}
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </span>
        )}
      </span>
    </>
  )

  if (link) {
    return (
      <Link
        to={`/app/proposta/${proposta.id}`}
        style={estilo}
        className={`${classes} transition-transform duration-200 hover:-translate-y-1 motion-reduce:transition-none`}
      >
        {conteudo}
      </Link>
    )
  }

  return (
    <Tag style={estilo} className={classes}>
      {conteudo}
    </Tag>
  )
}
