import { CircleHelp, FileText, GraduationCap, Users } from 'lucide-react'
import textos from '../data/textos.json'
import { MASCOTES } from '../domain/mascotes.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import CardMascoteVirar from '../components/CardMascoteVirar.jsx'
import ImagemComMascote from '../components/ImagemComMascote.jsx'
import Mascote from '../components/Mascote.jsx'
import MascoteEspiando from '../components/MascoteEspiando.jsx'

const t = textos.comoFunciona

// Cada seção mostra o mascote da função: mico explorando (trilha), capivara
// pensando na pergunta (quiz) e onça apontando com a lupa (fontes).
const SECOES = [
  { chave: 'trilhas', Icone: GraduationCap, mascote: { nome: 'mico', expressao: 'alerta' } },
  { chave: 'quiz', Icone: CircleHelp, mascote: { nome: 'capivara', expressao: 'pensativo' } },
  { chave: 'fontes', Icone: FileText, mascote: { nome: 'onca', expressao: 'alerta' } },
]

export default function ComoFunciona() {
  useTitulo(t.titulo)

  return (
    <div className="mx-auto flex max-w-conteudo flex-col gap-12 px-4 py-12 md:px-6 lg:px-8">
      <header className="flex max-w-leitura flex-col gap-3">
        <h1>{t.titulo}</h1>
        <p className="text-corpo">{t.intro}</p>
      </header>

      {/* Arcos da Lapa: um arco depois do outro, como os passos do site. O
          Caramelo (o companheiro que ajuda a navegar) apresenta o caminho. */}
      <ImagemComMascote
        imagem="arcos-lapa"
        mascote="caramelo"
        expressao="explicando"
        espelhar
        largura={128}
        posicaoMascote="-bottom-6 right-2 md:right-8"
        classeImagem="h-48 object-[center_40%] sm:h-64 md:h-80"
      />

      {SECOES.map(({ chave, Icone, mascote }, indice) => (
        <section
          key={chave}
          aria-labelledby={`secao-${chave}`}
          className={`flex flex-col items-center gap-6 md:flex-row ${indice % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
        >
          <Mascote nome={mascote.nome} expressao={mascote.expressao} tamanho="corpo" largura={200} />
          <div className="flex max-w-leitura flex-col gap-3">
            <h2 id={`secao-${chave}`} className="flex items-center gap-3">
              <Icone size={32} strokeWidth={2} aria-hidden="true" className="shrink-0 text-link" />
              {t.secoes[chave].titulo}
            </h2>
            <p>{t.secoes[chave].texto}</p>
          </div>
        </section>
      ))}

      <section aria-labelledby="secao-mascotes" className="flex flex-col gap-4">
        <h2 id="secao-mascotes" className="flex items-center gap-3">
          <Users size={32} strokeWidth={2} aria-hidden="true" className="shrink-0 text-link" />
          {t.secoes.mascotes.titulo}
        </h2>
        <p className="max-w-leitura">{t.secoes.mascotes.texto}</p>
        <p className="text-legenda text-texto-2">{t.dicaVirar}</p>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-5">
          {MASCOTES.map((mascote) => (
            <CardMascoteVirar key={mascote} mascote={mascote} />
          ))}
        </ul>
      </section>

      {/* A arara (mensageira) traz o convite final. */}
      <section aria-labelledby="secao-convite" className="relative flex flex-col items-start gap-4 rounded-card bg-hero p-6 md:p-8">
        <MascoteEspiando nome="arara" expressao="feliz" posicao="-top-14 right-4 md:right-10" largura={104} />
        <h2 id="secao-convite">{t.convite}</h2>
        <Botao variante="primario" para="/cadastro">
          {t.comecar}
        </Botao>
      </section>
    </div>
  )
}
