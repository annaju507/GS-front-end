import textos from '../data/textos.json'

export default function Inicio() {
  return (
    <main id="conteudo">
      <h1>{textos.site.nome}</h1>
      <p>{textos.site.slogan}</p>
    </main>
  )
}
