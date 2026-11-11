import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import textos from '../data/textos.json'
import { formatarData } from '../domain/datas.js'
import { dataLocalIso } from '../domain/progresso.js'
import { preencher } from '../domain/texto.js'
import { useProgresso } from '../hooks/useProgresso.js'
import { useProposicao } from '../hooks/useProposicao.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import Botao from '../components/Botao.jsx'
import Card from '../components/Card.jsx'
import EstadoCarregando from '../components/EstadoCarregando.jsx'
import EstadoErro from '../components/EstadoErro.jsx'
import Etiqueta from '../components/Etiqueta.jsx'
import FonteOficial from '../components/FonteOficial.jsx'
import LinhaDoTempo from '../components/LinhaDoTempo.jsx'
import NaoEncontrada from './NaoEncontrada.jsx'

const t = textos.proposta

// Página de uma proposta real (fluxo: ... conquista, proposta, fonte oficial).
// Sem mascote: o tom é só informativo. Tudo vem da API da Câmara.
function ConteudoDaProposta({ id }) {
  const navegar = useNavigate()
  const { carregando, erro, dados, tentarDeNovo } = useProposicao(id)
  const { registrarPropostaLida, registrarFonteConsultada } = useProgresso()
  useTitulo(dados ? dados.sigla : t.tituloAba)

  useEffect(() => {
    if (dados) {
      registrarPropostaLida(dados.id)
    }
  }, [dados, registrarPropostaLida])

  const voltar = (
    <Botao variante="terciario" onClick={() => navegar(-1)} icone={ArrowLeft} className="-ml-6 self-start">
      {t.voltar}
    </Botao>
  )

  if (carregando) {
    return (
      <div className="flex flex-col gap-4">
        {voltar}
        <h1 className="sr-only">{t.tituloAba}</h1>
        <EstadoCarregando texto={t.carregando} />
      </div>
    )
  } else if (erro === 'naoEncontrado') {
    return (
      <div className="flex flex-col items-start gap-4">
        {voltar}
        <h1 className="text-h2">{t.tituloAba}</h1>
        <p>{t.naoEncontrada}</p>
        <Botao variante="primario" para="/app/agora">{t.outras}</Botao>
      </div>
    )
  } else if (erro) {
    return (
      <div className="flex flex-col gap-4">
        {voltar}
        <h1 className="text-h2">{t.tituloAba}</h1>
        <EstadoErro semConexao={erro === 'semConexao'} onTentarDeNovo={tentarDeNovo} />
      </div>
    )
  }

  const fonte = {
    instituicao: t.fonteInstituicao,
    documento: preencher(t.fonteDocumento, { sigla: dados.sigla }),
    trecho: '',
    url: dados.urlPagina,
    consultadoEm: dataLocalIso(new Date()),
  }

  return (
    <article className="flex flex-col gap-6">
      {voltar}
      <header className="flex flex-col gap-3">
        <div>
          <Etiqueta tipo="status" valor={dados.etapa} />
        </div>
        <h1>{dados.sigla}</h1>
        <p className="text-texto-2">{preencher(t.apresentadaEm, { data: formatarData(dados.apresentadaEm) })}</p>
      </header>

      <Aviso tipo="info">{t.aviso}</Aviso>

      <section aria-labelledby="proposta-ementa" className="flex flex-col gap-2">
        <h2 id="proposta-ementa" className="text-h3">{t.ementa}</h2>
        <p>{dados.ementa}</p>
        {dados.urlTexto && (
          <a href={dados.urlTexto} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 self-start font-semibold">
            {t.lerTexto}
            <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">{textos.acessibilidade.abreNovaAba}</span>
          </a>
        )}
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <Card como="section" aria-labelledby="proposta-situacao" className="flex flex-col gap-2">
          <h2 id="proposta-situacao" className="text-h3">{t.situacao}</h2>
          <div>
            <Etiqueta tipo="status" valor={dados.etapa} />
          </div>
          <p>{dados.situacaoOficial ? preencher(t.situacaoOficial, { texto: dados.situacaoOficial }) : t.semSituacao}</p>
          {dados.ultimaAtualizacao && (
            <p className="text-legenda text-texto-2">{preencher(t.ultimaAtualizacao, { data: formatarData(dados.ultimaAtualizacao) })}</p>
          )}
        </Card>

        <Card como="section" aria-labelledby="proposta-autores" className="flex flex-col gap-2">
          <h2 id="proposta-autores" className="text-h3">{t.autores}</h2>
          {dados.autores.length === 0 ? (
            <p className="text-texto-2">{t.semAutores}</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {dados.autores.map((autor) => (
                <li key={`${autor.nome}-${autor.tipo}`}>
                  <span className="font-semibold">{autor.nome}</span> <span className="text-texto-2">({autor.tipo})</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      {dados.tramitacoes.length > 0 && (
        <section aria-labelledby="proposta-tramitacao" className="flex flex-col gap-3">
          <h2 id="proposta-tramitacao" className="text-h3">{t.linhaDoTempo}</h2>
          <LinhaDoTempo passos={dados.tramitacoes} />
        </section>
      )}

      <FonteOficial fonte={fonte} onAbrir={registrarFonteConsultada} />
    </article>
  )
}

export default function Proposta() {
  const { id } = useParams()
  if (!/^\d+$/.test(id)) {
    return <NaoEncontrada />
  }
  return (
    <div className="mx-auto max-w-leitura">
      <ConteudoDaProposta key={id} id={id} />
    </div>
  )
}
