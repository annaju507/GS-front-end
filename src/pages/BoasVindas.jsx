import { ArrowRight } from 'lucide-react'
import textos from '../data/textos.json'
import { preencher } from '../domain/texto.js'
import { useAuth } from '../hooks/useAuth.js'
import { useTitulo } from '../hooks/useTitulo.js'
import BalaoMascote from '../components/BalaoMascote.jsx'
import Botao from '../components/Botao.jsx'
import FotosEmLeque from '../components/FotosEmLeque.jsx'
import IndicadorPassos from '../components/IndicadorPassos.jsx'
import Mascote from '../components/Mascote.jsx'

const t = textos.boasVindas.inicio

// Passo 1 da primeira visita: fotos do Rio em leque e o caramelo recebe a pessoa.
export default function BoasVindas() {
  useTitulo(t.tituloAba)
  const { usuario } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <IndicadorPassos atual={1} total={3} />
      <FotosEmLeque centro="vista-baia-sem-cristo" esquerda="bonde-rua-santa-teresa" direita="pao-de-acucar-perto" />
      <h1>{preencher(t.titulo, { apelido: usuario.apelido })}</h1>
      <p className="text-corpo">{t.texto}</p>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
        <Mascote nome="caramelo" expressao="comemorando" tamanho="corpo" largura={200} prioridade />
        <div className="w-full flex-1">
          <BalaoMascote mascote="caramelo" expressao="feliz">
            <p>{t.fala}</p>
          </BalaoMascote>
        </div>
      </div>
      <div>
        <Botao variante="primario" para="/boas-vindas/ponto-de-partida" icone={ArrowRight}>
          {t.botao}
        </Botao>
      </div>
    </div>
  )
}
