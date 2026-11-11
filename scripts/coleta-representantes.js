// Coleta vereadores do Rio e deputados estaduais do RJ nos sites oficiais e
// gera src/data/representantes/municipio.json e estado.json.
//
// Por que um script e não a API: a Câmara Municipal do Rio e a ALERJ não
// têm API pública de parlamentares. As páginas lidas aqui são públicas e
// os robots.txt dos dois sites não proíbem esse acesso.
//
// Como usar: npm run coleta-representantes
// (o script roda com --use-system-ca porque o site da Câmara do Rio não
// envia a cadeia completa do certificado; a verificação continua ligada)
// Depois, ALGUÉM DA EQUIPE CONFERE nomes, partidos e fotos nos sites
// oficiais antes de publicar. Rodar de novo quando mudarem os mandatos
// (vereadores suplentes, ALERJ em fevereiro de 2027).

import { mkdirSync, rmSync, writeFileSync } from 'node:fs'

const AGENTE = 'Demokratos (projeto academico FIAP; coleta manual e esporadica)'
const HOJE = new Date().toISOString().slice(0, 10)
const PASTA_DADOS = 'src/data/representantes'
const PASTA_FOTOS_VEREADORES = 'public/representantes/vereadores'

const FONTES = {
  vereadores: {
    instituicao: 'Câmara Municipal do Rio de Janeiro',
    pagina: 'https://www.camara.rio/vereadores/quem-sao',
    lista: 'https://www.camara.rio/includes_php/vereadores_atuais.php?imprimir=N',
    perfil: (id) => `https://www.camara.rio/includes_php/vereador.php?cvd=${id}`,
  },
  deputadosEstaduais: {
    instituicao: 'Assembleia Legislativa do Estado do Rio de Janeiro (ALERJ)',
    pagina: 'https://www.alerj.rj.gov.br/Deputados/QuemSao',
  },
}

const ENTIDADES = {
  amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ',
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú',
  Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú',
  atilde: 'ã', otilde: 'õ', Atilde: 'Ã', Otilde: 'Õ',
  acirc: 'â', ecirc: 'ê', ocirc: 'ô', Acirc: 'Â', Ecirc: 'Ê', Ocirc: 'Ô',
  ccedil: 'ç', Ccedil: 'Ç', agrave: 'à', Agrave: 'À', uuml: 'ü', Uuml: 'Ü',
}

function decodificar(texto) {
  return texto
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, numero) => String.fromCharCode(Number(numero)))
    .replace(/&([a-z]+);/gi, (trecho, nome) => ENTIDADES[nome] ?? trecho)
    .replace(/\s+/g, ' ')
    .trim()
}

// "CELIA JORDÃO" vira "Celia Jordão"; partículas ficam minúsculas.
const PARTICULAS = new Set(['da', 'de', 'do', 'das', 'dos', 'e'])
function nomeProprio(nome) {
  return nome
    .toLowerCase()
    .split(' ')
    .map((palavra, indice) => {
      if (indice > 0 && PARTICULAS.has(palavra)) {
        return palavra
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1)
    })
    .join(' ')
}

// Cada site escreve algumas siglas de um jeito (e a Câmara do Rio mistura
// codificações, o que estraga acentos). Compara a sigla sem acento nem
// símbolos e usa sempre a mesma forma.
const SIGLAS = { UNIAO: 'UNIÃO', REP: 'REPUBLICANOS', SDD: 'SOLIDARIEDADE', PCDOB: 'PCdoB', PROGRESSISTAS: 'PP' }
function siglaDoPartido(sigla) {
  const limpa = decodificar(sigla)
  const chave = limpa.normalize('NFD').replace(/[^A-Za-z]/g, '').toUpperCase()
  return SIGLAS[chave] ?? limpa
}

async function baixar(url, codificacao = 'utf-8') {
  const resposta = await fetch(url, { headers: { 'User-Agent': AGENTE } })
  if (!resposta.ok) {
    throw new Error(`${url} respondeu ${resposta.status}`)
  }
  const bytes = await resposta.arrayBuffer()
  return new TextDecoder(codificacao).decode(bytes)
}

