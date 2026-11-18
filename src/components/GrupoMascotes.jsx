import MascoteInterativo from './MascoteInterativo.jsx'

// Os cinco mascotes amontoados, como uma turma posando para a foto: o caramelo
// e a onça na frente, a capivara no meio e o mico e a arara atrás, mais altos,
// um encostando no outro. Cada um balança no seu ritmo e muda de pose quando o
// mouse passa. Tamanhos e lugares em % da caixa, que acompanha a altura da
// tela. É enfeite.
const TURMA = [
  { nome: 'mico', expressao: 'comemorando', reacao: 'feliz', lugar: { left: '20%', top: '0%', width: '40%' }, atraso: '-1.2s', camada: 'z-0' },
  { nome: 'arara', expressao: 'feliz', reacao: 'alerta', lugar: { right: '0%', top: '8%', width: '38%' }, atraso: '-2.4s', camada: 'z-0' },
  { nome: 'capivara', expressao: 'explicando', reacao: 'feliz', lugar: { left: '24%', bottom: '0%', width: '50%' }, atraso: '-1.8s', camada: 'z-10' },
  { nome: 'caramelo', expressao: 'feliz', reacao: 'comemorando', lugar: { left: '-4%', bottom: '2%', width: '42%' }, atraso: '-0.6s', camada: 'z-20' },
  { nome: 'onca', expressao: 'alerta', reacao: 'feliz', lugar: { right: '-4%', bottom: '2%', width: '42%' }, atraso: '-3s', camada: 'z-20' },
]

export default function GrupoMascotes({ className = '' }) {
  return (
    <div aria-hidden="true" className={`relative aspect-[8/7] ${className}`}>
      {/* Um "chão" lilás embaixo da turma. */}
      <span className="absolute inset-x-[4%] bottom-[1%] h-[14%] rounded-[50%] bg-lilas-claro" />
      {TURMA.map((bicho) => (
        <span key={bicho.nome} className={`turma-bicho absolute ${bicho.camada}`} style={{ ...bicho.lugar, animationDelay: bicho.atraso }}>
          <MascoteInterativo nome={bicho.nome} expressao={bicho.expressao} expressaoReacao={bicho.reacao} largura={null} className="w-full" />
        </span>
      ))}
    </div>
  )
}
