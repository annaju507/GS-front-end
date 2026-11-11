import { useEffect, useId, useRef } from 'react'
import textos from '../data/textos.json'
import Botao from './Botao.jsx'

// Modal de confirmação (seção 6.8), sem mascote. Usa o <dialog> nativo:
// prende o foco dentro dele, fecha com Esc e deixa o resto da página inerte.
// Quem usa decide o que fazer: if (confirmou) { excluir(id) } else { fecharModal() }
export default function ModalConfirmacao({
  aberto,
  titulo,
  descricao,
  rotuloConfirmar = textos.botoes.excluir,
  rotuloCancelar = textos.botoes.cancelar,
  onConfirmar,
  onCancelar,
}) {
  const dialogoRef = useRef(null)
  const idTitulo = useId()
  const idDescricao = useId()

  // Manipulação do DOM: abre e fecha o <dialog> pelo ref.
  useEffect(() => {
    const dialogo = dialogoRef.current
    if (aberto && !dialogo.open) {
      dialogo.showModal()
    } else if (!aberto && dialogo.open) {
      dialogo.close()
    }
  }, [aberto])

  return (
    <dialog
      ref={dialogoRef}
      aria-labelledby={idTitulo}
      aria-describedby={idDescricao}
      onCancel={(evento) => {
        evento.preventDefault()
        onCancelar()
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-modal border border-borda bg-superficie p-6 text-texto shadow-modal backdrop:bg-[rgb(20_17_28/0.5)]"
    >
      <h2 id={idTitulo} className="text-h3">
        {titulo}
      </h2>
      <p id={idDescricao} className="mt-2 text-texto-2">
        {descricao}
      </p>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Botao variante="secundario" onClick={onCancelar} autoFocus>
          {rotuloCancelar}
        </Botao>
        <Botao variante="primario" onClick={onConfirmar}>
          {rotuloConfirmar}
        </Botao>
      </div>
    </dialog>
  )
}
