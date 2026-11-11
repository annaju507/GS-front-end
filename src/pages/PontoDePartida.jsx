import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import textos from '../data/textos.json'
import { useAuth } from '../hooks/useAuth.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import Botao from '../components/Botao.jsx'
import IndicadorPassos from '../components/IndicadorPassos.jsx'

const t = textos.boasVindas.pontoDePartida

// Passo 2: "Quanto você já sabe?" (grupo de rádio em cards).
export default function PontoDePartida() {
  useTitulo(t.tituloAba)
  const { usuario, atualizarUsuario } = useAuth()
  const navegar = useNavigate()
  const [escolha, setEscolha] = useState(usuario.pontoDePartida)
  const [mostrarErro, setMostrarErro] = useState(false)
  const grupoRef = useRef(null)

  function continuar() {
    if (escolha) {
      atualizarUsuario({ pontoDePartida: escolha })
      navegar('/boas-vindas/ajustes')
    } else {
      setMostrarErro(true)
      grupoRef.current.querySelector('input').focus()
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <IndicadorPassos atual={2} total={3} />
      <fieldset ref={grupoRef} className="flex flex-col gap-3" aria-describedby="ponto-intro">
        <legend className="mb-3">
          <h1>{t.titulo}</h1>
        </legend>
        <p id="ponto-intro" className="text-corpo">{t.intro}</p>
        {t.opcoes.map((opcao) => {
          const marcada = escolha === opcao.valor
          return (
            <label
              key={opcao.valor}
              className={`flex cursor-pointer items-start gap-3 rounded-card border-2 bg-superficie p-4 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-foco ${
                marcada ? 'border-link bg-lilas-claro' : 'border-borda hover:border-lilas'
              }`}
            >
              <input
                type="radio"
                name="ponto-de-partida"
                value={opcao.valor}
                checked={marcada}
                onChange={() => {
                  setEscolha(opcao.valor)
                  setMostrarErro(false)
                }}
                className="mt-1 size-5 shrink-0 accent-[var(--link)]"
              />
              <span>
                <span className="block font-titulo font-semibold">{opcao.rotulo}</span>
                <span className="text-texto-2">{opcao.descricao}</span>
              </span>
            </label>
          )
        })}
      </fieldset>
      <div role="alert">{mostrarErro && <Aviso tipo="alerta">{t.erro}</Aviso>}</div>
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Botao variante="terciario" para="/boas-vindas" icone={ArrowLeft}>
          {textos.boasVindas.voltar}
        </Botao>
        <Botao variante="primario" onClick={continuar}>
          {t.botao}
        </Botao>
      </div>
    </div>
  )
}
