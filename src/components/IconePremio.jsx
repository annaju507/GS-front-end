// Ícones de prêmios (troféus, medalhas, selos), coleção "Ranking Awards" do
// SVG Repo, licença CC0. Cada medalha do Demokratos tem o seu; "roseta" é o
// ícone geral de medalhas (contadores). É enfeite: alt vazio.
const ARQUIVOS = import.meta.glob('../assets/premios/*.svg', { eager: true, import: 'default' })

const DA_MEDALHA = {
  primeiraLicao: 'primeira-licao',
  tresPoderes: 'tres-poderes',
  esferas: 'esferas',
  comoNasceUmaLei: 'como-nasce-uma-lei',
  chequeiAFonte: 'chequei-a-fonte',
  primeiraProposta: 'primeira-proposta',
  primeiraAnotacao: 'primeira-anotacao',
  tresDias: 'tres-dias',
  seteDias: 'sete-dias',
  trilhaConcluida: 'trilha-concluida',
}

// <IconePremio nome="roseta" /> ou <IconePremio medalha="esferas" />
export default function IconePremio({ nome, medalha, tamanho = 24, className = '' }) {
  let arquivo = nome
  if (medalha) {
    arquivo = DA_MEDALHA[medalha] ?? 'roseta'
  }
  return (
    <img
      src={ARQUIVOS[`../assets/premios/${arquivo}.svg`]}
      alt=""
      width={tamanho}
      height={tamanho}
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    />
  )
}
