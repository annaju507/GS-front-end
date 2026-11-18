import { curvaSuave, pegadasDoTrecho } from '../domain/caminho.js'
import { bichoDaUnidade, contarEstrelas, estadoDaLicao, posicaoNoCaminho } from '../domain/trilha.js'
import { buscarLicao } from '../services/conteudoLocal.js'
import { useTamanho } from '../hooks/useTamanho.js'
import Mascote from './Mascote.jsx'
import NoTrilha, { ALTURA_PARADA } from './NoTrilha.jsx'

// Cor das pegadas de cada mascote.
const COR_DA_PEGADA = {
  caramelo: 'text-caramelo',
  capivara: 'text-capivara',
  arara: 'text-arara',
  onca: 'text-onca',
  mico: 'text-mico',
}

// Tempo entre uma pegada e a próxima quando elas andam (ms).
const RITMO_DOS_PASSOS = 110

// Caminho sinuoso de uma unidade (estilo mapa de fases): uma curva suave liga
// as paradas e, no lugar da estrada, ficam as pegadas do mascote da unidade.
// O trecho já percorrido tem pegadas fortes; o que falta, pegadas clarinhas.
// "desbloqueio" é a lição recém-liberada: as pegadas andam até ela.
// As pegadas são só enfeite; a lista de lições é a informação.
export default function CaminhoTrilha({ unidade, indiceDaUnidade, ordem, concluidas, cena, desbloqueio }) {
  const [refMapa, tamanho] = useTamanho()
  const bicho = bichoDaUnidade(indiceDaUnidade)
  const paradas = unidade.licoes.map((idLicao, indice) => ({
    idLicao,
    licao: buscarLicao(idLicao),
    numero: ordem.indexOf(idLicao) + 1,
    estado: estadoDaLicao(idLicao, ordem, concluidas),
    estrelas: contarEstrelas(concluidas[idLicao]),
    ...posicaoNoCaminho(indice, indiceDaUnidade),
  }))
  const altura = paradas.length * ALTURA_PARADA
  const mascoteNaDireita = indiceDaUnidade % 2 === 1

  // Geometria em px, a partir do tamanho real do mapa.
  let trechos = []
  let tamanhoPegada = 0
  let passosAteDesbloquear = 0
  if (tamanho.largura > 0) {
    const rem = tamanho.altura / altura
    tamanhoPegada = 1.4 * rem
    const pontos = paradas.map((parada, indice) => ({
      x: (parada.x / 100) * tamanho.largura,
      y: (indice + 0.5) * ALTURA_PARADA * rem,
    }))
    trechos = curvaSuave(pontos).map((trecho, indice) => {
      const anda = paradas[indice + 1].idLicao === desbloqueio
      const pegadas = pegadasDoTrecho(trecho, {
        espaco: 1.7 * rem,
        margemInicio: 5.2 * rem,
        margemFim: 2.6 * rem,
        desvio: 0.45 * rem,
      })
      if (anda) {
        passosAteDesbloquear = pegadas.length
      }
      return { pegadas, anda, percorrido: paradas[indice].estado === 'concluida' }
    })
  }

  return (
    <div ref={refMapa} className="relative" style={{ height: `${altura}rem` }}>
      <svg aria-hidden="true" className={`absolute inset-0 size-full overflow-visible ${COR_DA_PEGADA[bicho]}`}>
        {trechos.map((trecho, indiceTrecho) =>
          trecho.pegadas.map((pegada, indicePegada) => (
            <g key={`${indiceTrecho}-${indicePegada}`} transform={`translate(${pegada.x} ${pegada.y}) rotate(${pegada.angulo})`}>
              <use
                href={`#pegada-${bicho}`}
                x={-tamanhoPegada / 2}
                y={-tamanhoPegada / 2}
                width={tamanhoPegada}
                height={tamanhoPegada}
                opacity={trecho.percorrido ? 1 : 0.28}
                className={trecho.anda ? 'pegada-andando' : undefined}
                style={trecho.anda ? { animationDelay: `${indicePegada * RITMO_DOS_PASSOS}ms` } : undefined}
              />
            </g>
          )),
        )}
      </svg>

      <ol className="absolute inset-0">
        {paradas.map((parada, indice) => (
          <NoTrilha
            key={parada.idLicao}
            licao={parada.licao}
            numero={parada.numero}
            estado={parada.estado}
            estrelas={parada.estrelas}
            x={parada.x}
            lado={parada.lado}
            linha={indice}
            desbloqueando={parada.idLicao === desbloqueio}
            atrasoDesbloqueio={passosAteDesbloquear * RITMO_DOS_PASSOS + 150}
          />
        ))}
      </ol>

      {/* O mascote fica perto da 3ª parada, no lado que o caminho deixa livre. */}
      <span
        className={`pointer-events-none absolute -translate-y-1/2 ${mascoteNaDireita ? 'right-0' : 'left-0'}`}
        style={{ top: `${2.5 * ALTURA_PARADA}rem` }}
      >
        <Mascote nome={cena.nome} expressao={cena.expressao} tamanho="corpo" largura={80} />
      </span>
    </div>
  )
}
