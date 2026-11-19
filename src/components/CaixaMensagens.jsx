import { Link } from 'react-router'
import { BookOpen, Newspaper } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import Foguinho from './Foguinho.jsx'
import IconePremio from './IconePremio.jsx'
import Mascote from './Mascote.jsx'

const t = textos.painel.mensagens

// Título e texto de cada tipo de mensagem.
function conteudoDa(mensagem) {
  if (mensagem.tipo === 'proposta') {
    return { titulo: t.proposta.titulo, texto: preencher(t.proposta.texto, { area: textos.areas[mensagem.area] ?? textos.areas.outros }) }
  } else if (mensagem.tipo === 'medalha') {
    return { titulo: preencher(t.medalha.titulo, { nome: textos.medalhas.nomes[mensagem.medalha] }), texto: t.medalha.texto }
  } else if (mensagem.tipo === 'sequencia') {
    const titulo = mensagem.dias === 1 ? t.sequencia.tituloUm : preencher(t.sequencia.titulo, { n: mensagem.dias })
    return { titulo, texto: preencher(t.sequencia.texto, { proximo: mensagem.dias + 1 }) }
  } else if (mensagem.tipo === 'comecar') {
    return t.comecar
  } else {
    return t.glossario
  }
}

function IconeDa({ mensagem }) {
  if (mensagem.tipo === 'proposta') {
    return (
      <span className="grid size-11 shrink-0 place-items-center rounded-card-pequeno bg-info-fundo text-info">
        <Newspaper size={24} strokeWidth={2} aria-hidden="true" />
      </span>
    )
  } else if (mensagem.tipo === 'medalha') {
    return (
      <span className="grid size-11 shrink-0 place-items-center rounded-card-pequeno bg-[#FFF6D6]">
        <IconePremio medalha={mensagem.medalha} tamanho={30} />
      </span>
    )
  } else if (mensagem.tipo === 'sequencia' || mensagem.tipo === 'comecar') {
    return (
      <span className="grid size-11 shrink-0 place-items-center rounded-card-pequeno bg-[#FFE9DC]">
        <Foguinho tamanho={22} />
      </span>
    )
  } else {
    return (
      <span className="grid size-11 shrink-0 place-items-center rounded-card-pequeno bg-lilas-claro text-lilas-sombra">
        <BookOpen size={24} strokeWidth={2} aria-hidden="true" />
      </span>
    )
  }
}

// Caixa de mensagens do Início: a arara (mensageira) avisa o que há de novo.
// Cada mensagem é um link; ao tocar, ela fica lida e o contador diminui.
// As novas têm uma bolinha laranja pulsando (e "Nova" para o leitor de tela).
export default function CaixaMensagens({ mensagens, lidas, onLer, className = '' }) {
  const jaLidas = new Set(lidas)
  const novas = mensagens.filter((mensagem) => !jaLidas.has(mensagem.id)).length

  return (
    <section aria-labelledby="painel-mensagens" className={`flex flex-col gap-3 rounded-card border border-borda bg-superficie p-4 shadow-card dark:shadow-none md:p-5 ${className}`}>
      <h2 id="painel-mensagens" className="flex items-center gap-2 text-h3">
        <span className="arara-bate">
          <Mascote nome="arara" expressao="feliz" largura={44} animado={false} />
        </span>
        {t.titulo}
        {novas > 0 && (
          <span className="ml-auto shrink-0 whitespace-nowrap rounded-full bg-mico px-2.5 py-0.5 font-titulo text-tag font-bold text-[#1A1A1A]">
            {novas === 1 ? t.novasUm : preencher(t.novasVarias, { n: novas })}
          </span>
        )}
      </h2>
      <ul className="flex flex-col gap-2">
        {mensagens.map((mensagem, indice) => {
          const nova = !jaLidas.has(mensagem.id)
          const { titulo, texto } = conteudoDa(mensagem)
          let estilo = 'border-borda'
          if (!nova) {
            estilo = 'border-borda opacity-70'
          }
          return (
            <li key={mensagem.id} className="mensagem-entra" style={{ animationDelay: `${indice * 140 + 300}ms` }}>
              <Link
                to={mensagem.para}
                onClick={() => onLer(mensagem.id)}
                className={`relative flex min-h-16 items-center gap-3 rounded-card-pequeno border-2 bg-superficie p-3 pr-8 text-texto no-underline transition-[border-color,transform] duration-150 hover:translate-x-1 hover:border-lilas motion-reduce:transition-none ${estilo}`}
              >
                <IconeDa mensagem={mensagem} />
                <span className="flex flex-col">
                  <span className="font-titulo text-legenda font-bold">{titulo}</span>
                  <span className="text-legenda text-texto-2">{texto}</span>
                </span>
                {nova && (
                  <>
                    <span aria-hidden="true" className="mensagem-pulso absolute right-3 top-3 size-2.5 rounded-full bg-mico" />
                    <span className="sr-only">{t.nova}</span>
                  </>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
