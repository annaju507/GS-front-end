import { useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import textos from '../data/textos.json'
import { decidirDestinoAposEntrar, validarEntrada } from '../domain/auth.js'
import { useAuth } from '../hooks/useAuth.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import Botao from '../components/Botao.jsx'
import Card from '../components/Card.jsx'
import CenaEmbarque from '../components/CenaEmbarque.jsx'
import CampoTexto from '../components/CampoTexto.jsx'
import CampoSenha from '../components/CampoSenha.jsx'

const t = textos.auth
const ORDEM_CAMPOS = ['email', 'senha']

export default function Entrar() {
  useTitulo(t.entrar.titulo)
  const { usuario, entrar } = useAuth()
  const navegar = useNavigate()
  const local = useLocation()

  const [dados, setDados] = useState({ email: '', senha: '' })
  const [erros, setErros] = useState({})
  const [erroGeral, setErroGeral] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [ajudaSenha, setAjudaSenha] = useState(false)
  const refEmail = useRef(null)
  const refSenha = useRef(null)

  function atualizar(campo) {
    return (evento) => setDados({ ...dados, [campo]: evento.target.value })
  }

  async function enviar(evento) {
    const campos = { email: refEmail, senha: refSenha }
    evento.preventDefault()
    setErroGeral(null)
    const encontrados = validarEntrada(dados)
    setErros(encontrados)

    // Leva o foco para o primeiro campo com erro.
    const primeiroComErro = ORDEM_CAMPOS.find((campo) => encontrados[campo])
    if (primeiroComErro) {
      campos[primeiroComErro].current.focus()
      return
    }

    setEnviando(true)
    const resposta = await entrar(dados)
    setEnviando(false)
    if (resposta.ok) {
      navegar(decidirDestinoAposEntrar(local.state?.paginaPedida), { replace: true })
    } else {
      setErroGeral(t.erros[resposta.erro])
    }
  }

  // Quem já está logado não precisa ver o formulário: vai direto para dentro.
  if (usuario) {
    return <Navigate to={decidirDestinoAposEntrar(local.state?.paginaPedida)} replace />
  }

  return (
    <CenaEmbarque>
      <Card className="flex flex-col gap-5">
        <header className="flex flex-col gap-2">
          <h1>{t.entrar.titulo}</h1>
          <p className="text-texto-2">{t.entrar.intro}</p>
        </header>

        <Aviso tipo="info">{t.avisoPrototipo}</Aviso>

        <div role="alert">{erroGeral && <Aviso tipo="erro">{erroGeral}</Aviso>}</div>

        <form noValidate onSubmit={enviar} className="flex flex-col gap-4">
          <CampoTexto
            ref={refEmail}
            rotulo={t.email}
            type="email"
            autoComplete="email"
            valor={dados.email}
            onChange={atualizar('email')}
            erro={erros.email && t.erros[erros.email]}
          />
          <CampoSenha
            ref={refSenha}
            rotulo={t.senha}
            autoComplete="current-password"
            valor={dados.senha}
            onChange={atualizar('senha')}
            erro={erros.senha && t.erros[erros.senha]}
          />
          <Botao variante="primario" type="submit" disabled={enviando}>
            {enviando ? t.enviando : t.entrar.botao}
          </Botao>
        </form>

        <div className="flex flex-col gap-2">
          <Botao variante="terciario" onClick={() => setAjudaSenha(!ajudaSenha)} aria-expanded={ajudaSenha} className="self-start -ml-6">
            {t.entrar.esqueci}
          </Botao>
          {ajudaSenha && <Aviso tipo="info">{t.entrar.esqueciAviso}</Aviso>}
        </div>

        <p className="border-t border-borda pt-4">
          {t.entrar.semConta} <Link to="/cadastro">{t.entrar.criarConta}</Link>
        </p>
      </Card>
    </CenaEmbarque>
  )
}
