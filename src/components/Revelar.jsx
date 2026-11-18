import { useNaTela } from '../hooks/useNaTela.js'

// Bloco que surge suave (sobe e aparece) quando chega na tela, ao rolar.
// "atraso" em ms, para elementos irmãos entrarem um depois do outro.
// Com "reduzir animações", a regra geral do CSS tira a transição: aparece direto.
export default function Revelar({ como: Tag = 'div', atraso = 0, className = '', children, ...resto }) {
  const [ref, naTela] = useNaTela('0px 0px -10% 0px')
  return (
    <Tag
      ref={ref}
      className={`revelar ${naTela ? 'revelado' : ''} ${className}`}
      style={{ transitionDelay: `${atraso}ms` }}
      {...resto}
    >
      {children}
    </Tag>
  )
}
