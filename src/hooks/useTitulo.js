import { useEffect } from 'react'
import textos from '../data/textos.json'

// Muda o título da aba a cada página: "Lição 1 · Demokratos".
export function useTitulo(titulo) {
  useEffect(() => {
    if (titulo) {
      document.title = `${titulo} · ${textos.site.nome}`
    } else {
      document.title = textos.site.nome
    }
  }, [titulo])
}
