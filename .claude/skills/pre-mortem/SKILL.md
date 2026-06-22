---
name: pre-mortem
description: >-
  Executa um pré-mortem estruturado (método Gary Klein) sobre uma decisão ou
  plano do projeto. Projeta o fracasso no futuro, reconstrói a cadeia de causas,
  mapeia sinais que foram ignorados e deriva ações preventivas concretas. Mais
  rápido que o council — foco em riscos, não em multi-perspectiva. Salva o
  resultado como pesquisa no vault. Use quando quiser identificar modos de falha
  antes de comprometer recursos, fechar contrato, ou fazer um GO/NO-GO.
---

# pre-mortem

Executa análise de pré-mortem (prospective hindsight) sobre uma decisão ou plano.
Baseado no método de Gary Klein: imaginar o fracasso como fato consumado aumenta
em ~30% a precisão na identificação de riscos (Wharton/Cornell, 1989).

## Quando usar

- Antes de comprometer CAPEX significativo
- Antes de assinar contrato ou carta de intenção
- Antes de fazer GO/NO-GO em qualquer fase do projeto
- Como complemento ao council (o council debate perspectivas; o pré-mortem força
  o fracasso como premissa, não como possibilidade)

**Não usar** para perguntas factuais, pesquisas de mercado, ou quando o usuário
quer validação — use `llm-council` nesses casos.

---

## EXECUÇÃO — 4 Passos

### PASSO 1 — Obter a decisão/plano

Se `$ARGUMENTS` estiver preenchido, use como objeto do pré-mortem.
Se estiver vazio, pergunte: *"Qual decisão ou plano você quer submeter ao pré-mortem?"*

### PASSO 2 — Carregar contexto do projeto e do vault

Leia os seguintes arquivos:
- `HOME.md` — fase atual, CAPEX, parceiro, próximo passo crítico
- O plano de viabilidade atual em `planos/` (busque o mais recente)
- O relatório final da última sessão do council (adapte ao seu OS):
  ```sh
  # Linux/macOS:
  find council -name "00-report-final.md" | sort | tail -1
  # Windows (PowerShell):
  Get-ChildItem -Path council -Recurse -Filter "00-report-final.md" | Sort-Object FullName | Select-Object -Last 1
  ```

Execute 3 buscas RAG no vault (comando igual em todos os OSes):
```sh
npx tsx scripts/src/vault_rag.ts search "[PALAVRA_CHAVE_1 do tema]" 5
npx tsx scripts/src/vault_rag.ts search "[PALAVRA_CHAVE_2 do tema]" 5
npx tsx scripts/src/vault_rag.ts search "steelman [tema ou objeto]" 3
```

A terceira busca verifica se já existe um **steelman** do mesmo objeto — se encontrar,
adicione-o ao `relacionado:` da nota. **Registre todos os arquivos com score > 5.0.**

### PASSO 3 — Executar o pré-mortem com 1 subagente

Dispare **1 subagente** via ferramenta `Agent` com o prompt abaixo:

```
Você é um analista de riscos executando um pré-mortem (método Gary Klein).

## A Premissa — TRATE COMO FATO, NÃO COMO HIPÓTESE
É [DATA: 18 meses a partir de hoje]. O seguinte projeto/decisão fracassou completamente:

[COLAR A DECISÃO/PLANO DO USUÁRIO]

O fracasso é real. A empresa perdeu capital. O projeto foi encerrado.
Sua missão: reconstruir exatamente como isso aconteceu.

## Contexto do projeto
[COLE O RESUMO DO HOME.md: fase, hardware, parceiro, CAPEX, payback, próximo passo]

## Contexto do vault (pesquisas e decisões anteriores)
[COLE OS CHUNKS RAG RELEVANTES no formato:
  Fonte: arquivo · score: X.XXX
  [texto do chunk]
  ---
Se não houver, escreva "Nenhum chunk relevante."]

## O que produzir

### 1. A Narrativa do Fracasso (3–5 parágrafos)
Escreva como um post-mortem real — passado, concreto, específico. Inclua:
- O gatilho inicial (o que primeiro saiu errado)
- A cascata (como um problema puxou o próximo)
- O ponto de sem-retorno (quando o fracasso se tornou irreversível)
- A perda final (em termos financeiros e estratégicos)

### 2. As Causas-Raiz (lista numerada)
Máximo 5. Cada uma com:
- Nome da causa
- Por que foi subestimada ou ignorada no planejamento
- Sinal que existia mas não foi levado a sério

### 3. Ações Preventivas (checklist)
Para cada causa-raiz, 1–2 ações concretas que poderiam ter evitado o fracasso.
Formato: - [ ] Ação específica (quem, o quê, quando)

Use dados reais do vault para ancorar riscos concretos — não genéricos.
Tamanho total: 400–600 palavras. Seja implacável — o fracasso já aconteceu.
```

