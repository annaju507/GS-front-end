# Uso de Inteligência Artificial

O enunciado da Global Solution permite a IA como copiloto, desde que a equipe registre os prompts e saiba explicar cada linha. Este arquivo conta como a IA foi usada no Demokratos.

## Ferramentas

| Ferramenta | Para quê |
|---|---|
| **Claude Code** (modelo Claude Opus, da Anthropic), dentro do VS Code | Escrever e revisar o código em React, Tailwind e JavaScript, seguindo as regras definidas pela equipe; rodar build, lint e checagens; fazer os commits |
| **ChatGPT** (OpenAI) | Criar as imagens dos cinco mascotes (a partir da referência desenhada pela equipe) e as ilustrações do Rio de Janeiro usadas no site |

Os commits feitos com ajuda da IA trazem a linha `Co-Authored-By: Claude` na mensagem, então o histórico mostra isso com transparência.

## Como trabalhamos

1. **A equipe decidiu antes de pedir.** Problema, público, áreas temáticas, regras de neutralidade, identidade visual (cores, tipografia, mascotes e o papel de cada um), fluxo de telas e requisitos foram definidos pela equipe em documentos próprios. A IA recebeu esses documentos como instrução fixa do projeto.
2. **Regras que a IA tinha de seguir em todo pedido:**
   - só HTML semântico, Tailwind, Vite e React em JavaScript (nada de TypeScript);
   - textos da interface em JSON, nunca no componente;
   - separação entre `services/`, `domain/`, `hooks/` e `components/`/`pages/`;
   - manipulação do DOM e if/else visíveis, para a disciplina de Web Development;
   - acessibilidade (um `h1` por página, foco visível, contraste, `rem`, menos animação quando pedido);
   - toda informação factual com fonte oficial, data e link;
   - nenhum travessão no site (com um script que bloqueia o commit se encontrar).
3. **Uma etapa por vez, com aprovação.** A cada etapa (setup, componentes, área pública, trilha, Agora, caderno, representantes, perfil, acessibilidade), a IA mostrava o resultado e só seguia depois do nosso ok.
4. **Revisão humana.** A equipe testou cada tela no navegador, pediu correções de visual e de texto, conferiu as fontes oficiais e decidiu o que entrava ou saía (por exemplo, retirar da aba Direitos os itens que ainda não tinham sido conferidos).
5. **Conteúdo com fonte.** As perguntas do quiz, as respostas e as fontes foram escolhidas pela equipe. A IA ajudou na redação em linguagem simples, e cada texto foi aprovado por área antes do commit.

## Prompts que mais fizeram diferença

Pedidos reais feitos ao Claude Code, copiados das conversas (só corrigimos erros de digitação). Ao lado, o que cada um mudou no projeto.

### 1. Reformular a trilha pensando em quem não sabe nada de política
> "Eu gostaria de reformular a parte da trilha de aprendizagem. Vamos planejar! Gostaria de colocar mais lições por trilha, tipo 4 lições, e que fosse com o nível de aprofundamento gradativo a cada lição feita dentro da unidade, ou seja, a primeira lição é mais introdutória e a 4ª lição é um aprofundamento do assunto da unidade. Gostaria também de rever a ordem das unidades. Temos que pensar que a pessoa que entra na plataforma não entende nada de política, então ela deve aprender alguns conceitos muito importantes (por que aprender política, por exemplo) antes de entender o que seria uma PEC. Quero colocar por que entender sobre política é importante, pois algumas pessoas não sabem o motivo."

**Resultado:** a trilha passou de 4 para 8 unidades, com 4 lições cada (32 lições e 96 perguntas), começando por "Por que entender política".

### 2. Proteger a neutralidade do projeto
> "Acho arriscado definir direita, esquerda e centro. Acredito que isso seja importante, mas não quero arriscar definir isso e tirar toda a credibilidade do projeto com essa questão."

**Resultado:** a unidade sobre partidos não define esquerda, direita ou centro. Ela ensina a pessoa a conferir sozinha o programa do partido no TSE e as votações nominais.

