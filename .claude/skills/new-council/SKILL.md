---
name: new-council
description: >-
  Convoca uma nova sessão do LLM Council para este projeto. Lê automaticamente
  o contexto atual do vault (HOME.md, plano de viabilidade, último council) antes
  de invocar a skill llm-council, garantindo que os conselheiros estejam embasados
  no estado real do projeto. Após a sessão, salva os 6 relatórios em
  council/AAAA-MM-DD — Tema/, atualiza council/CONSELHOS.md e o callout de última
  sessão no HOME.md. Use quando quiser pressure-testar uma decisão do projeto
  com contexto completo já carregado.
---

# new-council

Convoca uma nova sessão do LLM Council sobre um tema específico, salva todos os relatórios no vault com a estrutura datada e atualiza o índice.

## Instruções

### 1. Obter o tema

Se `$ARGUMENTS` estiver preenchido, use como tema da sessão.
Se estiver vazio, pergunte: *"Qual é o tema/decisão que você quer levar ao conselho?"*

### 2. Carregar o contexto do projeto

Leia os seguintes arquivos para embasar os conselheiros:
- `HOME.md` — métricas e status atual
- `planos/01-plano-viabilidade.md` — plano de viabilidade atual
- O relatório final da sessão mais recente em `council/` (adapte ao seu OS):
  ```sh
  # Linux/macOS:
  find council -name "00-report-final.md" | sort | tail -1
  # Windows (PowerShell):
  Get-ChildItem -Path council -Recurse -Filter "00-report-final.md" | Sort-Object FullName | Select-Object -Last 1
  ```

### 3. Buscar contexto RAG para o tema (OBRIGATÓRIO)

Execute 2–3 buscas no índice Orama cobrindo ângulos distintos do tema.
Adapte as queries ao tema específico da sessão (comando igual em todos os OSes):

```sh
npx tsx scripts/src/vault_rag.ts search "[PALAVRA_CHAVE_1 do tema]" 5
npx tsx scripts/src/vault_rag.ts search "[PALAVRA_CHAVE_2 do tema]" 5
npx tsx scripts/src/vault_rag.ts search "[PALAVRA_CHAVE_3 do tema]" 5
```

Capture os chunks retornados (arquivo, título, score e texto). Esses chunks serão
injetados no prompt de cada conselheiro como "Contexto do vault".

**Registre os arquivos-fonte com score > 5.0** — eles entrarão no `relacionado:` do
`00-report-final.md` para garantir que o council aponte de volta às pesquisas que o embasaram.

Se `vault_index.json` não existir, rode `rebuild-index` primeiro.

### 4. Invocar o LLM Council

Use a ferramenta **Skill** com `skill: "llm-council"` e passe como args o tema,
o resumo do projeto E os chunks RAG encontrados. Exemplo de args:

```
Tema: [TEMA DO USUÁRIO]

## Contexto do projeto
- Fase atual: [da HOME.md]
- Hardware: [da HOME.md]
- Parceiro-alvo: [da HOME.md]
- CAPEX / Payback: [da HOME.md]
- Próximo passo crítico: [da HOME.md]
- Último veredito do conselho: [do 00-report-final.md mais recente]

## Contexto do vault (RAG — chunks relevantes)
[Inclua aqui os resultados das buscas do passo 3, no formato:]

> Fonte: [[pesquisas/YYYY-MM-DD — Tema]] · score: X.XXX
> **Título do chunk**
> [texto do chunk, até ~600 chars]

> Fonte: [[planos/NN-slug]] · score: X.XXX
> ...

[Se nenhum resultado relevante, escreva: "Nenhum chunk relevante encontrado no vault."]
```

### 5. Salvar os relatórios no vault

Após a execução do `llm-council`, ele terá gerado na conversa:
- 5 relatórios individuais (um por conselheiro)
- 1 relatório final consolidado (do Presidente)

Execute os seguintes passos:

a) Defina a pasta da sessão: data de hoje e nome da pasta como `council/YYYY-MM-DD — [TEMA]`

b) Crie a pasta (adapte ao seu OS):
```sh
# Linux/macOS:
mkdir -p "council/YYYY-MM-DD — [TEMA]"
# Windows (PowerShell):
New-Item -ItemType Directory -Path "council\YYYY-MM-DD — [TEMA]" -Force
```

c) Salve cada relatório como arquivo `.md` dentro da pasta, com frontmatter:
```yaml
---
tags:
  - council
  - conselheiro
tipo: council-conselheiro
conselheiro: "[NOME]"
sessao: "YYYY-MM-DD — [TEMA]"
created: YYYY-MM-DD
relacionado:
  - "[[council/YYYY-MM-DD — [TEMA]/00-report-final]]"
  # inclua aqui os arquivos do vault com score > 5.0 nos resultados RAG do passo 3
---
```

Nomes dos arquivos:
- `00-report-final.md` — relatório do Presidente
- `01-o-contrario.md`
- `02-principios-basicos.md`
- `03-o-expansionista.md`
- `04-o-forasteiro.md`
- `05-o-executor.md`

### 6. Atualizar `council/CONSELHOS.md`

Adicione um novo bloco no topo da seção `## 📅 Sessões` (antes das sessões existentes),
seguindo o template que já existe no CONSELHOS.md comentado (`<!-- PRÓXIMA SESSÃO -->`):

```markdown
### YYYY-MM-DD — [TEMA]

> [!abstract] Tema
> [descrição do que foi debatido]

> [!success OU !danger] Veredito
> [resumo do veredito em 1–2 frases]

| Conselheiro | Arquivo | Tese em uma linha |
|-------------|---------|-------------------|
| 🏛️ Presidente | [[00-report-final\|Relatório Final]] | ... |
| 🔴 O Contrário | [[01-o-contrario\|O Contrário]] | ... |
...

**Plano derivado:** (se houver)
```

### 7. Reavaliar e atualizar HOME.md (obrigatório)

Releia `HOME.md` e responda explicitamente a cada ponto antes de atualizar:
1. **Métricas** — o veredito altera algum número do dashboard (CAPEX, payback, margem)?
2. **Próximas ações** — o Executor identificou ações concretas que devem entrar nas próximas ações?
3. **Riscos** — novos riscos críticos ou médios surgiram, ou existentes foram resolvidos?
4. **Questões em aberto** — alguma questão foi respondida ou uma nova surgiu?
5. **Roadmap** — a decisão tomada impacta alguma fase ou marco?
6. **Callout de última sessão** — atualizar obrigatoriamente com data, tema e veredito resumido.

Se qualquer resposta for "sim" (e o callout sempre é), atualizar `HOME.md` imediatamente.

### 8. Confirmar

Mostre ao usuário:
- Caminho da pasta criada
- Link para o `council/CONSELHOS.md`
- Resumo de 2 linhas do veredito
