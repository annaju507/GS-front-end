import { useCallback, useState } from 'react'
import { Link } from 'react-router'
import { Bookmark, BookmarkCheck, RefreshCw } from 'lucide-react'
import textos from '../data/textos.json'
import { buscarAnotacaoDaProposta } from '../domain/caderno.js'
import { useCaderno } from '../hooks/useCaderno.js'
import { useProgresso } from '../hooks/useProgresso.js'
import Aviso from './Aviso.jsx'
import Botao from './Botao.jsx'
import Card from './Card.jsx'
import EstadoCarregando from './EstadoCarregando.jsx'
import FormAnotacao from './FormAnotacao.jsx'
import Toast from './Toast.jsx'

const t = textos.proposta.caderno
const tc = textos.caderno

// "Salvar no caderno" na página da proposta: o Create do CRUD.
// Se a proposta já está no caderno, mostra isso e o atalho para abrir.
export default function SalvarNoCaderno({ proposta }) {
  const { carregando, erro, anotacoes, tentarDeNovo, salvar } = useCaderno()
  const { registrarAnotacaoFeita } = useProgresso()
  const [aberto, setAberto] = useState(false)
  const [toast, setToast] = useState(null)
  const fecharToast = useCallback(() => setToast(null), [])

  async function salvarAnotacao(texto) {
    const { ok } = await salvar(proposta, texto)
    if (ok) {
      registrarAnotacaoFeita()
      setAberto(false)
      setToast({ tipo: 'sucesso', mensagem: tc.avisos.criada })
    } else {
      setToast({ tipo: 'erro', mensagem: tc.avisos.falhou })
    }
  }

  let conteudo
  if (carregando) {
    conteudo = <EstadoCarregando texto={tc.carregando} />
  } else if (erro) {
    conteudo = (
      <div className="flex flex-col items-start gap-3">
        <Aviso tipo="erro">{tc.avisos.falhou}</Aviso>
        <Botao variante="secundario" icone={RefreshCw} onClick={tentarDeNovo}>
          {textos.botoes.tentarDeNovo}
        </Botao>
      </div>
    )
  } else if (buscarAnotacaoDaProposta(anotacoes, proposta.id)) {
    conteudo = (
      <div className="flex flex-col items-start gap-2">
        <p className="flex items-center gap-2 font-semibold text-link">
          <BookmarkCheck size={22} strokeWidth={2} aria-hidden="true" />
          {t.jaSalva}
        </p>
        <Link to="/app/caderno" className="inline-flex min-h-11 items-center font-semibold">
          {t.abrir}
        </Link>
      </div>
    )
  } else if (aberto) {
    conteudo = (
      <>
        <p className="text-texto-2">{t.texto}</p>
        <FormAnotacao rotuloSalvar={t.botao} onSalvar={salvarAnotacao} onCancelar={() => setAberto(false)} autoFocus />
      </>
    )
  } else {
    conteudo = (
      <div>
        <Botao variante="secundario" icone={Bookmark} onClick={() => setAberto(true)}>
          {t.botao}
        </Botao>
      </div>
    )
  }

  return (
    <Card como="section" aria-labelledby="proposta-caderno" className="flex flex-col gap-3">
      <h2 id="proposta-caderno" className="text-h3">{t.titulo}</h2>
      {conteudo}
      <Toast mensagem={toast?.mensagem} tipo={toast?.tipo} onFechar={fecharToast} />
    </Card>
  )
}
