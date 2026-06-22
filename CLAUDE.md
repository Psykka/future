# CLAUDE.md — Regras do Vault

> Leia este arquivo antes de qualquer ação nesta área de trabalho.

---

## Contexto do Projeto

> Preencha esta seção ao iniciar um novo projeto no vault.

**Projeto:** [Nome do projeto]  
**Fase atual:** Fase 0 — Validação  
**Próximo passo crítico:** [Ação mais importante agora]

O arquivo `HOME.md` é o dashboard central — contém métricas, roadmap, riscos e links para todos os documentos.

---

## Estrutura do Vault

```
vault/
├── HOME.md                    ← dashboard principal (sempre atualizar quando dados mudam)
├── CLAUDE.md                  ← este arquivo
├── council/
│   ├── CONSELHOS.md           ← índice de todas as sessões do conselho
│   └── AAAA-MM-DD — Tema/     ← uma pasta por sessão
│       ├── 00-report-final.md
│       ├── 01-o-contrario.md
│       ├── 02-principios-basicos.md
│       ├── 03-o-expansionista.md
│       ├── 04-o-forasteiro.md
│       └── 05-o-executor.md
├── pesquisas/
│   ├── PESQUISAS.md           ← índice das notas de pesquisa
│   ├── PRE-MORTEMS.md         ← índice das análises de pré-mortem
│   ├── STEELMANS.md           ← índice das análises steelman
│   ├── dados/
│   │   └── AAAA-MM-DD — Tema.md        ← notas de pesquisa de mercado/dados
│   ├── pre-mortems/
│   │   └── AAAA-MM-DD — Pré-mortem Tema.md
│   └── steelmans/
│       └── AAAA-MM-DD — Steelman Tema.md
├── planos/
│   ├── PLANOS.md              ← índice de todos os planos
│   └── NN-slug-do-tema.md     ← numeração sequencial, ex: 01-plano-viabilidade.md
├── notas/
│   ├── NOTAS.md               ← índice de notas rápidas e ideias em semente
│   └── AAAA-MM-DD — Título.md ← uma nota por ideia/pensamento
├── documentos/
│   ├── DOCUMENTOS.md          ← índice de todos os documentos operacionais
│   └── emails/
│       └── AAAA-MM-DD — Título.md  ← um arquivo por email/template
└── scripts/                   ← excluído do Obsidian (.obsidian/app.json)
```

---

## Convenções de Arquivos

### Nomenclatura
- **Datas:** sempre `AAAA-MM-DD` (ISO 8601)
- **Separador:** ` — ` (espaço + travessão + espaço) entre data e título
- **Slugs de planos:** kebab-case, ex: `07-nome-do-plano.md`
- **Encoding:** UTF-8, sem caracteres especiais em nomes de pastas de `council/`

### Arquivos de índice
Cada pasta principal tem um arquivo de índice nomeado em maiúsculas com o nome da própria pasta:

| Pasta | Arquivo de índice |
|-------|------------------|
| `council/` | `council/CONSELHOS.md` |
| `pesquisas/` | `pesquisas/PESQUISAS.md` |
| `planos/` | `planos/PLANOS.md` |
| `documentos/` | `documentos/DOCUMENTOS.md` |
| `notas/` | `notas/NOTAS.md` |

Ao criar qualquer nota nova, o arquivo de índice da pasta correspondente **deve ser atualizado** para incluir o novo conteúdo.

### Frontmatter obrigatório

Todo arquivo `.md` deve ter frontmatter YAML com os campos abaixo. Tags **sempre** em formato de lista expandida — nunca inline (`[a, b, c]`).

```yaml
tags:
  - tag1
  - tag2
tipo: <ver valores abaixo>
created: AAAA-MM-DD
relacionado:
  - "[[caminho/do/arquivo]]"
```

**Valores válidos de `tipo`:**

| tipo | onde usar |
|------|-----------|
| `pesquisa` | notas em `pesquisas/` |
| `nota` | notas em `notas/` (ideias, hipóteses, sementes) |
| `plano` | notas em `planos/` |
| `documento` | notas em `documentos/` (emails, contratos, templates, propostas) |
| `council-conselheiro` | arquivos `01`–`05` de qualquer sessão do conselho |
| `council-report` | arquivo `00-report-final` de qualquer sessão do conselho |
| `index` | arquivos de índice (`HOME.md`, `council/INDEX.md`) |

