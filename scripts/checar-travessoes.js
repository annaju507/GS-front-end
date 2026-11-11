// Procura travessão (U+2014), meia-risca (U+2013) e sinal de menos
// tipográfico (U+2212) nos arquivos do site. Se achar, mostra onde
// e termina com erro, para impedir o commit.
// Uso: npm run checar-travessoes

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, extname, relative } from 'node:path'

const RAIZ = process.cwd()
const ALVOS = ['src', 'public', 'scripts', 'index.html']

const PROIBIDOS = {
  [String.fromCharCode(0x2014)]: 'travessão',
  [String.fromCharCode(0x2013)]: 'meia-risca',
  [String.fromCharCode(0x2212)]: 'sinal de menos tipográfico',
}

const EXTENSOES_BINARIAS = new Set([
  '.webp', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.avif',
  '.woff', '.woff2', '.ttf', '.otf', '.pdf', '.mp4', '.webm',
])

function listarArquivos(caminho) {
  if (!existsSync(caminho)) {
    return []
  }
  if (statSync(caminho).isFile()) {
    return [caminho]
  }
  let arquivos = []
  for (const nome of readdirSync(caminho)) {
    arquivos = arquivos.concat(listarArquivos(join(caminho, nome)))
  }
  return arquivos
}

function procurarNoArquivo(arquivo) {
  const achados = []
  const linhas = readFileSync(arquivo, 'utf8').split('\n')
  linhas.forEach((linha, indice) => {
    for (let coluna = 0; coluna < linha.length; coluna++) {
      const nome = PROIBIDOS[linha[coluna]]
      if (nome) {
        achados.push({ linha: indice + 1, coluna: coluna + 1, nome, trecho: linha.trim() })
      }
    }
  })
  return achados
}

let total = 0
for (const alvo of ALVOS) {
  for (const arquivo of listarArquivos(join(RAIZ, alvo))) {
    if (EXTENSOES_BINARIAS.has(extname(arquivo).toLowerCase())) {
      continue
    }
    for (const achado of procurarNoArquivo(arquivo)) {
      total++
      console.error(
        `${relative(RAIZ, arquivo)}:${achado.linha}:${achado.coluna}  ${achado.nome}  ->  ${achado.trecho}`,
      )
    }
  }
}

if (total > 0) {
  console.error(`\n${total} caractere(s) proibido(s). Troque por vírgula, dois-pontos, ponto, parênteses ou hífen comum (-).`)
  process.exit(1)
} else {
  console.log('Nenhum travessão, meia-risca ou sinal de menos tipográfico encontrado.')
}
