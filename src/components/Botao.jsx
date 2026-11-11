import { Link } from 'react-router'

// Botões de ação (seção 6.3): degrau 3D, CAIXA ALTA e cantos de 14px.
// No máximo um "primario" por tela. Com "para", vira link do React Router.
const BASE =
  'inline-flex min-h-12 items-center justify-center gap-2 px-6 font-titulo text-legenda leading-none no-underline disabled:cursor-not-allowed'

const CAIXA_ALTA = 'font-bold uppercase tracking-[0.05em] rounded-botao'

const VARIANTES = {
  primario: `${CAIXA_ALTA} degrau bg-botao text-botao-texto shadow-[0_0.25rem_0_var(--botao-degrau)] hover:bg-botao-hover disabled:bg-desativado disabled:text-texto-desativado disabled:shadow-none`,
  secundario: `${CAIXA_ALTA} degrau border-2 border-secundario-borda bg-secundario text-secundario-texto shadow-[0_0.25rem_0_var(--secundario-degrau)] hover:bg-lilas-claro disabled:border-borda disabled:text-texto-desativado disabled:shadow-none`,
  marca: `${CAIXA_ALTA} degrau bg-marca-botao text-marca-botao-texto shadow-[0_0.25rem_0_var(--marca-botao-degrau)] hover:bg-marca-botao-hover`,
  acerto: `${CAIXA_ALTA} degrau bg-sucesso-botao text-sucesso-botao-texto shadow-[0_0.25rem_0_var(--sucesso-degrau)]`,
  erro: `${CAIXA_ALTA} degrau bg-erro-botao text-erro-botao-texto shadow-[0_0.25rem_0_var(--erro-degrau)]`,
  terciario:
    'rounded-botao font-semibold text-rotulo text-link underline underline-offset-4 transition-colors duration-150 hover:bg-lilas-claro disabled:text-texto-desativado',
  pilula:
    'font-bold uppercase tracking-[0.05em] rounded-full border-2 border-secundario-borda text-secundario-texto transition-colors duration-150 hover:bg-lilas-claro',
}

export default function Botao({
  variante = 'secundario',
  icone: Icone,
  para,
  type = 'button',
  className = '',
  children,
  ...resto
}) {
  const classes = `${BASE} ${VARIANTES[variante] ?? VARIANTES.secundario} ${className}`
  const conteudo = (
    <>
      {Icone && <Icone size={20} strokeWidth={2} aria-hidden="true" className="shrink-0" />}
      {children}
    </>
  )

  if (para) {
    return (
      <Link to={para} className={classes} {...resto}>
        {conteudo}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} {...resto}>
      {conteudo}
    </button>
  )
}
