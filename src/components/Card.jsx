import { Link } from 'react-router'

// Card (seção 6.5). Com "para", a área inteira vira um link (nada clicável em div).
// "destaque" marca a lição atual com borda lilás de 2px.
// Como link, o card sobe um pouco ao passar o mouse e volta ao clicar.
export default function Card({ como: Tag = 'div', para, destaque = false, className = '', children, ...resto }) {
  const borda = destaque ? 'border-2 border-lilas' : 'border border-borda'
  // Só usa 'block' se a página não pediu outro layout (flex, grid...), para as classes não brigarem.
  const exibicao = /(^|\s)(flex|grid|inline-flex|inline-block)(\s|$)/.test(className) ? '' : 'block'
  const base = `${exibicao} rounded-card bg-superficie p-4 shadow-card dark:shadow-none md:p-6 ${borda} ${className}`

  if (para) {
    return (
      <Link
        to={para}
        className={`${base} text-texto no-underline transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-lilas hover:shadow-modal active:translate-y-0`}
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
