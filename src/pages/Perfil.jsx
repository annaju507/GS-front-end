import { useNavigate } from 'react-router'
import { ALargeSmall, BookCheck, Bookmark, LogOut, Moon, Pause, Trash2, Volume2 } from 'lucide-react'
import textos from '../data/textos.json'
import { mesEAno } from '../domain/foto.js'
import { plural, preencher } from '../domain/texto.js'
import { ordemDasLicoes, porcentagemConcluida, proximaLicao, unidadeConcluida, unidadeDaLicao } from '../domain/trilha.js'
import { UNIDADES } from '../services/conteudoLocal.js'
import { useAuth } from '../hooks/useAuth.js'
import { useCaderno } from '../hooks/useCaderno.js'
import { useContagem } from '../hooks/useContagem.js'
import { useFotoPerfil } from '../hooks/useFotoPerfil.js'
import { usePreferencias } from '../hooks/usePreferencias.js'
import { useProgresso } from '../hooks/useProgresso.js'
import { useTitulo } from '../hooks/useTitulo.js'
import AnelProgresso from '../components/AnelProgresso.jsx'
import Aviso from '../components/Aviso.jsx'
import AvatarFoto from '../components/AvatarFoto.jsx'
import Botao from '../components/Botao.jsx'
import Foguinho from '../components/Foguinho.jsx'
import IconePremio from '../components/IconePremio.jsx'
import ImagemRio from '../components/ImagemRio.jsx'
import Interruptor from '../components/Interruptor.jsx'
import MascoteEspiando from '../components/MascoteEspiando.jsx'
import Medalha from '../components/Medalha.jsx'
import QuadroAjuste from '../components/QuadroAjuste.jsx'

const t = textos.perfil
const ORDEM = ordemDasLicoes(UNIDADES)
const DISPONIVEIS = UNIDADES.filter((unidade) => unidade.disponivel)

// Blocos dos números: cores claras fixas e texto escuro, legíveis nos dois temas.
const BLOCOS = {
  dias: 'bg-[#FDE8DE] shadow-[0_0.4rem_0_#EDB9A0]',
  licoes: 'bg-[#B7E7FC] shadow-[0_0.4rem_0_#7FC3E3]',
  medalhas: 'bg-[#FFF1BF] shadow-[0_0.4rem_0_#E9CB66]',
  caderno: 'bg-[#DCD2FB] shadow-[0_0.4rem_0_#A186EF]',
}

function BlocoNumero({ tipo, Icone, valor, rotulo, atraso }) {
  const contado = useContagem(typeof valor === 'number' ? valor : 0, 800, atraso)
  return (
    <li className={`cartao-entra flex flex-col gap-1.5 rounded-modal p-4 text-[#1A1A1A] ${BLOCOS[tipo]}`} style={{ animationDelay: `${atraso}ms` }}>
      <span className="grid size-11 place-items-center rounded-card-pequeno bg-white/70 text-[#2A0081]">
        <Icone size={22} />
      </span>
      <span className="font-titulo text-[2.2rem] font-extrabold leading-none">{typeof valor === 'number' ? contado : valor}</span>
      <span className="text-legenda font-bold">{rotulo}</span>
    </li>
  )
}

function IconeMedalhas({ size }) {
  return <IconePremio nome="roseta" tamanho={size} />
}

function IconeLinha(Icone) {
  return function IconeDoBloco({ size }) {
    return <Icone size={size} strokeWidth={2} aria-hidden="true" />
  }
}
const IconeLicoes = IconeLinha(BookCheck)
const IconeCaderno = IconeLinha(Bookmark)

