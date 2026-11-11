import { Award } from 'lucide-react'
import { Link } from 'react-router'
import textos from '../data/textos.json'
import { estadoDaLicao, ordemDasLicoes, porcentagemConcluida } from '../domain/trilha.js'
import { preencher } from '../domain/texto.js'
import { UNIDADES, buscarLicao } from '../services/conteudoLocal.js'
import { useProgresso } from '../hooks/useProgresso.js'
import { useTitulo } from '../hooks/useTitulo.js'
import BarraProgresso from '../components/BarraProgresso.jsx'
import Mascote from '../components/Mascote.jsx'
import NoTrilha from '../components/NoTrilha.jsx'
import SequenciaDias from '../components/SequenciaDias.jsx'
import { CabecalhoUnidade, DivisoriaUnidade } from '../components/CabecalhoUnidade.jsx'

const t = textos.trilha
const ORDEM = ordemDasLicoes(UNIDADES)
// Mascotes em cena ao lado do caminho, alternando os lados: a capivara
// (professora, as lições) e o mico (explorador, o progresso na trilha).
const CENAS = [
  { nome: 'capivara', expressao: 'explicando' },
  { nome: 'mico', expressao: 'feliz' },
]

// Mapa da trilha (tela-modelo 19.2): sequência, medalhas e progresso no topo;
// por unidade, o cabeçalho lilás e o caminho em zigue-zague com nós nomeados.
export default function Trilha() {
  useTitulo(t.tituloAba)
  const { progresso, sequencia, perdeuSequencia, medalhas } = useProgresso()
  const concluidas = progresso.licoes
  const ganhas = medalhas.filter((medalha) => medalha.ganha).length

  let indiceDisponivel = 0

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-8">
      <header className="flex flex-col gap-4">
        <h1>{t.titulo}</h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SequenciaDias dias={sequencia} perdida={perdeuSequencia} />
          <Link to="/app/perfil" className="inline-flex min-h-11 items-center gap-2 font-semibold">
            <Award size={24} strokeWidth={2} aria-hidden="true" className="text-mico" />
            {preencher(textos.painel.medalhas, { n: ganhas, total: medalhas.length })}
          </Link>
        </div>
        <BarraProgresso valor={porcentagemConcluida(ORDEM, concluidas)} rotulo={t.progresso} comMico />
      </header>

      {UNIDADES.map((unidade) => {
        if (!unidade.disponivel) {
          return (
            <section key={unidade.id} aria-label={unidade.titulo}>
              <DivisoriaUnidade unidade={unidade} />
            </section>
          )
        }
        const cena = CENAS[indiceDisponivel % CENAS.length]
        const ladoDaCena = indiceDisponivel % 2 === 0 ? 'self-end' : 'self-start'
        indiceDisponivel++
        return (
          <section key={unidade.id} className="flex flex-col gap-6">
            <CabecalhoUnidade unidade={unidade} />
            <ol className="flex flex-col gap-6 py-2">
              {unidade.licoes.map((idLicao) => {
                const numero = ORDEM.indexOf(idLicao) + 1
                return (
                  <NoTrilha
                    key={idLicao}
                    licao={buscarLicao(idLicao)}
                    numero={numero}
                    posicao={numero - 1}
                    estado={estadoDaLicao(idLicao, ORDEM, concluidas)}
                  />
                )
              })}
            </ol>
            <Mascote nome={cena.nome} expressao={cena.expressao} tamanho="corpo" largura={96} className={ladoDaCena} />
          </section>
        )
      })}
    </div>
  )
}
