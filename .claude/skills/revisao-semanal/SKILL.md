---
name: revisao-semanal
description: >-
  Ritual de revisão semanal do projeto. Varre HOME.md, planos/, notas/ e
  council/ para identificar: ações em atraso, decisões que chegaram ao prazo
  de revisita, questões em aberto sem resposta, e notas-semente com gatilho
  atingido. Produz um briefing estruturado no chat (não cria arquivo) e aciona
  /revisao-decisao para planos vencidos. Use toda semana antes de trabalhar no
  projeto — é o ritual que mantém o vault atualizado e o projeto em movimento.
---

# revisao-semanal

Ritual semanal de revisão. Varre o vault e produz um briefing estruturado de tudo que precisa de atenção — não cria arquivo, é um ritual de trabalho ativo.

## Instruções

### 1. Carregar o estado atual

Leia em paralelo:
- `HOME.md` — fase, ações abertas (`> [!todo]`), questões em aberto (`> [!question]`), riscos
- `planos/PLANOS.md` — status de cada plano listado
- `notas/NOTAS.md` — ciclo de cada nota
- Cada arquivo `.md` em `planos/` — verificar o campo `revisitar-em` no frontmatter

### 2. Varredura — construir o briefing

#### 2a. Ações em atraso ou sem prazo
- Leia todos os blocos `> [!todo]` do HOME.md
- Liste itens `- [ ]` sem data ou cuja data já passou em relação a hoje

#### 2b. Planos com revisita vencida ou próxima
- Para cada arquivo `.md` em `planos/`, leia o frontmatter e verifique `revisitar-em`
- **VENCIDO** → data já passou
- **PRÓXIMO** → vence nos próximos 14 dias
- Se não tiver o campo `revisitar-em`, marque como **SEM REVISITA PROGRAMADA**

#### 2c. Notas-semente com gatilho atingido
- Liste notas do `notas/NOTAS.md` com `ciclo: semente` ou `ciclo: avaliando`
- Verifique o campo `revisitar` — se o gatilho descrito já foi atingido, marque para avaliação

#### 2d. Questões em aberto sem resposta
- Liste todas as seções `> [!question]` do HOME.md
- Identifique se alguma tem uma resposta implícita no vault que ainda não foi incorporada

#### 2e. Tarefas do último conselho não incorporadas ao HOME
- Leia a entrada mais recente do `council/CONSELHOS.md`
- Verifique se as tarefas do Executor estão refletidas nas ações abertas do HOME

### 3. Apresentar o briefing no chat

Use exatamente este formato — não crie arquivo:

```
## 📋 Revisão Semanal — [DATA DE HOJE]
**Fase atual:** [do HOME] · **Próximo passo crítico:** [do HOME]

---

### 🔴 Requer ação imediata
[planos VENCIDOS, ações com data passada, bloqueios críticos]
→ Se vazio: "Nada crítico."

### 🟡 Esta semana
[ações abertas sem data, notas para avançar de ciclo, questões para responder, tarefas do Executor não incorporadas]
→ Se vazio: "Agenda limpa."

### 🔵 No radar — próximos 14 dias
[planos com revisita PRÓXIMA, decisões pendentes]
→ Se vazio: "Nenhum prazo chegando."

### ❓ Questões em aberto (sem resposta)
[lista das questões do HOME que ainda não foram respondidas]
```

### 4. Para cada plano com `revisitar-em` VENCIDO

Pergunte ao usuário: *"O plano [[planos/NN-slug]] tinha revisita programada para [data]. Quer fazer a revisão agora com `/revisao-decisao`?"*

Se sim, acione a skill `revisao-decisao` passando o caminho do plano.

### 5. Atualizar HOME.md se necessário

Se identificar ações concluídas ou status desatualizado, pergunte se quer atualizar o HOME agora antes de encerrar a revisão.
