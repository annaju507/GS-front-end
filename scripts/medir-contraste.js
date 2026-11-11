// Mede o contraste (WCAG 2.1) dos pares de cores usados no site,
// lendo os tokens direto de src/index.css, nos temas claro e escuro.
// Texto precisa de 4,5:1; bordas, ícones e partes de componentes, 3:1.
// Uso: npm run medir-contraste

import { readFileSync } from 'node:fs'

const css = readFileSync('src/index.css', 'utf8')

function lerBloco(seletor) {
  const inicio = css.indexOf(`${seletor} {`)
  const fim = css.indexOf('\n}', inicio)
  const bloco = css.slice(inicio, fim)
  const tokens = {}
  for (const [, nome, cor] of bloco.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    tokens[nome] = cor
  }
  return tokens
}

const fixos = lerBloco('@theme')
const claro = { ...fixos, ...lerBloco(':root') }
const escuro = { ...claro, ...lerBloco('.dark') }

function luminancia(hex) {
  const canais = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = canais.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contraste(a, b) {
  const [maior, menor] = [luminancia(a), luminancia(b)].sort((x, y) => y - x)
  return (maior + 0.05) / (menor + 0.05)
}

// [frente, fundo, mínimo, descrição]
const TEXTO = 4.5
const COMPONENTE = 3
// AVISO: mostra o valor, mas não falha (a informação também está escrita em texto).
const AVISO = 'aviso'
const PARES = [
  ['texto', 'fundo', TEXTO, 'Texto sobre o fundo'],
  ['texto', 'superficie', TEXTO, 'Texto sobre card'],
  ['texto-2', 'fundo', TEXTO, 'Texto de apoio sobre o fundo'],
  ['texto-2', 'superficie', TEXTO, 'Texto de apoio sobre card'],
  ['texto-2', 'lilas-claro', TEXTO, 'Texto de apoio sobre lilás-claro'],
  ['texto', 'lilas-claro', TEXTO, 'Texto sobre lilás-claro (aba ativa, tag)'],
  ['link', 'fundo', TEXTO, 'Link sobre o fundo'],
  ['link', 'superficie', TEXTO, 'Link sobre card'],
  ['link', 'lilas-claro', TEXTO, 'Link/aba ativa sobre lilás-claro'],
  ['glossario', 'superficie', TEXTO, 'Termo do glossário sobre card'],
  ['botao-texto', 'botao', TEXTO, 'Botão primário'],
  ['botao-texto', 'botao-hover', TEXTO, 'Botão primário (hover)'],
  ['secundario-texto', 'secundario', TEXTO, 'Botão secundário'],
  ['marca-botao-texto', 'marca-botao', TEXTO, 'Botão de marca'],
  ['marca-botao-texto', 'marca-botao-hover', TEXTO, 'Botão de marca (hover)'],
  ['marca-texto-cor', 'marca-texto-fundo', TEXTO, 'Título com marca-texto'],
  ['faixa-texto', 'faixa', TEXTO, 'Faixa de topo'],
  ['exemplo-texto', 'exemplo-fundo', TEXTO, 'Bloco de exemplo carioca'],
  ['sucesso', 'sucesso-fundo', TEXTO, 'Mensagem de acerto'],
  ['sucesso', 'superficie', TEXTO, 'Texto de acerto sobre card'],
  ['erro', 'erro-fundo', TEXTO, 'Mensagem de erro'],
  ['erro', 'superficie', TEXTO, 'Erro de formulário sobre card'],
  ['alerta', 'alerta-fundo', TEXTO, 'Mensagem de alerta'],
  ['info', 'info-fundo', TEXTO, 'Mensagem de informação'],
  ['sucesso-botao-texto', 'sucesso-botao', TEXTO, 'Botão CONTINUAR (acerto)'],
  ['erro-botao-texto', 'erro-botao', TEXTO, 'Botão CONTINUAR (erro)'],
  ['area-saude', 'area-saude-fundo', TEXTO, 'Tag Saúde'],
  ['area-educacao', 'area-educacao-fundo', TEXTO, 'Tag Educação'],
  ['area-seguranca', 'area-seguranca-fundo', TEXTO, 'Tag Segurança'],
  ['area-cidade', 'area-cidade-fundo', TEXTO, 'Tag Cidade e serviços públicos'],
  ['texto', 'caramelo-fundo', TEXTO, 'Balão do caramelo'],
  ['texto', 'capivara-fundo', TEXTO, 'Balão da capivara'],
  ['texto', 'arara-fundo', TEXTO, 'Balão da arara'],
  ['texto', 'onca-fundo', TEXTO, 'Balão da onça'],
  ['texto', 'mico-fundo', TEXTO, 'Balão do mico'],
  ['borda-campo', 'superficie', COMPONENTE, 'Borda do campo de formulário'],
  ['foco', 'fundo', COMPONENTE, 'Anel de foco sobre o fundo'],
  ['foco', 'superficie', COMPONENTE, 'Anel de foco sobre card'],
  ['voto-sim', 'superficie', COMPONENTE, 'Barra de voto: Sim'],
  ['voto-nao', 'superficie', COMPONENTE, 'Barra de voto: Não'],
  ['voto-abstencao', 'superficie', COMPONENTE, 'Barra de voto: Abstenção'],
  ['voto-obstrucao', 'superficie', COMPONENTE, 'Barra de voto: Obstrução'],
  ['voto-contorno', 'superficie', COMPONENTE, 'Contorno de voto (ausência / não votou)'],
  ['color-lilas', 'lilas-claro', AVISO, 'Barra de progresso (a porcentagem também aparece escrita)'],
]

let falhas = 0
for (const [nomeTema, tokens] of [['CLARO', claro], ['ESCURO', escuro]]) {
  console.log(`\n=== TEMA ${nomeTema} ===`)
  for (const [frente, fundo, minimo, descricao] of PARES) {
    const corFrente = tokens[frente]
    const corFundo = tokens[fundo]
    if (!corFrente || !corFundo) {
      console.log(`  ?    ${descricao}: token não encontrado (${frente} / ${fundo})`)
      continue
    }
    const valor = contraste(corFrente, corFundo)
    if (minimo === AVISO) {
      const marcaAviso = valor >= COMPONENTE ? 'ok  ' : 'AVISO'
      console.log(`  ${marcaAviso} ${valor.toFixed(2).padStart(5)}:1 (informativo)  ${descricao}  [${corFrente} sobre ${corFundo}]`)
      continue
    }
    const passou = valor >= minimo
    if (!passou) {
      falhas++
    }
    const marca = passou ? 'ok  ' : 'FALHA'
    console.log(`  ${marca} ${valor.toFixed(2).padStart(5)}:1 (mín. ${minimo})  ${descricao}  [${corFrente} sobre ${corFundo}]`)
  }
}

if (falhas > 0) {
  console.log(`\n${falhas} par(es) abaixo do mínimo.`)
  process.exit(1)
} else {
  console.log('\nTodos os pares passaram.')
}
