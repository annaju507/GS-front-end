import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react'

// Mensagem do sistema (seção 2.3): sempre ícone + texto, nunca só a cor.
// Verde e vermelho só aparecem aqui e no quiz.
const TIPOS = {
  sucesso: { Icone: CircleCheck, classes: 'bg-sucesso-fundo text-sucesso border-sucesso' },
  erro: { Icone: CircleAlert, classes: 'bg-erro-fundo text-erro border-erro' },
  alerta: { Icone: TriangleAlert, classes: 'bg-alerta-fundo text-alerta border-alerta' },
  info: { Icone: Info, classes: 'bg-info-fundo text-info border-info' },
}

export default function Aviso({ tipo = 'info', children }) {
  const { Icone, classes } = TIPOS[tipo] ?? TIPOS.info

  return (
    <div className={`flex items-start gap-2 rounded-card-pequeno border px-4 py-3 font-semibold ${classes}`}>
      <Icone size={20} strokeWidth={2} aria-hidden="true" className="mt-1 shrink-0" />
      <div>{children}</div>
    </div>
  )
}
