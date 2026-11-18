// Card de estatística quadrado, de cantos arredondados (seção 10). Os três
// cards da conquista têm a mesma estrutura: ícone num círculo colorido, o
// valor em destaque e o rótulo embaixo. Só a cor do círculo muda.
// O rótulo vem primeiro no código (o leitor de tela lê "Acertos: 2 de 3"),
// mas aparece embaixo na tela.
const TONS = {
  lilas: 'bg-lilas-claro text-link',
  mico: 'bg-mico-fundo text-mico',
  indigo: 'bg-azul-ceu text-indigo',
}

// atraso (ms): o card sobe ao entrar na tela, um depois do outro.
export default function CardEstatistica({ rotulo, valor, Icone, cor = 'lilas', como: Tag = 'li', atraso = 0 }) {
  return (
    <Tag
      className="subir-entrar flex aspect-square flex-col items-center justify-center gap-2 rounded-card-pequeno border-2 border-borda bg-superficie p-2 text-center"
      style={{ animationDelay: `${atraso}ms` }}
    >
      {Icone && (
        <span className={`flex size-11 items-center justify-center rounded-full sm:size-14 ${TONS[cor] ?? TONS.lilas}`}>
          <Icone size={24} strokeWidth={2} aria-hidden="true" />
        </span>
      )}
      <p className="order-last font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2">{rotulo}</p>
      <p className="font-titulo text-[1.0625rem] font-extrabold leading-tight sm:text-h2">{valor}</p>
    </Tag>
  )
}
