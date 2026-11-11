# Demokratos: checklist de acessibilidade e desempenho

Data da verificação: 11/11/2026. Versão medida: build de produção (`npm run build` e `npm run preview`).

## 1. Verificação automática

### Lighthouse 13.6 (modo celular, janela limpa)

| Página | Acessibilidade | Desempenho | Boas práticas | LCP | CLS | Print |
|---|---|---|---|---|---|---|
| Início `/` | 100 | 100 | 100 | 0,9 s | 0 | `lighthouse-inicio.png` |
| Entrar `/entrar` | 100 | 100 | 100 | 1,3 s | 0 | `lighthouse-entrar.png` |
| Painel `/app` | 100 | 99 | 100 | 1,5 s | 0 | `lighthouse-painel.png` |
| Trilha `/app/trilha` | 100 | 99 | 100 | 1,4 s | 0 | `lighthouse-trilha.png` |
| Lição `/app/licao/u1-l1` | 100 | 99 | 100 | 1,4 s | 0 | `lighthouse-licao.png` |
| Quiz `/app/quiz/u1-l1` | 100 | 100 | 100 | 1,3 s | 0 | `lighthouse-quiz.png` |
| Agora `/app/agora` | 100 | 100 | 100 | 1,5 s | 0 | `lighthouse-agora.png` |
| Glossário `/app/glossario` | 100 | 100 | 100 | 1,3 s | 0 | `lighthouse-glossario.png` |
| Caderno `/app/caderno` | 100 | 98 | 100 | 2,3 s | 0,002 | `lighthouse-caderno.png` |
| Representantes `/app/representantes/municipio` | 100 | 99 | 100 | 1,6 s | 0 | `lighthouse-representantes.png` |
| Direitos `/app/direitos/alertas-de-chuva` | 100 | 100 | 100 | 1,3 s | 0 | `lighthouse-direitos.png` |

As páginas internas foram medidas com uma conta de teste já logada (login simulado no navegador).

### axe-core 4.14 (regras WCAG 2.1 A e AA)

Resultado: **68 de 68 verificações sem problemas** (print: `axe-resultado.png`).

- 31 páginas no tema claro e as mesmas 31 no tema escuro, mais 6 páginas no celular (375px), incluindo o menu aberto.
- Estados que só aparecem com interação também foram verificados: gaveta de feedback do quiz aberta e termo do glossário aberto dentro da lição.
- Junto com o axe, rodamos verificações próprias em todas as páginas: um único `h1`, títulos sem pular nível, imagens com `width` e `height`, alvos de toque com pelo menos 44px, nenhum travessão na tela, nenhuma rolagem lateral, presença de `main` e do link "Pular para o conteúdo".

O axe-core é o mesmo motor da extensão axe DevTools.

### Contraste das cores (`npm run medir-contraste`)

O script lê os tokens de cor do CSS e mede todos os pares usados no site, nos dois temas. Texto: mínimo 4,5:1. Bordas, ícones e partes de componentes: mínimo 3:1. Todos os pares obrigatórios passam. Um par fica só como aviso: a barra de progresso (lilás sobre lilás-claro, 2,47:1), porque a porcentagem sempre aparece escrita ao lado.

## 2. Verificação manual

| Item | Como verificamos | Resultado |
|---|---|---|
| Navegação só com Tab | Tab nas páginas Início, Painel, Quiz e Glossário | O primeiro foco é "Pular para o conteúdo"; a ordem segue a leitura; todo elemento focado mostra o anel de foco (3px). As opções do quiz são um grupo de rádio: uma parada de Tab e setas para trocar. |
| Zoom de 200% | Tela de 640px (equivale a 200% num monitor de 1280px) e de 320px, em 12 páginas | Nenhuma rolagem lateral. Tudo em `rem`, então A+ e A- também escalam o layout. |
| Hierarquia de títulos | Verificação própria em todas as páginas | Um `h1` por página e nenhum nível pulado. |
| Texto alternativo | Revisão do código | Mascote ao lado de balão com texto: `alt=""`. Foto de político no perfil: "Foto oficial de (nome)". Ícones decorativos com `aria-hidden`; ícones sozinhos em botões com `aria-label`. |
| Feedback dinâmico | Leitura do código e teste no navegador | Resultado do quiz anunciado (`aria-live="assertive"`), foco vai para CONTINUAR; erros de formulário ligados ao campo (`aria-describedby`) e foco no primeiro campo com erro; toasts e contagens anunciados (`aria-live="polite"`). |
| Reduzir animações | Teste com a opção ligada e com `prefers-reduced-motion` | Sem confete, sem balanço, sem flutuação e sem o "afundar" dos botões; só as cores mudam. |
| Modo escuro | Auditoria completa repetida no tema escuro | Sem problemas. |

## 3. O que as ferramentas não pegam (a fazer pela equipe)

- **Leitor de tela de verdade:** testar o fluxo principal (Trilha, Lição, Quiz, Conquista) com NVDA (Windows) ou TalkBack (Android). As ferramentas confirmam a estrutura, mas não a experiência de ouvir o site.
- **Site publicado:** repetir o Lighthouse na URL publicada, em janela anônima, porque o servidor final muda os tempos de carregamento.
- **Extensão axe DevTools:** se o professor pedir print da extensão, rodar a extensão no navegador nas mesmas páginas e salvar os prints aqui.
- **Textos finais:** quando o Lorem Ipsum for trocado pelos textos reais, rodar de novo o Lighthouse e o axe (títulos e comprimento das frases mudam).