**Aguarde o subagente retornar antes de continuar.**

### PASSO 4 — Salvar e indexar

#### a) Criar a nota em `pesquisas/pre-mortems/`

Nome: `pesquisas/pre-mortems/YYYY-MM-DD — Pré-mortem [TEMA].md`

Frontmatter:
```yaml
---
tags:
  - pesquisa
  - pre-mortem
  - risco
tipo: pesquisa
tema: "Pré-mortem — [TEMA]"
created: YYYY-MM-DD
status: concluída
relacionado:
  - "[[planos/NN-slug]]"
  # inclua aqui (score > 5.0 nos resultados RAG):
  # - councils relacionados ao tema
  # - pesquisas irmãs sobre o mesmo objeto
  # - steelman do mesmo objeto (se encontrado na busca "steelman [tema]")
  # NUNCA adicionar "[[HOME]]" — links para HOME são proibidos em subarquivos
---
```

Estrutura da nota:
```markdown
# Pré-mortem — [TEMA]
**Data:** YYYY-MM-DD · **Método:** Gary Klein (prospective hindsight)
**Objeto:** [decisão/plano analisado]

## Sumário de Risco
[3 bullet points: os 3 maiores riscos identificados]

## A Narrativa do Fracasso
[output do subagente — seção 1]

## Causas-Raiz
[output do subagente — seção 2]

## Ações Preventivas
[output do subagente — seção 3]

## O que muda no plano
[1–3 bullet points: quais ajustes no plano de viabilidade ou próximos passos
decorrem diretamente desta análise]
```

#### b) Atualizar `pesquisas/PRE-MORTEMS.md`

Adicione um bloco no topo da seção `## 📅 Análises` (antes do comentário template):

```markdown
### YYYY-MM-DD — Pré-mortem [TEMA]

> [!warning] Análise de Risco
> Pré-mortem sobre [objeto]. Método: prospective hindsight (Gary Klein).

> [!danger] Risco Principal
> [maior causa-raiz identificada em 1 frase]

| Campo | Detalhe |
|-------|---------|
| Arquivo | [[pesquisas/pre-mortems/YYYY-MM-DD — Pré-mortem [TEMA]\|Ver análise]] |
| Status | concluído |
| Vinculado a | [[planos/NN-slug]] |
```

#### c) Rodar rebuild-index

```powershell
npx tsx scripts/src/vault_rag.ts reindex
```

### PASSO 5 — Reavaliar HOME.md (obrigatório)

Releia `HOME.md` e responda explicitamente a cada ponto:
1. **Métricas** — algum número do dashboard muda com esta análise?
2. **Próximas ações** — alguma ação preventiva identificada aqui deve entrar nas próximas ações?
3. **Riscos** — algum risco crítico ou médio precisa ser adicionado ou atualizado?
4. **Questões em aberto** — nova questão surgiu ou existente foi respondida?
5. **Roadmap** — algum marco ou prazo é impactado pelos modos de falha identificados?
6. **Callout de documentos** — o callout "Última entrada" precisa refletir este pré-mortem?

Se qualquer resposta for "sim", atualizar `HOME.md` imediatamente.
Se todas forem "não", declarar no chat: *"HOME.md revisado — nenhuma atualização necessária."*

### PASSO 6 — Confirmar ao usuário

Mostre:
- Caminho da nota criada
- Os 3 riscos principais em bullet points
- As 3 ações preventivas mais urgentes como checklist
- Pergunta opcional: "Quer levar algum desses riscos ao conselho para pressure-test?"

---

## Princípios do método

- **O fracasso é fato, não hipótese.** A premissa do agente é que já aconteceu — não "poderia acontecer". Esse framing força concretude.
- **Causas específicas > riscos genéricos.** "Falta de liquidez" não é uma causa. "Frimesa não renovou o contrato após 8 meses porque a cooperativa não aceitou lock-in" é.
- **Anchored no vault.** O agente deve usar os chunks RAG para identificar riscos que já aparecem nos dados do projeto — não inventar riscos abstratos.
- **Ação antes da análise.** O output mais importante são as ações preventivas, não a narrativa. Se as ações não forem concretas, o pré-mortem falhou.
