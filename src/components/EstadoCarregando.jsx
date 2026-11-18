import { LoaderCircle } from 'lucide-react'
import textos from '../data/textos.json'
import Animacao from './Animacao.jsx'
import Mascote from './Mascote.jsx'

// Estado "carregando" de telas com dados.
// comMascote: a onça (investigadora) procura com a lupa enquanto os pontinhos
// pulam. Só em telas sem políticos (neutralidade): hoje, o Caderno.
export default function EstadoCarregando({ texto = textos.estados.carregando, comMascote = false }) {
  if (comMascote) {
    return (
      <div role="status" className="flex flex-col items-center gap-1 py-8 text-texto-2">
        <Mascote nome="onca" expressao="pensativo" tamanho="corpo" largura={140} />
        <Animacao arquivo="extra/carregando" className="h-8 w-24" />
        <p className="font-semibold">{texto}</p>
      </div>
    )
  }

  return (
    <div role="status" className="flex items-center justify-center gap-3 py-8 text-texto-2">
      <LoaderCircle size={24} strokeWidth={2} aria-hidden="true" className="animate-spin" />
      <p className="font-semibold">{texto}</p>
    </div>
  )
}
