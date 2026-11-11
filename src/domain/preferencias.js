// Regras das preferências de leitura (funções puras, sem DOM e sem localStorage).

// As mesmas chaves são lidas no index.html, antes da página aparecer.
export const CHAVES = {
  tema: 'demokratos-tema',
  letra: 'demokratos-letra',
  reduzirAnimacoes: 'demokratos-reduzir-animacoes',
}

export const TEMA_CLARO = 'claro'
export const TEMA_ESCURO = 'escuro'

// A+ / A-: três níveis, em porcentagem do tamanho padrão.
export const NIVEIS_LETRA = [100, 115, 130]

// Tema na primeira visita: vale a escolha salva; sem escolha, segue o sistema.
export function decidirTemaInicial(temaSalvo, sistemaPrefereEscuro) {
  if (temaSalvo === TEMA_ESCURO) {
    return TEMA_ESCURO
  } else if (temaSalvo === TEMA_CLARO) {
    return TEMA_CLARO
  } else if (sistemaPrefereEscuro) {
    return TEMA_ESCURO
  } else {
    return TEMA_CLARO
  }
}

// Só aceita um dos três níveis; qualquer outro valor volta para 100%.
export function decidirNivelLetraInicial(valorSalvo) {
  const nivel = Number(valorSalvo)
  if (NIVEIS_LETRA.includes(nivel)) {
    return nivel
  } else {
    return NIVEIS_LETRA[0]
  }
}

// Calcula o próximo nível. Se já estiver no limite, avisa em vez de mudar.
export function calcularNivelLetra(nivelAtual, direcao) {
  const posicao = NIVEIS_LETRA.indexOf(nivelAtual)
  if (direcao === 'aumentar' && posicao < NIVEIS_LETRA.length - 1) {
    return { nivel: NIVEIS_LETRA[posicao + 1], limite: null }
  } else if (direcao === 'aumentar') {
    return { nivel: nivelAtual, limite: 'maximo' }
  } else if (direcao === 'diminuir' && posicao > 0) {
    return { nivel: NIVEIS_LETRA[posicao - 1], limite: null }
  } else {
    return { nivel: nivelAtual, limite: 'minimo' }
  }
}

// As animações ficam reduzidas se a pessoa pediu no site OU no aparelho.
export function decidirReduzirAnimacoes(opcaoDoSite, sistemaPedeMenos) {
  if (opcaoDoSite || sistemaPedeMenos) {
    return true
  } else {
    return false
  }
}
