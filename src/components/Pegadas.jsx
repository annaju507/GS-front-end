// Desenhos das pegadas de cada mascote (24x24, dedos para cima). Ficam num
// <defs> desenhado uma vez na página e são reaproveitados com <use>.
// Todos usam currentColor (a cor vem de quem usa).
export function DefinicoesPegadas() {
  return (
    <defs>
      {/* Cachorro: almofada e quatro dedos ovais. */}
      <symbol id="pegada-caramelo" viewBox="0 0 24 24">
        <ellipse cx="12" cy="16.5" rx="5" ry="4.2" fill="currentColor" />
        <ellipse cx="5.6" cy="10" rx="1.9" ry="2.4" fill="currentColor" />
        <ellipse cx="9.6" cy="6" rx="2" ry="2.6" fill="currentColor" />
        <ellipse cx="14.4" cy="6" rx="2" ry="2.6" fill="currentColor" />
        <ellipse cx="18.4" cy="10" rx="1.9" ry="2.4" fill="currentColor" />
      </symbol>
      {/* Capivara: quatro dedos compridos, quase juntos, e a palma. */}
      <symbol id="pegada-capivara" viewBox="0 0 24 24">
        <ellipse cx="12" cy="18" rx="5.6" ry="3.4" fill="currentColor" />
        <ellipse cx="6.8" cy="9.5" rx="1.7" ry="4.2" fill="currentColor" transform="rotate(-12 6.8 9.5)" />
        <ellipse cx="10.4" cy="8" rx="1.7" ry="4.6" fill="currentColor" />
        <ellipse cx="13.6" cy="8" rx="1.7" ry="4.6" fill="currentColor" />
        <ellipse cx="17.2" cy="9.5" rx="1.7" ry="4.2" fill="currentColor" transform="rotate(12 17.2 9.5)" />
      </symbol>
      {/* Arara: pé de papagaio em X, dois dedos para a frente e dois para trás. */}
      <symbol id="pegada-arara" viewBox="0 0 24 24">
        <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none">
          <path d="M12 12 L7.5 3.5" />
          <path d="M12 12 L16.5 3.5" />
          <path d="M12 12 L6.5 20.5" />
          <path d="M12 12 L17.5 20.5" />
        </g>
        <circle cx="12" cy="12" r="2.4" fill="currentColor" />
      </symbol>
      {/* Onça: almofada larga em três lobos e quatro dedos redondos. */}
      <symbol id="pegada-onca" viewBox="0 0 24 24">
        <path
          d="M12 12.2c2.2 0 3.2 1.6 4.4 2.9 1.3 1.4 2.6 2.1 2.6 3.6 0 1.7-1.6 2.8-3.3 2.8-1.4 0-2.4-.6-3.7-.6s-2.3.6-3.7.6C6.6 21.5 5 20.4 5 18.7c0-1.5 1.3-2.2 2.6-3.6 1.2-1.3 2.2-2.9 4.4-2.9z"
          fill="currentColor"
        />
        <circle cx="5.2" cy="10.4" r="2.2" fill="currentColor" />
        <circle cx="9.4" cy="6.4" r="2.3" fill="currentColor" />
        <circle cx="14.6" cy="6.4" r="2.3" fill="currentColor" />
        <circle cx="18.8" cy="10.4" r="2.2" fill="currentColor" />
      </symbol>
      {/* Mico: mãozinha com quatro dedos finos e o polegar de lado. */}
      <symbol id="pegada-mico" viewBox="0 0 24 24">
        <ellipse cx="12.5" cy="15.5" rx="4.6" ry="5" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M9.6 11.5 L8.6 4.5" />
          <path d="M11.8 10.8 L11.6 3" />
          <path d="M14 10.8 L14.6 3.4" />
          <path d="M16 11.6 L17.6 5.4" />
          <path d="M8.2 16 L4 13" />
        </g>
      </symbol>
    </defs>
  )
}
