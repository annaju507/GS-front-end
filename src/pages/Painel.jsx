import { ArrowRight } from 'lucide-react'
import textos from '../data/textos.json'
import { montarMensagens, semanaRecente } from '../domain/painel.js'
import { ordemDasLicoes, porcentagemConcluida, proximaLicao, unidadeDaLicao } from '../domain/trilha.js'
import { dataLocalIso } from '../domain/progresso.js'
import { escolherPropostaDoDia } from '../domain/propostas.js'
import { preencher } from '../domain/texto.js'
import { UNIDADES, buscarLicao, listarPropostas } from '../services/conteudoLocal.js'
import { useAuth } from '../hooks/useAuth.js'
import { useInicio } from '../hooks/useInicio.js'
import { useProgresso } from '../hooks/useProgresso.js'
import { useTitulo } from '../hooks/useTitulo.js'
import AnelProgresso from '../components/AnelProgresso.jsx'
import AvatarUsuario from '../components/AvatarUsuario.jsx'
import BalaoMascote from '../components/BalaoMascote.jsx'
import Botao from '../components/Botao.jsx'
import CaixaMensagens from '../components/CaixaMensagens.jsx'
import CardProposta from '../components/CardProposta.jsx'
import CelebracaoSequencia from '../components/CelebracaoSequencia.jsx'
import Foguinho from '../components/Foguinho.jsx'
import ImagemRio from '../components/ImagemRio.jsx'
import MascoteEspiando from '../components/MascoteEspiando.jsx'
import PrateleiraConquistas from '../components/PrateleiraConquistas.jsx'
import SemanaFoguinhos from '../components/SemanaFoguinhos.jsx'

const t = textos.painel
const ORDEM = ordemDasLicoes(UNIDADES)

// Proposta do dia: uma da seleção, que muda a cada dia (escolha automática
// pela data, não é destaque nem recomendação). A onça (investigadora) só
// convida a conferir a fonte: nunca comenta o conteúdo da proposta.
function PropostaDoDia({ proposta }) {
  return (
    <section aria-labelledby="painel-proposta" className="flex flex-col gap-3 rounded-card border border-borda bg-superficie p-4 shadow-card dark:shadow-none md:p-5 lg:col-span-2">
      <h2 id="painel-proposta" className="text-h3">{t.propostaDoDia.titulo}</h2>
      <p className="text-legenda text-texto-2">{t.propostaDoDia.texto}</p>
      <BalaoMascote mascote="onca" expressao="explicando">
        <p>{t.propostaDoDia.falaOnca}</p>
      </BalaoMascote>
      {proposta && <CardProposta proposta={proposta} />}
    </section>
  )
}

