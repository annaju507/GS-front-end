import { Link } from 'react-router'

// Card (seção 6.5). Com "para", a área inteira vira um link (nada clicável em div).
// "destaque" marca a lição atual com borda lilás de 2px.
export default function Card({ como: Tag = 'div', para, destaque = false, className = '', children, ...resto }) {
  const borda = destaque ? 'border-2 border-lilas' : 'border border-borda'
  const base = `block rounded-card bg-superficie p-4 shadow-card dark:shadow-none md:p-6 ${borda} ${className}`

  if (para) {
    return (
      <Link
        to={para}
        className={`${base} text-texto no-underline transition-colors duration-150 hover:border-lilas`}
        {...resto}
      >
        {children}
      </Link>
    )
  }

  return (
    <Tag className={base} {...resto}>
      {children}
    </Tag>
  )
}
