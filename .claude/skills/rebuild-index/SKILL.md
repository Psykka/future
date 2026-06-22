---
name: rebuild-index
description: >-
  Regenera o índice vetorial LanceDB após novas notas serem adicionadas. Use depois
  de criar pesquisas, planos ou sessões do conselho.
---

# rebuild-index

Regenera o índice de busca semântica do vault. O índice fica em `scripts/data/lancedb/` (ignorado pelo git) e precisa ser regenerado quando o vault cresce.

---

## Instruções

Execute da **raiz do vault**:

```sh
npx tsx scripts/src/vault_rag.ts reindex
```

Aguarde as mensagens de conclusão:
```
Iniciando ingestão de notas do vault: ...
Encontradas N notas. Iniciando processamento...
Processamento concluído. Iniciando inserção de N chunks na base de dados...
Ingestão concluída em X segundos.
```

### Primeira vez (dependências não instaladas)

```sh
cd scripts && npm install && cd ..
npx tsx scripts/src/vault_rag.ts reindex
```

---

## Quando usar

- Após criar qualquer nota em `pesquisas/`, `planos/` ou `council/`
- Após edições significativas no `HOME.md`
- Se `vault-search` não retornar resultados esperados
- Após clonar o repositório em uma nova máquina (o índice não está no git)

---

## Nota

O índice LanceDB não é commitado no git (pasta `scripts/data/` está no `.gitignore`). Cada máquina mantém seu próprio índice local.
