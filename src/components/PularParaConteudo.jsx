import textos from '../data/textos.json'

// Primeiro item focável da página: leva direto ao <main id="conteudo">.
export default function PularParaConteudo() {
  return (
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-botao focus:bg-superficie focus:px-6 focus:py-3 focus:font-titulo focus:font-semibold focus:text-link focus:shadow-modal"
    >
      {textos.acessibilidade.pularConteudo}
    </a>
  )
}
