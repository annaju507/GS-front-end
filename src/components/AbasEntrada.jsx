import { NavLink } from 'react-router'
import textos from '../data/textos.json'
import { useFundoConta } from '../hooks/useFundoConta.js'

const t = textos.auth.abas

// Troca entre "Entrar" e "Criar conta", no topo da janela. São links de
// verdade; o NavLink marca o atual com aria-current="page". Trocam no lugar
// (replace), para o "voltar" do navegador fechar a janela de uma vez.
function estiloAba({ isActive }) {
  const base =
    'flex min-h-11 flex-1 items-center justify-center rounded-full px-4 font-titulo text-tag font-bold uppercase tracking-[0.05em] no-underline transition-colors duration-150'
  if (isActive) {
    return `${base} bg-[#1A1A1A] text-white`
  }
  return `${base} text-texto hover:bg-lilas-claro`
}

export default function AbasEntrada() {
  const estadoConta = useFundoConta()

  return (
    <nav aria-label={t.rotulo}>
      <ul className="flex gap-1 rounded-full border border-borda bg-superficie p-1.5">
        <li className="flex flex-1">
          <NavLink to="/entrar" replace state={estadoConta()} className={estiloAba}>
            {t.entrar}
          </NavLink>
        </li>
        <li className="flex flex-1">
          <NavLink to="/cadastro" replace state={estadoConta()} className={estiloAba}>
            {t.criarConta}
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
