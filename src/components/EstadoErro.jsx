import { RefreshCw, TriangleAlert } from 'lucide-react'
import textos from '../data/textos.json'
import BalaoMascote from './BalaoMascote.jsx'
import Botao from './Botao.jsx'

// Estado de erro, sempre com "tentar de novo".
// Sem conexão: a arara (a mensageira) avisa, por decisão da equipe.
// Outros erros: só ícone e texto claro, sem mascote.
export default function EstadoErro({ semConexao = false, onTentarDeNovo }) {
  const t = textos.estados

  if (semConexao) {
    return (
      <section aria-label={t.semConexao.titulo} className="flex max-w-leitura flex-col gap-4 py-6">
        <BalaoMascote mascote="arara" expressao="alerta" anunciar>
          <p className="font-bold">{t.semConexao.titulo}</p>
          <p>{t.semConexao.fala}</p>
        </BalaoMascote>
        <div>
          <Botao variante="secundario" icone={RefreshCw} onClick={onTentarDeNovo}>
            {textos.botoes.tentarDeNovo}
          </Botao>
        </div>
      </section>
    )
  }

  return (
    <section role="alert" className="flex max-w-leitura flex-col items-start gap-3 py-6">
      <TriangleAlert size={32} strokeWidth={2} aria-hidden="true" className="text-alerta" />
      <p className="font-titulo text-h3 font-semibold">{t.erro.titulo}</p>
      <p className="text-texto-2">{t.erro.texto}</p>
      <Botao variante="secundario" icone={RefreshCw} onClick={onTentarDeNovo}>
        {textos.botoes.tentarDeNovo}
      </Botao>
    </section>
  )
}
