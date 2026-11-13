import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { ArrowLeft, ArrowRight, Search } from 'lucide-react'
import textos from '../data/textos.json'
import { TIPOS_DE_PROPOSTA, filtrosParaApi, lerFiltros, temMaisPaginas } from '../domain/agora.js'
import { formatarData } from '../domain/datas.js'
import { preencher } from '../domain/texto.js'
import { useProposicoes } from '../hooks/useProposicoes.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import BalaoMascote from '../components/BalaoMascote.jsx'
import Botao from '../components/Botao.jsx'
import CampoTexto from '../components/CampoTexto.jsx'
import Card from '../components/Card.jsx'
import Etiqueta from '../components/Etiqueta.jsx'
import EstadoCarregando from '../components/EstadoCarregando.jsx'
import EstadoErro from '../components/EstadoErro.jsx'
import EstadoVazio from '../components/EstadoVazio.jsx'
import FiltroAreas from '../components/FiltroAreas.jsx'
import ImagemComMascote from '../components/ImagemComMascote.jsx'
import { CENA_AGORA } from '../components/cenasRio.js'

const t = textos.agora

// Agora: propostas de deputados federais do RJ, direto da API da Câmara,
// com filtro por área, tipo e palavra-chave. A arara (mensageira) apresenta.
export default function Agora() {
  useTitulo(t.tituloAba)
  const [parametros, setParametros] = useSearchParams()
  const filtros = lerFiltros(parametros)
  const [textoBusca, setTextoBusca] = useState(filtros.busca)
  const listaRef = useRef(null)
  const { carregando, erro, lista, tentarDeNovo } = useProposicoes(filtrosParaApi(filtros))

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
  if (carregando) {
    resultado = <EstadoCarregando texto={t.carregando} />
  } else if (erro) {
    resultado = <EstadoErro semConexao={erro === 'semConexao'} onTentarDeNovo={tentarDeNovo} />
  } else if (lista.length === 0) {
    resultado = (
      <EstadoVazio mascote="onca" expressao="pensativo" titulo={t.vazio} acao={{ rotulo: t.filtros.limpar, onClick: limparFiltros }} />
    )
  } else {
    resultado = (
      <>
        <ul className="flex flex-col gap-3">
          {lista.map((proposta) => (
            <li key={proposta.id}>
              <Card para={`/app/proposta/${proposta.id}`} className="flex flex-col gap-2">
                <span className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-titulo font-bold">{proposta.sigla}</span>
                  <span className="text-legenda text-texto-2">
                    {preencher(t.apresentadaEm, { data: formatarData(proposta.apresentadaEm) })}
                  </span>
                </span>
                {filtros.area && (
                  <span>
                    <Etiqueta tipo="area" valor={filtros.area} />
                  </span>
                )}
                <span className="line-clamp-3">{proposta.ementa}</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-link underline underline-offset-4">
                  {t.ver}
                  <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                </span>
              </Card>
            </li>
          ))}
        </ul>
        <nav aria-label={t.lista} className="flex flex-wrap items-center justify-between gap-3">
          {filtros.pagina > 1 ? (
            <Botao variante="secundario" icone={ArrowLeft} onClick={() => irParaPagina(filtros.pagina - 1)}>
              {t.maisRecentes}
            </Botao>
          ) : (
            <span />
          )}
          <p className="text-texto-2">{preencher(t.pagina, { pagina: filtros.pagina })}</p>
          {temMaisPaginas(lista.length) ? (
            <Botao variante="secundario" onClick={() => irParaPagina(filtros.pagina + 1)}>
              {t.maisAntigas}
              <ArrowRight size={20} strokeWidth={2} aria-hidden="true" />
            </Botao>
          ) : (
            <span />
          )}
        </nav>
      </>
    )
  }

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-6">
      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,16rem)]">
        <header className="flex flex-col gap-3">
          <h1>{t.titulo}</h1>
          <p className="text-corpo">{t.intro}</p>
        </header>
        <ImagemComMascote {...CENA_AGORA} />
      </div>

      <BalaoMascote mascote="arara" expressao="explicando">
        <p>{t.fala}</p>
      </BalaoMascote>

      <section aria-labelledby="agora-filtros" className="flex flex-col gap-4 rounded-card border border-borda bg-superficie p-4 md:p-6">
        <h2 id="agora-filtros" className="text-h3">{t.filtros.titulo}</h2>

        <div className="flex flex-col gap-2">
          <p className="font-titulo text-rotulo font-semibold">{t.filtros.area}</p>
          <FiltroAreas valor={filtros.area} rotulo={t.filtros.area} onMudar={(area) => mudarFiltros({ area })} />
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

      <Aviso tipo="info">{t.nota}</Aviso>

      <section ref={listaRef} aria-label={t.lista} aria-busy={carregando} className="flex scroll-mt-24 flex-col gap-4">
        {resultado}
      </section>
    </div>
  )
}
