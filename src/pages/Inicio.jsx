import { useCallback, useRef, useState } from 'react'
import { ArrowRight, Trash2 } from 'lucide-react'
import textos from '../data/textos.json'
import { AREAS } from '../domain/areas.js'
import { ESFERAS } from '../domain/esferas.js'
import { MASCOTES } from '../domain/mascotes.js'
import { ORDEM_VOTOS } from '../domain/votos.js'
import { useTitulo } from '../hooks/useTitulo.js'
import PularParaConteudo from '../components/PularParaConteudo.jsx'
import BotaoTema from '../components/BotaoTema.jsx'
import ControleTamanhoLetra from '../components/ControleTamanhoLetra.jsx'
import OpcaoReduzirAnimacoes from '../components/OpcaoReduzirAnimacoes.jsx'
import Botao from '../components/Botao.jsx'
import Card from '../components/Card.jsx'
import Etiqueta from '../components/Etiqueta.jsx'
import Mascote from '../components/Mascote.jsx'
import BalaoMascote from '../components/BalaoMascote.jsx'
import BarraProgresso from '../components/BarraProgresso.jsx'
import OpcoesQuiz from '../components/OpcoesQuiz.jsx'
import SeloVoto from '../components/SeloVoto.jsx'
import FonteOficial from '../components/FonteOficial.jsx'
import ExemploCarioca from '../components/ExemploCarioca.jsx'
import CampoTexto from '../components/CampoTexto.jsx'
import Aviso from '../components/Aviso.jsx'
import ModalConfirmacao from '../components/ModalConfirmacao.jsx'
import Toast from '../components/Toast.jsx'
import EstadoCarregando from '../components/EstadoCarregando.jsx'
import EstadoErro from '../components/EstadoErro.jsx'
import EstadoVazio from '../components/EstadoVazio.jsx'

// Página TEMPORÁRIA da etapa 2: mostra os componentes base em todos os estados.
// Será trocada pela página de Início de verdade na etapa 3.
const t = textos.previaComponentes
const LIMITE_ANOTACAO = 280

function Secao({ id, titulo, children }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id}>{titulo}</h2>
      {children}
    </section>
  )
}

