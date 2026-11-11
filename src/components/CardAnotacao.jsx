import { Link } from 'react-router'
import { Pencil, StickyNote, Trash2 } from 'lucide-react'
import textos from '../data/textos.json'
import { formatarData } from '../domain/datas.js'
import { preencher } from '../domain/texto.js'
import Botao from './Botao.jsx'
import FormAnotacao from './FormAnotacao.jsx'

const t = textos.caderno

// Uma anotação do caderno: a proposta, o texto da pessoa e as ações
// Editar e Excluir. No modo de edição, o formulário aparece no lugar do texto.
export default function CardAnotacao({ anotacao, editando, onEditar, onCancelar, onSalvarEdicao, onExcluir }) {
  return (
    <article className="flex flex-col gap-3 rounded-card border border-borda bg-superficie p-4 shadow-card dark:shadow-none md:p-6">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-h3">
          <Link to={`/app/proposta/${anotacao.propostaId}`}>{anotacao.sigla}</Link>
        </h2>
        <p className="text-legenda text-texto-2">{preencher(t.salvaEm, { data: formatarData(anotacao.criadoEm) })}</p>
      </header>
      <p className="line-clamp-2 text-texto-2">{anotacao.ementa}</p>

      {editando ? (
        <FormAnotacao valorInicial={anotacao.anotacao} onSalvar={onSalvarEdicao} onCancelar={onCancelar} autoFocus />
      ) : (
        <>
          <div className="flex gap-3 rounded-card-pequeno bg-lilas-claro p-3">
            <StickyNote size={20} strokeWidth={2} aria-hidden="true" className="mt-1 shrink-0 text-link" />
            <p className="whitespace-pre-line">{anotacao.anotacao}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Botao variante="secundario" icone={Pencil} onClick={onEditar} aria-label={preencher(t.editarRotulo, { sigla: anotacao.sigla })}>
              {t.editar}
            </Botao>
            <Botao variante="terciario" icone={Trash2} onClick={onExcluir} aria-label={preencher(t.excluirRotulo, { sigla: anotacao.sigla })}>
              {t.excluir}
            </Botao>
          </div>
        </>
      )}
    </article>
  )
}
