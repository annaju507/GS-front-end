// Regras da área Representantes (funções puras).
// Neutralidade: todos aparecem no mesmo formato e em ordem alfabética.
import { normalizar } from './glossario.js'
import { semTravessao } from './texto.js'

// Esfera no endereço (/app/representantes/municipio) e esfera das etiquetas.
export const ESFERAS_DA_ROTA = { municipio: 'municipal', estado: 'estadual', pais: 'federal' }

// Cargos de cada esfera, na ordem em que aparecem na tela.
export const CARGOS_POR_ESFERA = {
  municipio: ['prefeito', 'vereador'],
  estado: ['governador', 'deputadoEstadual'],
  pais: ['presidente', 'senador', 'deputadoFederal'],
}

export function ehEsferaDaRota(esfera) {
  return Object.hasOwn(ESFERAS_DA_ROTA, esfera)
}

// Em qual esfera fica cada cargo (para a etiqueta e o link de volta).
export function esferaDoCargo(cargo) {
  if (cargo === 'prefeito' || cargo === 'vereador') {
    return 'municipio'
  } else if (cargo === 'governador' || cargo === 'deputadoEstadual') {
    return 'estado'
  } else {
    return 'pais'
  }
}

export function ordenarPorNome(pessoas) {
  return [...pessoas].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
}

// Busca por nome sem diferenciar acentos.
export function filtrarPorNome(pessoas, busca) {
  const procurado = normalizar(busca)
  if (procurado === '') {
    return pessoas
  }
  return pessoas.filter((pessoa) => normalizar(pessoa.nome).includes(procurado))
}

// Separa por cargo, na ordem da esfera. "cargo" vazio mostra todos.
export function agruparPorCargo(pessoas, esfera, cargo) {
  return CARGOS_POR_ESFERA[esfera]
    .filter((item) => cargo === '' || item === cargo)
    .map((item) => ({ cargo: item, pessoas: ordenarPorNome(pessoas.filter((pessoa) => pessoa.cargo === item)) }))
}

// Deputado federal vindo da API da Câmara (GET /deputados).
export function deputadoFederalDaApi(dados) {
  return {
    id: `camara-${dados.id}`,
    nome: semTravessao(dados.nome),
    partido: dados.siglaPartido,
    cargo: 'deputadoFederal',
    foto: dados.urlFoto,
    url: `https://www.camara.leg.br/deputados/${dados.id}`,
  }
}

// Senador vindo da API do Senado (lista de senadores em exercício).
export function senadorDaApi(dados) {
  const identificacao = dados.IdentificacaoParlamentar
  const legislaturas = [dados.Mandato?.PrimeiraLegislaturaDoMandato, dados.Mandato?.SegundaLegislaturaDoMandato].filter(Boolean)
  const inicio = legislaturas[0]?.DataInicio?.slice(0, 4)
  const fim = legislaturas[legislaturas.length - 1]?.DataFim?.slice(0, 4)
  return {
    id: `senado-${identificacao.CodigoParlamentar}`,
    nome: semTravessao(identificacao.NomeParlamentar),
    partido: identificacao.SiglaPartidoParlamentar,
    cargo: 'senador',
    foto: identificacao.UrlFotoParlamentar?.replace(/^http:/, 'https:') ?? null,
    url: identificacao.UrlPaginaParlamentar?.replace(/^http:/, 'https:'),
    mandato: inicio && fim ? `${inicio} a ${fim}` : '',
  }
}

// Iniciais para quem não tem foto oficial no projeto (mesmo tamanho da foto).
export function iniciais(nome) {
  const partes = nome.split(' ').filter((parte) => parte.length > 2 || parte === nome)
  const primeira = partes[0]?.charAt(0) ?? ''
  const ultima = partes.length > 1 ? partes[partes.length - 1].charAt(0) : ''
  return (primeira + ultima).toUpperCase()
}