**Campos específicos por tipo:**

Planos (`planos/`):
```yaml
tipo-decisao: irreversivel  # irreversivel | reversivel — obrigatório
revisitar-em: AAAA-MM-DD   # data concreta — obrigatório; omitir só se status: concluido
status: rascunho            # rascunho | ativo | concluido | revisado | revertido
```

> **Regra de reversibilidade:** Decisões `irreversivel` (CAPEX comprometido, contrato assinado, contratação) exigem o fluxo completo: `/steelman` → `/pre-mortem` → `/new-council` → `/new-plano`. Decisões `reversivel` podem ir direto para execução.

Conselheiros (`01`–`05`):
```yaml
conselheiro: "O Contrário"   # nome exato da persona
sessao: "AAAA-MM-DD — Tema"
```

Relatório final (`00-report-final`):
```yaml
conselheiro: "Presidente"
sessao: "AAAA-MM-DD — Tema"
```

**Campos que NÃO existem no padrão** (nunca adicionar): `emoji:`, `pasta:`, `status:` em arquivos de council.

### Links internos — sempre wikilinks

Para links entre notas do vault, usar **sempre wikilinks** — nunca links markdown relativos (`[texto](arquivo.md)`).

- **Wikilink simples:** `[[caminho/arquivo]]`
- **Wikilink com alias:** `[[caminho/arquivo|texto exibido]]`
- **Dentro de tabelas:** escapar o pipe — `[[caminho/arquivo\|texto]]`
- **Path:** sempre a partir da raiz do vault, sem `./` ou `../`

Links markdown (`[texto](url)`) são reservados exclusivamente para **URLs externas**.

### Regra de navegação — links para HOME são unidirecionais

`HOME.md` pode linkar livremente para qualquer arquivo do vault.
Arquivos dentro de subpastas (`council/`, `pesquisas/`, `planos/`, `notas/`, `documentos/`) **nunca devem linkar de volta para `HOME`** — nem no frontmatter `relacionado:`, nem no corpo do texto, nem em rodapés de navegação.

**Proibido em qualquer subarquivo:**
```
relacionado:
  - "[[HOME]]"        ← PROIBIDO

*[[HOME|← Voltar ao Dashboard]]*   ← PROIBIDO
```

**Navegação entre subarquivos é permitida** (ex: um plano linkando para uma pesquisa, um council linkando para um pré-mortem).

### Idioma
- Todo conteúdo em **português brasileiro**
- Exceções: termos técnicos do domínio do projeto

---

## Comportamento do Agente

### Sempre fazer antes de qualquer tarefa
1. Ler `HOME.md` para entender a fase atual e o que já está documentado
2. **Buscar contexto no vault (RAG):** usar a skill `vault-search`, que executa `npx tsx scripts/vault_rag.ts search` para encontrar chunks relevantes antes de qualquer resposta ou criação de conteúdo
3. Citar as fontes recuperadas no output (ex: `> Fonte: [[pesquisas/AAAA-MM-DD — Tema]]`)
4. Não repetir pesquisas ou análises já presentes no vault
5. Se `vault_index.json` não existir, usar a skill `rebuild-index`

### Ao criar arquivos
- Seguir rigorosamente a estrutura, nomenclatura e frontmatter acima
- Nunca criar arquivos fora das pastas `council/`, `pesquisas/`, `planos/` sem perguntar
- Após criar notas de conteúdo, rodar `rebuild-index` para atualizar o índice RAG

### Reavaliação obrigatória do HOME.md após qualquer criação de conteúdo

Sempre que um arquivo de conteúdo for criado ou atualizado (pesquisa, pré-mortem, steelman, sessão do conselho, plano, nota), é **obrigatório** reavaliar o `HOME.md` antes de encerrar a tarefa. A reavaliação consiste em responder explicitamente a cada uma das perguntas abaixo:

1. **Métricas** — O novo conteúdo altera algum número do dashboard (CAPEX, payback, margem, hashprice, etc.)?
2. **Próximas ações** — Alguma ação foi concluída, desbloqueada ou tornou-se obsoleta?
3. **Riscos** — Um novo risco crítico ou médio foi identificado, ou um existente foi mitigado?
4. **Questões em aberto** — Uma questão foi respondida ou uma nova surgiu?
5. **Roadmap** — A fase atual mudou, ou algum marco foi antecipado/atrasado?
6. **Seção de documentos** — O callout "Última sessão/entrada" precisa ser atualizado?

