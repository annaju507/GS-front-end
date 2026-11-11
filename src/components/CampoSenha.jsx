import { useId, useState } from 'react'
import textos from '../data/textos.json'
import CampoTexto from './CampoTexto.jsx'

// Campo de senha com a opção "Mostrar senha" (caixa de seleção, com rótulo).
export default function CampoSenha(props) {
  const [mostrar, setMostrar] = useState(false)
  const idCaixa = useId()

  return (
    <div className="flex flex-col gap-1">
      <CampoTexto {...props} type={mostrar ? 'text' : 'password'} />
      <label htmlFor={idCaixa} className="inline-flex min-h-11 cursor-pointer items-center gap-2 self-start text-legenda font-semibold">
        <input
          id={idCaixa}
          type="checkbox"
          checked={mostrar}
          onChange={(evento) => setMostrar(evento.target.checked)}
          className="size-5 accent-[var(--link)]"
        />
        {textos.auth.mostrarSenha}
      </label>
    </div>
  )
}
