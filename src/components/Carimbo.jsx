// Carimbo circular decorativo, como o de um cartão-postal ou bilhete.
// Não traz informação: o leitor de tela pula.
// "exibicao" controla quando aparece (ex.: 'hidden md:flex' some no celular).
export default function Carimbo({ linhas, posicao = 'relative', exibicao = 'flex', className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`carimbo ${posicao} ${exibicao} size-24 items-center justify-center bg-superficie/80 font-titulo text-[0.625rem] font-extrabold uppercase leading-tight tracking-[0.06em] text-link ${className}`}
    >
      <span>
        {linhas.map((linha) => (
          <span key={linha} className="block">
            {linha}
          </span>
        ))}
      </span>
    </span>
  )
}
