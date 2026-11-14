import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import textos from '../data/textos.json'
import { TIPOS_DE_PROPOSTA, lerFiltros } from '../domain/agora.js'
import { AREAS_DAS_PROPOSTAS } from '../domain/areas.js'
import { formatarData } from '../domain/datas.js'
import { filtrarPropostas, paginar } from '../domain/propostas.js'
import { preencher } from '../domain/texto.js'
import { PROPOSTAS_CONSULTADAS_EM, listarPropostas } from '../services/conteudoLocal.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import BalaoMascote from '../components/BalaoMascote.jsx'
import Botao from '../components/Botao.jsx'
import CampoTexto from '../components/CampoTexto.jsx'
import CardProposta from '../components/CardProposta.jsx'
import EstadoVazio from '../components/EstadoVazio.jsx'
import FiltroAreas from '../components/FiltroAreas.jsx'

const t = textos.agora
const PROPOSTAS = listarPropostas()

// Agora: a seleção fixa de propostas reais, com texto simples, filtrada por
// área, tipo e palavra-chave no próprio navegador. A arara (mensageira)
// apresenta. As movimentações de cada proposta vêm ao vivo na página dela.
export default function Agora() {
  useTitulo(t.tituloAba)
  const [parametros, setParametros] = useSearchParams()
  const filtros = lerFiltros(parametros)
  const [textoBusca, setTextoBusca] = useState(filtros.busca)
  const listaRef = useRef(null)

  const encontradas = filtrarPropostas(PROPOSTAS, filtros)
  const { itens, paginaAtual, totalPaginas } = paginar(encontradas, filtros.pagina)

  // Muda os filtros no endereço. Qualquer filtro novo volta para a página 1.
  function mudarFiltros(novos) {
    const proximos = new URLSearchParams(parametros)
    for (const [chave, valor] of Object.entries(novos)) {
      if (valor) {
        proximos.set(chave, valor)
      } else {
        proximos.delete(chave)
      }
    }
    if (!('pagina' in novos)) {
      proximos.delete('pagina')
    }
    setParametros(proximos)
  }

  function irParaPagina(pagina) {
    mudarFiltros({ pagina: pagina > 1 ? String(pagina) : '' })
    listaRef.current?.scrollIntoView({ block: 'start' })
  }

  function limparFiltros() {
    setTextoBusca('')
    setParametros(new URLSearchParams())
  }

  let resultado
  if (encontradas.length === 0) {
    resultado = (
      <EstadoVazio mascote="onca" expressao="pensativo" titulo={t.vazio} acao={{ rotulo: t.filtros.limpar, onClick: limparFiltros }} />
    )
  } else {
    resultado = (
      <>
        <p aria-live="polite" className="text-legenda font-semibold text-texto-2">
          {preencher(t.contagem, { n: encontradas.length, total: PROPOSTAS.length })}
        </p>
        <ul className="flex flex-col gap-3">
          {itens.map((proposta) => (
            <li key={proposta.id}>
              <CardProposta proposta={proposta} />
            </li>
          ))}
        </ul>
        {totalPaginas > 1 && (
          <nav aria-label={t.lista} className="flex flex-wrap items-center justify-between gap-3">
            {paginaAtual > 1 ? (
              <Botao variante="secundario" icone={ArrowLeft} onClick={() => irParaPagina(paginaAtual - 1)}>
                {t.paginaAnterior}
              </Botao>
            ) : (
              <span />
            )}
            <p className="text-texto-2">{preencher(t.pagina, { pagina: paginaAtual, total: totalPaginas })}</p>
            {paginaAtual < totalPaginas ? (
              <Botao variante="secundario" onClick={() => irParaPagina(paginaAtual + 1)}>
                {t.proximaPagina}
                <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
              </Botao>
            ) : (
              <span />
            )}
          </nav>
        )}
      </>
    )
  }

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1>{t.titulo}</h1>
        <p className="text-corpo">{t.intro}</p>
      </header>

      <BalaoMascote mascote="arara" expressao="explicando">
        <p>{t.fala}</p>
      </BalaoMascote>

      <section aria-labelledby="agora-filtros" className="flex flex-col gap-4 rounded-card border border-borda bg-superficie p-4 md:p-6">
        <h2 id="agora-filtros" className="text-h3">{t.filtros.titulo}</h2>

        <div className="flex flex-col gap-2">
          <p className="font-titulo text-rotulo font-semibold">{t.filtros.area}</p>
          <FiltroAreas valor={filtros.area} rotulo={t.filtros.area} areas={AREAS_DAS_PROPOSTAS} onMudar={(area) => mudarFiltros({ area })} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="agora-tipo" className="font-titulo text-rotulo font-semibold">{t.filtros.tipo}</label>
          <select
            id="agora-tipo"
            value={filtros.tipo}
            onChange={(evento) => mudarFiltros({ tipo: evento.target.value })}
            className="h-12 w-full rounded-campo border-[1.5px] border-borda-campo bg-superficie px-4 text-corpo text-texto focus:border-link"
          >
            <option value="">{t.filtros.tipos.todos}</option>
            {TIPOS_DE_PROPOSTA.map((tipo) => (
              <option key={tipo} value={tipo}>
                {t.filtros.tipos[tipo]}
              </option>
            ))}
          </select>
        </div>

        <form
          role="search"
          onSubmit={(evento) => {
            evento.preventDefault()
            mudarFiltros({ busca: textoBusca.trim() })
          }}
          className="flex flex-col gap-3"
        >
          <div>
            <CampoTexto
              rotulo={t.filtros.busca}
              dica={t.filtros.buscaDica}
              type="search"
              valor={textoBusca}
              onChange={(evento) => setTextoBusca(evento.target.value)}
            />
          </div>
          <Botao variante="secundario" type="submit" icone={Search} className="self-start">
            {t.filtros.buscar}
          </Botao>
        </form>

        <div>
          <Botao variante="terciario" onClick={limparFiltros} className="-ml-6">
            {t.filtros.limpar}
          </Botao>
        </div>
      </section>

      <Aviso tipo="info">{preencher(t.nota, { total: PROPOSTAS.length, data: formatarData(PROPOSTAS_CONSULTADAS_EM) })}</Aviso>

      <section ref={listaRef} aria-label={t.lista} className="flex scroll-mt-24 flex-col gap-4">
        {resultado}
      </section>
    </div>
  )
}
