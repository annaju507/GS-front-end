import { Link, useParams } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import textos from '../data/textos.json'
import { ESFERAS_DA_ROTA, esferaDoCargo } from '../domain/representantes.js'
import { formatarData } from '../domain/datas.js'
import { useRepresentante } from '../hooks/useRepresentante.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import EstadoCarregando from '../components/EstadoCarregando.jsx'
import EstadoErro from '../components/EstadoErro.jsx'
import Etiqueta from '../components/Etiqueta.jsx'
import FonteOficial from '../components/FonteOficial.jsx'
import FotoRepresentante from '../components/FotoRepresentante.jsx'

const t = textos.representantes

function Dado({ rotulo, valor }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-legenda font-semibold text-texto-2">{rotulo}</dt>
      <dd className="font-semibold">{valor}</dd>
    </div>
  )
}

// Perfil de um representante: os mesmos campos para todos, foto oficial e
// fonte. Sem mascote e sem nenhum juízo de valor sobre a pessoa.
export default function Representante() {
  const { id } = useParams()
  const { carregando, erro, dados, tentarDeNovo } = useRepresentante(id)
  useTitulo(dados ? dados.pessoa.nome : t.tituloAba)

  if (carregando) {
    return (
      <div className="mx-auto max-w-leitura">
        <h1 className="sr-only">{t.tituloAba}</h1>
        <EstadoCarregando texto={t.perfil.carregando} />
      </div>
    )
  } else if (erro === 'naoEncontrado') {
    return (
      <div className="mx-auto flex max-w-leitura flex-col items-start gap-4">
        <h1 className="text-h2">{t.tituloAba}</h1>
        <p>{t.perfil.naoEncontrado}</p>
        <Botao variante="primario" para="/app/representantes">{t.titulo}</Botao>
      </div>
    )
  } else if (erro) {
    return (
      <div className="mx-auto flex max-w-leitura flex-col gap-4">
        <h1 className="text-h2">{t.tituloAba}</h1>
        <EstadoErro semConexao={erro === 'semConexao'} semMascote onTentarDeNovo={tentarDeNovo} />
      </div>
    )
  }

  const { pessoa, proposicoes, fonte } = dados
  const esfera = esferaDoCargo(pessoa.cargo)
  const mandato = pessoa.mandato || t.mandatos[pessoa.cargo] || ''
  const situacao = t.situacoes[pessoa.situacao ?? 'emExercicio']

  return (
    <article className="mx-auto flex max-w-leitura flex-col gap-6">
      <Botao variante="terciario" para={`/app/representantes/${esfera}`} icone={ArrowLeft} className="-ml-6 self-start">
        {t.perfil.voltar}
      </Botao>

      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <FotoRepresentante pessoa={pessoa} tamanho="perfil" />
        <div className="flex flex-col gap-2">
          <h1>{pessoa.nome}</h1>
          <p className="font-titulo text-h3 font-semibold text-texto-2">{t.cargos[pessoa.cargo].um}</p>
          <div>
            <Etiqueta tipo="esfera" valor={ESFERAS_DA_ROTA[esfera]} />
          </div>
        </div>
      </header>

      <dl className="grid gap-4 rounded-card border border-borda bg-superficie p-4 sm:grid-cols-2 md:p-6">
        <Dado rotulo={t.perfil.partido} valor={pessoa.partido || t.semPartido} />
        <Dado rotulo={t.perfil.representa} valor={t.representa[pessoa.cargo]} />
        <Dado rotulo={t.perfil.situacao} valor={situacao} />
        {mandato && <Dado rotulo={t.perfil.mandato} valor={mandato} />}
      </dl>

      {proposicoes && (
        <section aria-labelledby="perfil-proposicoes" className="flex flex-col gap-3">
          <h2 id="perfil-proposicoes" className="text-h3">{t.proposicoes.titulo}</h2>
          <p className="text-legenda text-texto-2">{t.proposicoes.texto}</p>
          {proposicoes.length === 0 ? (
            <p>{t.proposicoes.vazio}</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {proposicoes.map((proposta) => (
                <li key={proposta.id}>
                  <Link
                    to={`/app/proposta/${proposta.id}`}
                    className="flex flex-col gap-1 rounded-card-pequeno border border-borda bg-superficie p-4 text-texto no-underline hover:border-lilas"
                  >
                    <span className="flex flex-wrap justify-between gap-2">
                      <span className="font-titulo font-bold">{proposta.sigla}</span>
                      <span className="text-legenda text-texto-2">{formatarData(proposta.apresentadaEm)}</span>
                    </span>
                    <span className="line-clamp-2">{proposta.ementa}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-link underline underline-offset-4">
                      {t.proposicoes.ver}
                      <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      <p className="text-texto-2">{t.perfil.maisInfo}</p>
      <FonteOficial fonte={fonte} />
    </article>
  )
}
