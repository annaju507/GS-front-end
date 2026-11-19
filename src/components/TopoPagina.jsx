import ImagemRio from './ImagemRio.jsx'
import MascoteEspiando from './MascoteEspiando.jsx'

// Topo das páginas internas, no estilo do Início: uma foto do Rio e, por cima
// da borda dela, um cartão com o título (marcado em azul-céu), a explicação e
// etiquetas curtas. O texto nunca fica direto sobre a foto (contraste).
// "mascote" (opcional) espia por cima do cartão; nunca em páginas de políticos.
export default function TopoPagina({ imagem, titulo, intro, chips = [], mascote }) {
  return (
    <div className="relative mb-24 sm:mb-16">
      <ImagemRio nome={imagem} prioridade className="h-40 w-full rounded-modal object-cover sm:h-52" />
      <div className="absolute inset-x-3 -bottom-20 flex flex-col gap-1.5 rounded-modal border border-borda bg-superficie px-4 py-4 shadow-modal sm:inset-x-5 sm:-bottom-12 sm:px-5">
        {mascote && <MascoteEspiando nome={mascote.nome} expressao={mascote.expressao} posicao="-top-[5.5rem] right-4 hidden sm:block" largura={100} />}
        <h1 className="text-h1">
          <span className="marca-apelido">{titulo}</span>
        </h1>
        <p className="max-w-leitura font-semibold text-texto-2">{intro}</p>
        {chips.length > 0 && (
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <li key={chip} className="rounded-full bg-lilas-claro px-3 py-1 font-titulo text-tag font-bold text-link">
                {chip}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
