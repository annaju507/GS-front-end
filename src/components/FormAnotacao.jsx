import { useRef, useState } from 'react'
import textos from '../data/textos.json'
import { LIMITE_ANOTACAO, validarAnotacao } from '../domain/caderno.js'
import Botao from './Botao.jsx'
import CampoTexto from './CampoTexto.jsx'

const t = textos.caderno

// Formulário de anotação (criar e editar): validação, contador de caracteres
// e foco no campo quando há erro (useRef + focus).
export default function FormAnotacao({ valorInicial = '', rotuloSalvar = t.campo.salvar, onSalvar, onCancelar, autoFocus = false }) {
  const [texto, setTexto] = useState(valorInicial)
  const [erro, setErro] = useState('')
  const [salvando, setSalvando] = useState(false)
  const campoRef = useRef(null)

  // Interação do caderno: o if/else decide se pode salvar e qual erro mostrar.
  async function enviar(evento) {
    evento.preventDefault()
    const problema = validarAnotacao(texto)
    if (problema === 'vazia') {
      setErro(t.erros.vazia)
      campoRef.current.focus()
    } else if (problema === 'longa') {
      setErro(t.erros.longa)
      campoRef.current.focus()
    } else {
      setErro('')
      setSalvando(true)
      await onSalvar(texto)
      setSalvando(false)
    }
  }

  return (
    <form noValidate onSubmit={enviar} className="flex flex-col gap-3">
      <CampoTexto
        ref={campoRef}
        rotulo={t.campo.rotulo}
        dica={t.campo.dica}
        multilinha
        maximo={LIMITE_ANOTACAO}
        valor={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        erro={erro}
        autoFocus={autoFocus}
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <Botao variante="primario" type="submit" disabled={salvando}>
          {salvando ? t.campo.salvando : rotuloSalvar}
        </Botao>
        {onCancelar && (
          <Botao variante="secundario" onClick={onCancelar}>
            {t.campo.cancelar}
          </Botao>
        )}
      </div>
    </form>
  )
}
