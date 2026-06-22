---
name: obsidian-format
description: >-
  Formata e corrige notas do vault para renderização ideal no Obsidian. Corrige
  wikilinks quebrados, frontmatter incompleto, callouts mal formados, links
  relativos markdown que o Obsidian não resolve, e hierarquia de headings. Use
  quando uma nota está com formatação estranha no Obsidian, quando links não
  aparecem no graph view, ou quando o usuário pede "formatar para Obsidian".
---

# obsidian-format

Revisa e corrige notas do vault para renderização correta no Obsidian.

---

## Quando usar

- Link não aparece no graph view (sinal de link markdown relativo em vez de wikilink)
- Callout não renderiza (bloco `>` sem `[!tipo]`)
- Frontmatter faltando campos obrigatórios
- Nota fica difícil de ler (texto corrido sem hierarquia, tabelas quebradas)
- Usuário pede "formatar" ou "arrumar" uma nota

---

## Checklist de verificação (leia o arquivo antes de editar)

### 1. Frontmatter

Campos obrigatórios para qualquer nota do vault:
```yaml
---
tags:          # lista expandida (não inline [a, b, c])
tipo:          # categoria da nota (ver abaixo)
created:       # YYYY-MM-DD
relacionado:   # lista de wikilinks para notas relacionadas
---
```

Valores válidos de `tipo`:
- `pesquisa` — notas em `pesquisas/`
- `plano` — notas em `planos/`
- `council-conselheiro` — arquivos 01–05 de sessões do conselho
- `council-report` — arquivo `00-report-final` de sessões do conselho
- `index` — arquivos de índice (HOME.md, INDEX.md)

**Erros comuns de frontmatter:**
- Tags inline `[a, b, c]` → expandir para lista YAML
- `tipo` com valor não padronizado (ex: `relatório-conselho`) → normalizar
- `relacionado` apontando para o próprio arquivo → corrigir para arquivos realmente relacionados
- Campos extras não-padrão (`emoji:`, `pasta:`, `status:`) → remover

### 2. Wikilinks vs. links markdown

O Obsidian resolve `[[caminho/arquivo|texto]]` mas **não resolve** `[texto](arquivo.md)` para o graph view.

**Converter:**
```markdown
[01 — O Contrário](01-o-contrario.md)
```
**Para:**
```markdown
[[council/sessao/01-o-contrario|01 — O Contrário]]
```

Regras:
- Sempre use o caminho completo a partir da raiz do vault (sem `./` ou `../`)
- O separador do alias é `|` dentro do `[[...]]`
- Dentro de tabelas Obsidian, escape o pipe: `[[arquivo\|texto]]`

### 3. Callouts

Obsidian renderiza callouts com a sintaxe:
```
> [!tipo] Título opcional
> Conteúdo do callout
```

Tipos válidos: `info`, `warning`, `danger`, `success`, `abstract`, `tip`, `note`, `question`, `quote`

**Erros comuns:**
- `> **Nota:**` ou `> **Atenção:**` soltos (sem `[!tipo]`) → converter para callout
- Callout com linha em branco dentro → remover a linha em branco (quebra a renderização)
- Múltiplas linhas sem o `>` → adicionar `>` em cada linha

### 4. Hierarquia de headings

- H1 (`#`) → só o título da nota (geralmente na primeira linha após o frontmatter)
- H2 (`##`) → seções principais
- H3 (`###`) → subseções
- Nunca pular nível (H2 → H4 direto)

### 5. Tabelas

Para renderizar corretamente:
- Sempre incluir a linha de separador `| --- | --- |`
- Colunas alinhadas com espaços não são obrigatórias mas ajudam na legibilidade
- Links dentro de tabelas precisam do `\|` para escapar o pipe: `[[arquivo\|texto]]`

### 6. Seções de fontes/links

Prefira usar wikilinks para notas do vault e links markdown apenas para URLs externas:
```markdown
## 🔗 Fontes
- [[pesquisas/2026-06-17 — Tema|Pesquisa: Tema]]   ← nota do vault → wikilink
- [Título externo](https://url.com)                  ← URL externa → markdown link
```

---

## Como executar

### 1. Identificar o arquivo-alvo

Se `$ARGUMENTS` contém um caminho, use-o. Se não, pergunte qual nota formatar.

### 2. Ler o arquivo

Leia o arquivo completo antes de qualquer edição.

### 3. Aplicar a checklist

Percorra cada item da checklist acima. Para cada problema encontrado:
- Anote o problema (para reportar ao usuário)
- Aplique o fix com Edit (nunca reescreva o arquivo inteiro a não ser que >50% precise mudar)

### 4. Reportar

Após as edições, mostre um resumo compacto:
```
✅ Formatado: caminho/do/arquivo.md

Correções aplicadas:
- Frontmatter: removido campo `pasta:`, expandido tags inline
- 5 links markdown → wikilinks
- 1 callout `> **Nota:**` → `> [!note]`
```

### 5. Reindexar se necessário

Se o arquivo alterado é uma nota de conteúdo (pesquisa, plano, council), pergunte se quer rodar `rebuild-index` para atualizar o RAG.

---

## Padrões específicos do vault

### Notas de conselho (council/)

Frontmatter mínimo para conselheiros (01-05):
```yaml
tags:
  - council
  - conselheiro
  - [tema-da-sessao]
tipo: council-conselheiro
conselheiro: "[Nome]"
sessao: "YYYY-MM-DD — Tema"
created: YYYY-MM-DD
relacionado:
  - "[[council/YYYY-MM-DD — Tema/00-report-final]]"
```

Frontmatter mínimo para o relatório final (00-report-final):
```yaml
tags:
  - council
  - council-report
  - [tema-da-sessao]
tipo: council-report
conselheiro: "Presidente"
sessao: "YYYY-MM-DD — Tema"
created: YYYY-MM-DD
relacionado:
  - "[[council/YYYY-MM-DD — Tema/01-o-contrario]]"
  - "[[council/YYYY-MM-DD — Tema/05-o-executor]]"
```

### Notas de pesquisa (pesquisas/)

```yaml
tags:
  - pesquisa
  - [tema]
tipo: pesquisa
created: YYYY-MM-DD
status: concluído
relacionado:
```

### Notas de plano (planos/)

```yaml
tags:
  - plano
  - [tema]
tipo: plano
created: YYYY-MM-DD
status: ativo
relacionado:
  - "[[HOME]]"
```
