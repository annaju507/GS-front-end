// Ondas do calçadão (seção 18.3): duas linhas onduladas em lilás, na base
// do hero, da boas-vindas e do rodapé. Decorativas.
export default function OndasCalcadao({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className={`block h-6 w-full text-lilas opacity-55 md:h-8 ${className}`}
    >
      <path
        d="M0 12 Q 50 0 100 12 T 200 12 T 300 12 T 400 12 T 500 12 T 600 12 T 700 12 T 800 12 T 900 12 T 1000 12 T 1100 12 T 1200 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 30 Q 50 18 100 30 T 200 30 T 300 30 T 400 30 T 500 30 T 600 30 T 700 30 T 800 30 T 900 30 T 1000 30 T 1100 30 T 1200 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
