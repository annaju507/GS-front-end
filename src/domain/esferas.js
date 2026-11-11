// Esferas de governo. Só ícone e rótulo, sem cor própria (neutralidade).

export const ESFERAS = ['municipal', 'estadual', 'federal']

export function ehEsferaValida(esfera) {
  return ESFERAS.includes(esfera)
}
