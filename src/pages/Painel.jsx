import { useNavigate } from 'react-router'
import { LogOut } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import { useAuth } from '../hooks/useAuth.js'
import { useTitulo } from '../hooks/useTitulo.js'
import PularParaConteudo from '../components/PularParaConteudo.jsx'
import Logo from '../components/Logo.jsx'
import BotaoTema from '../components/BotaoTema.jsx'
import Botao from '../components/Botao.jsx'

const t = textos.painel

// Painel PROVISÓRIO: existe só para o login ter onde chegar.
// Na etapa 4 ganha a navegação interna (barra inferior e lateral) e o conteúdo.
export default function Painel() {
  useTitulo(t.tituloAba)
  const { usuario, sair } = useAuth()
  const navegar = useNavigate()

  function sairDaConta() {
    sair()
    navegar('/', { replace: true })
  }

  return (
    <>
      <PularParaConteudo />
      <header className="border-b border-borda bg-superficie">
        <div className="mx-auto flex max-w-conteudo items-center justify-between gap-3 px-4 py-2 md:px-6 lg:px-8">
          <Logo para="/app" />
          <BotaoTema compacto />
        </div>
      </header>
      <main id="conteudo" className="mx-auto flex max-w-leitura flex-col items-start gap-4 px-4 py-12 md:px-6">
        <h1>{preencher(t.ola, { apelido: usuario.apelido })}</h1>
        <p>{t.texto}</p>
        <Botao variante="secundario" icone={LogOut} onClick={sairDaConta}>
          {t.sair}
        </Botao>
      </main>
    </>
  )
}
