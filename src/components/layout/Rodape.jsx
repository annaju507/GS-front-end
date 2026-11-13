import { Link } from 'react-router'
import { ExternalLink } from 'lucide-react'
import textos from '../../data/textos.json'
import OndasCalcadao from '../OndasCalcadao.jsx'
import ControleTamanhoLetra from '../ControleTamanhoLetra.jsx'
import OpcaoReduzirAnimacoes from '../OpcaoReduzirAnimacoes.jsx'

const t = textos.publico.rodape
const nav = textos.publico.nav

const LINKS_INTERNOS = [
  { para: '/como-funciona', rotulo: nav.comoFunciona },
  { para: '/sobre', rotulo: nav.sobre },
  { para: '/previa/trilhas', rotulo: nav.trilhas },
  { para: '/previa/agora', rotulo: nav.agora },
  { para: '/previa/direitos', rotulo: nav.direitos },
]

const TITULO_COLUNA = 'font-titulo text-tag font-bold uppercase tracking-[0.05em] text-texto-2'

export default function Rodape() {
  return (
    <footer className="mt-auto bg-superficie">
      <OndasCalcadao />
      <div className="mx-auto grid max-w-conteudo gap-8 px-4 py-10 md:grid-cols-2 md:px-6 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-3">
          <p className="font-titulo text-h3 font-extrabold text-link">{textos.site.nome}</p>
          <p className="font-semibold">{textos.site.slogan}</p>
          <p className="text-legenda text-texto-2">{t.projeto}</p>
        </div>

        <nav aria-labelledby="rodape-conheca">
          <h2 id="rodape-conheca" className={TITULO_COLUNA}>{t.conheca}</h2>
          <ul className="mt-2 flex flex-col">
            {LINKS_INTERNOS.map((link) => (
              <li key={link.para}>
                <Link to={link.para} className="inline-flex min-h-11 items-center">{link.rotulo}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="rodape-fontes">
          <h2 id="rodape-fontes" className={TITULO_COLUNA}>{t.fontes}</h2>
          <ul className="mt-2 flex flex-col">
            {t.linksFontes.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 py-1">
                  {link.rotulo}
                  <ExternalLink size={16} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                  <span className="sr-only">{textos.acessibilidade.abreNovaAba}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <section aria-labelledby="rodape-ajustes" className="flex flex-col gap-3">
          <h2 id="rodape-ajustes" className={TITULO_COLUNA}>{t.ajustes}</h2>
          <ControleTamanhoLetra />
          <OpcaoReduzirAnimacoes />
        </section>
      </div>
    </footer>
  )
}
