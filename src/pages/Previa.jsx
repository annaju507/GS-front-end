import { useId, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { Lock } from 'lucide-react'
import textos from '../data/textos.json'
import trilha from '../data/trilha.json'
import direitos from '../data/direitos.json'
import { AREAS_PREVIA, ehAreaPrevia, passoDaEtapa } from '../domain/previas.js'
import { formatarData } from '../domain/datas.js'
import { preencher } from '../domain/texto.js'
import { PROPOSTAS_CONSULTADAS_EM, buscarPropostaLocal } from '../services/conteudoLocal.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import Etiqueta from '../components/Etiqueta.jsx'
import EtiquetaDireito from '../components/EtiquetaDireito.jsx'
import ImagemRio from '../components/ImagemRio.jsx'
import ImagemViva from '../components/ImagemViva.jsx'
import MascoteEspiando from '../components/MascoteEspiando.jsx'
import VitrineApp from '../components/VitrineApp.jsx'
import NaoEncontrada from './NaoEncontrada.jsx'

const t = textos.previa

// Rota de entrada de cada prévia: depois de entrar, a pessoa vai direto para a área.
const DESTINO_APOS_ENTRAR = { trilhas: '/app/trilha', agora: '/app/agora', direitos: '/app/direitos' }

// Colagem do topo de cada prévia (ilustrações do Rio e prints do app) e o
// mascote que espia. No Agora, a arara (novidades) fica no topo, longe das
// propostas, pela regra de neutralidade.
const TOPO = {
  trilhas: {
    principal: 'escadaria-selaron',
    extras: [{ nome: 'theatro-municipal' }, { nome: 'bondinho-pao-de-acucar' }],
    mascote: { nome: 'mico', expressao: 'comemorando' },
  },
  agora: {
    principal: 'ilha-fiscal',
    extras: [{ print: 'agora', alt: t.agora.printAlt }],
    mascote: { nome: 'arara', expressao: 'explicando' },
  },
  direitos: {
    principal: 'feira-sao-cristovao',
    extras: [{ print: 'direito', alt: t.direitos.printAlt }],
    mascote: { nome: 'onca', expressao: 'explicando' },
  },
}

// Convite do fim de cada prévia: mascote que recebe e o texto da área.
const CONVITE = {
  trilhas: { mascote: { nome: 'caramelo', expressao: 'explicando' }, texto: t.convite.texto },
  agora: { mascote: { nome: 'arara', expressao: 'feliz' }, texto: t.agora.convite },
  direitos: { mascote: { nome: 'onca', expressao: 'feliz' }, texto: preencher(t.direitos.convite, { n: direitos.temas.length }) },
}

// Abas das prévias em uma pílula; a ativa fica preta.
function estiloAba({ isActive }) {
  const base =
    'inline-flex min-h-11 items-center rounded-full px-4 font-titulo text-tag font-bold uppercase tracking-[0.05em] no-underline transition-colors duration-150'
  return isActive ? `${base} bg-[#1A1A1A] text-white` : `${base} text-texto hover:bg-lilas-claro`
}

function Colagem({ area }) {
  const { principal, extras, mascote } = TOPO[area]
  const umExtra = extras.length === 1
  return (
    <div className="relative h-72 sm:h-96">
      <ImagemViva nome={principal} prioridade className="absolute inset-y-0 left-0 right-[22%] bottom-[18%]" />
      {extras.map((extra, indice) => {
        let lugar
        if (umExtra) {
          lugar = 'boiar right-0 bottom-0 h-[52%] w-[58%]'
        } else if (indice === 0) {
          lugar = 'boiar right-0 top-[8%] h-[48%] w-[42%]'
        } else {
          lugar = 'boiar-lento right-[12%] bottom-0 h-[40%] w-[38%]'
        }
        return <ImagemViva key={extra.nome ?? extra.print} nome={extra.nome} print={extra.print} alt={extra.alt} className={`absolute ${lugar}`} />
      })}
      <MascoteEspiando nome={mascote.nome} expressao={mascote.expressao} posicao="-bottom-8 -left-4 sm:-left-6" largura={120} />
    </div>
  )
}

function PreviaTrilhas() {
  return (
    <>
      <section aria-labelledby="previa-vitrine" className="bg-lilas-claro">
        <div className="relative mx-auto flex max-w-conteudo flex-col gap-3 px-4 py-14 md:px-6 lg:px-8">
          <MascoteEspiando nome="capivara" expressao="feliz" posicao="right-4 top-2 hidden sm:block" largura={112} />
          <h2 id="previa-vitrine">{t.vitrine.titulo}</h2>
          <p className="mb-5 text-texto-2">{t.vitrine.texto}</p>
          <VitrineApp />
        </div>
      </section>

      <section aria-labelledby="previa-unidades" className="mx-auto flex max-w-conteudo flex-col gap-6 px-4 py-14 md:px-6 lg:px-8">
        <h2 id="previa-unidades">{t.trilhas.unidadesTitulo}</h2>
        <ol className="grid gap-5 md:grid-cols-2">
          {trilha.unidades.map((unidade) => (
            <li
              key={unidade.id}
              className="group flex items-center gap-4 rounded-card bg-[#1A1A1A] p-4 text-azul-ceu shadow-[0_0.25rem_0_#000] transition-transform duration-200 hover:-translate-y-1 dark:border-2 dark:border-azul-ceu"
            >
              {unidade.capa && (
                <span className="size-20 shrink-0 overflow-hidden rounded-card-pequeno sm:size-24">
                  <ImagemRio nome={unidade.capa} className="size-full transition-transform duration-500 group-hover:scale-110" />
                </span>
              )}
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-titulo text-tag font-bold uppercase tracking-[0.08em]">{preencher(t.unidade, { numero: unidade.id })}</span>
                <h3 className="text-azul-ceu">{unidade.titulo}</h3>
                <p className="line-clamp-2 text-legenda text-[#D4D0DC]">{unidade.descricao}</p>
                {!unidade.disponivel && (
                  <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-azul-ceu px-2.5 py-0.5 text-tag font-bold">
                    <Lock size={14} strokeWidth={2} aria-hidden="true" />
                    {t.emBreve}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

// Linha do tempo da proposta (inspirada em sites de acompanhamento de leis):
// 5 passos, com o atual marcado em índigo. Cores neutras, nunca verde ou vermelho.
function LinhaEtapas({ etapa }) {
  const atual = passoDaEtapa(etapa)
  const rotulo = preencher(t.agora.etapasRotulo, { etapa: atual >= 0 ? t.agora.etapas[atual] : textos.tramitacao[etapa] ?? '' })
  return (
    <ol aria-label={rotulo} className="grid grid-cols-5 gap-1">
      {t.agora.etapas.map((nome, indice) => {
        let estado = 'futura'
        if (indice < atual) {
          estado = 'feita'
        } else if (indice === atual) {
          estado = 'atual'
        }
        return (
          <li
            key={nome}
            aria-current={estado === 'atual' ? 'step' : undefined}
            className={`relative flex flex-col items-center gap-1.5 text-center text-[0.72rem] font-bold leading-tight ${estado === 'atual' ? 'text-texto' : 'text-texto-2'}`}
          >
            {indice > 0 && (
              <span aria-hidden="true" className={`absolute right-1/2 top-2 h-0.5 w-full ${estado === 'futura' ? 'bg-borda' : 'bg-lilas'}`} />
            )}
            <span
              aria-hidden="true"
              className={`relative size-4 rounded-full ${
                estado === 'atual' ? 'bg-link ring-4 ring-lilas-claro' : estado === 'feita' ? 'bg-lilas' : 'bg-borda'
              }`}
            />
            {nome}
          </li>
        )
      })}
    </ol>
  )
}

// Duas propostas reais da seleção. Mostra o título simples, o texto oficial
// (que abre ao clicar), onde a proposta está e a situação como veio da Câmara.
const IDS_PREVIA_AGORA = [2643736, 2651275]

function PreviaAgora() {
  return (
    <section aria-labelledby="previa-propostas" className="bg-lilas-claro">
      <div className="mx-auto flex max-w-conteudo flex-col gap-3 px-4 py-14 md:px-6 lg:px-8">
        <h2 id="previa-propostas">{t.agora.exemplosTitulo}</h2>
        <p className="mb-5 text-texto-2">{preencher(t.agora.nota, { data: formatarData(PROPOSTAS_CONSULTADAS_EM) })}</p>
        <ul className="grid gap-6 md:grid-cols-2">
          {IDS_PREVIA_AGORA.map(buscarPropostaLocal).filter(Boolean).map((proposta) => (
            <li
              key={proposta.id}
              className="flex flex-col gap-4 rounded-card border border-borda bg-superficie p-6 shadow-card transition-transform duration-200 hover:-translate-y-1 dark:shadow-none"
            >
              <span className="flex flex-wrap gap-2">
                <Etiqueta tipo="area" valor={proposta.area} />
              </span>
              <h3>
                {proposta.sigla}: {proposta.titulo}
              </h3>
              <p className="text-texto-2">{proposta.resumo}</p>
              <details className="rounded-card-pequeno border-l-4 border-lilas bg-lilas-claro px-4 py-2 text-legenda">
                <summary className="flex min-h-9 cursor-pointer items-center font-titulo text-tag font-bold uppercase tracking-[0.05em] text-link">
                  {t.agora.textoOficial}
                </summary>
                <p className="pb-2">{proposta.ementa}</p>
              </details>
              <div className="flex flex-col gap-2">
                <p className="font-titulo text-tag font-bold uppercase tracking-[0.08em] text-texto-2">{t.agora.ondeEsta}</p>
                <LinhaEtapas etapa={proposta.etapa} />
              </div>
              <p className="text-legenda text-texto-2">
                {preencher(t.agora.rodape, {
                  data: formatarData(proposta.apresentadaEm),
                  situacao: proposta.situacaoOficial || textos.tramitacao[proposta.etapa],
                })}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Um serviço de cada área, sempre nas mesmas partes (como numa carta de
// serviços): quem tem direito, o que levar e onde ir, em abinhas.
const IDS_PREVIA_DIREITOS = ['atendimento-no-sus', 'matricula-rede-municipal', 'pedir-servico-prefeitura']

function ServicoPrevia({ tema }) {
  const [parte, setParte] = useState(0)
  const id = useId()
  const canal = tema.canais[0]
  return (
    <li className="flex flex-col gap-4 rounded-card border border-borda bg-superficie p-5 shadow-card dark:shadow-none">
      <div>
        <EtiquetaDireito area={tema.area} />
      </div>
      <h3>{tema.titulo}</h3>
      <p className="text-texto-2">{tema.resumo}</p>
      <div role="group" aria-label={preencher(t.direitos.partesRotulo, { titulo: tema.titulo })} className="flex gap-1 rounded-full bg-lilas-claro p-1">
        {t.direitos.partes.map((nome, indice) => (
          <button
            key={nome}
            type="button"
            onClick={() => setParte(indice)}
            aria-pressed={parte === indice}
            aria-controls={`${id}-painel`}
            className={`min-h-10 flex-1 rounded-full px-2 font-titulo text-[0.75rem] font-bold transition-colors duration-150 ${
              parte === indice ? 'bg-superficie text-link shadow-card' : 'text-texto'
            }`}
          >
            {nome}
          </button>
        ))}
      </div>
      <div id={`${id}-painel`} aria-live="polite" className="min-h-28 text-legenda">
        {parte === 0 && <p>{tema.quemTemDireito}</p>}
        {parte === 1 && (
          <ul className="flex list-disc flex-col gap-1 pl-5">
            {tema.documentos.map((documento) => (
              <li key={documento}>{documento}</li>
            ))}
          </ul>
        )}
        {parte === 2 && (
          <div className="flex flex-col gap-1">
            {canal && (
              <p className="font-semibold">
                {canal.rotulo}
                {canal.valor ? ` (${canal.valor})` : ''}
              </p>
            )}
            <p className="text-texto-2">{preencher(t.direitos.responsavel, { orgao: tema.orgaoResponsavel })}</p>
          </div>
        )}
      </div>
    </li>
  )
}

function PreviaDireitos() {
  return (
    <section aria-labelledby="previa-servicos" className="bg-lilas-claro">
      <div className="relative mx-auto flex max-w-conteudo flex-col gap-3 px-4 py-14 md:px-6 lg:px-8">
        <MascoteEspiando nome="caramelo" expressao="feliz" posicao="right-4 top-2 hidden sm:block" largura={112} />
        <h2 id="previa-servicos">{t.direitos.exemplosTitulo}</h2>
        <p className="mb-5 text-texto-2">{t.direitos.dica}</p>
        <ul className="grid gap-6 lg:grid-cols-3">
          {IDS_PREVIA_DIREITOS.map((id) => direitos.temas.find((tema) => tema.id === id)).filter(Boolean).map((tema) => (
            <ServicoPrevia key={tema.id} tema={tema} />
          ))}
        </ul>
      </div>
    </section>
  )
}

const CONTEUDO = { trilhas: PreviaTrilhas, agora: PreviaAgora, direitos: PreviaDireitos }

// Prévias públicas: topo com colagem animada e abas, uma amostra de cada área
// e o convite para entrar. Nenhuma prévia dá acesso ao conteúdo interno.
export default function Previa() {
  const { area } = useParams()
  const valida = ehAreaPrevia(area)
  useTitulo(valida ? t[area].titulo : textos.naoEncontrada.titulo)

  if (!valida) {
    return <NaoEncontrada />
  }

  const Conteudo = CONTEUDO[area]
  const convite = CONVITE[area]

  return (
    <>
      <section aria-labelledby="previa-titulo">
        <div className="mx-auto grid max-w-conteudo items-center gap-12 px-4 pb-16 pt-12 md:px-6 lg:grid-cols-2 lg:px-8 lg:pt-16">
          <div className="flex flex-col items-start gap-4">
            <h1 id="previa-titulo">{t[area].titulo}</h1>
            <p className="max-w-leitura text-[1.2rem]">{t[area].intro}</p>
            <nav aria-label={t.rotuloNav} className="mt-2">
              <ul className="inline-flex flex-wrap gap-1 rounded-full border border-borda bg-superficie p-1.5">
                {AREAS_PREVIA.map((chave) => (
                  <li key={chave}>
                    <NavLink to={`/previa/${chave}`} className={estiloAba}>
                      {textos.publico.nav[chave]}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <Colagem area={area} />
        </div>
      </section>

      <Conteudo />

      <section aria-labelledby="previa-convite" className="border-t-2 border-lilas/40 bg-lilas-claro">
        <div className="relative mx-auto flex max-w-conteudo flex-col items-start gap-6 px-4 pb-14 pt-24 md:flex-row md:items-center md:justify-between md:px-6 md:pt-14 lg:px-8">
          <MascoteEspiando nome={convite.mascote.nome} expressao={convite.mascote.expressao} posicao="-top-12 left-1/2 -ml-14 md:left-[45%]" largura={112} />
          <div className="flex max-w-leitura flex-col gap-2">
            <h2 id="previa-convite">{t.convite.titulo}</h2>
            <p>{convite.texto}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 whitespace-nowrap sm:flex-row">
            <Botao variante="secundario" para="/entrar" state={{ paginaPedida: DESTINO_APOS_ENTRAR[area] }}>
              {t.convite.entrar}
            </Botao>
            <Botao variante="primario" para="/cadastro">
              {t.convite.criarConta}
            </Botao>
          </div>
        </div>
      </section>
    </>
  )
}
