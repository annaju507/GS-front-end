// Datas no formato brasileiro.

// '2026-11-10' -> '10/11/2026'. Lê a data como texto para não mudar de dia
// por causa do fuso horário.
export function formatarData(dataIso) {
  const partes = String(dataIso ?? '').slice(0, 10).split('-')
  if (partes.length === 3 && partes.every((parte) => parte !== '')) {
    const [ano, mes, dia] = partes
    return `${dia}/${mes}/${ano}`
  } else {
    return ''
  }
}