// Início de quem já entrou: topo com o Rio, o "Olá" e o chip do foguinho; o
// bloco lilás de continuar com o anel de progresso; a semana de foguinhos; a
// caixa de mensagens da arara; a prateleira de conquistas do mico e a
// proposta do dia. Ao entrar (uma vez por dia), o foguinho comemora a sequência.
export default function Painel() {
  useTitulo(t.tituloAba)
  const { usuario } = useAuth()
  const { progresso, sequencia, medalhas } = useProgresso()
  const hoje = dataLocalIso(new Date())
  const { mostrarEntrada, abrirEntrada, fecharEntrada, lidas, lerMensagem } = useInicio(usuario.email, hoje, sequencia)

  const idProxima = proximaLicao(ORDEM, progresso.licoes)
  const licao = idProxima ? buscarLicao(idProxima) : null
  const unidade = idProxima ? unidadeDaLicao(UNIDADES, idProxima) : null
  const comecou = Object.keys(progresso.licoes).length > 0
  const semana = semanaRecente(progresso.dias, hoje)
  const proposta = escolherPropostaDoDia(listarPropostas(), hoje)
  const mensagens = montarMensagens({ proposta, medalhas, sequencia, hoje })

  return (
    <div className="flex flex-col gap-6">
      {mostrarEntrada && <CelebracaoSequencia dias={sequencia} semana={semana} onFechar={fecharEntrada} />}

      {/* Topo: Vidigal e Dois Irmãos. O "Olá" fica num cartão branco por cima
          da borda da foto, nunca direto sobre ela; o caramelo (boas-vindas)
          espia por cima do cartão. */}
      <div className="relative mb-16 sm:mb-12">
        <ImagemRio nome="vidigal-dois-irmaos" prioridade className="h-44 w-full rounded-modal object-[center_55%] sm:h-56 lg:h-60" />
        <div className="absolute inset-x-3 -bottom-14 flex flex-wrap items-center gap-3 rounded-modal border border-borda bg-superficie px-4 py-3 shadow-modal sm:-bottom-10 sm:inset-x-5 sm:gap-4 sm:px-5">
          <MascoteEspiando nome="caramelo" expressao="feliz" posicao="-top-[5.5rem] right-4 hidden sm:block" largura={104} />
          <AvatarUsuario usuario={usuario} />
          <div className="min-w-0 flex-1">
            <h1 className="text-h2 md:text-h1">
              {t.olaInicio} <span className="marca-apelido">{usuario.apelido}</span>!
            </h1>
            <p className="hidden font-semibold text-texto-2 sm:block">{t.boasVindas}</p>
          </div>
          {sequencia > 0 && (
            <button
              type="button"
              onClick={abrirEntrada}
              aria-label={preencher(t.chipSequencia, { n: sequencia })}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full border-2 border-mico bg-[#FFF1E8] py-1 pl-1.5 pr-4 font-titulo text-h3 font-extrabold text-[#8A2E05] transition-transform duration-150 hover:-translate-y-0.5 hover:-rotate-2 motion-reduce:transition-none dark:bg-[#3A1E12] dark:text-[#FFB48A]"
            >
              <Foguinho tamanho={26} />
              {sequencia}
              <span className="font-texto text-legenda font-bold">{sequencia === 1 ? t.dia : t.dias}</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-5">
          {/* Continuar: bloco lilás com degrau, como os blocos da página inicial. */}
          <section
            aria-labelledby="painel-continuar"
            className="relative flex items-center gap-4 overflow-hidden rounded-modal bg-lilas p-5 pb-8 text-[#1A1A1A] shadow-[0_0.4rem_0_var(--color-lilas-sombra)]"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <h2 id="painel-continuar" className="text-h3 text-[#1A1A1A]">{t.continuar.titulo}</h2>
              {licao ? (
                <>
                  <p className="font-titulo text-tag font-bold uppercase tracking-[0.05em]">
                    {preencher(t.continuar.unidade, { numero: unidade.id, titulo: unidade.titulo })}
                  </p>
                  <p className="font-titulo text-[1.5rem] font-extrabold leading-tight md:text-[1.8rem]">{licao.titulo}</p>
                  <div className="mt-2">
                    <Botao variante="primario" para={`/app/licao/${licao.id}`} icone={ArrowRight} className="bg-[#1A1A1A]! text-white! shadow-[0_0.25rem_0_#000]!">
                      {comecou ? t.continuar.botao : t.continuar.comecar}
                    </Botao>
                  </div>
                </>
              ) : (
                <>
                  <p>{t.continuar.fim}</p>
                  <div>
                    <Botao variante="secundario" para="/app/trilha">{t.continuar.verTrilha}</Botao>
                  </div>
                </>
              )}
            </div>
            <AnelProgresso valor={porcentagemConcluida(ORDEM, progresso.licoes)} />
            <span aria-hidden="true" className="ondinhas-painel absolute inset-x-0 bottom-0 h-5" />
          </section>

          <SemanaFoguinhos semana={semana} />
        </div>

        <CaixaMensagens mensagens={mensagens} lidas={lidas} onLer={lerMensagem} />

        <PrateleiraConquistas medalhas={medalhas} sequencia={sequencia} className="lg:col-span-2" />

        <PropostaDoDia proposta={proposta} />
      </div>
    </div>
  )
}
