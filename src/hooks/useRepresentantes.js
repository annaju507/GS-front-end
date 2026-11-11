import { useEffect, useState } from 'react'
import textos from '../data/textos.json'
import { deputadoFederalDaApi, senadorDaApi } from '../domain/representantes.js'
import { dataLocalIso } from '../domain/progresso.js'
import { buscarDeputadosRJ } from '../services/camaraApi.js'
import { buscarSenadoresRJ } from '../services/senadoApi.js'
import { REPRESENTANTES_LOCAIS } from '../services/conteudoLocal.js'

const t = textos.representantes.fontes

// Fonte de cada chefe do Executivo (escrito à mão, com o site oficial).
function fonteDoExecutivo(pessoa, consultadoEm) {
  return { instituicao: pessoa.instituicao, documento: t.executivo, trecho: '', url: pessoa.url, consultadoEm }
}

function dadosLocais(esfera) {
  const executivo = REPRESENTANTES_LOCAIS.executivo
  const lista = REPRESENTANTES_LOCAIS[esfera]
  const cargoDoChefe = esfera === 'municipio' ? 'prefeito' : 'governador'
  const chefe = executivo.pessoas.find((pessoa) => pessoa.cargo === cargoDoChefe)
  return {
    pessoas: [chefe, ...lista.pessoas],
    fontes: [
      fonteDoExecutivo(chefe, executivo.consultadoEm),
      { instituicao: lista.fonte.instituicao, documento: t.lista, trecho: '', url: lista.fonte.url, consultadoEm: lista.consultadoEm },
    ],
  }
}

// Representantes de uma esfera. Município e estado vêm dos arquivos do
// projeto; o país vem das APIs da Câmara e do Senado (com carregando e erro).
export function useRepresentantes(esfera) {
  const [tentativa, setTentativa] = useState(0)
  const chave = `${esfera}#${tentativa}`
  const [resposta, setResposta] = useState({ chave: null, erro: null, pessoas: [], fontes: [] })
  const daApi = esfera === 'pais'

  useEffect(() => {
    if (!daApi) {
      return undefined
    }
    let ativo = true
    const executivo = REPRESENTANTES_LOCAIS.executivo
    const presidente = executivo.pessoas.find((pessoa) => pessoa.cargo === 'presidente')
    const hoje = dataLocalIso(new Date())
    Promise.all([buscarSenadoresRJ(), buscarDeputadosRJ()])
      .then(([senadores, deputados]) => {
        if (ativo) {
          setResposta({
            chave,
            erro: null,
            pessoas: [presidente, ...senadores.map(senadorDaApi), ...deputados.map(deputadoFederalDaApi)],
            fontes: [
              fonteDoExecutivo(presidente, executivo.consultadoEm),
              { instituicao: t.senado, documento: t.lista, trecho: '', url: 'https://www25.senado.leg.br/web/senadores/em-exercicio', consultadoEm: hoje },
              { instituicao: t.camara, documento: t.lista, trecho: '', url: 'https://www.camara.leg.br/deputados/quem-sao', consultadoEm: hoje },
            ],
          })
        }
      })
      .catch((erro) => {
        if (ativo) {
          setResposta({ chave, erro: erro.tipo ?? 'servidor', pessoas: [], fontes: [] })
        }
      })
    return () => {
      ativo = false
    }
  }, [chave, daApi])

  if (!daApi) {
    return { carregando: false, erro: null, ...dadosLocais(esfera), tentarDeNovo: () => {} }
  }

  const carregando = resposta.chave !== chave
  return {
    carregando,
    erro: carregando ? null : resposta.erro,
    pessoas: carregando ? [] : resposta.pessoas,
    fontes: carregando ? [] : resposta.fontes,
    tentarDeNovo: () => setTentativa(tentativa + 1),
  }
}
