import textos from '../data/textos.json'

const t = textos.representantes.perto

// Desenho das esferas: a cidade do Rio dentro do estado, dentro do país.
// O círculo da esfera "ativa" ganha contorno (acende junto com o bloco ao
// lado). As cores são fixas, claras e neutras (nenhuma ligada a partido), e
// o texto é escuro nos dois temas, então continua legível no modo escuro.
const CIRCULOS = [
  { esfera: 'pais', cx: 120, cy: 120, r: 115, cor: '#FFE5D4', texto: '#7A3A12', y: 34 },
  { esfera: 'estado', cx: 120, cy: 138, r: 78, cor: '#B7E7FC', texto: '#1C4E6B', y: 88 },
  { esfera: 'municipio', cx: 120, cy: 158, r: 42, cor: '#A186EF', texto: '#1A1A1A', y: 163 },
]

export default function CirculosEsferas({ ativa, onMarcar }) {
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label={t.desenho} className="mx-auto w-full max-w-[17rem]">
      {CIRCULOS.map((circulo) => (
        <circle
          key={circulo.esfera}
          cx={circulo.cx}
          cy={circulo.cy}
          r={circulo.r}
          fill={circulo.cor}
          onMouseEnter={() => onMarcar(circulo.esfera)}
          onMouseLeave={() => onMarcar(null)}
          className={`transition-[stroke-width] duration-200 motion-reduce:transition-none ${ativa === circulo.esfera ? 'stroke-texto' : 'stroke-superficie'}`}
          strokeWidth={ativa === circulo.esfera ? 5 : 4}
        />
      ))}
      {CIRCULOS.map((circulo) => (
        <text
          key={`${circulo.esfera}-nome`}
          x="120"
          y={circulo.y}
          textAnchor="middle"
          fill={circulo.texto}
          className="pointer-events-none font-titulo text-[0.8125rem] font-extrabold"
        >
          {t.rotulos[circulo.esfera]}
        </text>
      ))}
    </svg>
  )
}
