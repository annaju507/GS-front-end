import { Link, Navigate, useNavigate, useParams } from 'react-router'
import { X } from 'lucide-react'
import textos from '../data/textos.json'
import { estadoDaLicao, ordemDasLicoes } from '../domain/trilha.js'
import { preencher } from '../domain/texto.js'
import { UNIDADES, buscarLicao, perguntasDaLicao } from '../services/conteudoLocal.js'
import { useProgresso } from '../hooks/useProgresso.js'
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
      </header>

      <main id="conteudo" tabIndex={-1} className="mx-auto flex max-w-leitura flex-col gap-5 px-4 pb-72 pt-6 focus:outline-none md:px-6">
        <div>
          <p className="font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2">
            {preencher(t.progresso, { atual: indice + 1, total })}
          </p>
          <h1 className="text-h3">{licao.titulo}</h1>
        </div>

        <BalaoMascote mascote="capivara" expressao="pensativo" pergunta>
          <p>{atual.pergunta}</p>
        </BalaoMascote>

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
        <p className="sr-only" aria-live="assertive">
          {respondido ? tituloResultado : ''}
        </p>

        {!respondido && (
          <Botao variante="primario" onClick={verificar}>
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
