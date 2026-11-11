// Progresso e sequência de dias (funções puras). Datas no formato 'AAAA-MM-DD'.

export const PROGRESSO_VAZIO = { licoes: {}, dias: [], fontesConsultadas: 0, propostasLidas: [] }

// Data local de hoje no formato 'AAAA-MM-DD' (sem depender do fuso UTC).
export function dataLocalIso(data) {
  const ano = data.getFullYear()
  const mes = String(data.getMonth() + 1).padStart(2, '0')
  const dia = String(data.getDate()).padStart(2, '0')
  return `${ano}-${mes}-${dia}`
}

export function diaAnterior(dataIso) {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  return dataLocalIso(new Date(ano, mes - 1, dia - 1))
}

// Dias seguidos de estudo, terminando hoje ou ontem (a sequência ainda vale
// até o fim do dia seguinte).
export function calcularSequencia(dias, hoje) {
  const estudou = new Set(dias)
  let cursor = hoje
  if (!estudou.has(cursor)) {
    cursor = diaAnterior(hoje)
  }
  let total = 0
  while (estudou.has(cursor)) {
    total++
    cursor = diaAnterior(cursor)
  }
  return total
}

// A pessoa já estudou antes, mas a sequência zerou?
export function sequenciaPerdida(dias, hoje) {
  return dias.length > 0 && calcularSequencia(dias, hoje) === 0
}

// Guarda o resultado de uma lição. Se refizer, fica o melhor número de acertos.
export function registrarLicao(progresso, idLicao, resultado, hoje) {
  const anterior = progresso.licoes[idLicao]
  let melhor = resultado
  if (anterior && anterior.acertos > resultado.acertos) {
    melhor = { ...resultado, acertos: anterior.acertos }
  }
  const dias = progresso.dias.includes(hoje) ? progresso.dias : [...progresso.dias, hoje].sort()
  return {
    ...progresso,
    licoes: { ...progresso.licoes, [idLicao]: { ...melhor, concluidaEm: hoje } },
    dias,
  }
}
