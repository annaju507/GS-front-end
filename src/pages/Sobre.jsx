import { ArrowRight, Check, FileText, Info, Search, BookOpen } from 'lucide-react'
import textos from '../data/textos.json'
import { useTitulo } from '../hooks/useTitulo.js'
import ImagemViva from '../components/ImagemViva.jsx'
import MascoteEspiando from '../components/MascoteEspiando.jsx'
import MascoteInterativo from '../components/MascoteInterativo.jsx'
import Revelar from '../components/Revelar.jsx'
import SecaoEquipe from '../components/SecaoEquipe.jsx'
import SecaoNeutralidade from '../components/SecaoNeutralidade.jsx'

const t = textos.sobre

// Ícone de cada problema, na ordem do textos.json.
const ICONES_PROBLEMA = [BookOpen, FileText, Search]

// Cor e degrau de cada bloco do nome (Demo + kratos = Demokratos).
const BLOCOS_NOME = ['bg-lilas shadow-[0_0.5rem_0_var(--color-lilas-sombra)]', 'bg-azul-ceu shadow-[0_0.5rem_0_var(--color-bloco-ceu-degrau)]']

// Sobre, em faixas largas: de onde vem o nome, o projeto (problema, resposta e
// para quem), a neutralidade em destaque ("a conclusão é sua") com as regras,
// quem somos e os desenvolvedores, as fontes dos dados e os seus dados.
export default function Sobre() {
  useTitulo(t.titulo)

  return (
    <>
      {/* Topo: título à esquerda e a conta do nome em blocos que flutuam. */}
      <section aria-labelledby="sobre-titulo" className="overflow-hidden">
        <div className="mx-auto grid max-w-conteudo items-center gap-12 px-4 pb-16 pt-12 md:px-6 lg:grid-cols-2 lg:px-8 lg:pt-20">
          <Revelar className="flex flex-col gap-5">
            <h1 id="sobre-titulo">{t.titulo}</h1>
            <p className="max-w-xl text-[1.2rem]">{t.lead}</p>
            <ImagemViva nome="museu-do-amanha" prioridade className="mt-2 h-52" classeImagem="object-[center_60%]" />
          </Revelar>

          <Revelar atraso={150} className="relative flex flex-col gap-4">
            <span className="absolute -top-24 right-0">
              <MascoteInterativo nome="caramelo" expressao="feliz" expressaoReacao="comemorando" largura={120} />
            </span>
            <h2 className="font-titulo text-tag font-bold uppercase tracking-[0.1em] text-texto-2">{t.nome.titulo}</h2>
            <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-3 sm:gap-4">
              {t.nome.partes.map((parte, indice) => (
                <div
                  key={parte.palavra}
                  className={`flutua-bloco flex flex-col gap-1 rounded-card p-5 text-[#1A1A1A] transition-transform duration-200 hover:-translate-y-1 ${BLOCOS_NOME[indice]}`}
                  style={{ animationDelay: `${indice * -1.6}s`, gridColumn: indice === 0 ? 1 : 3, gridRow: 1 }}
                >
                  <span className="font-titulo text-[2.2rem] font-extrabold leading-none sm:text-[2.6rem]">{parte.palavra}</span>
                  <span className="text-legenda font-semibold opacity-85">{parte.origem}</span>
                  <span className="font-titulo text-h3 font-bold">{parte.sentido}</span>
                </div>
              ))}
              <span aria-hidden="true" className="self-center font-titulo text-[2rem] font-extrabold text-texto-2" style={{ gridColumn: 2, gridRow: 1 }}>
                +
              </span>
              <div
                className="flutua-bloco col-span-3 flex flex-wrap items-center justify-between gap-3 rounded-card bg-[#1A1A1A] p-5 shadow-[0_0.5rem_0_#000] dark:border-2 dark:border-azul-ceu"
                style={{ animationDelay: '-3.2s' }}
              >
                <span className="font-titulo text-[1.8rem] font-extrabold leading-none text-white sm:text-[2.2rem]">{t.nome.resultado.palavra}</span>
                <span className="font-titulo text-h3 font-bold text-azul-ceu">{t.nome.resultado.sentido}</span>
              </div>
            </div>
            <p className="mt-2 text-texto-2">{t.nome.texto}</p>
          </Revelar>
        </div>
      </section>

      {/* O projeto: o problema de um lado e a nossa resposta do outro. */}
      <section aria-labelledby="sobre-projeto" className="bg-lilas-claro">
        <div className="relative mx-auto flex max-w-conteudo flex-col gap-10 px-4 py-20 md:px-6 lg:px-8">
          <MascoteEspiando nome="capivara" expressao="explicando" posicao="right-4 top-6 hidden md:block" largura={120} />
          <Revelar className="flex max-w-3xl flex-col gap-4">
            <h2 id="sobre-projeto">{t.projeto.titulo}</h2>
            <p className="text-[1.15rem]">{t.projeto.texto}</p>
          </Revelar>

          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
            <div className="flex flex-col gap-3">
              <h3>{t.projeto.problemaTitulo}</h3>
              <ul className="flex flex-col gap-3">
                {t.projeto.problemas.map((problema, indice) => {
                  const Icone = ICONES_PROBLEMA[indice] ?? Info
                  return (
                    <Revelar
                      key={problema.titulo}
                      como="li"
                      atraso={indice * 140}
                      className="flex items-start gap-4 rounded-card border border-borda bg-superficie p-4 transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-card-pequeno bg-lilas-claro text-link">
                        <Icone size={22} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-titulo font-semibold">{problema.titulo}</span>
                        <span className="text-legenda text-texto-2">{problema.texto}</span>
                      </span>
                    </Revelar>
                  )
                })}
              </ul>
            </div>

            <span aria-hidden="true" className="seta-vai hidden items-center justify-center text-link lg:flex">
              <ArrowRight size={40} strokeWidth={2.5} />
            </span>

            <div className="flex flex-col gap-3">
              <h3>{t.projeto.respostaTitulo}</h3>
              <ul className="flex flex-col gap-3">
                {t.projeto.respostas.map((resposta, indice) => (
                  <Revelar
                    key={resposta}
                    como="li"
                    atraso={300 + indice * 120}
                    className="flex items-center gap-3 rounded-card bg-[#1A1A1A] p-4 font-semibold text-azul-ceu shadow-[0_0.25rem_0_#000] transition-transform duration-200 hover:translate-x-1 dark:border-2 dark:border-azul-ceu"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-azul-ceu text-[#1A1A1A]">
                      <Check size={18} strokeWidth={3} aria-hidden="true" />
                    </span>
                    {resposta}
                  </Revelar>
                ))}
              </ul>
            </div>
          </div>

          <Revelar className="flex flex-col items-start gap-4 rounded-card bg-superficie p-5 sm:flex-row sm:items-center">
            <span className="shrink-0 rounded-card-pequeno bg-bloco-pessego px-4 py-2 font-titulo font-bold text-[#1A1A1A] shadow-[0_0.3rem_0_var(--color-bloco-pessego-degrau)]">
              {t.projeto.publicoTitulo}
            </span>
            <p className="text-[1.05rem]">{t.projeto.publico}</p>
          </Revelar>
        </div>
      </section>

      {/* Neutralidade em destaque, com as regras logo embaixo. */}
      <SecaoNeutralidade>
        <div className="flex flex-col gap-5">
          <h3 className="text-white">{t.neutralidade.titulo}</h3>
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {t.neutralidade.itens.map((item, indice) => (
              <Revelar
                key={item}
                como="li"
                atraso={indice * 90}
                className="flex items-start gap-3 rounded-card bg-white p-4 font-semibold text-[#1A1A1A] transition-transform duration-200 hover:-translate-y-1"
              >
                <Check size={22} strokeWidth={2.5} aria-hidden="true" className="mt-0.5 shrink-0 text-indigo" />
                {item}
              </Revelar>
            ))}
          </ul>
        </div>
      </SecaoNeutralidade>

      <SecaoEquipe />

      {/* De onde vêm os dados: uma ficha, com a onça (fontes) espiando. */}
      <section aria-labelledby="sobre-dados" className="relative mx-auto flex max-w-conteudo flex-col gap-6 px-4 py-20 md:px-6 lg:px-8">
        <MascoteEspiando nome="onca" expressao="explicando" posicao="right-4 top-8 hidden md:block" largura={112} />
        <Revelar>
          <h2 id="sobre-dados">{t.dados.titulo}</h2>
        </Revelar>
        <Revelar atraso={100} como="ul" className="overflow-hidden rounded-card border border-borda bg-superficie">
          {t.dados.itens.map((item) => (
            <li
              key={item.nome}
              className="grid gap-1 border-b border-borda px-5 py-4 transition-colors duration-150 last:border-b-0 hover:bg-lilas-claro md:grid-cols-[16rem_1fr] md:gap-6"
            >
              <span className="font-titulo font-semibold">{item.nome}</span>
              <span className="text-texto-2">{item.texto}</span>
            </li>
          ))}
        </Revelar>

        {/* A arara (mensageira) dá o aviso de privacidade. */}
        <Revelar className="relative mt-6 flex flex-col gap-4">
          <MascoteEspiando nome="arara" expressao="explicando" posicao="-top-6 right-4 hidden lg:block" largura={112} />
          <h2 id="sobre-privacidade">{t.privacidade.titulo}</h2>
          <div className="flex max-w-3xl items-start gap-3 rounded-card bg-info-fundo p-5">
            <Info size={24} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0 text-info" />
            <p>{t.privacidade.texto}</p>
          </div>
        </Revelar>
      </section>
    </>
  )
}
