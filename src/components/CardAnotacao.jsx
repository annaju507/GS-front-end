import { Link } from 'react-router'
import { Pencil, StickyNote, Trash2 } from 'lucide-react'
import textos from '../data/textos.json'
import { formatarData } from '../domain/datas.js'
import { preencher } from '../domain/texto.js'
import Botao from './Botao.jsx'
import Etiqueta from './Etiqueta.jsx'
import FormAnotacao from './FormAnotacao.jsx'

const t = textos.caderno

// Uma anotação do caderno: a proposta, o texto da pessoa e as ações
// Editar e Excluir. No modo de edição, o formulário aparece no lugar do texto.
// Se a proposta é da seleção ("proposta"), mostra as etiquetas, o título simples
// e o resumo, como no card padrão. Senão, mostra a ementa que foi salva.
export default function CardAnotacao({ anotacao, proposta, editando, onEditar, onCancelar, onSalvarEdicao, onExcluir }) {
  return (
    <article className="flex flex-col gap-3 rounded-card border border-borda bg-superficie p-4 shadow-card dark:shadow-none md:p-6">
      {proposta && (
        <div className="flex flex-wrap gap-2">
          <Etiqueta tipo="area" valor={proposta.area} />
          <Etiqueta tipo="status" valor={proposta.etapa} />
        </div>
      )}
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-h3">
          <Link to={`/app/proposta/${anotacao.propostaId}`}>{proposta ? `${proposta.sigla}: ${proposta.titulo}` : anotacao.sigla}</Link>
        </h2>
        <p className="text-legenda text-texto-2">{preencher(t.salvaEm, { data: formatarData(anotacao.criadoEm) })}</p>
      </header>
      <p className="line-clamp-2 text-texto-2">{proposta ? proposta.resumo : anotacao.ementa}</p>

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
