import { useId } from 'react'
import { CircleAlert } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'

// Campo de formulário (seção 6.10). Rótulo sempre visível acima, erro ligado
// ao campo (aria-describedby + aria-invalid) e contador de caracteres.
// "ref" chega até o input/textarea para levar o foco ao campo com erro.
export default function CampoTexto({ rotulo, dica, erro, multilinha = false, maximo, valor, onChange, ref, ...resto }) {
  const id = useId()
  const idDica = `${id}-dica`
  const idErro = `${id}-erro`
  const idContador = `${id}-contador`
  const Elemento = multilinha ? 'textarea' : 'input'

  const descricoes = [dica && idDica, erro && idErro, maximo && idContador].filter(Boolean).join(' ')
  const borda = erro ? 'border-erro' : 'border-borda-campo focus:border-link'
  const altura = multilinha ? 'min-h-32 py-3 resize-y' : 'h-12'
  const tamanhoAtual = String(valor ?? '').length

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-titulo text-rotulo font-semibold text-texto">
        {rotulo}
      </label>
      {dica && (
        <p id={idDica} className="text-legenda text-texto-2">
          {dica}
        </p>
      )}
      <Elemento
        id={id}
        ref={ref}
        value={valor}
        onChange={onChange}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descricoes || undefined}
        className={`w-full rounded-campo border-[1.5px] bg-superficie px-4 text-corpo text-texto ${altura} ${borda}`}
        {...resto}
      />
      <div className="flex items-start justify-between gap-3">
        <p id={idErro} className="flex items-center gap-1.5 text-legenda font-semibold text-erro">
          {erro && (
            <>
              <CircleAlert size={18} strokeWidth={2} aria-hidden="true" className="shrink-0" />
              {erro}
            </>
          )}
        </p>
        {maximo && (
          <p id={idContador} className="shrink-0 text-legenda text-texto-2">
            <span aria-hidden="true">{preencher(textos.campo.contador, { atual: tamanhoAtual, max: maximo })}</span>
            <span className="sr-only">{preencher(textos.campo.contadorLeitor, { atual: tamanhoAtual, max: maximo })}</span>
          </p>
        )}
      </div>
    </div>
  )
}
