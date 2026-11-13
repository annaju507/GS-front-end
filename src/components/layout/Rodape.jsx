import { Link } from 'react-router'
import { ExternalLink } from 'lucide-react'
import textos from '../../data/textos.json'
import ControleTamanhoLetra from '../ControleTamanhoLetra.jsx'
import OpcaoReduzirAnimacoes from '../OpcaoReduzirAnimacoes.jsx'

const t = textos.publico.rodape
const nav = textos.publico.nav

// Colunas de links internos, na ordem em que aparecem.
const COLUNAS_INTERNAS = [
  {
    id: 'rodape-plataforma',
    titulo: t.plataforma,
    links: [
      { para: '/como-funciona', rotulo: nav.comoFunciona },
      { para: '/sobre', rotulo: nav.sobre },
      { para: '/entrar', rotulo: nav.entrar },
    ],
  },
  {
    id: 'rodape-previas',
    titulo: t.previas,
    links: [
      { para: '/previa/trilhas', rotulo: nav.trilhas },
      { para: '/previa/agora', rotulo: nav.agora },
      { para: '/previa/direitos', rotulo: nav.direitos },
    ],
  },
]

const TITULO_COLUNA = 'font-titulo text-rotulo font-semibold text-texto'
const LINK = 'inline-flex min-h-11 items-center gap-1.5 text-legenda text-texto-2 no-underline transition-colors duration-150 hover:text-texto hover:underline'

// Rodapé em cartão índigo: marca e descrição à esquerda, colunas de links à
// direita e o nome "Demokratos" grande e pontilhado na base (decorativo).
// A classe tema-faixa troca os tokens de cor dentro do cartão, nos dois temas.
export default function Rodape() {
  return (
    <footer className="mt-auto px-4 pb-4 pt-8 md:px-6 md:pb-6 lg:px-8">
      <div className="tema-faixa mx-auto flex max-w-conteudo flex-col overflow-hidden rounded-modal bg-faixa">
        <div className="grid gap-10 px-6 pt-12 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16 lg:px-12 lg:pt-16">
          <div className="flex flex-col gap-5">
            <p className="font-titulo text-h3 font-extrabold text-texto">{textos.site.nome}</p>
            <p className="max-w-[26rem] text-legenda text-texto-2">{t.descricao}</p>

            <section aria-labelledby="rodape-ajustes" className="flex flex-col gap-2">
              <h2 id="rodape-ajustes" className={TITULO_COLUNA}>{t.ajustes}</h2>
              <ControleTamanhoLetra />
              <OpcaoReduzirAnimacoes />
            </section>

            <p className="text-tag text-texto-2">{t.direitosAutorais}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUNAS_INTERNAS.map((coluna) => (
              <nav key={coluna.id} aria-labelledby={coluna.id}>
                <h2 id={coluna.id} className={TITULO_COLUNA}>{coluna.titulo}</h2>
                <ul className="mt-3 flex flex-col">
                  {coluna.links.map((link) => (
                    <li key={link.para}>
                      <Link to={link.para} className={LINK}>{link.rotulo}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-labelledby="rodape-fontes" className="col-span-2 sm:col-span-1">
              <h2 id="rodape-fontes" className={TITULO_COLUNA}>{t.fontes}</h2>
              <ul className="mt-3 flex flex-col">
                {t.linksFontes.map((link) => (
                  <li key={link.url}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className={LINK}>
                      {link.rotulo}
                      <ExternalLink size={14} strokeWidth={2} aria-hidden="true" className="shrink-0" />
                      <span className="sr-only">{textos.acessibilidade.abreNovaAba}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="marca-pontilhada mt-10 translate-y-[18%] select-none whitespace-nowrap text-center font-titulo text-[clamp(3.25rem,14vw,11rem)] font-extrabold leading-none tracking-[-0.04em] lg:mt-14"
        >
          {textos.site.nome}
        </p>
      </div>
    </footer>
  )
}
