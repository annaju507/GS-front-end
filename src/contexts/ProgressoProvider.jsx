import { useCallback, useState } from 'react'
import { ProgressoContext } from './ProgressoContext.js'
import trilha from '../data/trilha.json'
import { useAuth } from '../hooks/useAuth.js'
import { medalhasGanhas, medalhasNovas } from '../domain/conquistas.js'
import {
  PROGRESSO_VAZIO,
  calcularSequencia,
  dataLocalIso,
  registrarLicao,
  sequenciaPerdida,
} from '../domain/progresso.js'
import { lerProgresso, salvarProgresso } from '../services/progressoStorage.js'

function EstadoDoProgresso({ email, children }) {
  const [progresso, setProgresso] = useState(() => (email ? lerProgresso(email) : PROGRESSO_VAZIO))
  const hoje = dataLocalIso(new Date())
  const sequencia = calcularSequencia(progresso.dias, hoje)
  const medalhas = medalhasGanhas(progresso, sequencia, trilha.unidades)

  const atualizar = useCallback(
    (transformar) => {
      setProgresso((atual) => {
        const novo = transformar(atual)
        if (email) {
          salvarProgresso(email, novo)
        }
        return novo
      })
    },
    [email],
  )

  // Guarda a lição concluída e diz quais medalhas a pessoa acabou de ganhar.
  function concluirLicao(idLicao, resultado) {
    const novo = registrarLicao(progresso, idLicao, resultado, hoje)
    const novaSequencia = calcularSequencia(novo.dias, hoje)
    atualizar(() => novo)
    return {
      novas: medalhasNovas(medalhas, medalhasGanhas(novo, novaSequencia, trilha.unidades)),
      sequencia: novaSequencia,
    }
  }

  const registrarFonteConsultada = useCallback(() => {
    atualizar((atual) => ({ ...atual, fontesConsultadas: atual.fontesConsultadas + 1 }))
  }, [atualizar])

  const registrarPropostaLida = useCallback(
    (id) => {
      atualizar((atual) => {
        if (atual.propostasLidas.includes(id)) {
          return atual
        }
        return { ...atual, propostasLidas: [...atual.propostasLidas, id] }
      })
    },
    [atualizar],
  )

  const valor = {
    progresso,
    sequencia,
    perdeuSequencia: sequenciaPerdida(progresso.dias, hoje),
    medalhas,
    concluirLicao,
    registrarFonteConsultada,
    registrarPropostaLida,
  }

  return <ProgressoContext.Provider value={valor}>{children}</ProgressoContext.Provider>
}

// Recomeça o estado quando a conta muda (key = e-mail da conta).
export default function ProgressoProvider({ children }) {
  const { usuario } = useAuth()
  const email = usuario?.email ?? null

  return (
    <EstadoDoProgresso key={email ?? 'sem-conta'} email={email}>
      {children}
    </EstadoDoProgresso>
  )
}
