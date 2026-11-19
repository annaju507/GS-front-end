// Qual seção do menu fica marcada em cada endereço (função pura).
// Ex.: uma lição ou o quiz pertencem a "Aprender"; uma proposta, a "Agora".
export function secaoDaRota(caminho) {
  if (caminho.startsWith('/app/trilha') || caminho.startsWith('/app/licao') || caminho.startsWith('/app/conquista')) {
    return 'aprender'
  } else if (caminho.startsWith('/app/agora') || caminho.startsWith('/app/proposta')) {
    return 'agora'
  } else if (caminho.startsWith('/app/representante')) {
    return 'representantes'
  } else if (caminho.startsWith('/app/direitos')) {
    return 'direitos'
  } else if (caminho.startsWith('/app/caderno')) {
    return 'caderno'
  } else if (caminho.startsWith('/app/glossario')) {
    return 'glossario'
  } else if (caminho.startsWith('/app/perfil')) {
    return 'perfil'
  } else {
    return 'painel'
  }
}

// Entrar e Criar conta: abrem numa janela por cima da página atual.
export function ehTelaDeEntrada(caminho) {
  if (caminho === '/entrar' || caminho === '/cadastro') {
    return true
  } else {
    return false
  }
}
