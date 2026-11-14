// Regras do login simulado (funções puras). As funções de validação
// devolvem um objeto com a chave do erro de cada campo; o texto do erro
// fica no textos.json.

const PADRAO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const SENHA_MINIMA = 6
export const APELIDO_MINIMO = 2
export const APELIDO_MAXIMO = 30

export function normalizarEmail(email) {
  return String(email ?? '').trim().toLowerCase()
}

function validarEmail(email) {
  if (email.trim() === '') {
    return 'emailVazio'
  } else if (!PADRAO_EMAIL.test(email.trim())) {
    return 'emailInvalido'
  } else {
    return null
  }
}

function validarSenha(senha, exigirTamanho) {
  if (senha === '') {
    return 'senhaVazia'
  } else if (exigirTamanho && senha.length < SENHA_MINIMA) {
    return 'senhaCurta'
  } else {
    return null
  }
}

function validarApelido(apelido) {
  const limpo = apelido.trim()
  if (limpo === '') {
    return 'apelidoVazio'
  } else if (limpo.length < APELIDO_MINIMO) {
    return 'apelidoCurto'
  } else if (limpo.length > APELIDO_MAXIMO) {
    return 'apelidoLongo'
  } else {
    return null
  }
}

// Tira os campos sem erro, para o formulário saber se pode enviar.
function soComErros(erros) {
  return Object.fromEntries(Object.entries(erros).filter(([, erro]) => erro !== null))
}

export function validarEntrada({ email, senha }) {
  return soComErros({
    email: validarEmail(email),
    senha: validarSenha(senha, false),
  })
}

export function validarCadastro({ apelido, email, senha }) {
  return soComErros({
    apelido: validarApelido(apelido),
    email: validarEmail(email),
    senha: validarSenha(senha, true),
  })
}

// Para onde vai a pessoa depois de entrar: direto para a área interna (a
// página que ela tentou abrir ou o painel). As boas-vindas só aparecem
// logo depois de criar a conta, nunca no login.
export function decidirDestinoAposEntrar(paginaPedida) {
  if (paginaPedida && paginaPedida.startsWith('/app')) {
    return paginaPedida
  } else {
    return '/app'
  }
}

// Depois de criar a conta: boas-vindas se ainda não viu; senão, o painel.
export function decidirDestinoAposCadastro(usuario) {
  if (!usuario.boasVindasConcluidas) {
    return '/boas-vindas'
  } else {
    return '/app'
  }
}
