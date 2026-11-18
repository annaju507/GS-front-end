import { BookA, CircleUser, GraduationCap, House, Newspaper, NotebookPen, Scale, Users } from 'lucide-react'
import textos from '../../data/textos.json'

const t = textos.app.nav

// As 5 seções principais (barra inferior no celular, lateral no desktop).
export const SECOES = [
  { chave: 'aprender', para: '/app/trilha', rotulo: t.aprender, Icone: GraduationCap },
  { chave: 'agora', para: '/app/agora', rotulo: t.agora, Icone: Newspaper },
  { chave: 'representantes', para: '/app/representantes', rotulo: t.representantes, Icone: Users },
  { chave: 'direitos', para: '/app/direitos', rotulo: t.direitos, Icone: Scale },
  { chave: 'caderno', para: '/app/caderno', rotulo: t.caderno, Icone: NotebookPen },
]

// Início da plataforma (o painel), no topo da barra lateral.
export const INICIO = { chave: 'painel', para: '/app', rotulo: t.inicio, Icone: House }

export const GLOSSARIO = { chave: 'glossario', para: '/app/glossario', rotulo: t.glossario, Icone: BookA }
export const PERFIL = { chave: 'perfil', para: '/app/perfil', rotulo: t.perfil, Icone: CircleUser }
