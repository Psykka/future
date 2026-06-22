---
name: new-plano
description: >-
  Cria um novo plano de ação no vault com estrutura padronizada. Faz 5 perguntas
  guiadas uma por vez (decisão central, contexto, opções, CAPEX, próximo passo)
  antes de gerar o arquivo em planos/ com frontmatter completo, tabela financeira,
  checklist de ações e critérios GO/NO-GO. Atualiza automaticamente o HOME.md.
  Use quando quiser documentar uma nova decisão ou caminho de ação do projeto.
---

# new-plano

Cria um novo plano de ação no vault com estrutura padronizada. Faz perguntas guiadas para preencher o contexto antes de gerar o arquivo.

## Instruções

### 1. Obter nome do plano

Se `$ARGUMENTS` estiver preenchido, use como nome/tema do plano.
Se estiver vazio, pergunte: *"Qual é o tema ou decisão que este plano documenta?"*

### 2. Fazer as perguntas guiadas

Faça as perguntas abaixo **uma de cada vez** (não tudo junto). Aguarde a resposta antes de prosseguir. Se o usuário não souber responder alguma, coloque `[a definir]` e siga:

**Pergunta 1:** "Em uma frase: qual é a decisão ou ação central deste plano?"
**Pergunta 2:** "Qual é o contexto — o que levou à necessidade deste plano? (pode ser curto)"
**Pergunta 3:** "Quais são as opções que você está considerando? (ou é só uma direção definida?)"
**Pergunta 4:** "Este plano tem CAPEX envolvido? Se sim, qual a estimativa?"
**Pergunta 5:** "Qual é o próximo passo concreto para executar este plano?"
**Pergunta 6:** "Esta decisão é **reversível ou irreversível**? (Reversível = pode desfazer sem custo alto; Irreversível = CAPEX comprometido, contrato assinado, parceria fechada)"
**Pergunta 7:** "Em quanto tempo você espera ter evidência suficiente para revisitar esta decisão? (ex: 30 dias, 90 dias, após X acontecer)"

### 3. Gerar o número sequencial

Liste os arquivos em `planos/` para descobrir o próximo número:
```bash
ls planos/ | grep -E '^[0-9]+' | sort | tail -1
```
Incremente em 1. Se não houver arquivos numerados, comece em `07`.

### 4. Criar o arquivo

Nome: `planos/[NN]-[slug-do-tema].md`
Exemplo: `planos/07-piloto-frimesa.md`

Use o frontmatter:
```yaml
---
tags:
  - plano
  - [tag do tema]
tipo: plano
versao: "1.0"
created: AAAA-MM-DD
updated: AAAA-MM-DD
status: rascunho
tipo-decisao: irreversivel  # irreversivel | reversivel — obrigatório
revisitar-em: AAAA-MM-DD   # data concreta derivada da resposta 7
relacionado:
  - "[[council/CONSELHOS]]"
---
```

> **Nota sobre `tipo-decisao`:** Decisões irreversíveis (CAPEX, contratos, contratações) exigem o processo completo de council + pre-mortem + steelman antes do GO. Decisões reversíveis podem ir direto para execução.

Estrutura do arquivo:
```markdown
# Plano — [NOME DO PLANO]
**Versão:** 1.0 · **Data:** AAAA-MM-DD · **Status:** Rascunho

---

## Decisão Central
[resposta da pergunta 1]

## Classificação
| Campo | Valor |
|-------|-------|
| Tipo de decisão | [Irreversível / Reversível] |
| Revisitar em | AAAA-MM-DD |
| Gatilho de revisão | [o que precisará ter acontecido para avaliar] |

## Contexto
[resposta da pergunta 2]

## Opções Consideradas
[resposta da pergunta 3 — ou "Direção única definida: X"]

## Modelo Financeiro
| Item | Valor |
|------|-------|
| CAPEX estimado | [resposta da pergunta 4 ou "a definir"] |
| Payback estimado | a definir |
| Receita esperada/mês | a definir |

## Plano de Ação

- [ ] [resposta da pergunta 5 — próximo passo]
- [ ] [a definir]
- [ ] [a definir]

## Riscos
| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| a definir | — | — | — |

## Decisão GO / NO-GO
**Critérios para GO:**
- [ ] a definir

**Critérios para NO-GO:**
- [ ] a definir
```

### 5. Atualizar `planos/PLANOS.md`

Adicione um novo bloco no topo da seção `## 📋 Planos` (antes dos planos existentes), seguindo o template comentado no arquivo:

```markdown
### NN — Nome do Plano

> [!abstract] Decisão central
> [resposta da pergunta 1]

> [!success] Status: rascunho
> [resumo de uma linha]

| Campo | Detalhe |
|-------|---------|
| Arquivo | [[planos/NN-slug\|Nome do Plano]] |
| Status | rascunho |
| Derivado de | [[...]] |
```

### 6. Atualizar HOME.md

Adicione uma linha na tabela de `planos/` em `## 🗂️ Documentos do Projeto`:
```
| [[planos/NN-slug\|Nome do Plano]] | v1.0 | [descrição de uma linha] |
```

### 7. Confirmar

Mostre ao usuário o caminho do arquivo criado e pergunte se quer preencher algum campo agora ou deixar para depois.
