// Regras de texto (funções puras).

// Os caracteres proibidos no site, montados pelo código para não
// aparecerem escritos aqui (o checar-travessoes também lê este arquivo).
const TRAVESSAO = String.fromCharCode(0x2014)
const MEIA_RISCA = String.fromCharCode(0x2013)
const MENOS_TIPOGRAFICO = String.fromCharCode(0x2212)

const INTERVALO_NUMERICO = new RegExp(`(\\d)\\s*[${TRAVESSAO}${MEIA_RISCA}]\\s*(\\d)`, 'g')
const TRAVESSAO_SOLTO = new RegExp(`\\s*[${TRAVESSAO}${MEIA_RISCA}]\\s*`, 'g')
const MENOS = new RegExp(MENOS_TIPOGRAFICO, 'g')

// Todo texto vindo de API passa por aqui antes de aparecer na tela.
// "2-5" com meia-risca vira "2 a 5"; travessão no meio da frase vira vírgula;
// sinal de menos tipográfico vira hífen comum.
export function semTravessao(texto) {
  if (typeof texto !== 'string') {
    return texto
  }
  return texto
    .replace(INTERVALO_NUMERICO, '$1 a $2')
    .replace(MENOS, '-')
    .replace(TRAVESSAO_SOLTO, ', ')
    .replace(/^,\s*/, '')
    .replace(/,\s*$/, '')
    .replace(/,\s*([.,;:!?])/g, '$1')
}

// Preenche um modelo do textos.json: preencher('Letra em {valor}%', { valor: 115 })
export function preencher(modelo, valores) {
  return modelo.replace(/\{(\w+)\}/g, (trecho, chave) => {
    if (chave in valores) {
      return String(valores[chave])
    } else {
      return trecho
    }
  })
}
