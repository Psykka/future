---
name: research-note
description: >-
  Pesquisa um tema usando o contexto atual do projeto como base. Lê HOME.md e
  o plano de viabilidade antes de pesquisar para evitar repetir o que já está
  documentado e focar no que está em aberto. Lança 2–4 agentes paralelos por
  ângulo do tema com buscas online e salva o resultado consolidado em
  pesquisas/AAAA-MM-DD — Tema.md com frontmatter, sumário executivo e seção
  "o que muda no plano". Se os dados afetam métricas do dashboard, pergunta se
  quer atualizar o HOME.md também.
---

# research-note

Pesquisa um tema usando o contexto atual do projeto e salva o resultado como uma nota em `pesquisas/`.

## Instruções

### 1. Obter o tema

Se `$ARGUMENTS` estiver preenchido, use como tema da pesquisa.
Se estiver vazio, pergunte: *"Sobre o que você quer pesquisar?"*

### 2. Carregar contexto do projeto

Leia os arquivos abaixo para entender o que já sabemos e focar a pesquisa no que é relevante:
- `HOME.md` — fase atual, hardware, parceiro-alvo, métricas
- `planos/01-plano-viabilidade.md` — para entender o que já foi pesquisado e as lacunas
- O relatório final mais recente:
  ```sh
  # Linux/macOS:
  find council -name "00-report-final.md" | sort | tail -1
  # Windows (PowerShell):
  Get-ChildItem -Path council -Recurse -Filter "00-report-final.md" | Sort-Object FullName | Select-Object -Last 1
  ```

Use esse contexto para:
- Evitar repetir o que já está documentado
- Priorizar dados que mudam o modelo financeiro ou o plano de ação
- Direcionar as queries de busca para o que ainda está em aberto
- **Registrar os arquivos-fonte com score > 5.0 dos resultados RAG** — eles entrarão no `relacionado:` da nota criada

### 3. Executar a pesquisa

Lance **2–4 agentes de pesquisa em paralelo** via ferramenta `Agent` com `run_in_background: true`, cada um focado num ângulo diferente do tema. Exemplos de divisão para temas financeiros:
- Agente 1: dados numéricos e preços atuais
- Agente 2: contexto regulatório ou mercado
- Agente 3: casos práticos / benchmarks / concorrência
- Agente 4: riscos ou contra-argumentos

Cada agente deve incluir buscas online (`WebSearch`) e retornar dados com fontes.

### 4. Salvar a nota

Após consolidar os resultados, salve em:
```
pesquisas/dados/AAAA-MM-DD — [TEMA].md
```

Use este frontmatter:
```yaml
---
tags:
  - pesquisa
  - [tag do tema]
tipo: pesquisa
tema: "[TEMA]"
created: AAAA-MM-DD
status: concluída
relacionado:
  - "[[planos/NN-slug]]"
  # adicione aqui: councils relacionados, pesquisas irmãs, planos vinculados
  # fontes: arquivos com score > 5.0 nos resultados RAG do passo 2
  # NUNCA adicionar "[[HOME]]" — links para HOME são proibidos em subarquivos
---
```

Estrutura da nota:
```markdown
# Pesquisa — [TEMA]
**Data:** AAAA-MM-DD · **Contexto:** [por que essa pesquisa foi feita]

## Sumário Executivo
[3–5 bullet points com os achados mais importantes]

## Dados Detalhados
[resultados organizados por ângulo/agente]

## O que muda no plano
[como esses dados impactam o HOME.md ou o plano de viabilidade — se aplicável]

## Fontes
[lista de links com fontes]
```

### 5. Atualizar `pesquisas/PESQUISAS.md`

Adicione um novo bloco no topo da seção `## 📅 Pesquisas` (antes das pesquisas existentes), seguindo o template comentado no arquivo:

```markdown
### AAAA-MM-DD — Tema da Pesquisa

> [!abstract] Tema
> O que foi pesquisado e por quê.

> [!success] Conclusão
> Resultado principal em 1–2 frases.

| Campo | Detalhe |
|-------|---------|
| Arquivo | [[pesquisas/dados/AAAA-MM-DD — Tema\|Pesquisa completa]] |
| Status | concluído |
| Vinculado a | [[...]] |
```

### 6. Reavaliar HOME.md (obrigatório)

Releia `HOME.md` e responda explicitamente a cada ponto:
1. **Métricas** — algum número do dashboard muda com esses dados?
2. **Próximas ações** — alguma ação foi desbloqueada, concluída ou tornou-se obsoleta?
3. **Riscos** — novo risco identificado ou existente mitigado?
4. **Questões em aberto** — alguma foi respondida ou uma nova surgiu?
5. **Roadmap** — a fase atual ou algum marco precisa ser ajustado?
6. **Callout de documentos** — o callout "Última entrada" precisa refletir esta pesquisa?

Se qualquer resposta for "sim", atualizar `HOME.md` imediatamente.
Se todas forem "não", declarar no chat: *"HOME.md revisado — nenhuma atualização necessária."*

### 7. Confirmar

Mostre ao usuário:
- Caminho da nota criada
- Os 3 achados mais relevantes em bullet points
