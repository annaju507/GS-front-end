// Interruptor liga/desliga (role="switch"). O nome vem do título do quadro
// (aria-labelledby). Ligado: trilho na cor do botão principal (preto no
// claro, lilás no escuro) e bolinha em contraste.
export default function Interruptor({ ligado, onAlternar, idRotulo }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ligado}
      aria-labelledby={idRotulo}
      onClick={onAlternar}
      className="grid min-h-11 min-w-11 place-items-center rounded-full"
    >
      <span
        aria-hidden="true"
        className={`relative block h-7 w-12 rounded-full border-2 transition-colors duration-150 motion-reduce:transition-none ${
          ligado ? 'border-botao bg-botao' : 'border-borda-campo bg-superficie'
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 size-5 rounded-full transition-[translate] duration-150 motion-reduce:transition-none ${
            ligado ? 'translate-x-5 bg-botao-texto' : 'translate-x-0 bg-borda-campo'
          }`}
        />
      </span>
    </button>
  )
}
