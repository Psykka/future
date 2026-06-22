---
name: steelman
description: >-
  Constrói o argumento mais forte POSSÍVEL a favor de uma decisão que o usuário
  está questionando ou hesitando em tomar. Anti-pre-mortem: força enxergar o
  upside máximo e a lógica mais sólida por trás de um caminho antes de desistir.
  Reduz viés de confirmação, expõe o custo real de não agir, e entrega o argumento
  mais persuasivo possível — para que a rejeição (se ocorrer) seja contra o melhor
  caso, não contra uma versão fraca. Salva o resultado como pesquisa no vault.
  Use quando o usuário estiver em dúvida, procrastinando, ou inclinado a dizer não.
---

# steelman

Constrói o argumento mais sólido possível a favor de uma decisão.
Baseado no método filosófico de John Stuart Mill: você só entende sua própria
posição se conhecer, na forma mais persuasiva, o melhor argumento do lado oposto.
Aplicado aqui como "steelman solitaire" — argumentar com você mesmo antes de decidir.

## Quando usar

- O usuário está hesitando ou inclinado a não fazer algo
- Antes de abandonar um plano ou parceria
- Para reduzir confirmation bias antes de um GO/NO-GO
- Como complemento ao `pre-mortem` (que mapa o fracasso; este mapeia o upside)

**Não usar** quando o usuário já decidiu e quer validação — use `new-council` para
pressure-test genuíno de ambos os lados.

---

## EXECUÇÃO — 4 Passos

### PASSO 1 — Obter a decisão

Se `$ARGUMENTS` estiver preenchido, use como objeto do steelman.
Se estiver vazio, pergunte: *"Qual decisão você está questionando ou hesitando em tomar?"*

### PASSO 2 — Carregar contexto do projeto e do vault

Leia os seguintes arquivos:
- `HOME.md` — fase atual, CAPEX, parceiro, próximo passo crítico
- O plano de viabilidade atual em `planos/`
- O relatório final da última sessão do council (adapte ao seu OS):
  ```sh
  # Linux/macOS:
  find council -name "00-report-final.md" | sort | tail -1
  # Windows (PowerShell):
  Get-ChildItem -Path council -Recurse -Filter "00-report-final.md" | Sort-Object FullName | Select-Object -Last 1
  ```

Execute 3 buscas RAG no vault (comando igual em todos os OSes):
```sh
npx tsx scripts/src/vault_rag.ts search "[OPORTUNIDADE principal do tema]" 5
npx tsx scripts/src/vault_rag.ts search "[VANTAGEM competitiva ou financeira do tema]" 5
npx tsx scripts/src/vault_rag.ts search "pre-mortem [tema ou objeto]" 3
```

A terceira busca verifica se já existe um **pré-mortem** do mesmo objeto — se encontrar,
adicione-o ao `relacionado:` da nota. **Registre todos os arquivos com score > 5.0.**

### PASSO 3 — Executar o steelman com 1 subagente

Dispare **1 subagente** via ferramenta `Agent` com o prompt abaixo:

```
Você é um advogado do diabo invertido — seu papel é construir o argumento
mais forte POSSÍVEL a favor da seguinte decisão:

[COLAR A DECISÃO DO USUÁRIO]

## Regras críticas
- ASSUMA que a decisão é correta. Sua missão é justificar isso com a lógica
  mais sólida possível, não equilibrar prós e contras.
- Use dados reais do contexto do projeto (abaixo) para fundamentar cada ponto.
- Não suavize. Um argumento fraco NÃO é steelman — é uma versão fraca da ideia.
- Se há objeções óbvias, responda-as dentro do argumento (não as liste como riscos).

## Contexto do projeto
[COLE O RESUMO DO HOME.md: fase, hardware, parceiro, CAPEX, payback, próximo passo]

## Contexto do vault (chunks RAG relevantes)
[COLE OS CHUNKS RAG no formato:
  Fonte: arquivo · score: X.XXX
  [texto do chunk]
  ---
Se não houver, escreva "Nenhum chunk relevante."]

## O que produzir

### 1. Tese Central (1 parágrafo)
O argumento mais forte em favor da decisão, em uma frase de impacto seguida de 2–3
linhas de suporte. Deve ser memorável — a versão que você usaria para convencer
um investidor cético em 60 segundos.

### 2. Os 3–5 Pilares do Argumento
Cada pilar com:
- **Nome do pilar** (ex: "Vantagem de custo estrutural")
- Argumento em 2–4 linhas, ancorado em dados do contexto
- Por que esse pilar resiste às objeções mais comuns

### 3. O Custo Real de NÃO Fazer
Quantifique o custo de inação: receita perdida, oportunidade que fecha, vantagem
que concorrentes podem capturar. Seja específico — use os dados do projeto.

### 4. A Objeção Mais Forte (e por que não é suficiente)
Identifique a melhor razão para NÃO tomar essa decisão e argumente por que, mesmo
assim, o balanço favorece IR. Não minimize a objeção — enfrente-a de frente.

Tamanho total: 350–500 palavras. Tom: confiante, direto, baseado em dados.
```

