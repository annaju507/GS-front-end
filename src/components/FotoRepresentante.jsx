import { useState } from 'react'
import textos from '../data/textos.json'
import { iniciais } from '../domain/representantes.js'
import { preencher } from '../domain/texto.js'

const TAMANHOS = { lista: 'size-16', perfil: 'size-32' }

// Foto oficial, sempre do mesmo tamanho e formato, sem filtro nem moldura
// colorida (Identidade Visual seção 8). Sem foto no projeto (ou se a imagem
// do site oficial não carregar), mostra as iniciais no mesmo círculo.
export default function FotoRepresentante({ pessoa, tamanho = 'lista' }) {
  const [falhou, setFalhou] = useState(false)
  const classes = `${TAMANHOS[tamanho]} shrink-0 rounded-full border border-borda bg-desativado`

  if (!pessoa.foto || falhou) {
    return (
      <span aria-hidden="true" className={`${classes} flex items-center justify-center font-titulo font-bold text-texto-2`}>
        {iniciais(pessoa.nome)}
      </span>
    )
  }

  const pixels = tamanho === 'perfil' ? 128 : 64
  return (
    <img
      src={pessoa.foto}
      alt={tamanho === 'perfil' ? preencher(textos.representantes.perfil.fotoAlt, { nome: pessoa.nome }) : ''}
      width={pixels}
      height={pixels}
      loading="lazy"
      decoding="async"
      onError={() => setFalhou(true)}
      className={`${classes} object-cover object-top`}
    />
  )
}
