---
name: vault-search
description: >-
  Busca semântica no vault usando LanceDB (embeddings vetoriais). Use SEMPRE que a
  tarefa tocar num tema que pode já estar documentado — hardware, parceiros,
  financiamento, regulação, decisões do conselho, pesquisas anteriores.
---

# vault-search

Consulta o índice RAG do vault antes de responder ou criar qualquer conteúdo.

---

## Quando usar

Use **antes de qualquer tarefa** que envolva temas que podem já estar no vault:
- Hardware (ASICs, eficiência, preços, benchmarks)
- Parceiros de energia (Frimesa, cooperativas, biogás)
- Financiamento, CAPEX, payback, fluxo de caixa
- Regulação (DeCripto, II, ICMS, ACL)
- Decisões debatidas no conselho
- Pesquisas anteriores sobre qualquer tema do projeto
- Pivot GPU/AI hosting

---

## Como executar

### 1. Verificar se o índice existe

Verifique se a pasta `scripts/data/lancedb/vault.lance` existe. Se não existir, rode `rebuild-index` antes de continuar.

### 2. Executar a busca via CLI do vault

```sh
npx tsx scripts/src/vault_rag.ts search "SUA_QUERY" 5
```

Exemplos de queries:
```sh
npx tsx scripts/src/vault_rag.ts search "hardware ASIC S21 eficiência" 5
npx tsx scripts/src/vault_rag.ts search "Frimesa parceria energia biogás" 5
npx tsx scripts/src/vault_rag.ts search "financiamento FINEP CAPEX payback" 5
```

### 3. Usar os resultados

- Integre os chunks relevantes na resposta ou documento
- Cite sempre: `> Fonte: [[caminho/do/arquivo]]`
- Registre os arquivos-fonte no campo `relacionado:` de qualquer nota criada nesta tarefa
- Se não retornar nada relevante, prossiga sem contexto do vault

### 4. Múltiplas buscas para tarefas complexas

Para cobrir ângulos distintos, rode 2–3 buscas em paralelo com termos diferentes:

```sh
npx tsx scripts/src/vault_rag.ts search "QUERY_1" 5
npx tsx scripts/src/vault_rag.ts search "QUERY_2" 5
npx tsx scripts/src/vault_rag.ts search "QUERY_3" 5
```

---

## Se o índice não existir

Use a skill `rebuild-index` ou rode diretamente:

```sh
npx tsx scripts/src/vault_rag.ts reindex
```

---

## Quando reindexar

Use `rebuild-index` após criar novas notas em `pesquisas/`, `planos/` ou `council/`.
