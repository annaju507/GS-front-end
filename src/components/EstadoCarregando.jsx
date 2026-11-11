import { LoaderCircle } from 'lucide-react'
import textos from '../data/textos.json'

// Estado "carregando" de telas com dados.
export default function EstadoCarregando({ texto = textos.estados.carregando }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-8 text-texto-2">
      <LoaderCircle size={24} strokeWidth={2} aria-hidden="true" className="animate-spin" />
      <p className="font-semibold">{texto}</p>
    </div>
  )
}