async function coletarDeputadosEstaduais() {
  const html = await baixar(FONTES.deputadosEstaduais.pagina)
  // Líderes de bancada vêm com a classe 'controle_deputado lider'.
  const blocos = html.split(/<div class="controle_deputado[^"]*">/).slice(1)
  const pessoas = blocos.map((bloco) => {
    const perfil = bloco.match(/href="(\/Deputados\/PerfilDeputado\/(\d+)[^"]*)"/)
    const foto = bloco.match(/<img src="([^"]+)"/)
    const partido = bloco.match(/<div class="partido">([^<]*)<\/div>/)
    const nome = bloco.match(/<div class="nome"><a[^>]*>([^<]*)<\/a>/)
    if (!perfil || !nome) {
      throw new Error('ALERJ: o formato da página mudou. Confira o script.')
    }
    return {
      id: `alerj-${perfil[2]}`,
      nome: nomeProprio(decodificar(nome[1])),
      partido: siglaDoPartido(partido ? partido[1] : ''),
      cargo: 'deputadoEstadual',
      foto: foto ? new URL(foto[1], FONTES.deputadosEstaduais.pagina).href : null,
      url: new URL(perfil[1], FONTES.deputadosEstaduais.pagina).href,
    }
  })
  return pessoas
}

async function coletarVereadores() {
  const html = await baixar(FONTES.vereadores.lista, 'iso-8859-1')
  const linhas = html.split('<tr').slice(2)
  rmSync(PASTA_FOTOS_VEREADORES, { recursive: true, force: true })
  mkdirSync(PASTA_FOTOS_VEREADORES, { recursive: true })

  return linhas.map((linha) => {
    const id = linha.match(/vereador\.php\?cvd=(\d+)/)
    const nome = linha.match(/vereador\.php\?cvd=\d+' target='_top'>([^<]+)<\/a>/)
    const partido = linha.match(/partido_politico\/[^"]+"\s+alt="([^"]+)"/)
    const foto = linha.match(/src="data:image\/(jpeg|png);base64,([A-Za-z0-9+/=]+)"/)
    if (!id || !nome) {
      throw new Error('Câmara do Rio: o formato da página mudou. Confira o script.')
    }
    let caminhoFoto = null
    if (foto) {
      const extensao = foto[1] === 'png' ? 'png' : 'jpg'
      writeFileSync(`${PASTA_FOTOS_VEREADORES}/${id[1]}.${extensao}`, Buffer.from(foto[2], 'base64'))
      caminhoFoto = `/representantes/vereadores/${id[1]}.${extensao}`
    }
    return {
      id: `cmrj-${id[1]}`,
      nome: decodificar(nome[1]),
      partido: siglaDoPartido(partido ? partido[1] : ''),
      cargo: 'vereador',
      foto: caminhoFoto,
      url: FONTES.vereadores.perfil(id[1]),
    }
  })
}

function porNome(a, b) {
  return a.nome.localeCompare(b.nome, 'pt-BR')
}

function salvar(arquivo, fonte, pessoas) {
  const dados = {
    _sobre: 'Gerado por scripts/coleta-representantes.js. Conferir nomes, partidos e fotos no site oficial antes de publicar.',
    consultadoEm: HOJE,
    fonte: { instituicao: fonte.instituicao, url: fonte.pagina },
    pessoas: pessoas.sort(porNome),
  }
  writeFileSync(`${PASTA_DADOS}/${arquivo}`, JSON.stringify(dados, null, 2) + '\n')
  console.log(`${arquivo}: ${pessoas.length} pessoas`)
}

mkdirSync(PASTA_DADOS, { recursive: true })
salvar('estado.json', FONTES.deputadosEstaduais, await coletarDeputadosEstaduais())
salvar('municipio.json', FONTES.vereadores, await coletarVereadores())
console.log('Pronto. Agora confira os dados nos sites oficiais e rode npm run checar-travessoes.')
