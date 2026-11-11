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

// Marca do GitHub (ícone oficial, desenho simplificado do "Invertocat").
function IconeGithub() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="size-5 shrink-0" fill="currentColor">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  )
}

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
          <a href={t.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 self-start">
            <IconeGithub />
            {t.github}
            <span className="sr-only">{textos.acessibilidade.abreNovaAba}</span>
          </a>
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