export default function Inicio() {
  useTitulo(t.tituloPagina)

  // Demonstrações interativas
  const [balaoAberto, setBalaoAberto] = useState(true)
  const [progresso, setProgresso] = useState(45)
  const [selecionada, setSelecionada] = useState(null)
  const [respondido, setRespondido] = useState(false)
  const [anotacao, setAnotacao] = useState('')
  const [erroAnotacao, setErroAnotacao] = useState('')
  const campoRef = useRef(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [toast, setToast] = useState(null)
  const fecharToast = useCallback(() => setToast(null), [])

  const acertou = selecionada === t.quiz.correta

  function salvarAnotacao(evento) {
    evento.preventDefault()
    if (anotacao.trim() === '') {
      setErroAnotacao(t.campo.erroVazio)
      campoRef.current.focus()
    } else if (anotacao.length > LIMITE_ANOTACAO) {
      setErroAnotacao(t.campo.erroLongo)
      campoRef.current.focus()
    } else {
      setErroAnotacao('')
      setToast({ tipo: 'sucesso', mensagem: t.campo.salvo })
    }
  }

  function responderModal(confirmou) {
    setModalAberto(false)
    if (confirmou) {
      setToast({ tipo: 'sucesso', mensagem: t.modal.excluida })
    } else {
      setToast({ tipo: 'info', mensagem: t.modal.cancelada })
    }
  }

  return (
    <>
      <PularParaConteudo />
      <header className="border-b border-borda bg-superficie">
        <div className="mx-auto flex max-w-conteudo flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6 lg:px-8">
          <p className="font-titulo text-h3 font-extrabold text-link">{textos.site.nome}</p>
          <BotaoTema />
        </div>
      </header>

      <main id="conteudo" className="mx-auto flex max-w-conteudo flex-col gap-12 px-4 py-8 md:px-6 lg:px-8">
        <section aria-labelledby="titulo-pagina" className="flex flex-col gap-4">
          <h1 id="titulo-pagina">{t.tituloPagina}</h1>
          <p className="marca-texto">
            <span>{t.marcaTexto[0]}</span>
            <br />
            <span>{t.marcaTexto[1]}</span>
          </p>
          <Card className="flex flex-col gap-4">
            <h2 className="text-h3">{textos.preferencias.titulo}</h2>
            <ControleTamanhoLetra />
            <OpcaoReduzirAnimacoes />
          </Card>
        </section>

        <Secao id="secao-botoes" titulo={t.secoes.botoes}>
          <div className="flex flex-wrap items-center gap-4">
            <Botao variante="primario" icone={ArrowRight}>{t.botoes.primario}</Botao>
            <Botao variante="secundario">{t.botoes.secundario}</Botao>
            <Botao variante="marca">{t.botoes.marca}</Botao>
            <Botao variante="pilula">{t.botoes.pilula}</Botao>
            <Botao variante="terciario">{t.botoes.terciario}</Botao>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Botao variante="acerto">{t.botoes.acerto}</Botao>
            <Botao variante="erro">{t.botoes.erro}</Botao>
            <Botao variante="primario" disabled>{t.botoes.desativado}</Botao>
            <Botao variante="secundario" disabled>{t.botoes.desativado}</Botao>
          </div>
        </Secao>

        <Secao id="secao-cards" titulo={t.secoes.cards}>
          <div className="grid gap-4 md:grid-cols-3">
            <Card como="article">
              <h3>{t.cards.simples}</h3>
              <p className="text-texto-2">{t.cards.simplesTexto}</p>
            </Card>
            <Card para="/">
              <h3>{t.cards.clicavel}</h3>
              <p className="text-texto-2">{t.cards.clicavelTexto}</p>
            </Card>
            <Card como="article" destaque>
              <h3>{t.cards.destaque}</h3>
              <p className="text-texto-2">{t.cards.destaqueTexto}</p>
            </Card>
          </div>
        </Secao>

        <Secao id="secao-tags" titulo={t.secoes.tags}>
          <ul className="flex flex-wrap gap-2">
            {AREAS.map((area) => (
              <Etiqueta key={area} como="li" tipo="area" valor={area} />
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2">
            {ESFERAS.map((esfera) => (
              <Etiqueta key={esfera} como="li" tipo="esfera" valor={esfera} />
            ))}
          </ul>
          <ul className="flex flex-wrap gap-2">
            {['apresentada', 'comissao', 'votacao', 'aprovada', 'sancionada', 'vetada', 'arquivada'].map((etapa) => (
              <Etiqueta key={etapa} como="li" tipo="status" valor={etapa} />
            ))}
          </ul>
        </Secao>

        <Secao id="secao-mascotes" titulo={t.secoes.mascotes}>
          <ul className="flex flex-wrap items-end gap-4">
            {MASCOTES.map((mascote) => (
              <li key={mascote} className="flex flex-col items-center gap-1">
                <Mascote nome={mascote} expressao="feliz" tamanho="corpo" largura={120} />
                <span className="text-legenda font-semibold">{textos.mascotes[mascote]}</span>
              </li>
            ))}
          </ul>
          <div className="flex max-w-leitura flex-col gap-4">
            {balaoAberto && (
              <BalaoMascote
                mascote="capivara"
                expressao="explicando"
                acao={{ rotulo: textos.botoes.entendi, onClick: () => setBalaoAberto(false) }}
                onFechar={() => setBalaoAberto(false)}
              >
                <p>{t.balao.fala}</p>
              </BalaoMascote>
            )}
            <BalaoMascote mascote="onca" expressao="pensativo" pergunta>
              <p>{t.quiz.pergunta}</p>
            </BalaoMascote>
          </div>
        </Secao>

        <Secao id="secao-progresso" titulo={t.secoes.progresso}>
          <BarraProgresso valor={progresso} rotulo={t.secoes.progresso} comMico />
          <BarraProgresso valor={progresso} rotulo={t.secoes.progresso} grossa={false} />
          <div className="flex gap-3">
            <Botao variante="secundario" onClick={() => setProgresso((valor) => Math.max(0, valor - 15))}>{t.progresso.diminuir}</Botao>
            <Botao variante="secundario" onClick={() => setProgresso((valor) => Math.min(100, valor + 15))}>{t.progresso.aumentar}</Botao>
          </div>
        </Secao>

        <Secao id="secao-quiz" titulo={t.secoes.quiz}>
          <div className="flex max-w-leitura flex-col gap-4">
            <BalaoMascote mascote="capivara" expressao="pensativo" pergunta>
              <p>{t.quiz.pergunta}</p>
            </BalaoMascote>
            <OpcoesQuiz
              nome="quiz-previa"
              pergunta={t.quiz.pergunta}
              opcoes={t.quiz.opcoes}
              selecionada={selecionada}
              correta={t.quiz.correta}
              respondido={respondido}
              onSelecionar={setSelecionada}
            />
            <div aria-live="assertive">
              {respondido && (
                <Aviso tipo={acertou ? 'sucesso' : 'erro'}>{acertou ? t.quiz.acertou : t.quiz.errou}</Aviso>
              )}
            </div>
            {respondido ? (
              <Botao
                variante="secundario"
                onClick={() => {
                  setRespondido(false)
                  setSelecionada(null)
                }}
              >
                {t.quiz.refazer}
              </Botao>
            ) : (
              <Botao variante="primario" onClick={() => setRespondido(selecionada !== null)}>
                {textos.botoes.verificar}
              </Botao>
            )}
          </div>
        </Secao>

        <Secao id="secao-votos" titulo={t.secoes.votos}>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {ORDEM_VOTOS.map((voto) => (
              <li key={voto}>
                <SeloVoto tipo={voto} />
              </li>
            ))}
          </ul>
        </Secao>

        <Secao id="secao-fonte" titulo={t.secoes.fonte}>
          <ExemploCarioca>
            <p>{t.exemplo.texto}</p>
          </ExemploCarioca>
          <div className="max-w-leitura">
            <FonteOficial fonte={t.fonteExemplo} />
          </div>
        </Secao>

        <Secao id="secao-campo" titulo={t.secoes.campo}>
          <form noValidate onSubmit={salvarAnotacao} className="flex max-w-leitura flex-col gap-4">
            <CampoTexto
              ref={campoRef}
              rotulo={t.campo.rotulo}
              dica={t.campo.dica}
              erro={erroAnotacao}
              multilinha
              maximo={LIMITE_ANOTACAO}
              valor={anotacao}
              onChange={(evento) => setAnotacao(evento.target.value)}
            />
            <div>
              <Botao variante="primario" type="submit">{t.campo.salvar}</Botao>
            </div>
          </form>
        </Secao>

        <Secao id="secao-avisos" titulo={t.secoes.avisos}>
          <div className="flex max-w-leitura flex-col gap-2">
            {['sucesso', 'erro', 'alerta', 'info'].map((tipo) => (
              <Aviso key={tipo} tipo={tipo}>{t.avisos[tipo]}</Aviso>
            ))}
          </div>
          <div>
            <Botao variante="secundario" icone={Trash2} onClick={() => setModalAberto(true)}>
              {t.modal.abrir}
            </Botao>
          </div>
          <ModalConfirmacao
            aberto={modalAberto}
            titulo={t.modal.titulo}
            descricao={t.modal.descricao}
            onConfirmar={() => responderModal(true)}
            onCancelar={() => responderModal(false)}
          />
        </Secao>

        <Secao id="secao-estados" titulo={t.secoes.estados}>
          <Card>
            <EstadoCarregando />
          </Card>
          <Card>
            <EstadoErro semConexao onTentarDeNovo={() => {}} />
          </Card>
          <Card>
            <EstadoErro onTentarDeNovo={() => {}} />
          </Card>
          <Card>
            <EstadoVazio titulo={t.vazio.titulo} acao={{ rotulo: t.vazio.botao, para: '/' }} />
          </Card>
        </Secao>
      </main>

      <Toast mensagem={toast?.mensagem} tipo={toast?.tipo} onFechar={fecharToast} />
    </>
  )
}
