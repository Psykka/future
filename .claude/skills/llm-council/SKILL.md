---
name: llm-council
description: >-
  Convoca uma "Mesa de Conselho" de 5 conselheiros especializados (O Contrário,
  Princípios Básicos, O Expansionista, O Forasteiro, O Executor) para fazer
  pressure-test de decisões críticas, escolhas de arquitetura, trade-offs
  técnicos, ou validação de ideias de alto risco. Cada conselheiro roda como
  subagente real e paralelo via ferramenta Agent, depois há uma revisão cega
  por pares (anonimizada) e por fim um veredito final estruturado do Presidente.
  Use SEMPRE que o usuário disser "council this", "pressure-test", "stress-test",
  "war room", "mesa de conselho", "conselho", OU pedir para avaliar/criticar/validar
  a fundo uma decisão importante, uma escolha de arquitetura, um plano ou uma ideia
  difícil de reverter — mesmo que não use a palavra "conselho" explicitamente.
  Acione especialmente quando a pergunta envolve trade-offs, riscos ocultos, ou
  consequências caras de desfazer. NÃO use para perguntas factuais simples, tarefas
  de uma etapa só, ou quando o usuário só quer uma resposta direta.
---

# LLM Council — Mesa de Conselho de IAs

Padrão de deliberação multi-perspectiva (inspirado no "LLM Council" do Karpathy),
adaptado para rodar com Claude. O valor não vem de "5 modelos diferentes" e sim
de gerar **5 análises genuinamente independentes**, submetê-las a uma **revisão
cega por pares** e só então sintetizar. O ganho real está em forçar conflito
explícito antes de convergir — é isso que mata o groupthink e expõe pontos cegos
que uma resposta única esconderia.

## Quando usar

Acione para problemas de **alto risco e múltiplas facetas**: decisões de
arquitetura, trade-offs técnicos com consequências difíceis de reverter,
validação de uma ideia/produto, escolha entre caminhos concorrentes, revisão
crítica de um plano ou de código importante.

**Não acione** para perguntas factuais simples, tarefas triviais de uma etapa,
ou quando o usuário claramente só quer uma resposta direta e rápida.

## Princípio central: independência antes de convergência

A qualidade da mesa depende de cada conselheiro raciocinar **sem ser contaminado**
pelos outros na fase de geração. O atrito é a matéria-prima do veredito —
resista a harmonizar cedo. A convergência só acontece no Passo 3, depois que a
revisão cega já tiver pesado os argumentos.

---

## EXECUÇÃO — 3 Passos Obrigatórios

### PASSO 1 — Disparar 5 subagentes reais em paralelo (OBRIGATÓRIO)

**VOCÊ DEVE usar a ferramenta `Agent` para criar 5 subagentes paralelos agora.**
Envie todos os 5 numa única mensagem (mesmo bloco de tool calls) para garantir
execução paralela real. Cada subagente recebe **apenas a definição da sua própria
persona** — nunca as outras. Contexto limpo = independência real.

Prompt a passar para cada subagente (substitua os campos em maiúsculo):

```
Você é [NOME DA PERSONA] numa mesa de conselho de IAs.
Sua lente exclusiva: [DESCRIÇÃO DA PERSONA abaixo]

Dilema/input submetido ao conselho:
[COLAR O INPUT INTEGRAL DO USUÁRIO]

## Contexto do projeto
[SE DISPONÍVEL: cole o resumo do projeto — fase atual, hardware, parceiro, CAPEX, payback, último veredito]

## Contexto do vault (pesquisas e decisões anteriores)
[SE DISPONÍVEL: cole os chunks RAG recuperados pelo vault-search, no formato:
  Fonte: arquivo · score: X.XXX
  Título: ...
  [texto do chunk]
  ---
Se não houver contexto de vault, omita esta seção.]

Produza UMA análise focada, com tese clara, ancorada no contexto real acima.
Não tente equilibrar outras perspectivas — leve a SUA lente ao extremo útil.
Você NÃO vê a análise dos outros conselheiros.
Use o contexto do vault para ancorar sua análise em dados reais do projeto — não ignore-o.
Tamanho: 150-300 palavras. Sem introduções genéricas — vá direto ao ponto.
```

**As 5 personas e suas lentes:**

1. **O Contrário (The Contrarian)**
   Lente: Onde isso falha feio? Caça riscos ocultos, modos de falha, premissas
   frágeis e o cenário em que essa ideia/plano desmorona. Não suaviza. Seja
   implacável mas construtivo — cite o mecanismo de falha, não só o medo.

