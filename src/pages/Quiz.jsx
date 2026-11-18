import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { Flame, X } from 'lucide-react'
import textos from '../data/textos.json'
import { poseDaPergunta } from '../domain/mascotes.js'
import { estadoDaLicao, ordemDasLicoes } from '../domain/trilha.js'
import { preencher } from '../domain/texto.js'
import { UNIDADES, buscarLicao, perguntasDaLicao } from '../services/conteudoLocal.js'
import { useProgresso } from '../hooks/useProgresso.js'
import { useAtalhosQuiz } from '../hooks/useAtalhosQuiz.js'
import { useQuiz } from '../hooks/useQuiz.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import BalaoMascote from '../components/BalaoMascote.jsx'
import BarraProgresso from '../components/BarraProgresso.jsx'
import Botao from '../components/Botao.jsx'
import GavetaFeedback from '../components/GavetaFeedback.jsx'
import OpcoesQuiz from '../components/OpcoesQuiz.jsx'
import NaoEncontrada from './NaoEncontrada.jsx'

const t = textos.quiz
const ORDEM = ordemDasLicoes(UNIDADES)

function QuizDaLicao({ licao }) {
  const navegar = useNavigate()
  const { concluirLicao } = useProgresso()
  const {
    indice,
    total,
    atual,
    selecionada,
    resultado,
    respondido,
    ultima,
    seguidas,
    feedbackRef,
    selecionar,
    verificar,
    continuar,
  } = useQuiz(perguntasDaLicao(licao))

  function aoContinuar() {
    const final = continuar()
    if (final) {
      const { novas, sequencia } = concluirLicao(licao.id, final)
      navegar(`/app/conquista/${licao.id}`, {
        replace: true,
        state: { ...final, sequencia, novas: novas.map((medalha) => medalha.id) },
      })
    }
  }

  const tituloResultado = resultado === 'acertou' ? t.acertou : t.errou
  useAtalhosQuiz({ totalOpcoes: atual.opcoes.length, respondido, onSelecionar: selecionar, onVerificar: verificar })
  // Selo de sequência: aparece a partir de 2 acertos seguidos.
  const mostrarSeguidas = resultado === 'acertou' && seguidas >= 2

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-borda bg-fundo">
        <div className="mx-auto flex max-w-leitura items-center gap-3 px-4 py-2 md:px-6">
          <Link
            to="/app/trilha"
            aria-label={t.sair}
            className="inline-flex size-12 shrink-0 items-center justify-center rounded-full text-texto hover:bg-lilas-claro"
          >
            <X size={24} strokeWidth={2} aria-hidden="true" />
          </Link>
          <div className="flex-1">
            <BarraProgresso valor={((indice + (respondido ? 1 : 0)) / total) * 100} rotulo={t.rotuloProgresso} />
          </div>
        </div>
        {mostrarSeguidas && (
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2">
            <span
              key={seguidas}
              aria-hidden="true"
              className="surgir-selo flex items-center gap-1.5 whitespace-nowrap rounded-full bg-mico px-3 py-1 font-titulo text-tag font-extrabold uppercase tracking-[0.05em] text-marca-botao-texto shadow-[0_0.1875rem_0_rgb(0_0_0/0.18)]"
            >
              <Flame size={16} strokeWidth={2.5} />
              {preencher(t.seguidas, { n: seguidas })}
            </span>
          </span>
        )}
      </header>

      <main id="conteudo" tabIndex={-1} className="mx-auto flex min-h-[calc(100dvh-4.5rem)] max-w-leitura flex-col justify-center gap-8 px-4 pb-56 pt-8 focus:outline-none md:px-6">
        {/* Título da lição à esquerda e o contador de perguntas no outro canto. */}
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="min-w-0 text-h2">{licao.titulo}</h1>
          <p className="shrink-0 whitespace-nowrap font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2">
            {preencher(t.progresso, { atual: indice + 1, total })}
          </p>
        </div>

        <BalaoMascote mascote="capivara" expressao={poseDaPergunta(resultado)} corpo>
          <p>{atual.pergunta}</p>
        </BalaoMascote>

        <div className="flex flex-col gap-3">
          <OpcoesQuiz
            key={atual.id}
            nome={`quiz-${atual.id}`}
            pergunta={atual.pergunta}
            opcoes={atual.opcoes}
            selecionada={selecionada}
            correta={atual.correta}
            respondido={respondido}
            onSelecionar={selecionar}
          />
          <div role="alert">{resultado === 'semResposta' && <Aviso tipo="alerta">{t.escolha}</Aviso>}</div>
        </div>
        <p className="sr-only" aria-live="assertive">
          {respondido ? tituloResultado : ''}
        </p>

        {!respondido && (
          <Botao variante="primario" onClick={verificar} className="min-h-16 w-full text-corpo">
            {textos.botoes.verificar}
          </Botao>
        )}
      </main>

      {respondido && (
        <GavetaFeedback
          key={atual.id}
          resultado={resultado}
          pergunta={atual}
          ultima={ultima}
          continuarRef={feedbackRef}
          onContinuar={aoContinuar}
        />
      )}
    </>
  )
}

export default function Quiz() {
  const { id } = useParams()
  const licao = buscarLicao(id)
  const { progresso } = useProgresso()
  useTitulo(licao ? `${t.tituloAba}: ${licao.titulo}` : textos.naoEncontrada.titulo)

  if (!licao) {
    return (
      <main id="conteudo">
        <NaoEncontrada />
      </main>
    )
  }
  if (estadoDaLicao(id, ORDEM, progresso.licoes) === 'bloqueada') {
    return <Navigate to={`/app/licao/${id}`} replace />
  }
  return <QuizDaLicao key={id} licao={licao} />
}
