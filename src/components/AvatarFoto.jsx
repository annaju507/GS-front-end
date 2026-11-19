import { useRef, useState } from 'react'
import { Pencil } from 'lucide-react'
import textos from '../data/textos.json'
import { tipoDoAvatar } from '../domain/avatares.js'
import { inicialDoApelido } from '../domain/foto.js'
import ImagemAvatar from './ImagemAvatar.jsx'
import ModalAvatar from './ModalAvatar.jsx'

const t = textos.perfil.foto

// Bolinha do avatar: mostra a foto, o rosto escolhido ou a primeira letra do
// apelido. Tocar nela abre a janela de escolha (rostos, enviar foto ou voltar
// para a inicial). O campo de arquivo fica escondido e o botão "Enviar uma
// foto" clica nele pelo DOM.
export default function AvatarFoto({ apelido, foto, avatar, salvando, onEscolherFoto, onEscolherAvatar, onUsarInicial, className = '' }) {
  const campoArquivo = useRef(null)
  const [aberto, setAberto] = useState(false)
  const tipo = tipoDoAvatar({ foto, avatar })

  function enviarFoto() {
    setAberto(false)
    campoArquivo.current.click()
  }

  function aoEscolherArquivo(evento) {
    const arquivo = evento.target.files[0]
    onEscolherFoto(arquivo)
    // Limpa o campo para a mesma foto poder ser escolhida de novo.
    evento.target.value = ''
  }

  function escolherRosto(id) {
    onEscolherAvatar(id)
    setAberto(false)
  }

  function usarInicial() {
    onUsarInicial()
    setAberto(false)
  }

  let conteudo
  if (tipo === 'foto') {
    conteudo = <img src={foto} alt="" width={256} height={256} className="size-full rounded-full object-cover" />
  } else if (tipo === 'rosto') {
    conteudo = <ImagemAvatar id={avatar} tamanho={128} className="size-full" />
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
        onClick={() => setAberto(true)}
        disabled={salvando}
        aria-label={tipo === 'inicial' ? t.escolher : t.trocar}
        aria-haspopup="dialog"
        className={`group relative grid size-28 shrink-0 place-items-center rounded-full border-4 border-superficie bg-lilas-claro shadow-modal sm:size-32 ${className}`}
      >
        <span className="grid size-full place-items-center overflow-hidden rounded-full">{conteudo}</span>
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 grid size-11 place-items-center rounded-full border-[3px] border-superficie bg-indigo text-white transition-transform group-hover:scale-110 motion-reduce:transition-none"
        >
          <Pencil size={18} strokeWidth={2.25} />
        </span>
      </button>
      {aberto && (
        <ModalAvatar
          atual={tipo === 'rosto' ? avatar : null}
          onEscolher={escolherRosto}
          onEnviarFoto={enviarFoto}
          onUsarInicial={usarInicial}
          onFechar={() => setAberto(false)}
        />
      )}
      <input ref={campoArquivo} type="file" accept="image/*" onChange={aoEscolherArquivo} className="sr-only" tabIndex={-1} aria-hidden="true" />
    </>
  )
}
