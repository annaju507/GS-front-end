import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react'

// Mensagem do sistema (seção 2.3): sempre ícone + texto, nunca só a cor.
// Verde e vermelho só aparecem aqui e no quiz.
const TIPOS = {
  sucesso: { Icone: CircleCheck, classes: 'bg-sucesso-fundo text-sucesso border-sucesso' },
  erro: { Icone: CircleAlert, classes: 'bg-erro-fundo text-erro border-erro' },
  alerta: { Icone: TriangleAlert, classes: 'bg-alerta-fundo text-alerta border-alerta' },
  info: { Icone: Info, classes: 'bg-info-fundo text-info border-info' },
}

// "compacto": menos espaço interno e letra menor (telas de entrada).
export default function Aviso({ tipo = 'info', compacto = false, children }) {
  const { Icone, classes } = TIPOS[tipo] ?? TIPOS.info
  const espaco = compacto ? 'px-3 py-2 text-legenda' : 'px-4 py-3'

  return (
    <div className={`flex items-start gap-2 rounded-card-pequeno border font-semibold ${espaco} ${classes}`}>
      <Icone size={compacto ? 18 : 20} strokeWidth={2} aria-hidden="true" className={`${compacto ? 'mt-0.5' : 'mt-1'} shrink-0`} />
      <div>{children}</div>
    </div>
  )
}