// Perfil, no estilo do Início: capa do Rio com o avatar (tocar troca o
// rosto), números em blocos coloridos, a trilha num bloco lilás com o anel,
// todas as medalhas em cartões e os ajustes de leitura em quadros. O mico
// (progresso) espia a capa. Sem XP total, ranking ou pódio.
export default function Perfil() {
  useTitulo(t.tituloAba)
  const navegar = useNavigate()
  const { usuario, sair } = useAuth()
  const { progresso, sequencia, medalhas } = useProgresso()
  const caderno = useCaderno()
  const { foto, avatar, erro, salvando, escolherFoto, escolherAvatar, tirarFoto } = useFotoPerfil()
  const { tema, letra, animacoes, sons } = usePreferencias()

  const ganhas = medalhas.filter((medalha) => medalha.ganha).length
  const concluidas = progresso.licoes
  const unidadesFeitas = DISPONIVEIS.filter((unidade) => unidadeConcluida(unidade, concluidas)).length
  const idProxima = proximaLicao(ORDEM, concluidas)
  const unidadeAtual = idProxima ? unidadeDaLicao(UNIDADES, idProxima) : null

  let avisoLetra = preencher(textos.preferencias.letra.atual, { valor: letra.nivel })
  if (letra.limite === 'maximo') {
    avisoLetra = textos.preferencias.letra.noMaximo
  } else if (letra.limite === 'minimo') {
    avisoLetra = textos.preferencias.letra.noMinimo
  }

  function sairDaConta() {
    sair()
    navegar('/', { replace: true })
  }

  const botaoLetra =
    'grid size-11 place-items-center rounded-card-pequeno border-2 border-secundario-borda bg-secundario font-titulo font-extrabold text-secundario-texto hover:bg-lilas-claro'

  return (
    <div className="mx-auto flex max-w-[60rem] flex-col gap-8">
      {/* Capa: roda-gigante do Porto e o cartão com o avatar por cima da borda. */}
      <header className="relative mb-20 sm:mb-14">
        <ImagemRio nome="roda-gigante-porto" prioridade className="h-40 w-full rounded-modal object-cover object-[center_40%] sm:h-48" />
        <div className="absolute inset-x-3 -bottom-20 flex flex-wrap items-center gap-4 rounded-modal border border-borda bg-superficie px-4 py-3 shadow-modal sm:inset-x-5 sm:-bottom-12 sm:px-5">
          <MascoteEspiando nome="mico" expressao="feliz" posicao="-top-[5.25rem] right-4 hidden sm:block" largura={96} />
          <AvatarFoto
            apelido={usuario.apelido}
            foto={foto}
            avatar={avatar}
            salvando={salvando}
            onEscolherFoto={escolherFoto}
            onEscolherAvatar={escolherAvatar}
            onUsarInicial={tirarFoto}
            className="-mt-10 size-24! shadow-[0_0_0_0.25rem_var(--color-lilas)]! sm:size-28!"
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h1 className="text-h1">
              <span className="sr-only">{t.titulo}: </span>
              <span className="marca-apelido">{usuario.apelido}</span>
            </h1>
            <p className="font-semibold text-texto-2">{preencher(t.desde, { data: mesEAno(usuario.criadoEm) })}</p>
            <ul className="mt-1 flex flex-wrap gap-1.5">
              <li className="inline-flex items-center gap-1 rounded-full bg-lilas-claro px-3 py-1 font-titulo text-tag font-bold text-link">
                <Foguinho tamanho={12} />
                {plural(sequencia, t.chips.diaUm, t.chips.dias)}
              </li>
              <li className="inline-flex items-center gap-1 rounded-full bg-lilas-claro px-3 py-1 font-titulo text-tag font-bold text-link">
                <IconePremio nome="roseta" tamanho={16} />
                {plural(ganhas, t.chips.medalhaUm, t.chips.medalhas)}
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="-mt-4 flex flex-col items-start gap-2" aria-live="polite">
        {salvando && <p className="text-legenda text-texto-2">{t.foto.salvando}</p>}
        {erro && <Aviso tipo="erro">{t.foto.erros[erro]}</Aviso>}
        {(foto || avatar) && !salvando && (
          <Botao variante="terciario" icone={Trash2} onClick={tirarFoto} className="-ml-6">
            {t.foto.tirar}
          </Botao>
        )}
      </div>

      <section aria-labelledby="perfil-resumo" className="flex flex-col gap-4">
        <h2 id="perfil-resumo" className="text-h3">{t.resumo}</h2>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <BlocoNumero tipo="dias" Icone={Foguinho} valor={sequencia} rotulo={t.estatisticas.dias} atraso={200} />
          <BlocoNumero tipo="licoes" Icone={IconeLicoes} valor={Object.keys(concluidas).length} rotulo={t.estatisticas.licoes} atraso={300} />
          <BlocoNumero tipo="medalhas" Icone={IconeMedalhas} valor={ganhas} rotulo={t.estatisticas.medalhas} atraso={400} />
          <BlocoNumero
            tipo="caderno"
            Icone={IconeCaderno}
            valor={caderno.carregando || caderno.erro ? '…' : caderno.anotacoes.length}
            rotulo={t.estatisticas.caderno}
            atraso={500}
          />
        </ul>
      </section>

      {/* Trilha: bloco lilás com o anel e uma barrinha por unidade. */}
      <section
        aria-labelledby="perfil-trilha"
        className="flex flex-col items-center gap-5 rounded-modal bg-lilas p-5 text-[#1A1A1A] shadow-[0_0.4rem_0_var(--color-lilas-sombra)] sm:flex-row"
      >
        <AnelProgresso valor={porcentagemConcluida(ORDEM, concluidas)} />
        <div className="flex w-full min-w-0 flex-1 flex-col gap-1.5">
          <h2 id="perfil-trilha" className="text-h3 text-[#1A1A1A]">{t.trilhaBloco.titulo}</h2>
          <p className="font-bold">
            {unidadeAtual ? preencher(t.trilhaBloco.agora, { numero: unidadeAtual.id, titulo: unidadeAtual.titulo }) : t.trilhaBloco.fim}
          </p>
          <ol className="mt-1 grid gap-1" style={{ gridTemplateColumns: `repeat(${DISPONIVEIS.length}, minmax(0, 1fr))` }} aria-hidden="true">
            {DISPONIVEIS.map((unidade) => {
              let estilo = 'bg-white/50'
              if (unidadeConcluida(unidade, concluidas)) {
                estilo = 'bg-[#2A0081]'
              } else if (unidadeAtual && unidade.id === unidadeAtual.id) {
                estilo = 'bg-[repeating-linear-gradient(90deg,#2A0081_0_0.4rem,rgb(255_255_255/0.5)_0.4rem_0.8rem)]'
              }
              return <li key={unidade.id} className={`h-2.5 rounded-full ${estilo}`} />
            })}
          </ol>
          <p className="text-legenda font-bold">{preencher(t.trilhaBloco.unidades, { n: unidadesFeitas, total: DISPONIVEIS.length })}</p>
        </div>
      </section>

      <section aria-labelledby="perfil-medalhas" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 id="perfil-medalhas" className="flex items-center gap-2 text-h3">
            <IconePremio nome="trilha-concluida" tamanho={32} />
            {textos.medalhas.titulo}
          </h2>
          <p className="font-titulo text-h2 font-extrabold leading-none text-link">
            {ganhas} <span className="text-legenda font-bold text-texto-2">{preencher(textos.painel.conquistas.deTotal, { total: medalhas.length })}</span>
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {medalhas.map((medalha, indice) => (
            <Medalha key={medalha.id} medalha={medalha} className="medalha-cai" style={{ animationDelay: `${indice * 70 + 300}ms` }} />
          ))}
        </ul>
      </section>

      <section aria-labelledby="perfil-ajustes" className="flex flex-col gap-4">
        <h2 id="perfil-ajustes" className="text-h3">{t.ajustes}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <QuadroAjuste Icone={Moon} titulo={t.quadros.tema.titulo} texto={t.quadros.tema.texto} idTitulo="ajuste-tema">
            <Interruptor ligado={tema.escuro} onAlternar={tema.alternarTema} idRotulo="ajuste-tema" />
          </QuadroAjuste>
          <QuadroAjuste
            Icone={ALargeSmall}
            titulo={t.quadros.letra.titulo}
            texto={t.quadros.letra.texto}
            idTitulo="ajuste-letra"
            rodape={<p aria-live="polite" className="text-legenda text-texto-2 sm:pl-14">{avisoLetra}</p>}
          >
            <span role="group" aria-labelledby="ajuste-letra" className="flex items-center gap-1.5">
              <button type="button" onClick={letra.diminuir} aria-label={textos.preferencias.letra.diminuirRotulo} className={botaoLetra}>
                {textos.preferencias.letra.diminuir}
              </button>
              <button type="button" onClick={letra.aumentar} aria-label={textos.preferencias.letra.aumentarRotulo} className={botaoLetra}>
                {textos.preferencias.letra.aumentar}
              </button>
            </span>
          </QuadroAjuste>
          <QuadroAjuste
            Icone={Pause}
            titulo={t.quadros.animacoes.titulo}
            texto={t.quadros.animacoes.texto}
            idTitulo="ajuste-animacoes"
            rodape={animacoes.sistemaPedeMenos && <p className="text-legenda text-texto-2 sm:pl-14">{textos.preferencias.animacoes.sistemaPede}</p>}
          >
            <Interruptor ligado={animacoes.opcaoDoSite} onAlternar={animacoes.alternarReduzirAnimacoes} idRotulo="ajuste-animacoes" />
          </QuadroAjuste>
          <QuadroAjuste Icone={Volume2} titulo={t.quadros.sons.titulo} texto={t.quadros.sons.texto} idTitulo="ajuste-sons">
            <Interruptor ligado={sons.ligado} onAlternar={sons.alternarSons} idRotulo="ajuste-sons" />
          </QuadroAjuste>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-legenda text-texto-2">{t.guardado}</p>
        <Botao variante="secundario" icone={LogOut} onClick={sairDaConta}>
          {t.sair}
        </Botao>
      </div>
    </div>
  )
}
