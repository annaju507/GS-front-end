import { useNavigate } from 'react-router'
import { ArrowLeft } from 'lucide-react'
import textos from '../data/textos.json'
import { useAuth } from '../hooks/useAuth.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Botao from '../components/Botao.jsx'
import BotaoTema from '../components/BotaoTema.jsx'
import Card from '../components/Card.jsx'
import ControleTamanhoLetra from '../components/ControleTamanhoLetra.jsx'
import IndicadorPassos from '../components/IndicadorPassos.jsx'
import OpcaoReduzirAnimacoes from '../components/OpcaoReduzirAnimacoes.jsx'
import OpcaoSons from '../components/OpcaoSons.jsx'

const t = textos.boasVindas.ajustes

// Passo 3: tema, tamanho da letra e animações. Ao terminar, a boas-vindas
// não aparece mais.
export default function AjustesLeitura() {
  useTitulo(t.tituloAba)
  const { atualizarUsuario } = useAuth()
  const navegar = useNavigate()

  function concluir() {
    atualizarUsuario({ boasVindasConcluidas: true })
    navegar('/app', { replace: true })
  }

  return (
    <div className="flex flex-col gap-6">
      <IndicadorPassos atual={3} total={3} />
      <h1>{t.titulo}</h1>
      <p className="text-corpo">{t.intro}</p>
      <Card className="flex flex-col gap-5">
        <div>
          <BotaoTema />
        </div>
        <ControleTamanhoLetra />
        <OpcaoReduzirAnimacoes />
        <OpcaoSons />
      </Card>
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Botao variante="terciario" para="/boas-vindas/ponto-de-partida" icone={ArrowLeft}>
          {textos.boasVindas.voltar}
        </Botao>
        <Botao variante="primario" onClick={concluir}>
          {t.botao}
        </Botao>
      </div>
    </div>
  )
}
