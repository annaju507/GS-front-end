import { Link } from 'react-router'
import textos from '../data/textos.json'

// Logotipo provisório: o nome em Poppins ExtraBold, até a arte final chegar.
export default function Logo({ para = '/' }) {
  return (
    <Link
      to={para}
      aria-label={textos.publico.nav.inicio}
      className="inline-flex min-h-11 items-center font-titulo text-h3 font-extrabold tracking-[-0.01em] text-link no-underline"
    >
      {textos.site.nome}
    </Link>
  )
}
