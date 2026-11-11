// Card de estatística com abinha colorida (seção 10): rótulo em caixa alta
// sobre fundo colorido e o valor com ícone embaixo.
const ABAS = {
  lilas: 'bg-lilas text-marca-botao-texto',
  mico: 'bg-mico text-marca-botao-texto',
  indigo: 'bg-indigo text-white',
}

export default function CardEstatistica({ rotulo, valor, Icone, cor = 'lilas', como: Tag = 'li' }) {
  return (
    <Tag className="overflow-hidden rounded-card-pequeno border-2 border-borda bg-superficie">
      <p className={`px-3 py-1 font-titulo text-tag font-bold uppercase tracking-[0.05em] ${ABAS[cor]}`}>{rotulo}</p>
      <p className="flex items-center gap-2 px-3 py-3 font-titulo text-h3 font-extrabold">
        {Icone && <Icone size={22} strokeWidth={2} aria-hidden="true" className="shrink-0 text-texto-2" />}
        {valor}
      </p>
    </Tag>
  )
}
