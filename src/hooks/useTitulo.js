import { useEffect } from 'react'
import textos from '../data/textos.json'

// Muda o título da aba a cada página: "Lição 1 · Demokratos". Ao sair,
// devolve o título anterior (útil na janela de Entrar, que abre por cima de
// outra página).
export function useTitulo(titulo) {
  useEffect(() => {
    const anterior = document.title
    if (titulo) {
      document.title = `${titulo} · ${textos.site.nome}`
    } else {
      document.title = textos.site.nome
    }
    return () => {
      document.title = anterior
    }
  }, [titulo])
}
