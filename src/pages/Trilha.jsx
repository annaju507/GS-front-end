import { Award } from 'lucide-react'
import { Link } from 'react-router'
import textos from '../data/textos.json'
import { useEffect, useState } from 'react'
import { licaoParaDesbloquear, ordemDasLicoes, porcentagemConcluida, proximaLicao } from '../domain/trilha.js'
import { preencher } from '../domain/texto.js'
import { UNIDADES } from '../services/conteudoLocal.js'
import { lerUltimaVista, salvarUltimaVista } from '../services/trilhaStorage.js'
import { useAuth } from '../hooks/useAuth.js'
import { useProgresso } from '../hooks/useProgresso.js'
import { useTitulo } from '../hooks/useTitulo.js'
import BilheteProgresso from '../components/BilheteProgresso.jsx'
import CaminhoTrilha from '../components/CaminhoTrilha.jsx'
import { DefinicoesPegadas } from '../components/Pegadas.jsx'
import SequenciaDias from '../components/SequenciaDias.jsx'
import { CabecalhoUnidade, DivisoriaUnidade } from '../components/CabecalhoUnidade.jsx'

const t = textos.trilha
const ORDEM = ordemDasLicoes(UNIDADES)
// Mascotes em cena ao lado do caminho, alternando os lados e as poses: a
// capivara (professora, as lições) e o mico (explorador, o progresso na trilha).
const CENAS = [
  { nome: 'capivara', expressao: 'explicando' },
  { nome: 'mico', expressao: 'alerta' },
  { nome: 'capivara', expressao: 'feliz' },
  { nome: 'mico', expressao: 'feliz' },
]

// Mapa da trilha (tela-modelo 19.2): sequência, medalhas e progresso no topo;
// por unidade, o cabeçalho lilás e o caminho em zigue-zague com nós nomeados.
export default function Trilha() {
  useTitulo(t.tituloAba)
  const { progresso, sequencia, perdeuSequencia, medalhas } = useProgresso()
  const concluidas = progresso.licoes
  const ganhas = medalhas.filter((medalha) => medalha.ganha).length
  const { usuario } = useAuth()
  const atual = proximaLicao(ORDEM, concluidas)

  // Se a pessoa terminou uma lição desde a última visita, as pegadas andam
  // até a nova lição. A comparação é feita uma vez, ao abrir a trilha.
  const [desbloqueio] = useState(() => licaoParaDesbloquear(lerUltimaVista(usuario.email), atual, concluidas))
  useEffect(() => {
    salvarUltimaVista(usuario.email, atual)
  }, [usuario.email, atual])

  let indiceDisponivel = 0

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-12">
      {/* Desenhos das pegadas, definidos uma vez e usados em todas as unidades. */}
      <svg aria-hidden="true" className="absolute size-0">
        <DefinicoesPegadas />
      </svg>
      <header className="flex flex-col gap-4">
        <h1>{t.titulo}</h1>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SequenciaDias dias={sequencia} perdida={perdeuSequencia} />
          <Link to="/app/perfil" className="inline-flex min-h-11 items-center gap-2 font-semibold">
            <Award size={24} strokeWidth={2} aria-hidden="true" className="text-mico" />
            {preencher(textos.painel.medalhas, { n: ganhas, total: medalhas.length })}
          </Link>
        </div>
        <BilheteProgresso
          valor={porcentagemConcluida(ORDEM, concluidas)}
          rotulo={t.progresso}
          unidades={UNIDADES.filter((unidade) => unidade.disponivel).length}
          licoes={ORDEM.length}
        />
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
        const indiceDaUnidade = indiceDisponivel
        indiceDisponivel++
        return (
          <section key={unidade.id} className="flex flex-col gap-6">
            <CabecalhoUnidade unidade={unidade} />
            <CaminhoTrilha
              unidade={unidade}
              indiceDaUnidade={indiceDaUnidade}
              ordem={ORDEM}
              concluidas={concluidas}
              cena={cena}
              desbloqueio={desbloqueio}
            />
          </section>
        )
      })}
    </div>
  )
}