Se qualquer resposta for "sim", atualizar `HOME.md` imediatamente — não aguardar o usuário pedir. Se todas as respostas forem "não", declarar explicitamente no chat: *"HOME.md revisado — nenhuma atualização necessária."*

### Ao criar sessões do conselho
- Usar a skill `new-council` (não `llm-council` diretamente) — ela carrega contexto do projeto + RAG antes de invocar os conselheiros
- Os conselheiros recebem chunks do vault no prompt para ancorar a análise em dados reais
- Após a sessão, verificar com `obsidian-format` se os arquivos gerados estão formatados corretamente

### Ao editar HOME.md
- Preservar toda a estrutura Obsidian (callouts `> [!tipo]`, links `[[wikilink]]`, Mermaid)
- Só alterar métricas financeiras se houver fonte explícita (pesquisa ou dado novo)
- Manter o roadmap sincronizado com a fase real do projeto

### Skills disponíveis (usar proativamente)

| Situação | Skill a usar |
|----------|-------------|
| Buscar contexto já documentado no vault | `vault-search` |
| Pesquisar qualquer tema do projeto na web | `research-note` |
| Documentar uma nova decisão ou caminho | `new-plano` |
| **Fluxo GO/NO-GO: ver modos de falha** | `pre-mortem` → salva em `pesquisas/pre-mortems/` |
| **Fluxo GO/NO-GO: ver upside máximo** | `steelman` → salva em `pesquisas/steelmans/` |
| **Fluxo GO/NO-GO: pressure-test completo** | `new-council` → salva em `council/` |
| Pressure-test avulso (sem salvar no vault) | `llm-council` |
| **Revisão semanal do projeto** | `revisao-semanal` → briefing no chat |
| **Fechar o loop de uma decisão passada** | `revisao-decisao` → atualiza o plano |
| Corrigir formatação de nota para Obsidian | `obsidian-format` |
| Salvar e publicar mudanças no GitHub | `vault-sync` |
| Novas notas adicionadas → atualizar índice RAG | `rebuild-index` |

> **Fluxo para decisões irreversíveis:**
> `/steelman` → `/pre-mortem` → `/new-council` se ainda houver dúvida → `/new-plano` (com `tipo-decisao: irreversivel`)

> **Ritual semanal:**
> `/revisao-semanal` → para cada plano vencido → `/revisao-decisao`

### Ao capturar ideias e lembretes

Sempre que o usuário mencionar uma ideia, hipótese, oportunidade futura ou qualquer coisa que ele queira "lembrar depois":

1. **Criar nota em `notas/`** com `tipo: nota` — nunca salvar só na memória do agente
2. **Atualizar `notas/NOTAS.md`** com entrada no índice
3. **Frontmatter obrigatório para notas:**
   ```yaml
   ciclo: semente          # semente | avaliando | planejando | ativa | arquivada | descartada
   revisitar: "quando X"  # gatilho concreto, não "algum dia"
   decisao: pendente       # pendente | aprovada | rejeitada
   ```
4. **Estrutura mínima do corpo:**
   - De onde veio a ideia (contexto)
   - A hipótese central
   - O que precisaria ser verdade para valer a pena investigar
   - Próximos passos concretos (mesmo que seja "revisitar em X")

> A memória do agente não é visível para o usuário no Obsidian. O vault é. Tudo que o usuário precisa lembrar depois vai para o vault.

### Não fazer sem perguntar
- Deletar ou mover arquivos existentes
- Alterar a estrutura de pastas do vault
- Fazer push para o GitHub (usar skill `vault-sync` que pede confirmação)
- Modificar `.obsidian/` além do `userIgnoreFilters` em `app.json` (que controla pastas excluídas do Obsidian)

### Tom e formato das respostas
- Direto e objetivo — sem introduções longas
- Usar tabelas para dados financeiros, bullet points apenas quando necessário
- Ao criar notas, gerar o arquivo e apresentar o caminho; não repetir o conteúdo inteiro no chat
