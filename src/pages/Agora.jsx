import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Search } from 'lucide-react'
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
import CardProposta from '../components/CardProposta.jsx'
import EstadoVazio from '../components/EstadoVazio.jsx'
import FiltroAreas from '../components/FiltroAreas.jsx'
import PaginacaoCaderno from '../components/PaginacaoCaderno.jsx'
import TopoPagina from '../components/TopoPagina.jsx'

const t = textos.agora
const PROPOSTAS = listarPropostas()

// Agora: a seleção fixa de propostas reais, com texto simples, filtrada por
// área, tipo e palavra-chave no próprio navegador. A arara (mensageira)
// apresenta no topo, longe dos cartões. As propostas aparecem em grade, cada
// uma na cor da sua área, e as páginas passam pelas setinhas. As
// movimentações de cada proposta vêm ao vivo na página dela.
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
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((proposta, indice) => (
            <li key={proposta.id} className="cartao-entra" style={{ animationDelay: `${indice * 60}ms` }}>
              <CardProposta proposta={proposta} />
            </li>
          ))}
        </ul>
        {totalPaginas > 1 && (
          <PaginacaoCaderno indice={paginaAtual - 1} total={totalPaginas} onMudar={(indice) => irParaPagina(indice + 1)} rotulos={t.paginacao} />
        )}
      </>
    )
  }

  return (
    <div className="mx-auto flex max-w-[64rem] flex-col gap-6">
      <TopoPagina
        imagem="ilha-fiscal"
        titulo={t.titulo}
        intro={t.intro}
        chips={t.chips.map((chip) => preencher(chip, { total: PROPOSTAS.length }))}
        mascote={{ nome: 'arara', expressao: 'explicando' }}
      />

      <BalaoMascote mascote="arara" expressao="explicando">
        <p>{t.fala}</p>
      </BalaoMascote>

      <section aria-labelledby="agora-filtros" className="flex flex-col gap-4 rounded-modal border border-borda bg-superficie p-4 shadow-card dark:shadow-none md:p-5">
        <h2 id="agora-filtros" className="text-h3">{t.filtros.interessa}</h2>

        <FiltroAreas valor={filtros.area} rotulo={t.filtros.area} areas={AREAS_DAS_PROPOSTAS} onMudar={(area) => mudarFiltros({ area })} />

        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
          <form
            role="search"
            onSubmit={(evento) => {
              evento.preventDefault()
              mudarFiltros({ busca: textoBusca.trim() })
            }}
            className="flex flex-col gap-1.5"
          >
            <label htmlFor="agora-busca" className="font-titulo text-rotulo font-semibold">{t.filtros.busca}</label>
            <div className="flex gap-2">
              <span className="flex h-12 min-w-0 flex-1 items-center gap-2 rounded-full border-2 border-borda-campo bg-superficie px-4 focus-within:border-link">
                <Search size={20} strokeWidth={2} aria-hidden="true" className="shrink-0 text-texto-2" />
                <input
                  id="agora-busca"
                  type="search"
                  value={textoBusca}
                  onChange={(evento) => setTextoBusca(evento.target.value)}
                  aria-describedby="agora-busca-dica"
                  className="h-full min-w-0 flex-1 bg-transparent text-texto outline-none"
                />
              </span>
              <Botao variante="primario" type="submit">{t.filtros.buscar}</Botao>
            </div>
            <p id="agora-busca-dica" className="text-legenda text-texto-2">{t.filtros.buscaDica}</p>
          </form>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="agora-tipo" className="font-titulo text-rotulo font-semibold">{t.filtros.tipo}</label>
            <select
              id="agora-tipo"
              value={filtros.tipo}
              onChange={(evento) => mudarFiltros({ tipo: evento.target.value })}
              className="h-12 w-full rounded-full border-2 border-borda-campo bg-superficie px-4 font-semibold text-texto focus:border-link"
            >
              <option value="">{t.filtros.tipos.todos}</option>
              {TIPOS_DE_PROPOSTA.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {t.filtros.tipos[tipo]}
                </option>
              ))}
            </select>
          </div>
        </div>

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
