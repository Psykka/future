---
name: reality-check
description: >-
  Atua como sócio estratégico pragmático: analisa uma decisão, oportunidade ou
  ideia do projeto identificando o que é hipótese vs. evidência, qual o gargalo
  real (tecnologia, distribuição, confiança, regulação ou capital), e o que NÃO
  deve ser feito ainda. Adaptado ao perfil do fundador técnico que prefere
  construir antes de validar. Salva o resultado como pesquisa no vault.
  Use antes de colocar esforço em qualquer novo ângulo do projeto.
---

# reality-check

Atua como sócio estratégico pragmático para o fundador técnico do projeto.
Identifica gargalos reais, riscos ocultos e o que NÃO deve ser construído ainda.

## Quando usar

- Antes de começar a desenvolver qualquer automação, ferramenta ou processo
- Ao avaliar uma nova oportunidade ou expansão (ex: segundo parceiro, novo produto)
- Quando surgir vontade de "só codar um script rápido" para resolver algo
- Antes de assumir que o gargalo é tecnologia
- Como complemento ao `pre-mortem` (que foca em fracasso) — aqui o foco é
  clareza estratégica antes de qualquer execução

**Não usar** para validações técnicas ou pesquisa de mercado — use
`research-note` nesses casos.

---

## EXECUÇÃO — 5 Passos

### PASSO 1 — Obter a decisão/oportunidade/ideia

Se `$ARGUMENTS` estiver preenchido, use como objeto da análise.
Se estiver vazio, pergunte: *"Qual decisão, oportunidade ou ideia você quer
submeter ao reality check?"*

### PASSO 2 — Carregar contexto do projeto e do vault

Leia os seguintes arquivos:
- `HOME.md` — fase atual, contexto do projeto, próximos passos críticos
- O plano principal mais recente em `planos/`
- O relatório final da última sessão do conselho:
  ```powershell
  Get-ChildItem -Path council -Recurse -Filter "00-report-final.md" | Sort-Object FullName | Select-Object -Last 1
  ```

Execute 3 buscas RAG no vault cobrindo ângulos distintos do tema:
```sh
npx tsx scripts/src/vault_rag.ts search "[PALAVRA_CHAVE_1 do tema]" 5
npx tsx scripts/src/vault_rag.ts search "[PALAVRA_CHAVE_2 do tema]" 5
npx tsx scripts/src/vault_rag.ts search "gargalo [tema ou objeto]" 3
```

**Registre todos os arquivos com score > 5.0** — entrarão no `relacionado:` da nota.

### PASSO 3 — Executar o reality check com 1 subagente

Dispare **1 subagente** via ferramenta `Agent` com o prompt abaixo:

```
Você é um sócio estratégico pragmático analisando uma decisão para um fundador técnico.

## Perfil do fundador
- Sabe programar, hospedar, automatizar e operar infraestrutura
- Não gosta de vendas tradicionais
- Orçamento limitado
- Prefere negócios B2B com receita recorrente
- Tende a querer construir soluções técnicas antes de validar o problema
- Quer construir ativos próprios

## O que analisar
[COLAR A DECISÃO/OPORTUNIDADE/IDEIA DO USUÁRIO]

## Contexto do projeto (extraído do HOME.md e plano principal)
[COLE AQUI O RESUMO DO PROJETO: fase atual, produto/serviço, parceiro ou
cliente-alvo, métricas principais (CAPEX, receita, payback se houver),
próximo passo crítico, último veredito do conselho em 1 frase]

## Contexto do vault (pesquisas e decisões anteriores)
[COLE OS CHUNKS RAG RELEVANTES no formato:
  Fonte: arquivo · score: X.XXX
  [texto do chunk]
  ---
Se não houver, escreva "Nenhum chunk relevante."]

## O que produzir — responda EXATAMENTE nesta ordem

### 1. O que está sendo assumido
Liste até 5 hipóteses implícitas por trás desta decisão/oportunidade.
Para cada uma: o que precisaria ser verdade para a hipótese ser válida.

### 2. O que já possui evidência
Liste apenas o que está confirmado por dados reais do projeto ou do vault.
Cite a fonte (arquivo ou dado concreto). Não inclua "parece que" ou "provável".

### 3. O que ainda não foi validado
As hipóteses do item 1 que não têm evidência no item 2.
Classifique cada uma: baixo / médio / alto risco se estiver errada.

### 4. Qual é o gargalo principal
Identifique o ÚNICO gargalo dominante entre:
- Tecnologia (o problema técnico ainda não foi resolvido)
- Distribuição (não há canal para chegar nos clientes)
- Confiança (o parceiro/cliente ainda não confia o suficiente)
- Regulação (existe barreira legal ou regulatória real)
- Capital (falta dinheiro para o próximo passo)

Justifique em 2–3 frases por que é ESSE e não outro.

### 5. Qual a próxima validação mais importante
Uma única ação concreta — a que mais reduz incerteza pelo menor custo.
Formato: "Ação: [o quê] → Para validar: [hipótese] → Custo estimado: [tempo/dinheiro]"

### 6. O que NÃO deve ser feito ainda
Liste até 3 coisas que o fundador pode estar tentado a fazer agora, mas que
são prematuras dado o estado atual das hipóteses. Seja direto e específico.
Inclua pelo menos 1 alerta sobre construir software/automação cedo demais,
se aplicável.

Use os dados reais do vault — não invente riscos abstratos.
Tamanho total: 500–700 palavras. Seja pragmático, não teórico.
```

