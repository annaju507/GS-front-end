import { useNavigate } from 'react-router'
import { Award, BookCheck, Flame, LogOut } from 'lucide-react'
import textos from '../data/textos.json'
import { useAuth } from '../hooks/useAuth.js'
import { useProgresso } from '../hooks/useProgresso.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import BotaoTema from '../components/BotaoTema.jsx'
import Card from '../components/Card.jsx'
import ControleTamanhoLetra from '../components/ControleTamanhoLetra.jsx'
import Medalha from '../components/Medalha.jsx'
import OpcaoReduzirAnimacoes from '../components/OpcaoReduzirAnimacoes.jsx'

const t = textos.perfil

// Perfil (versão inicial; ganha mais coisas na etapa 7): números do
// progresso, medalhas, ajustes de leitura e sair. Sem XP total, ranking ou pódio.
export default function Perfil() {
  useTitulo(t.tituloAba)
  const navegar = useNavigate()
  const { usuario, sair } = useAuth()
  const { progresso, sequencia, medalhas } = useProgresso()

  const numeros = [
    { Icone: Flame, cor: 'text-mico', valor: sequencia, rotulo: t.estatisticas.dias },
    { Icone: BookCheck, cor: 'text-link', valor: Object.keys(progresso.licoes).length, rotulo: t.estatisticas.licoes },
    { Icone: Award, cor: 'text-link', valor: medalhas.filter((medalha) => medalha.ganha).length, rotulo: t.estatisticas.medalhas },
  ]

  function sairDaConta() {
    sair()
    navegar('/', { replace: true })
  }

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-8">
      <header>
        <h1>{t.titulo}</h1>
        <p className="text-texto-2">{usuario.apelido}</p>
      </header>

      <section aria-labelledby="perfil-resumo" className="flex flex-col gap-3">
        <h2 id="perfil-resumo" className="text-h3">{t.resumo}</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {numeros.map(({ Icone, cor, valor, rotulo }) => (
            <li key={rotulo} className="flex flex-col gap-1 rounded-botao border-2 border-borda bg-superficie p-4">
              <Icone size={20} strokeWidth={2} aria-hidden="true" className={cor} />
              <span className="font-titulo text-h2 font-extrabold leading-none">{valor}</span>
              <span className="text-legenda text-texto-2">{rotulo}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="perfil-medalhas" className="flex flex-col gap-4">
        <h2 id="perfil-medalhas" className="text-h3">{textos.medalhas.titulo}</h2>
        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {medalhas.map((medalha) => (
            <Medalha key={medalha.id} medalha={medalha} />
          ))}
        </ul>
      </section>

      <Card como="section" aria-labelledby="perfil-ajustes" className="flex flex-col gap-4">
        <h2 id="perfil-ajustes" className="text-h3">{t.ajustes}</h2>
        <div>
          <BotaoTema />
        </div>
        <ControleTamanhoLetra />
        <OpcaoReduzirAnimacoes />
      </Card>

      <div>
        <Botao variante="secundario" icone={LogOut} onClick={sairDaConta}>
          {t.sair}
        </Botao>
      </div>
    </div>
  )
}
