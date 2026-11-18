import { useContagem } from '../hooks/useContagem.js'
import { useNaTela } from '../hooks/useNaTela.js'

// Separa o número do resto ("100%" vira 100 e "%"), para poder contar.
function separarValor(valor) {
  const encontrado = String(valor).match(/^(\d+)(.*)$/)
  if (encontrado) {
    return { numero: Number(encontrado[1]), sufixo: encontrado[2] }
  } else {
    return { numero: null, sufixo: String(valor) }
  }
}

function Contando({ numero, sufixo }) {
  const atual = useContagem(numero, 1200)
  return (
    <>
      {atual}
      {sufixo}
    </>
  )
}

// Número que sobe de 0 até o valor quando aparece na tela.
// O leitor de tela lê o valor final direto (sr-only), sem a contagem.
export default function Contador({ valor, className = '' }) {
  const [ref, naTela] = useNaTela('0px 0px -10% 0px')
  const { numero, sufixo } = separarValor(valor)
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span className="sr-only">{String(valor)}</span>
      <span aria-hidden="true">
        {numero === null ? sufixo : naTela ? <Contando numero={numero} sufixo={sufixo} /> : `0${sufixo}`}
      </span>
    </span>
  )
}
