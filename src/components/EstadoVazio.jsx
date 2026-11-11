import Mascote from './Mascote.jsx'
import Botao from './Botao.jsx'

// Estado vazio (seção 8): mascote + título convidativo + 1 botão.
// O mascote é decorativo (alt=""), porque o título diz tudo.
// "acao" pode ser um link ({ rotulo, para }) ou um botão ({ rotulo, onClick }).
export default function EstadoVazio({ mascote = 'caramelo', expressao = 'feliz', titulo, acao }) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <Mascote nome={mascote} expressao={expressao} tamanho="corpo" largura={160} />
      <p className="max-w-sm font-titulo text-h3 font-semibold">{titulo}</p>
      {acao && (
        <Botao variante="primario" para={acao.para} onClick={acao.onClick}>
          {acao.rotulo}
        </Botao>
      )}
    </div>
  )
}
