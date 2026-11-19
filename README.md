# Demokratos

> **Facilitamos o seu caminho para entender política, com neutralidade.**
> A gente não diz em quem votar nem o que pensar. Mostramos os fatos e a fonte oficial, e a conclusão é sua.

Plataforma web de educação política para quem mora no Rio de Janeiro. Ensina, em linguagem simples, como a política funciona (trilhas de lições, quiz e mascotes) e mostra propostas, representantes e direitos reais, sempre com a fonte oficial.

## Objetivo

O foco principal do Demokratos é ajudar quem **nunca teve acesso, ou teve pouco acesso, à educação política** a começar a entender como as decisões são tomadas na cidade, no estado e no país. A ideia é que cada pessoa ganhe confiança para acompanhar, perguntar e participar por conta própria, de forma **capaz e autônoma**.

O nome vem de *demos* (povo) e *kratos* (poder): se a democracia é o poder do povo, o Demokratos quer entregar ao povo o poder do conhecimento.

A plataforma é **neutra e apartidária**: não apoia partido, político ou ideologia, não recomenda voto e mostra todos os representantes no mesmo formato. Cada informação factual vem com a fonte oficial, a data da consulta e o link, para a pessoa conferir e tirar as próprias conclusões.

Global Solution FIAP 2026, 2º semestre: CitizenTech. Engenharia de Software, 1º ano, Rio de Janeiro. Disciplinas: **Front-end Design** e **Web Development** (mesmo repositório).

## Ficha da CitizenTech

| Campo | Resposta |
|---|---|
| Nome | Demokratos |
| Cidade e bairro | Rio de Janeiro (RJ), toda a cidade |
| Cidadão beneficiado | Moradores do Rio de diferentes idades e escolaridades, principalmente quem teve pouco ou nenhum acesso à educação política e evita o assunto por achar complicado, distante ou polarizado |
| Problema, em uma frase | É difícil entender e encontrar informação política confiável e ligada à vida no Rio, porque a linguagem é técnica, falta educação política básica e as fontes oficiais são espalhadas |
| Como funciona | A pessoa cria uma conta (simulada), faz trilhas curtas de lições com quiz, ganha medalhas e mantém a sequência de dias, vê propostas reais da Câmara dos Deputados explicadas em linguagem simples, conhece seus representantes nas três esferas, consulta seus direitos e serviços públicos e guarda anotações no Caderno cívico |
| O que cada parte faz | **Front-end:** interface em React + Tailwind, acessível, responsiva e com modo escuro. **Web Dev:** interações em JavaScript (quiz com sons, caderno com CRUD, glossário, comemorações, efeitos de rolagem, tema claro/escuro, tamanho da letra) |
| Link do repositório | https://github.com/annaju507/GS-front-end |
| Indicador de impacto | Acertos no quiz e lições concluídas na trilha (compreensão), consultas às fontes oficiais pela gaveta "POR QUÊ?" e anotações salvas no Caderno cívico |
| ODS conectados | **ODS 4, Educação de qualidade:** educação cidadã acessível e contínua. **ODS 10, Redução das desigualdades:** linguagem simples, acessibilidade e informação pública ao alcance de qualquer pessoa, principalmente de quem teve menos acesso. **ODS 11, Cidades e comunidades sustentáveis:** ajuda quem mora no Rio a entender quem cuida da cidade, conhecer os serviços públicos e participar das decisões locais |

## Site publicado

