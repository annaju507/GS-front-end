// Acesso aos Dados Abertos do Senado Federal (só leitura).
// Documentação: https://legis.senado.leg.br/dadosabertos/docs/
import { pedirJson } from './http.js'

const LISTA_ATUAL = 'https://legis.senado.leg.br/dadosabertos/senador/lista/atual.json'

// Senadores em exercício que representam o RJ.
export async function buscarSenadoresRJ() {
  const corpo = await pedirJson(LISTA_ATUAL)
  const parlamentares = corpo.ListaParlamentarEmExercicio?.Parlamentares?.Parlamentar ?? []
  return parlamentares.filter((parlamentar) => parlamentar.IdentificacaoParlamentar.UfParlamentar === 'RJ')
}
