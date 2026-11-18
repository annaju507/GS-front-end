import GrupoMascotes from './GrupoMascotes.jsx'

// Moldura das telas Entrar e Criar conta: o cartão do formulário à esquerda e
// a turma dos mascotes à direita, tudo na altura da janela (sem rolar a
// página). Se a tela for baixa demais, só o cartão rola por dentro. No
// celular, a turma fica escondida para o formulário caber.
export default function CenaEntrada({ children }) {
  return (
    <div className="mx-auto grid h-full max-w-conteudo items-center gap-8 px-4 py-2 md:px-6 lg:grid-cols-[minmax(0,34rem)_1fr] lg:gap-10 lg:px-8">
      <div className="max-h-full min-h-0 overflow-y-auto rounded-card shadow-modal">{children}</div>
      <div className="hidden h-full min-h-0 items-center justify-center lg:flex">
        <GrupoMascotes className="h-[min(30rem,100%)] max-w-full" />
      </div>
    </div>
  )
}
