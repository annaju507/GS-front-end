import textos from '../data/textos.json'
import { useQuestao } from '../hooks/useQuestao.js'
import BalaoMascote from './BalaoMascote.jsx'
import OpcoesQuiz from './OpcoesQuiz.jsx'
import Aviso from './Aviso.jsx'
import Botao from './Botao.jsx'
import Mascote from './Mascote.jsx'
import FonteOficial from './FonteOficial.jsx'

const t = textos.inicio.teste

// Uma pergunta do quiz no Início, para a pessoa experimentar antes de criar conta.
// O mascote reage: mico comemora no acerto; capivara pensativa ("ops") no erro.
export default function PerguntaTeste() {
  const { selecionada, resultado, respondido, feedbackRef, selecionar, verificar, reiniciar } = useQuestao(t.correta)
  const acertou = resultado === 'acertou'

  return (
    <section aria-labelledby="titulo-teste" className="mx-auto flex max-w-leitura flex-col gap-4 px-4 py-12 md:px-6">
      <h2 id="titulo-teste">{t.titulo}</h2>
      <p className="text-texto-2">{t.intro}</p>

      <BalaoMascote mascote="capivara" expressao="pensativo" pergunta>
        <p>{t.pergunta}</p>
      </BalaoMascote>

      <OpcoesQuiz
        nome="pergunta-teste"
        pergunta={t.pergunta}
        opcoes={t.opcoes}
        selecionada={selecionada}
        correta={t.correta}
        respondido={respondido}
        onSelecionar={selecionar}
      />

      <div ref={feedbackRef} tabIndex={-1} aria-live="assertive" className="flex flex-col gap-3 rounded-card focus:outline-none">
        {resultado === 'semResposta' && <Aviso tipo="alerta">{t.escolhaUmaOpcao}</Aviso>}
        {respondido && (
          <>
            <div className="flex items-center gap-3">
              <Mascote nome={acertou ? 'mico' : 'capivara'} expressao={acertou ? 'comemorando' : 'ops'} largura={72} />
              <Aviso tipo={acertou ? 'sucesso' : 'erro'}>
                <p className="font-titulo font-extrabold">{acertou ? t.acertou : t.errou}</p>
              </Aviso>
            </div>
            <p>{t.explicacao}</p>
            <FonteOficial fonte={t.fonte} />
          </>
        )}
      </div>

      {respondido ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Botao variante="secundario" onClick={reiniciar}>
            {t.tentarDeNovo}
          </Botao>
          <Botao variante="marca" para="/cadastro">
            {t.criarConta}
          </Botao>
          <p className="w-full text-texto-2">{t.convite}</p>
        </div>
      ) : (
        <div>
          <Botao variante="marca" onClick={verificar}>
            {textos.botoes.verificar}
          </Botao>
        </div>
      )}
    </section>
  )
}
