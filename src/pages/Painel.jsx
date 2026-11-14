import { ArrowRight } from 'lucide-react'
import textos from '../data/textos.json'
import { ordemDasLicoes, porcentagemConcluida, proximaLicao, unidadeDaLicao } from '../domain/trilha.js'
import { dataLocalIso } from '../domain/progresso.js'
import { escolherPropostaDoDia } from '../domain/propostas.js'
import { preencher } from '../domain/texto.js'
import { UNIDADES, buscarLicao, listarPropostas } from '../services/conteudoLocal.js'
import { useAuth } from '../hooks/useAuth.js'
import { useProgresso } from '../hooks/useProgresso.js'
import { useTitulo } from '../hooks/useTitulo.js'
import BarraProgresso from '../components/BarraProgresso.jsx'
import Botao from '../components/Botao.jsx'
import Card from '../components/Card.jsx'
import CardProposta from '../components/CardProposta.jsx'
import SequenciaDias from '../components/SequenciaDias.jsx'

const t = textos.painel
const ORDEM = ordemDasLicoes(UNIDADES)

// Proposta do dia: uma da seleção, que muda a cada dia (escolha automática
// pela data, não é destaque nem recomendação). Sem mascote.
function PropostaDoDia() {
  const proposta = escolherPropostaDoDia(listarPropostas(), dataLocalIso(new Date()))

  return (
    <section aria-labelledby="painel-proposta" className="flex flex-col gap-3 lg:col-span-2">
      <h2 id="painel-proposta" className="text-h3">{t.propostaDoDia.titulo}</h2>
      <p className="text-legenda text-texto-2">{t.propostaDoDia.texto}</p>
      {proposta && <CardProposta proposta={proposta} />}
    </section>
  )
}

export default function Painel() {
  useTitulo(t.tituloAba)
  const { usuario } = useAuth()
  const { progresso, sequencia, perdeuSequencia, medalhas } = useProgresso()

  const idProxima = proximaLicao(ORDEM, progresso.licoes)
  const licao = idProxima ? buscarLicao(idProxima) : null
  const unidade = idProxima ? unidadeDaLicao(UNIDADES, idProxima) : null
  const comecou = Object.keys(progresso.licoes).length > 0
  const ganhas = medalhas.filter((medalha) => medalha.ganha).length

  return (
    <div className="flex flex-col gap-6">
      <h1>{preencher(t.ola, { apelido: usuario.apelido })}</h1>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card como="section" destaque aria-labelledby="painel-continuar" className="flex flex-col gap-4 lg:col-span-2">
          <h2 id="painel-continuar" className="text-h3">{t.continuar.titulo}</h2>
          {licao ? (
            <>
              <div>
                <p className="font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2">
                  {preencher(t.continuar.unidade, { numero: unidade.id, titulo: unidade.titulo })}
                </p>
                <p className="font-titulo text-h3 font-semibold">{licao.titulo}</p>
              </div>
              <BarraProgresso valor={porcentagemConcluida(ORDEM, progresso.licoes)} rotulo={t.progresso} />
              <div>
                <Botao variante="primario" para={`/app/licao/${licao.id}`} icone={ArrowRight}>
                  {comecou ? t.continuar.botao : t.continuar.comecar}
                </Botao>
              </div>
            </>
          ) : (
            <>
              <p>{t.continuar.fim}</p>
              <div>
                <Botao variante="secundario" para="/app/trilha">{t.continuar.verTrilha}</Botao>
              </div>
            </>
          )}
        </Card>

        <Card como="section" aria-labelledby="painel-sequencia" className="flex flex-col gap-4">
          <h2 id="painel-sequencia" className="text-h3">{t.sequencia.titulo}</h2>
          <SequenciaDias dias={sequencia} perdida={perdeuSequencia} />
          <p className="text-texto-2">{preencher(t.medalhas, { n: ganhas, total: medalhas.length })}</p>
          <div>
            <Botao variante="terciario" para="/app/perfil" className="-ml-6">{t.verPerfil}</Botao>
          </div>
        </Card>

        <PropostaDoDia />
      </div>
    </div>
  )
}
