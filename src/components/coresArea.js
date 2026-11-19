// Classes de cor de cada área temática (fundo, texto, borda e degrau), com
// versão para o modo escuro nos tokens (index.css). "outros" e
// "transversal" usam o estilo neutro: não são uma área a mais.
// O verde de "cidade" é o da paleta oficial das áreas, não o verde de acerto.
export const CORES_AREA = {
  saude: {
    bloco: 'bg-area-saude-fundo text-area-saude border-area-saude-borda',
    degrau: 'var(--area-saude-degrau)',
    cheio: 'bg-area-saude text-superficie border-area-saude',
  },
  educacao: {
    bloco: 'bg-area-educacao-fundo text-area-educacao border-area-educacao-borda',
    degrau: 'var(--area-educacao-degrau)',
    cheio: 'bg-area-educacao text-superficie border-area-educacao',
  },
  seguranca: {
    bloco: 'bg-area-seguranca-fundo text-area-seguranca border-area-seguranca-borda',
    degrau: 'var(--area-seguranca-degrau)',
    cheio: 'bg-area-seguranca text-superficie border-area-seguranca',
  },
  cidade: {
    bloco: 'bg-area-cidade-fundo text-area-cidade border-area-cidade-borda',
    degrau: 'var(--area-cidade-degrau)',
    cheio: 'bg-area-cidade text-superficie border-area-cidade',
  },
  neutra: {
    bloco: 'bg-area-neutra-fundo text-area-neutra border-area-neutra-borda',
    degrau: 'var(--area-neutra-degrau)',
    cheio: 'bg-area-neutra text-superficie border-area-neutra',
  },
}

export function coresDaArea(area) {
  return CORES_AREA[area] ?? CORES_AREA.neutra
}
