import EstadoCarregando from './EstadoCarregando.jsx'

// Espaço reservado enquanto o código de uma página chega. Ocupa a altura
// da tela para o rodapé não "pular" quando a página aparece (CLS).
export default function CarregandoPagina() {
  return (
    <div className="min-h-screen">
      <EstadoCarregando />
    </div>
  )
}
