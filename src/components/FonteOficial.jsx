import { ExternalLink, FileText } from 'lucide-react'
import textos from '../data/textos.json'
import { formatarData } from '../domain/datas.js'
import { preencher } from '../domain/texto.js'

// Fonte oficial, no mesmo padrão em todo o site: instituição, documento,
// trecho, data da consulta e link. Toda lição, pergunta e termo tem uma.
// onAbrir (opcional): avisa quando a pessoa abre a fonte (medalha "Chequei a fonte").
export default function FonteOficial({ fonte, onAbrir }) {
  if (!fonte) {
    return null
  }
  const documento = [fonte.documento, fonte.trecho].filter(Boolean).join(', ')

  return (
    <aside aria-label={textos.fonte.rotulo} className="flex gap-3 border-t border-borda pt-3 text-legenda text-texto-2">
      <FileText size={20} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0" />
      <div className="flex flex-col gap-1">
        <p>
          <span className="font-bold">{textos.fonte.rotulo}:</span> {fonte.instituicao}. {documento}.
        </p>
        {fonte.consultadoEm && <p>{preencher(textos.fonte.consultadoEm, { data: formatarData(fonte.consultadoEm) })}</p>}
        <a
          href={fonte.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onAbrir}
          className="inline-flex min-h-11 items-center gap-1.5 self-start font-semibold"
        >
          {textos.fonte.verFonte}
          <ExternalLink size={16} strokeWidth={2} aria-hidden="true" />
          <span className="sr-only">{textos.acessibilidade.abreNovaAba}</span>
        </a>
      </div>
    </aside>
  )
}
