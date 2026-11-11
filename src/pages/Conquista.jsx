import { useLocation, useParams } from 'react-router'
import { ArrowRight, Clock, Flame, Target } from 'lucide-react'
import textos from '../data/textos.json'
import { MEDALHAS } from '../domain/conquistas.js'
import { dividirTempo } from '../domain/quiz.js'
import { unidadeDaLicao } from '../domain/trilha.js'
import { plural, preencher } from '../domain/texto.js'
import { UNIDADES, buscarLicao } from '../services/conteudoLocal.js'
import { useProgresso } from '../hooks/useProgresso.js'
import { useProposicoes } from '../hooks/useProposicoes.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import Card from '../components/Card.jsx'
import CardEstatistica from '../components/CardEstatistica.jsx'
import Confete from '../components/Confete.jsx'
import EstadoCarregando from '../components/EstadoCarregando.jsx'
import EstadoErro from '../components/EstadoErro.jsx'
import Mascote from '../components/Mascote.jsx'
import Medalha from '../components/Medalha.jsx'

const t = textos.conquista

// Proposta real ligada ao tema da unidade: a mais recente de deputados do RJ.
function PropostaSugerida({ busca }) {
  const { tema, ...filtros } = busca
  const { carregando, erro, lista, tentarDeNovo } = useProposicoes({ ...filtros, itens: 1 })

  let conteudo
  if (carregando) {
    conteudo = <EstadoCarregando />
  } else if (erro) {
    conteudo = <EstadoErro semConexao={erro === 'semConexao'} onTentarDeNovo={tentarDeNovo} />
  } else if (lista.length === 0) {
    conteudo = (
      <div className="flex flex-col items-start gap-3">
        <p>{t.proposta.semProposta}</p>
        <Botao variante="primario" para="/app/agora">{t.irAgora}</Botao>
      </div>
    )
  } else {
    const proposta = lista[0]
    conteudo = (
      <div className="flex flex-col items-start gap-3">
        <p className="font-titulo font-bold">{proposta.sigla}</p>
        <p className="line-clamp-4">{proposta.ementa}</p>
        <Botao variante="primario" para={`/app/proposta/${proposta.id}`} icone={ArrowRight}>
          {t.continuar}
        </Botao>
      </div>
    )
  }

  return (
    <Card como="section" aria-labelledby="conquista-proposta" className="flex flex-col gap-3">
      <h2 id="conquista-proposta" className="text-h3">{t.proposta.titulo}</h2>
      <p className="text-legenda text-texto-2">{preencher(t.proposta.texto, { tema })}</p>
      {conteudo}
    </Card>
  )
}

// Tela de conquista (tela-modelo 19.4): degradê, confete, mico, "Manda bem!",
// 3 cards com abinha, medalhas novas e a proposta real do tema.
export default function Conquista() {
  const { id } = useParams()
  const { state } = useLocation()
  const licao = buscarLicao(id)
  const { progresso, sequencia } = useProgresso()
  useTitulo(t.tituloAba)

  const salvo = progresso.licoes[id]
  const resultado = state ?? (salvo ? { ...salvo, sequencia, novas: [] } : null)

  if (!licao || !resultado) {
    return (
      <main id="conteudo" className="mx-auto flex max-w-leitura flex-col items-start gap-4 px-4 py-12">
        <h1 className="text-h2">{t.semResultado}</h1>
        <Botao variante="primario" para="/app/trilha">{t.voltarTrilha}</Botao>
      </main>
    )
  }

  const unidade = unidadeDaLicao(UNIDADES, id)
  const tempo = dividirTempo(resultado.segundos ?? 0)
  const novas = MEDALHAS.filter((medalha) => resultado.novas.includes(medalha.id)).map((medalha) => ({ ...medalha, ganha: true }))

  return (
    <main id="conteudo" tabIndex={-1} className="focus:outline-none">
      <section className="relative overflow-hidden bg-linear-to-b from-lilas from-0% to-indigo to-55%">
        <Confete />
        <div className="relative mx-auto flex max-w-leitura flex-col items-center gap-3 px-4 pb-10 pt-8 text-center">
          <Mascote nome="mico" expressao="comemorando" tamanho="corpo" largura={150} prioridade />
          <h1 className="text-h1 text-white">{t.titulo}</h1>
          <p className="text-white">{preencher(t.subtitulo, { titulo: licao.titulo })}</p>
        </div>
      </section>

      <div className="mx-auto flex max-w-leitura flex-col gap-6 px-4 py-8 md:px-6">
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <CardEstatistica
            rotulo={t.acertos}
            cor="lilas"
            Icone={Target}
            valor={preencher(t.acertosValor, { acertos: resultado.acertos, total: resultado.total })}
          />
          <CardEstatistica
            rotulo={t.sequencia}
            cor="mico"
            Icone={Flame}
            valor={plural(resultado.sequencia, t.sequenciaUm, t.sequenciaVarios)}
          />
          <CardEstatistica
            rotulo={t.tempo}
            cor="indigo"
            Icone={Clock}
            valor={preencher(t.tempoValor, { min: tempo.minutos, seg: tempo.segundos })}
          />
        </ul>

        {novas.length > 0 && (
          <section aria-labelledby="conquista-medalhas" className="flex flex-col gap-3">
            <h2 id="conquista-medalhas" className="text-h3">{t.medalhaNova}</h2>
            <ul className="flex flex-wrap justify-center gap-6">
              {novas.map((medalha) => (
                <Medalha key={medalha.id} medalha={medalha} />
              ))}
            </ul>
          </section>
        )}

        {unidade?.propostaSugerida && <PropostaSugerida busca={unidade.propostaSugerida} />}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Botao variante="secundario" para={`/app/licao/${id}`}>{t.rever}</Botao>
          <Botao variante="terciario" para="/app/trilha">{t.voltarTrilha}</Botao>
        </div>
      </div>
    </main>
  )
}
