// Foguinho da sequência de dias: uma chama com carinha, em três camadas que
// tremulam em ritmos diferentes, com olhos que piscam e um brilho embaixo
// (animações em index.css, classes .foguinho). É enfeite (aria-hidden).
// Aceita "size" também, para entrar no lugar de um ícone do Lucide.
export default function Foguinho({ tamanho, size, className = '' }) {
  const largura = tamanho ?? size ?? 32
  return (
    <svg
      viewBox="0 0 120 160"
      width={largura}
      height={Math.round(largura * 1.33)}
      aria-hidden="true"
      focusable="false"
      className={`foguinho shrink-0 overflow-visible ${className}`}
    >
      <ellipse className="foguinho-brilho" cx="60" cy="146" rx="42" ry="9" fill="#FFB347" opacity="0.4" />
      <path
        className="foguinho-chama foguinho-c1"
        fill="#E8622A"
        d="M60 6 C74 38 106 56 101 100 C97 136 78 152 60 152 C40 152 19 136 19 104 C19 80 33 68 40 48 C46 64 52 70 57 72 C52 50 53 28 60 6 Z"
      />
      <path
        className="foguinho-chama foguinho-c2"
        fill="#FF9F1C"
        d="M60 46 C71 70 90 86 87 113 C85 135 72 147 60 147 C46 147 33 135 33 115 C33 98 44 90 48 77 C52 89 56 92 58 94 C56 79 56 64 60 46 Z"
      />
      <path
        className="foguinho-chama foguinho-c3"
        fill="#FFE066"
        d="M60 92 C67 104 77 113 76 127 C75 139 68 145 60 145 C51 145 44 139 44 128 C44 116 53 109 60 92 Z"
      />
      <ellipse className="foguinho-olho" cx="51" cy="118" rx="3.6" ry="5" fill="#3A1306" />
      <ellipse className="foguinho-olho" cx="69" cy="118" rx="3.6" ry="5" fill="#3A1306" />
      <path d="M53 128 Q60 135 67 128" stroke="#3A1306" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="46" cy="126" rx="3.5" ry="2.2" fill="#FF7A59" opacity="0.7" />
      <ellipse cx="74" cy="126" rx="3.5" ry="2.2" fill="#FF7A59" opacity="0.7" />
    </svg>
  )
}