### 3. Conferir os requisitos antes de mudar a arquitetura
> "Vamos pensar aqui então, pois assim nem eu estou me conectando com essa parte da plataforma. Se a gente tirar essas requisições de APIs na hora, eu vou perder algum ponto por descumprir algum requisito da disciplina de Front-end ou Web Dev?"

> "Vamos fazer o seguinte então: escolha temas fixos relevantes para a sociedade em geral, divida nas áreas que escolhemos, incluindo outros, e implemente tudo que eu pedi. Porém mantenha o CRUD e todas as funcionalidades que vêm ao clicar para saber mais sobre essas PLs, PECs ou PLPs, mantenha sempre as fontes para as pessoas procurarem, e a única coisa que eu gostaria de manter ao vivo são as últimas movimentações, pois é uma parte importante estar atualizada. Sempre use as técnicas de comunicação que eu pedi para escrever o site. Diga-me se você entendeu e o que vai fazer."

**Resultado:** uma seleção fixa de 60 propostas com resumo em linguagem simples, coletada da API da Câmara por script, mantendo o CRUD do Caderno cívico e as movimentações ao vivo.

### 4. Padronizar as propostas no site todo
> "Assim como está na parte de Agora do site, coloque em todas as PLs, PECs e PLPs que aparecerem dentro do site a mesma disposição: em qual área ela se encaixa, se está em análise, apresentada etc., e logo após a identificação do que ela é, um breve resumo do que ela trata, assim como estão nos cards das PLs na parte de Agora. Me diga se você entendeu e me mande um exemplo de como ficaria."

**Resultado:** um único componente de card de proposta, usado em todas as telas.

### 5. Planejar e aprovar antes de executar
> "Insira essas imagens pelo site de modo que faça sentido para o que estamos produzindo. O objetivo de colocar essas imagens é ter mais cara de site feito para cariocas. Antes de você fazer essas alterações, me mande print como prévia de como você vai colocar a disposição de cada imagem; se eu aprovar, faça as mudanças. Pense, planeje, modele, me mostre e só execute as mudanças após a minha aprovação."

**Resultado:** as ilustrações do Rio entraram tela por tela, só onde a equipe aprovou (as do Agora e do Direitos foram testadas e retiradas).

### 6. Corrigir o papel de cada mascote
> "Não gostei desse degradê na comemoração do mico, e além disso você não está usando os mascotes do jeito certo para cada função atribuída a eles. Por exemplo, no segundo print que eu mandei, o cachorro está dando avisos que a arara, que é a mensageira, deveria dar."

**Resultado:** cada mascote passou a aparecer só na sua função (caramelo orienta, capivara ensina, arara avisa, onça checa fontes, mico comemora), e o degradê saiu.

### 7. Ampliar a aba Direitos com fontes oficiais
> "Na parte de Direitos, está muito crua. Gostaria que você adicionasse mais tópicos. Estou dando algumas sugestões, veja se concorda comigo." (seguido de uma lista de temas por área, como medicamentos gratuitos pelo SUS e Farmácia Popular e atendimento de saúde mental)

> "Pode apagar tudo que ainda está para conferir e depois eu procuro sobre."

**Resultado:** 20 páginas novas na aba Direitos. O que não tinha fonte oficial confirmada saiu do site.

### 8. Interação inspirada em uma referência
> "Quero que você faça a mesma animação que está nesse site que eu mandei o link, com foco nessa parte. Quero que você anime no meu site os mascotes: deixe a foto deles e, quando as pessoas passarem por cima, o card vai virar e vai ter a descrição do bichinho."

**Resultado:** os cards dos mascotes no Como funciona, que giram ao passar o mouse ou tocar (com versão sem animação para quem pede menos movimento).

## O que aprendemos

- Instruções claras e documentadas antes de programar deixam a IA muito mais útil e evitam retrabalho.
- A IA erra quando falta contexto (por exemplo, colocar um mascote na função errada), e a revisão da equipe é o que garante o resultado.
- Separar `services`, `domain` e `hooks` deixou cada parte do código pequena e fácil de explicar.