[demokratos.vercel.app](https://demokratos.vercel.app/)

## Como rodar

Precisa do Node.js 20 ou mais novo.

```bash
npm install
npm run dev
```

Abra http://localhost:5173. Para entrar na área interna, crie uma conta em **Criar conta** (o login é simulado e fica só no navegador).

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Abre a versão de produção localmente |
| `npm run lint` | Confere o código com o ESLint |
| `npm run checar-travessoes` | Garante que nenhum travessão aparece no site (regra de escrita do projeto; roda sozinho antes de cada commit) |
| `npm run medir-contraste` | Mede o contraste das cores nos temas claro e escuro (WCAG 2.1) |
| `npm run coleta-propostas` | Atualiza os dados oficiais das propostas na API da Câmara |
| `npm run coleta-representantes` | Atualiza vereadores e deputados estaduais a partir dos sites oficiais |

## Tecnologias

- **React 19** em JavaScript, com **Vite 8**
- **Tailwind CSS 4** (tokens de cor e tipografia em `src/index.css`, modo escuro por classe)
- **React Router** (rotas públicas, rotas protegidas e páginas carregadas sob demanda)
- **Lucide** (ícones)
- **lottie-web** (animações do confete, da medalha e dos mascotes)
- **Web Audio API** do navegador para os sons da trilha (sem biblioteca e sem arquivos de áudio)
- Animações e efeitos de rolagem feitos com CSS e JavaScript, sem biblioteca
- HTML semântico, sem outras linguagens

## APIs e dados

| Fonte | Uso | Tipo |
|---|---|---|
| [MockAPI](https://mockapi.io) | Caderno cívico: criar, listar, editar e excluir anotações | **CRUD** (POST, GET, PUT, DELETE) |
| [Dados Abertos da Câmara dos Deputados](https://dadosabertos.camara.leg.br/swagger/api.html) | Propostas, movimentações ao vivo e deputados federais do RJ | Leitura |
| [Dados Abertos do Senado](https://legis.senado.leg.br/dadosabertos/docs/) | Senadores do RJ | Leitura |
| Sites da Câmara Municipal do Rio e da ALERJ | Vereadores e deputados estaduais (coletados por script, sem API pública) | JSON gerado |
| Planalto, ALERJ, Câmara do Rio, TSE e glossários do Congresso | Fonte de cada lição, pergunta do quiz e termo do glossário | Citação com link e data |

Nenhum dado pessoal real é usado. A conta do protótipo fica no `localStorage` do navegador, e o Caderno cívico guarda no MockAPI só um código gerado a partir da conta (o e-mail não sai do navegador).

## Funcionalidades

- **Área pública:** Início com efeitos de rolagem (scroll trigger, scroll linked e parallax), Como funciona, Sobre (com a equipe e a origem do nome) e prévias das áreas
- **Entrar e Criar conta:** abrem numa janela por cima da página em que a pessoa está, com o fundo embaçado
- **Boas-vindas:** apresentação, ponto de partida e ajustes de leitura
- **Início (área interna):** comemoração animada da sequência de dias com o foguinho, caixa de mensagens (proposta do dia, medalha nova, sequência), prateleira de conquistas e a lição para continuar
- **Trilha:** 8 unidades com 4 lições cada, quiz de 3 perguntas por lição, sons de acerto, erro e comemoração, medalhas com animação e sequência de dias
- **Agora:** propostas reais em cartões por área, com filtro por Saúde, Educação, Segurança, Cidade e serviços públicos e outros temas, busca e etapas da tramitação
- **Representantes:** município, estado e país, todos no mesmo formato e em ordem alfabética (regra de neutralidade)
- **Direitos:** um quadro para cada área; ao tocar, abre a lista de serviços daquela área, cada um com o passo a passo e o canal oficial
- **Glossário:** termos de A a Z com busca em tempo real e estante de letras, que também abrem dentro das lições
- **Caderno cívico:** anotações sobre propostas (CRUD), uma por página, com setas para passar
- **Perfil:** progresso, trilha, todas as medalhas e avatar (um dos rostos ilustrados ou uma foto)
- **Leitura:** modo claro/escuro, letra maior ou menor (A+ e A-), reduzir animações e ligar ou desligar os sons

## Organização do código

```
src/
  services/    acesso a dados: fetch, URLs das APIs e localStorage
  domain/      regras de negócio em funções puras (quiz, medalhas, tramitação, validação)
  hooks/       custom hooks que ligam serviços e estado (useCaderno, useQuiz, useTheme...)
  contexts/    estado compartilhado: conta, progresso e preferências
  components/  componentes reutilizáveis de apresentação (Botao, Card, OpcoesQuiz...)
  pages/       uma página por rota, só apresentação
  data/        textos da interface e conteúdo educativo em JSON, com fonte
  assets/      mascotes e ilustrações em WebP
scripts/       coleta de dados oficiais e checagens automáticas
```

Todos os textos da interface ficam em `src/data/textos.json`, nunca escritos direto nos componentes.

### Custom hooks

`useAtalhosQuiz`, `useAuth`, `useCaderno`, `useContagem`, `useFotoPerfil`, `useFundoConta`, `useGlossario`, `useInicio`, `useMedalhasNovas`, `useMovimentacoes`, `useNaTela`, `usePreferencias`, `useProgresso`, `useProgressoRolagem`, `useProposicao`, `useQuestao`, `useQuiz`, `useReducedMotion`, `useRepresentante`, `useRepresentantes`, `useRolarAoTopo`, `useSons`, `useTamanhoLetra`, `useTheme`, `useTitulo`.

## Web Development: onde está cada conceito

### Interações principais

1. **Quiz com feedback:** a pessoa escolhe uma opção, o código decide se acertou, soma os pontos, toca o som de acerto ou erro, o mascote reage e a explicação com a fonte aparece.
2. **Caderno cívico:** formulário com validação, contador de caracteres, edição, confirmação antes de excluir e uma anotação por página.
3. **Glossário:** busca em tempo real, estante de letras que leva até a primeira palavra e termos que abrem a explicação dentro da lição.
4. **Comemorações:** contagem animada do foguinho, medalhas que entram girando e caixa de mensagens que marca o que já foi lido.
5. **Modo claro/escuro**, **tamanho da letra**, **reduzir animações** e **sons**.

### Manipulação do DOM

| Onde | O que faz | Arquivo |
|---|---|---|
| Modo claro/escuro | `document.documentElement.classList.toggle('dark')` | [src/hooks/useTheme.js](src/hooks/useTheme.js) |
| Tamanho da letra | `document.documentElement.style.fontSize = ...` | [src/hooks/useTamanhoLetra.js](src/hooks/useTamanhoLetra.js) |
| Reduzir animações | `classList.add` / `classList.remove('reduzir-animacoes')` | [src/hooks/useReducedMotion.js](src/hooks/useReducedMotion.js) |
| Título da aba | `document.title = ...` em cada página | [src/hooks/useTitulo.js](src/hooks/useTitulo.js) |
| Quiz | Leva o foco ao feedback e rola até a explicação (`focus()` e `scrollIntoView()`) | [src/hooks/useQuestao.js](src/hooks/useQuestao.js) |
| Caderno cívico | Foco no campo com erro | [src/components/FormAnotacao.jsx](src/components/FormAnotacao.jsx) |
| Entrar e Criar conta | Foco no primeiro campo com erro | [src/pages/Cadastro.jsx](src/pages/Cadastro.jsx) |
| Termos nas lições | Abre a explicação, rola até ela e devolve o foco ao fechar | [src/components/TextoComTermos.jsx](src/components/TextoComTermos.jsx) |
| Efeitos de rolagem | Grava o quanto cada parte já rolou numa variável CSS (`style.setProperty('--progresso', ...)`) | [src/hooks/useProgressoRolagem.js](src/hooks/useProgressoRolagem.js) |
| Janelas (Entrar, avatar, temas de Direitos, comemorações) | Abre o `<dialog>` com `showModal()` e trava a rolagem do fundo | [src/components/ModalConta.jsx](src/components/ModalConta.jsx) |
| Glossário | Rola a página até a primeira palavra da letra ficar embaixo do ponteiro (`window.scrollTo`) | [src/components/EstanteLetras.jsx](src/components/EstanteLetras.jsx) |
| Conquistas no Início | Setas que passam a prateleira (`scrollBy`) | [src/components/PrateleiraConquistas.jsx](src/components/PrateleiraConquistas.jsx) |
| Sons | Cria os sons no navegador com a Web Audio API | [src/services/sons.js](src/services/sons.js) |

### Operadores condicionais (if/else)

| Onde | O que decide | Arquivo |
|---|---|---|
| Quiz | Acerto ou erro e pontuação | [src/hooks/useQuiz.js](src/hooks/useQuiz.js), [src/domain/quiz.js](src/domain/quiz.js) |
| Caderno cívico | Se a anotação pode ser salva e qual erro mostrar | [src/domain/caderno.js](src/domain/caderno.js), [src/components/FormAnotacao.jsx](src/components/FormAnotacao.jsx) |
| Excluir anotação | Só apaga se a pessoa confirmar | [src/pages/Caderno.jsx](src/pages/Caderno.jsx) |
| Estados de tela | Carregando, erro, vazio ou lista | [src/pages/Caderno.jsx](src/pages/Caderno.jsx) |
| Tema na primeira visita | Escolha salva ou preferência do aparelho | [src/domain/preferencias.js](src/domain/preferencias.js) |
| Medalhas | Qual medalha liberar pela sequência de dias | [src/domain/conquistas.js](src/domain/conquistas.js) |
| Rotas protegidas | Manda para Entrar quem não fez login | [src/components/RotaProtegida.jsx](src/components/RotaProtegida.jsx) |
| Proposta | Etapa da tramitação a partir da situação oficial | [src/domain/tramitacao.js](src/domain/tramitacao.js) |
| Sons do quiz | Toca o som de acerto ou o de erro | [src/pages/Quiz.jsx](src/pages/Quiz.jsx) |
| Comemoração do foguinho | Mostra a animação só uma vez por dia e só se houver sequência | [src/domain/painel.js](src/domain/painel.js) |
| Avatar | Mostra a foto, o rosto escolhido ou a inicial do apelido | [src/domain/avatares.js](src/domain/avatares.js) |
| Caderno cívico | Mantém a página dentro do total depois de excluir | [src/domain/caderno.js](src/domain/caderno.js) |

## Acessibilidade

- Um `h1` por página, landmarks (`header`, `nav`, `main`, `footer`) e link "Pular para o conteúdo"
- Navegação completa pelo teclado, foco sempre visível e alvos de toque de pelo menos 44px
- Contraste de pelo menos 4,5:1 nos dois temas, medido com `npm run medir-contraste`
- Tamanhos em `rem`, letra ajustável e respeito a `prefers-reduced-motion`
- Opções do quiz como grupo de rádio (`fieldset` e `legend`) e feedback em região `aria-live`
- Verificado com Lighthouse e axe DevTools

## Neutralidade

**A gente não diz em quem votar nem o que pensar. Mostramos os fatos e a fonte oficial, e a conclusão é sua.**

- O Demokratos é apartidário: não apoia partido, político ou ideologia.
- Todos os políticos aparecem no mesmo formato, em ordem alfabética, sem destaque.
- Verde e vermelho só marcam acerto e erro no quiz.
- Os mascotes nunca aparecem perto de perfis de políticos, partidos ou votações. Perto das propostas, a onça só convida a conferir a fonte, sem comentar o conteúdo.
- As propostas são escolhidas pelo tema, nunca pelo autor ou partido.
- Toda informação factual mostra a fonte, a data da consulta e o link.

## Créditos de imagens e ícones

- Ícones de prêmios e medalhas: coleção *Ranking Awards* do [SVG Repo](https://www.svgrepo.com/collection/ranking-awards-icons/), licença CC0.
- Rostos para o avatar: coleção *Character Emotion Expression* do [SVG Repo](https://www.svgrepo.com/collection/character-emotion-expression-icons/), licença CC0 (o verde original foi trocado por lilás, porque no site o verde é só para acerto).
- Ícones da interface: [Lucide](https://lucide.dev), licença ISC.

## Uso de IA

Ver [AI.md](AI.md).

## Integrantes

Ver [Integrantes.md](Integrantes.md).

## Licença

[MIT](LICENSE)
