import { useCallback, useState } from 'react'
import { Newspaper } from 'lucide-react'
import textos from '../data/textos.json'
import { plural, preencher } from '../domain/texto.js'
import { buscarPropostaLocal } from '../services/conteudoLocal.js'
import { useAuth } from '../hooks/useAuth.js'
import { useCaderno } from '../hooks/useCaderno.js'
import { useTitulo } from '../hooks/useTitulo.js'
import Aviso from '../components/Aviso.jsx'
import Botao from '../components/Botao.jsx'
import CardAnotacao from '../components/CardAnotacao.jsx'
import EstadoCarregando from '../components/EstadoCarregando.jsx'
import EstadoErro from '../components/EstadoErro.jsx'
import EstadoVazio from '../components/EstadoVazio.jsx'
import ImagemRio from '../components/ImagemRio.jsx'
import ModalConfirmacao from '../components/ModalConfirmacao.jsx'
import Toast from '../components/Toast.jsx'

const t = textos.caderno

// Caderno cívico (CRUD com MockAPI): lista as propostas salvas, edita a
// anotação e exclui com confirmação. Criar acontece na página da proposta.
export default function Caderno() {
  useTitulo(t.tituloAba)
  const { usuario } = useAuth()
  const { carregando, erro, anotacoes, tentarDeNovo, editar, excluir } = useCaderno()
  const [editandoId, setEditandoId] = useState(null)
  const [paraExcluir, setParaExcluir] = useState(null)
  const [toast, setToast] = useState(null)
  const fecharToast = useCallback(() => setToast(null), [])

  async function salvarEdicao(id, texto) {
    const { ok } = await editar(id, texto)
    if (ok) {
      setEditandoId(null)
      setToast({ tipo: 'sucesso', mensagem: t.avisos.editada })
    } else {
      setToast({ tipo: 'erro', mensagem: t.avisos.falhou })
    }
  }

  function fecharModal() {
    setParaExcluir(null)
  }

  // Excluir só acontece se a pessoa confirmar no modal.
  async function responderModal(confirmou) {
    const anotacao = paraExcluir
    if (confirmou) {
      fecharModal()
      const { ok } = await excluir(anotacao.id)
      setToast(ok ? { tipo: 'sucesso', mensagem: t.avisos.excluida } : { tipo: 'erro', mensagem: t.avisos.falhou })
    } else {
      fecharModal()
    }
  }

  let conteudo
  if (carregando) {
    conteudo = <EstadoCarregando texto={t.carregando} comMascote />
  } else if (erro) {
    conteudo = <EstadoErro semConexao={erro === 'semConexao'} onTentarDeNovo={tentarDeNovo} />
  } else if (anotacoes.length === 0) {
    conteudo = <EstadoVazio mascote="caramelo" expressao="explicando" titulo={t.vazio.titulo} acao={{ rotulo: t.vazio.botao, para: '/app/agora' }} />
  } else {
    conteudo = (
      <>
        <p className="font-semibold text-texto-2">{plural(anotacoes.length, t.total.um, t.total.varios)}</p>
        <ul className="flex flex-col gap-4">
          {anotacoes.map((anotacao) => (
            <li key={anotacao.id}>
              <CardAnotacao
                anotacao={anotacao}
                proposta={buscarPropostaLocal(anotacao.propostaId)}
                editando={editandoId === anotacao.id}
                onEditar={() => setEditandoId(anotacao.id)}
                onCancelar={() => setEditandoId(null)}
                onSalvarEdicao={(texto) => salvarEdicao(anotacao.id, texto)}
                onExcluir={() => setParaExcluir(anotacao)}
              />
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className="mx-auto flex max-w-leitura flex-col gap-6">
      <header className="flex flex-col gap-3">
        <h1>{t.titulo}</h1>
        <p className="text-corpo">{t.intro}</p>
        <div>
          <Botao variante="secundario" icone={Newspaper} para="/app/agora">
            {t.explorar}
          </Botao>
        </div>
      </header>

      <Aviso tipo="info">{t.aviso}</Aviso>

      {/* Caderno aberto: a capa (Parque Lage, elástico e etiqueta) e a folha
          pautada com as anotações. A capa é só enfeite; o texto fica na folha. */}
      <div className="grid overflow-hidden rounded-modal shadow-modal md:grid-cols-[13rem_1fr]">
        <div aria-hidden="true" className="relative bg-indigo p-3">
          <ImagemRio nome="parque-lage-fachada" className="h-32 w-full rounded-card-pequeno md:h-full md:min-h-72" />
          <span className="absolute inset-y-0 right-6 w-2 bg-mico" />
          <span className="absolute left-6 right-12 top-6 rounded-card-pequeno bg-white px-3 py-2 shadow-card">
            <span className="block font-titulo text-legenda font-extrabold text-indigo">{t.etiqueta.titulo}</span>
            <span className="block text-tag text-[#5F6B76]">{preencher(t.etiqueta.dono, { apelido: usuario.apelido })}</span>
          </span>
        </div>
        <section aria-label={t.titulo} aria-busy={carregando} className="folha-pautada relative flex flex-col gap-4 p-4 pl-10 md:p-6 md:pl-12">
          {conteudo}
        </section>
      </div>

      <ModalConfirmacao
        aberto={paraExcluir !== null}
        titulo={t.modal.titulo}
        descricao={paraExcluir ? preencher(t.modal.descricao, { sigla: paraExcluir.sigla }) : ''}
        onConfirmar={() => responderModal(true)}
        onCancelar={() => responderModal(false)}
      />
      <Toast mensagem={toast?.mensagem} tipo={toast?.tipo} onFechar={fecharToast} />
    </div>
  )
}
