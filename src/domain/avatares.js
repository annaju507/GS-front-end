// Avatares do perfil (funções puras). A pessoa escolhe um dos rostos, envia
// uma foto ou fica com a inicial do apelido.
export const AVATARES = Array.from({ length: 25 }, (_, indice) => `rosto-${String(indice + 1).padStart(2, '0')}`)

// O que a bolinha do perfil mostra: a foto vem primeiro, depois o rosto
// escolhido e, sem nenhum dos dois, a inicial.
export function tipoDoAvatar(usuario) {
  if (usuario?.foto) {
    return 'foto'
  } else if (AVATARES.includes(usuario?.avatar)) {
    return 'rosto'
  } else {
    return 'inicial'
  }
}
