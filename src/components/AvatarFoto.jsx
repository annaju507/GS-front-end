import { useRef } from 'react'
import { Camera } from 'lucide-react'
import textos from '../data/textos.json'
import { inicialDoApelido } from '../domain/foto.js'

const t = textos.perfil.foto

// Bolinha do avatar: mostra a foto escolhida ou a primeira letra do apelido.
// Tocar nela abre a escolha de arquivo (o input fica escondido e o botão
// "clica" nele pelo DOM).
export default function AvatarFoto({ apelido, foto, salvando, onEscolher, className = '' }) {
  const campoArquivo = useRef(null)

  function abrirEscolha() {
    campoArquivo.current.click()
  }

  function aoEscolher(evento) {
    const arquivo = evento.target.files[0]
    onEscolher(arquivo)
    // Limpa o campo para a mesma foto poder ser escolhida de novo.
    evento.target.value = ''
  }

  let conteudo
  if (foto) {
    conteudo = <img src={foto} alt="" width={256} height={256} className="size-full rounded-full object-cover" />
  } else {
    conteudo = (
      <span aria-hidden="true" className="font-titulo text-[2.75rem] font-extrabold text-link">
        {inicialDoApelido(apelido)}
      </span>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={abrirEscolha}
        disabled={salvando}
        aria-label={foto ? t.trocar : t.escolher}
        className={`group relative grid size-28 shrink-0 place-items-center rounded-full border-4 border-superficie bg-lilas-claro shadow-modal sm:size-32 ${className}`}
      >
        {conteudo}
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 grid size-11 place-items-center rounded-full border-[3px] border-superficie bg-indigo text-white transition-transform group-hover:scale-110 motion-reduce:transition-none"
        >
          <Camera size={20} strokeWidth={2.25} />
        </span>
      </button>
      <input ref={campoArquivo} type="file" accept="image/*" onChange={aoEscolher} className="sr-only" tabIndex={-1} aria-hidden="true" />
    </>
  )
}