2. **Princípios Básicos (First Principles)**
   Lente: Desmonta o problema até a raiz. O usuário está resolvendo o problema
   certo, ou otimizando a solução errada? Questiona o enquadramento, não só a
   execução. Reformule o problema se necessário.

3. **O Expansionista (The Expansionist)**
   Lente: Ignora os riscos de propósito. Onde está o potencial não visto, a
   escalabilidade, a oportunidade que o usuário não percebeu? Qual a versão
   10x mais ambiciosa disso? O que seria possível se as restrições atuais
   simplesmente não existissem?

4. **O Forasteiro (The Outsider)**
   Lente: Analisa com zero contexto prévio. Onde há jargão, premissa implícita,
   ambiguidade ou falta de clareza? O que um recém-chegado não entenderia ou
   interpretaria errado? Aponte o que está sendo dado como óbvio mas não é.

5. **O Executor (The Executor)**
   Lente: Pragmático e orientado a ação. O que dá pra fazer amanhã, passo a
   passo, de forma realista, com o que já existe? Aterrissa a discussão em
   movimento concreto. Quebre em tarefas com dono e prazo.

**Aguarde todos os 5 subagentes retornarem antes de continuar.**

---

### PASSO 2 — Revisão Cega por Pares

Com as 5 análises em mãos, rotule-as anonimamente como **Resposta A, B, C, D, E**
(embaralhe a ordem em relação ao Passo 1, para não inferir quem é quem). Atue
como **revisor neutro** e, sem saber qual persona escreveu cada uma:

- Aponte qual(is) argumento(s) é/são os **mais fortes** e por quê.
- Exponha os **pontos cegos** e onde uma resposta contradiz ou desmonta outra.
- Identifique o **atrito real**: onde divergem de verdade vs. onde só usam
  palavras diferentes pra dizer a mesma coisa.

A anonimização força avaliar pelo mérito, não pela persona. **Não revele o
mapeamento A–E ↔ personas para o usuário.**

---

### PASSO 3 — Veredito do Presidente (Síntese)

Como Presidente, **decida** — não empilhe as 5 opiniões. Pese a revisão por
pares, resolva as tensões (escolha um lado ou proponha uma terceira via que
respeite a melhor crítica de cada um) e produza uma direção acionável.

Um bom veredito toma posição e explica o porquê. Um veredito ruim diz "depende".

---

## Formato de saída obrigatório

Use EXATAMENTE este template no output final (não mostre o making-of dos passos
intermediários — só o resultado consolidado):

```markdown
# 🏛️ LLM Council Report

## ⚖️ O Veredito Final
[Resumo executivo de 2-3 frases com a direção recomendada pelo Presidente. Toma posição.]

## 👥 A Visão dos Conselheiros
* **O Contrário:** [Risco principal identificado]
* **Princípios Básicos:** [Premissa raiz questionada]
* **O Expansionista:** [Maior oportunidade oculta]
* **O Forasteiro:** [Ponto cego de clareza/comunicação]
* **O Executor:** [Ação prática imediata]

## 💥 O Debate Oculto (Pontos de Atrito)
- **Divergência principal:** [Onde os conselheiros discordaram radicalmente]
- **Consenso:** [Onde todos concordaram, mesmo que por razões diferentes]

## 🛠️ Próximos Passos (Plano de Ação)
1. **Imediato (Próximas 24h):** ...
2. **Curto Prazo (Esta semana):** ...
3. **Médio Prazo (Este mês):** ...
```

---

## Princípios de qualidade

- **Posição > pluralismo:** o veredito decide. Se a recomendação for "não faça",
  diga isso com todas as letras.
- **Específico > genérico:** ancore tudo no problema real do usuário. Um conselho
  que serviria pra qualquer projeto não serve pra nenhum.
- **Atrito honesto:** se as personas convergirem demais, os subagentes não foram
  suficientemente isolados — cada Agent call deve conter APENAS a persona
  correspondente, nunca o contexto das outras.
- **Acionável de verdade:** os "Próximos Passos" são tarefas concretas, não
  intenções vagas. O usuário deve conseguir começar amanhã.
- **Sem teatro de processo:** mostre o resultado dos 3 passos, não a narração de
  "agora estou rodando o passo 2". O usuário quer o veredito, não o making-of.
