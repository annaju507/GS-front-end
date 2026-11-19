import { Suspense, lazy, useEffect, useId, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { X } from 'lucide-react'
import textos from '../data/textos.json'
import AbasEntrada from './AbasEntrada.jsx'
import CarregandoPagina from './CarregandoPagina.jsx'

const Entrar = lazy(() => import('../pages/Entrar.jsx'))
const Cadastro = lazy(() => import('../pages/Cadastro.jsx'))

const t = textos.auth

// Janela de Entrar e Criar conta, por cima da página em que a pessoa estava,
// com o fundo embaçado. Usa o <dialog> nativo: prende o foco dentro dele e
// deixa o resto da página inerte. Fecha pelo X, pelo Esc ou clicando fora.
// Ao fechar, volta para a página de fundo, no mesmo ponto da rolagem.
export default function ModalConta() {
  const dialogoRef = useRef(null)
  const idTitulo = useId()
  const local = useLocation()
  const navegar = useNavigate()
  const ehCadastro = local.pathname === '/cadastro'

  // Manipulação do DOM: abre o <dialog> e trava a rolagem da página de fundo
  // enquanto a janela estiver aberta.
  useEffect(() => {
    const dialogo = dialogoRef.current
    if (!dialogo.open) {
      dialogo.showModal()
    }
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [])

  function fechar() {
    // Veio de um link do site: volta uma página no histórico (a de fundo).
    // Abriu direto pelo endereço: vai para o Início.
    if (local.state?.fundo) {
      navegar(-1)
    } else {
      navegar('/', { replace: true })
    }
  }

  function clicarFora(evento) {
    if (evento.target === dialogoRef.current) {
      fechar()
    }
  }

  return (
    <dialog
      ref={dialogoRef}
      aria-labelledby={idTitulo}
      onCancel={(evento) => {
        evento.preventDefault()
        fechar()
      }}
      onClick={clicarFora}
      className="janela-conta m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-modal border border-borda bg-superficie p-0 text-texto shadow-modal"
    >
      <div className="flex flex-col gap-3 p-5 md:p-6">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <AbasEntrada />
          </div>
          <button
            type="button"
            onClick={fechar}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full text-texto hover:bg-lilas-claro"
          >
            <X size={22} strokeWidth={2} aria-hidden="true" />
            <span className="sr-only">{t.fechar}</span>
          </button>
        </div>
        <Suspense fallback={<CarregandoPagina />}>
          {ehCadastro ? <Cadastro idTitulo={idTitulo} /> : <Entrar idTitulo={idTitulo} />}
        </Suspense>
      </div>
    </dialog>
  )
}