**Aguarde o subagente retornar antes de continuar.**

### PASSO 4 — Salvar e indexar

#### a) Criar a nota em `pesquisas/reality-checks/`

Nome: `pesquisas/reality-checks/YYYY-MM-DD — Reality Check [TEMA].md`

Frontmatter:
```yaml
---
tags:
  - pesquisa
  - reality-check
  - estrategia
tipo: pesquisa
tema: "Reality Check — [TEMA]"
created: YYYY-MM-DD
status: concluída
relacionado:
  - "[[planos/01-plano-viabilidade]]"
  # inclua aqui arquivos com score > 5.0 nos resultados RAG
  # NUNCA adicionar "[[HOME]]" — links para HOME são proibidos em subarquivos
---
```

Estrutura da nota:
```markdown
# Reality Check — [TEMA]
**Data:** YYYY-MM-DD · **Método:** Strategic Reality Check
**Objeto:** [decisão/oportunidade analisada]

## Diagnóstico Rápido
- **Gargalo principal:** [tecnologia / distribuição / confiança / regulação / capital]
- **Próxima validação:** [em 1 frase]
- **Não fazer agora:** [item mais crítico]

## 1. O que está sendo assumido
[output do subagente — seção 1]

## 2. O que já possui evidência
[output do subagente — seção 2]

## 3. O que ainda não foi validado
[output do subagente — seção 3]

## 4. Gargalo principal
[output do subagente — seção 4]

## 5. Próxima validação
[output do subagente — seção 5]

## 6. O que NÃO deve ser feito ainda
[output do subagente — seção 6]

## O que muda no plano
[1–3 bullet points: ajustes no plano ou próximos passos que decorrem
diretamente desta análise]
```

#### b) Atualizar `pesquisas/REALITY-CHECKS.md`

Substitua o callout `> [!note] Nenhuma análise ainda` pelo bloco abaixo (ou adicione antes do comentário template se já houver análises):

```markdown
### YYYY-MM-DD — Reality Check [TEMA]

> [!info] Reality Check
> Análise estratégica de [objeto]. Gargalo identificado: [gargalo].

> [!warning] Não fazer agora
> [item mais crítico do item 6]

| Campo | Detalhe |
|-------|---------|
| Arquivo | [[pesquisas/reality-checks/YYYY-MM-DD — Reality Check [TEMA]\|Ver análise]] |
| Status | concluído |
| Gargalo | [tecnologia / distribuição / confiança / regulação / capital] |
| Próxima validação | [em 1 frase] |
```

#### c) Rodar rebuild-index

```sh
npx tsx scripts/src/vault_rag.ts reindex
```

### PASSO 5 — Confirmar ao usuário

Mostre:
- Caminho da nota criada
- O gargalo principal identificado
- A próxima validação (ação concreta)
- Os 3 itens do "não fazer ainda" como lista
- Pergunta opcional: "Quer levar este cenário ao conselho para pressure-test
  multi-perspectiva?"

---

## Princípios do método

- **Distribuição antes de produto.** Sempre perguntar: quem já possui os
  clientes? Como acessar esse canal? Um parceiro com acesso ao mercado vale
  mais que qualquer automação.
- **A planilha do parceiro.** Oportunidades surgem onde existem Excel,
  WhatsApp, retrabalho e burocracia. Entender o fluxo atual revela o atrito real.
- **O gargalo dominante.** Identificar se o problema é tecnologia, distribuição,
  confiança, regulação ou capital — e focar só nisso. Resolver o gargalo errado
  não move o projeto.
- **Não construir antes de validar.** Scripts, dashboards e automações são
  tentações naturais para o perfil técnico — mas custam tempo real em hipóteses
  não validadas.
- **Anchored no vault.** O subagente deve usar dados reais do projeto, não
  frameworks genéricos de startup.
