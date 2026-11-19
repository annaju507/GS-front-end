// Quadro de um ajuste de leitura no Perfil: ícone, nome, uma explicação curta
// e o controle à direita (interruptor ou A-/A+). Usa as cores do tema, então
// fica legível no claro e no escuro.
export default function QuadroAjuste({ Icone, titulo, texto, idTitulo, children, rodape }) {
  return (
    <div className="flex flex-col gap-2 rounded-modal border border-borda bg-superficie p-4">
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-card-pequeno bg-lilas-claro text-link">
          <Icone size={22} strokeWidth={2} aria-hidden="true" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span id={idTitulo} className="font-titulo font-bold">{titulo}</span>
          <span className="text-legenda text-texto-2">{texto}</span>
        </span>
        <span className="shrink-0">{children}</span>
      </div>
      {rodape}
    </div>
  )
}
