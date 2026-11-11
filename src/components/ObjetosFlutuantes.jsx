import { BookOpen, Flame, Landmark, MessageCircle, Scale, Vote } from 'lucide-react'

// Objetos cívicos flutuantes (seção 18.2): blocos 3D com degrau e um ícone,
// girados e espalhados em volta do título. Decorativos (aria-hidden).
// No celular aparecem só três, menores, na faixa livre acima do título.
const OBJETOS = [
  { Icone: Vote, cor: 'bg-bloco-lilas text-marca-botao-texto', degrau: 'var(--color-bloco-lilas-degrau)', posicao: 'flex top-6 right-6 md:top-8 md:right-[8%]', giro: '12deg', duracao: '5s', atraso: '0s' },
  { Icone: MessageCircle, cor: 'bg-bloco-ceu text-indigo', degrau: 'var(--color-bloco-ceu-degrau)', posicao: 'flex top-5 right-44 md:top-auto md:bottom-24 md:right-[18%]', giro: '-10deg', duracao: '6s', atraso: '0.8s' },
  { Icone: BookOpen, cor: 'bg-bloco-pessego text-indigo', degrau: 'var(--color-bloco-pessego-degrau)', posicao: 'flex top-12 right-24 md:top-40 md:right-[3%]', giro: '-18deg', duracao: '4.5s', atraso: '0.4s' },
  { Icone: Landmark, cor: 'bg-bloco-indigo text-white', degrau: 'var(--color-bloco-indigo-degrau)', posicao: 'hidden md:flex md:bottom-10 md:right-[6%]', giro: '8deg', duracao: '5.5s', atraso: '1.2s' },
  { Icone: Scale, cor: 'bg-bloco-menta text-indigo', degrau: 'var(--color-bloco-menta-degrau)', posicao: 'hidden md:flex md:top-16 md:right-[26%]', giro: '-6deg', duracao: '6.5s', atraso: '0.2s' },
  { Icone: Flame, cor: 'bg-bloco-coral text-mico', degrau: 'var(--color-bloco-coral-degrau)', posicao: 'hidden md:flex md:bottom-36 md:right-[30%]', giro: '16deg', duracao: '4.8s', atraso: '1s' },
]

export default function ObjetosFlutuantes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {OBJETOS.map(({ Icone, cor, degrau, posicao, giro, duracao, atraso }) => (
        <span
          key={degrau}
          className={`flutuar absolute size-[1.875rem] items-center justify-center rounded-lg md:size-[2.875rem] md:rounded-card-pequeno ${cor} ${posicao}`}
          style={{
            '--giro': giro,
            animationDuration: duracao,
            animationDelay: atraso,
            boxShadow: `0 0.3125rem 0 ${degrau}`,
          }}
        >
          <Icone strokeWidth={2} className="size-4 md:size-6" />
        </span>
      ))}
    </div>
  )
}
