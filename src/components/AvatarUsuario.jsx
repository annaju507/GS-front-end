import { tipoDoAvatar } from '../domain/avatares.js'
import { inicialDoApelido } from '../domain/foto.js'
import ImagemAvatar from './ImagemAvatar.jsx'

// Bolinha do avatar só para mostrar (sem editar): a foto, o rosto escolhido
// ou a inicial do apelido. É enfeite: o nome da pessoa aparece ao lado.
export default function AvatarUsuario({ usuario, className = '' }) {
  const tipo = tipoDoAvatar(usuario)

  let conteudo
  if (tipo === 'foto') {
    conteudo = <img src={usuario.foto} alt="" width={128} height={128} className="size-full object-cover" />
  } else if (tipo === 'rosto') {
    conteudo = <ImagemAvatar id={usuario.avatar} tamanho={128} className="size-full" />
  } else {
    conteudo = <span className="font-titulo text-[2rem] font-extrabold text-link">{inicialDoApelido(usuario.apelido)}</span>
  }

  return (
    <span
      aria-hidden="true"
      className={`grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border-[3px] border-superficie bg-lilas-claro shadow-[0_0_0_0.1875rem_var(--color-lilas)] sm:size-[4.5rem] ${className}`}
    >
      {conteudo}
    </span>
  )
}
