import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import textos from '../data/textos.json'
import { APELIDO_MAXIMO, validarCadastro } from '../domain/auth.js'
import { useAuth } from '../hooks/useAuth.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import Botao from '../components/Botao.jsx'
import Card from '../components/Card.jsx'
import CenaEmbarque from '../components/CenaEmbarque.jsx'
import CampoTexto from '../components/CampoTexto.jsx'
import CampoSenha from '../components/CampoSenha.jsx'

const t = textos.auth
const ORDEM_CAMPOS = ['apelido', 'email', 'senha']

export default function Cadastro() {
  useTitulo(t.cadastro.titulo)
  const { cadastrar } = useAuth()
  const navegar = useNavigate()

  const [dados, setDados] = useState({ apelido: '', email: '', senha: '' })
  const [erros, setErros] = useState({})
  const [erroGeral, setErroGeral] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const refApelido = useRef(null)
  const refEmail = useRef(null)
  const refSenha = useRef(null)

  function atualizar(campo) {
    return (evento) => setDados({ ...dados, [campo]: evento.target.value })
  }

  async function enviar(evento) {
    const campos = { apelido: refApelido, email: refEmail, senha: refSenha }
    evento.preventDefault()
    setErroGeral(null)
    const encontrados = validarCadastro(dados)
    setErros(encontrados)

    const primeiroComErro = ORDEM_CAMPOS.find((campo) => encontrados[campo])
    if (primeiroComErro) {
      campos[primeiroComErro].current.focus()
      return
    }

    setEnviando(true)
    const resposta = await cadastrar(dados)
    setEnviando(false)
    if (resposta.ok) {
      navegar('/boas-vindas', { replace: true })
    } else {
      setErroGeral(t.erros[resposta.erro])
      campos.email.current.focus()
    }
  }

  return (
    <CenaEmbarque>
      <Card className="flex flex-col gap-5">
        <header className="flex flex-col gap-2">
          <h1>{t.cadastro.titulo}</h1>
          <p className="text-texto-2">{t.cadastro.intro}</p>
        </header>

        <Aviso tipo="info">{t.avisoPrototipo}</Aviso>

        <div role="alert">{erroGeral && <Aviso tipo="erro">{erroGeral}</Aviso>}</div>

        <form noValidate onSubmit={enviar} className="flex flex-col gap-4">
          <CampoTexto
            ref={refApelido}
            rotulo={t.cadastro.apelido}
            dica={t.cadastro.apelidoDica}
            autoComplete="nickname"
            maximo={APELIDO_MAXIMO}
            valor={dados.apelido}
            onChange={atualizar('apelido')}
            erro={erros.apelido && t.erros[erros.apelido]}
          />
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
            dica={t.cadastro.senhaDica}
            autoComplete="new-password"
            valor={dados.senha}
            onChange={atualizar('senha')}
            erro={erros.senha && t.erros[erros.senha]}
          />
          <Botao variante="primario" type="submit" disabled={enviando}>
            {enviando ? t.enviando : t.cadastro.botao}
          </Botao>
        </form>

        <p className="border-t border-borda pt-4">
          {t.cadastro.temConta} <Link to="/entrar">{t.cadastro.entrar}</Link>
        </p>
      </Card>
    </CenaEmbarque>
  )
}