**Aguarde o subagente retornar antes de continuar.**

### PASSO 4 — Salvar e indexar

#### a) Criar a nota em `pesquisas/steelmans/`

Nome: `pesquisas/steelmans/YYYY-MM-DD — Steelman [TEMA].md`

Frontmatter:
```yaml
---
tags:
  - pesquisa
  - steelman
  - decisao
tipo: pesquisa
tema: "Steelman — [TEMA]"
created: YYYY-MM-DD
status: concluída
relacionado:
  - "[[planos/NN-slug]]"
  # inclua aqui (score > 5.0 nos resultados RAG):
  # - councils relacionados ao tema
  # - pesquisas irmãs sobre o mesmo objeto
  # - pre-mortem do mesmo objeto (se encontrado na busca "pre-mortem [tema]")
  # NUNCA adicionar "[[HOME]]" — links para HOME são proibidos em subarquivos
---
```

Estrutura da nota:
```markdown
# Steelman — [TEMA]
**Data:** YYYY-MM-DD · **Método:** Steelman solitaire (Mill / LessWrong)
**Objeto:** [decisão analisada]

## Tese Central
[output do subagente — seção 1]

## Os Pilares do Argumento
[output do subagente — seção 2]

## O Custo de Não Fazer
[output do subagente — seção 3]

## A Melhor Objeção (e a resposta)
[output do subagente — seção 4]

## Balanço
[1–2 bullet points: o que este steelman muda (ou não) na decisão do usuário,
dado o contexto atual do projeto]
```

#### b) Atualizar `pesquisas/STEELMANS.md`

Adicione um bloco no topo da seção `## 📅 Análises` (antes do comentário template):

```markdown
### YYYY-MM-DD — Steelman [TEMA]

> [!abstract] Análise
> Steelman sobre [objeto]. Constrói o argumento mais forte a favor.

> [!success] Tese Principal
> [tese central em 1 frase]

| Campo | Detalhe |
|-------|---------|
| Arquivo | [[pesquisas/steelmans/YYYY-MM-DD — Steelman [TEMA]\|Ver análise]] |
| Status | concluído |
| Vinculado a | [[planos/NN-slug]] |
```

#### c) Rodar rebuild-index

```powershell
npx tsx scripts/src/vault_rag.ts reindex
```

### PASSO 5 — Reavaliar HOME.md (obrigatório)

Releia `HOME.md` e responda explicitamente a cada ponto:
1. **Métricas** — o upside identificado muda algum número do dashboard?
2. **Próximas ações** — alguma ação do steelman deve entrar nas próximas ações imediatas?
3. **Riscos** — o steelman neutralizou ou relativizou algum risco listado?
4. **Questões em aberto** — nova questão surgiu ou existente foi respondida?
5. **Roadmap** — a decisão analisada impacta algum marco ou fase?
6. **Callout de documentos** — o callout "Última entrada" precisa refletir este steelman?

Se qualquer resposta for "sim", atualizar `HOME.md` imediatamente.
Se todas forem "não", declarar no chat: *"HOME.md revisado — nenhuma atualização necessária."*

### PASSO 6 — Confirmar ao usuário

Mostre:
- Caminho da nota criada
- A tese central em destaque
- O custo de não fazer (dado mais acionável)
- Pergunta opcional: "Quer combinar com um `/pre-mortem` para ver os dois lados antes de decidir?"

---

## Princípios do método

- **Steelman ≠ propaganda.** O objetivo não é convencer — é garantir que, se você
  rejeitar a decisão, está rejeitando a melhor versão dela, não uma versão fraca.
- **Custo de inação é real.** A maioria das análises de risco foca no custo de agir.
  Este método torna o custo de NÃO agir explícito e quantificado.
- **Anchored no vault.** Os pilares devem usar dados reais do projeto — hashprice,
  CAPEX, parceiro-alvo, payback. Um steelman genérico não serve.
- **Par natural com pre-mortem.** Use os dois juntos antes de GO/NO-GO grandes:
  pre-mortem mapeia o fracasso, steelman mapeia o upside máximo. O council
  arbitra se ainda houver dúvida.
