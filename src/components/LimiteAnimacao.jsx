import { Component } from 'react'

// Se a animação não carregar (internet caiu, arquivo faltando), não quebra a
// página: some só a animação e fica a imagem parada do mascote.
export default class LimiteAnimacao extends Component {
  constructor(props) {
    super(props)
    this.state = { falhou: false }
  }

  static getDerivedStateFromError() {
    return { falhou: true }
  }

  render() {
    if (this.state.falhou) {
      return null
    } else {
      return this.props.children
    }
  }
}
