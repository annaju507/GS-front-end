import { useLocation } from 'react-router'
import { ehTelaDeEntrada } from '../domain/navegacao.js'

// Entrar e Criar conta abrem numa janela por cima da página em que a pessoa
// está. Para isso, o link leva junto (no state) a página de fundo. Se o link
// já está dentro da janela (trocar de Entrar para Criar conta), mantém o mesmo
// fundo. Uso: <Link to="/entrar" state={estadoConta()}>
export function useFundoConta() {
  const local = useLocation()

  let fundo = local
  let paginaPedida = null
  if (ehTelaDeEntrada(local.pathname)) {
    fundo = local.state?.fundo ?? null
    paginaPedida = local.state?.paginaPedida ?? null
  }

  function estadoConta(extra = {}) {
    return { paginaPedida, ...extra, fundo }
  }

  return estadoConta
}
