import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import textos from '../data/textos.json'
import { CARGOS_POR_ESFERA, agruparPorCargo, ehEsferaDaRota, filtrarPorNome } from '../domain/representantes.js'
import { preencher } from '../domain/texto.js'
import { useRepresentantes } from '../hooks/useRepresentantes.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import Botao from '../components/Botao.jsx'
import CampoTexto from '../components/CampoTexto.jsx'
import CardRepresentante from '../components/CardRepresentante.jsx'
import EstadoCarregando from '../components/EstadoCarregando.jsx'
import EstadoErro from '../components/EstadoErro.jsx'
import FonteOficial from '../components/FonteOficial.jsx'
import NaoEncontrada from './NaoEncontrada.jsx'

const t = textos.representantes

function ListaDaEsfera({ esfera }) {
  const { carregando, erro, pessoas, fontes, tentarDeNovo } = useRepresentantes(esfera)
  const [cargo, setCargo] = useState('')
  const [busca, setBusca] = useState('')

  const filtradas = useMemo(() => filtrarPorNome(pessoas, busca), [pessoas, busca])
  const grupos = agruparPorCargo(filtradas, esfera, cargo).filter((grupo) => grupo.pessoas.length > 0)
  const mostradas = grupos.reduce((total, grupo) => total + grupo.pessoas.length, 0)

  let conteudo
  if (carregando) {
    conteudo = <EstadoCarregando texto={t.carregando} />
  } else if (erro) {
    conteudo = <EstadoErro semConexao={erro === 'semConexao'} semMascote onTentarDeNovo={tentarDeNovo} />
  } else if (grupos.length === 0) {
    conteudo = (
      <div className="flex flex-col items-start gap-3 py-4">
        <p className="font-semibold">{t.filtros.vazio}</p>
        <Botao variante="secundario" onClick={() => setBusca('')}>{t.filtros.limpar}</Botao>
      </div>
    )
  } else {
    conteudo = grupos.map((grupo) => (
      <section key={grupo.cargo} aria-labelledby={`grupo-${grupo.cargo}`} className="flex flex-col gap-3">
        <h2 id={`grupo-${grupo.cargo}`} className="text-h3">
          {preencher(t.grupo, { grupo: t.cargos[grupo.cargo].grupo, n: grupo.pessoas.length })}
        </h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {grupo.pessoas.map((pessoa) => (
            <li key={pessoa.id}>
              <CardRepresentante pessoa={pessoa} />
            </li>
          ))}
        </ul>
      </section>
    ))
  }

  return (
    <>
      <div className="flex flex-col gap-4 rounded-card border border-borda bg-superficie p-4 md:p-6">
        <div className="flex flex-col gap-2">
          <p className="font-titulo text-rotulo font-semibold">{t.filtros.cargo}</p>
          <div role="group" aria-label={t.filtros.cargo} className="flex flex-wrap gap-2">
            {[''].concat(CARGOS_POR_ESFERA[esfera]).map((item) => (
              <button
                key={item || 'todos'}
                type="button"
                aria-pressed={cargo === item}
                onClick={() => setCargo(item)}
                className={`inline-flex min-h-11 items-center rounded-full border-2 px-4 font-semibold transition-colors duration-150 ${
                  cargo === item ? 'border-link bg-lilas-claro text-link' : 'border-borda bg-superficie text-texto hover:border-lilas'
                }`}
              >
                {item ? t.cargos[item].grupo : t.filtros.todos}
              </button>
            ))}
          </div>
        </div>
        <div role="search">
          <CampoTexto
            rotulo={t.filtros.busca}
            dica={t.filtros.buscaDica}
            type="search"
            autoComplete="off"
            valor={busca}
            onChange={(evento) => setBusca(evento.target.value)}
          />
        </div>
        {!carregando && !erro && (
          <p aria-live="polite" className="text-legenda font-semibold text-texto-2">
            {preencher(t.filtros.resultado, { n: mostradas, total: pessoas.length })}
          </p>
        )}
      </div>

      <div aria-busy={carregando} className="flex flex-col gap-8">
        {conteudo}
      </div>

      {fontes.length > 0 && (
        <div className="flex flex-col gap-2">
          {fontes.map((fonte) => (
            <FonteOficial key={fonte.url} fonte={fonte} />
          ))}
        </div>
      )}
    </>
  )
}

// Lista por cargo de uma esfera, todos no mesmo formato, com filtro por
// cargo e busca pelo nome.
export default function RepresentantesEsfera() {
  const { esfera } = useParams()
  const valida = ehEsferaDaRota(esfera)
  useTitulo(valida ? t.esferas[esfera].pagina : textos.naoEncontrada.titulo)

  if (!valida) {
    return <NaoEncontrada />
  }

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-6">
      <Botao variante="terciario" para="/app/representantes" icone={ArrowLeft} className="-ml-6 self-start">
        {t.titulo}
      </Botao>
      <header className="flex flex-col gap-3">
        <h1>{t.esferas[esfera].pagina}</h1>
        <p className="text-corpo">{t.esferas[esfera].texto}</p>
      </header>
      <Aviso tipo="info">{t.aviso}</Aviso>
      <ListaDaEsfera key={esfera} esfera={esfera} />
    </div>
  )
}
