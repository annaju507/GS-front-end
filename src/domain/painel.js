// Regras do Início (painel) em funções puras: a semana de foguinhos, a caixa
// de mensagens, a próxima meta e quando mostrar a animação de entrada.
import { diaAnterior } from './progresso.js'

const LETRAS_DA_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

function letraDoDia(dataIso) {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  return LETRAS_DA_SEMANA[new Date(ano, mes - 1, dia).getDay()]
}

// Os últimos 7 dias, terminando hoje, e se a pessoa estudou em cada um.
export function semanaRecente(dias, hoje) {
  const estudou = new Set(dias)
  const semana = []
  let cursor = hoje
  for (let i = 0; i < 7; i++) {
    semana.unshift({ data: cursor, letra: letraDoDia(cursor), estudou: estudou.has(cursor), hoje: cursor === hoje })
    cursor = diaAnterior(cursor)
  }
  return semana
}

// A animação do foguinho aparece uma vez por dia, ao entrar, se houver
// sequência para comemorar.
export function deveMostrarEntrada(ultimaVez, hoje, sequencia) {
  if (sequencia <= 0) {
    return false
  } else if (ultimaVez === hoje) {
    return false
  } else {
    return true
  }
}

// Qual frase acompanha o número de dias.
export function fraseDaSequencia(dias) {
  if (dias === 1) {
    return 'um'
  } else if (dias >= 7) {
    return 'semana'
  } else {
    return 'varios'
  }
}

// Próxima meta de sequência (3 e depois 7 dias). Depois de 7, não há meta.
export function proximaMetaSequencia(sequencia) {
  if (sequencia < 3) {
    return { medalha: 'tresDias', meta: 3, atual: sequencia }
  } else if (sequencia < 7) {
    return { medalha: 'seteDias', meta: 7, atual: sequencia }
  } else {
    return null
  }
}

// Mensagens da caixa, montadas na hora com o que está acontecendo: a proposta
// do dia, a última medalha ganha e a sequência. O id muda quando a mensagem
// muda (outro dia, outra medalha, outro número), para voltar a ser "nova".
export function montarMensagens({ proposta, medalhas, sequencia, hoje }) {
  const mensagens = []
  if (proposta) {
    mensagens.push({ id: `proposta-${hoje}`, tipo: 'proposta', para: `/app/proposta/${proposta.id}`, area: proposta.area })
  }
  const ganhas = medalhas.filter((medalha) => medalha.ganha)
  if (ganhas.length > 0) {
    const ultima = ganhas[ganhas.length - 1]
    mensagens.push({ id: `medalha-${ultima.id}`, tipo: 'medalha', para: '/app/perfil', medalha: ultima.id })
  }
  if (sequencia > 0) {
    mensagens.push({ id: `sequencia-${hoje}-${sequencia}`, tipo: 'sequencia', para: '/app/trilha', dias: sequencia })
  } else {
    mensagens.push({ id: 'sequencia-comecar', tipo: 'comecar', para: '/app/trilha' })
  }
  mensagens.push({ id: 'glossario', tipo: 'glossario', para: '/app/glossario' })
  return mensagens
}

export function contarNovas(mensagens, lidas) {
  const jaLidas = new Set(lidas)
  return mensagens.filter((mensagem) => !jaLidas.has(mensagem.id)).length
}
