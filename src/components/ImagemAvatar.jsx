// Rostos para o avatar do perfil, coleção "Character Emotion Expression" do
// SVG Repo, licença CC0 (o verde original virou lilás, porque verde no site é
// só para acerto). É enfeite: quem usa dá o nome no botão.
const ARQUIVOS = import.meta.glob('../assets/avatares/*.svg', { eager: true, import: 'default' })

export default function ImagemAvatar({ id, tamanho = 64, className = '' }) {
  return (
    <img
      src={ARQUIVOS[`../assets/avatares/${id}.svg`]}
      alt=""
      width={tamanho}
      height={tamanho}
      loading="lazy"
      decoding="async"
      className={className}
    />
  )
}
