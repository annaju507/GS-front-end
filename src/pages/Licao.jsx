import { useParams } from 'react-router'
import { ArrowLeft, CircleHelp, Clock } from 'lucide-react'
import textos from '../data/textos.json'
import { estadoDaLicao, ordemDasLicoes, unidadeDaLicao } from '../domain/trilha.js'
import { preencher } from '../domain/texto.js'
import { UNIDADES, buscarLicao } from '../services/conteudoLocal.js'
import { useProgresso } from '../hooks/useProgresso.js'
import { useTitulo } from '../hooks/useTitulo.js'
import BalaoMascote from '../components/BalaoMascote.jsx'
import Botao from '../components/Botao.jsx'
import Card from '../components/Card.jsx'
import CitacaoOficial from '../components/CitacaoOficial.jsx'
import ControleTamanhoLetra from '../components/ControleTamanhoLetra.jsx'
import ExemploCarioca from '../components/ExemploCarioca.jsx'
import FonteOficial from '../components/FonteOficial.jsx'
import TextoComTermos from '../components/TextoComTermos.jsx'
import NaoEncontrada from './NaoEncontrada.jsx'

const t = textos.licao
const ORDEM = ordemDasLicoes(UNIDADES)

// Cada bloco da lição vira um elemento diferente.
function Bloco({ bloco }) {
  if (bloco.tipo === 'exemplo') {
    return (
      <ExemploCarioca>
        <p>{bloco.texto}</p>
      </ExemploCarioca>
    )
  } else if (bloco.tipo === 'citacao') {
    return <CitacaoOficial texto={bloco.texto} fonte={bloco.fonte} />
  } else {
    return <TextoComTermos texto={bloco.texto} />
  }
}

export default function Licao() {
  const { id } = useParams()
  const licao = buscarLicao(id)
  const { progresso } = useProgresso()
  useTitulo(licao ? licao.titulo : textos.naoEncontrada.titulo)

  if (!licao) {
    return <NaoEncontrada />
  }

  const unidade = unidadeDaLicao(UNIDADES, id)

  if (estadoDaLicao(id, ORDEM, progresso.licoes) === 'bloqueada') {
    return (
      <Card className="mx-auto flex max-w-leitura flex-col items-start gap-3">
        <h1 className="text-h2">{t.bloqueada.titulo}</h1>
        <p>{t.bloqueada.texto}</p>
        <Botao variante="primario" para="/app/trilha">{t.bloqueada.botao}</Botao>
      </Card>
    )
  }

  return (
    <article className="mx-auto flex max-w-leitura flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Botao variante="terciario" para="/app/trilha" icone={ArrowLeft} className="-ml-6">
          {t.voltar}
        </Botao>
        <ControleTamanhoLetra />
      </div>

      <header className="flex flex-col gap-2">
        <p className="font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2">
          {preencher(textos.painel.continuar.unidade, { numero: unidade.id, titulo: unidade.titulo })}
        </p>
        <h1>{licao.titulo}</h1>
        <p className="flex items-center gap-2 text-legenda text-texto-2">
          <Clock size={18} strokeWidth={2} aria-hidden="true" />
          {preencher(t.minutos, { n: licao.minutos })}
        </p>
      </header>

      <BalaoMascote mascote={licao.mascote} expressao="explicando">
        <p>{licao.gancho}</p>
      </BalaoMascote>

      {licao.blocos.map((bloco, indice) => (
        <Bloco key={`${licao.id}-${indice}`} bloco={bloco} />
      ))}

      <FonteOficial fonte={licao.fonte} />

      <div>
        <Botao variante="primario" para={`/app/quiz/${licao.id}`} icone={CircleHelp}>
          {t.testar}
        </Botao>
      </div>
    </article>
  )
}
