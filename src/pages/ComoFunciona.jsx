import { CircleHelp, FileText, GraduationCap, Users } from 'lucide-react'
import textos from '../data/textos.json'
import { MASCOTES } from '../domain/mascotes.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import Card from '../components/Card.jsx'
import Mascote from '../components/Mascote.jsx'

const t = textos.comoFunciona

const SECOES = [
  { chave: 'trilhas', Icone: GraduationCap, mascote: { nome: 'capivara', expressao: 'explicando' } },
  { chave: 'quiz', Icone: CircleHelp, mascote: { nome: 'mico', expressao: 'comemorando' } },
  { chave: 'fontes', Icone: FileText, mascote: { nome: 'onca', expressao: 'explicando' } },
]

export default function ComoFunciona() {
  useTitulo(t.titulo)

  return (
    <div className="mx-auto flex max-w-conteudo flex-col gap-12 px-4 py-12 md:px-6 lg:px-8">
      <header className="flex max-w-leitura flex-col gap-3">
        <h1>{t.titulo}</h1>
        <p className="text-corpo">{t.intro}</p>
      </header>

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
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MASCOTES.map((mascote) => (
            <Card key={mascote} como="li" className="flex items-center gap-4">
              <Mascote nome={mascote} expressao="feliz" largura={72} />
              <p>
                <span className="block font-titulo font-semibold">{textos.mascotes[mascote]}</span>
                <span className="text-texto-2">{t.papeis[mascote]}</span>
              </p>
            </Card>
          ))}
        </ul>
      </section>

      <section aria-labelledby="secao-convite" className="flex flex-col items-start gap-4 rounded-card bg-hero p-6 md:p-8">
        <h2 id="secao-convite">{t.convite}</h2>
        <Botao variante="primario" para="/cadastro">
          {t.comecar}
        </Botao>
      </section>
    </div>
  )
}
