---
name: revisao-decisao
description: >-
  Revisita uma decisão documentada em planos/ após o período de observação.
  Faz 6 perguntas guiadas sobre o que aconteceu vs. o que foi planejado, avalia
  se o raciocínio estava correto, extrai aprendizados e salva a revisão como
  seção no próprio arquivo do plano. Atualiza o campo revisitar-em para o próximo
  ciclo. Use quando /revisao-semanal identificar um plano com revisitar-em vencido,
  ou quando quiser calibrar uma decisão passada manualmente.
---

# revisao-decisao

Fecha o loop de uma decisão: compara o planejado com o ocorrido, extrai aprendizado institucional e agenda a próxima revisita.

## Instruções

### 1. Identificar o plano

Se `$ARGUMENTS` estiver preenchido, leia o arquivo indicado.
Se estiver vazio, pergunte: *"Qual plano você quer revisitar? (ex: planos/01-plano-viabilidade.md)"*

### 2. Carregar contexto completo

Leia em paralelo:
- O arquivo do plano — decisão original, raciocínio, critérios GO/NO-GO, `revisitar-em`
- `HOME.md` — estado atual do projeto
- Se o plano tiver `relacionado:` com links de council ou pesquisas, leia o `00-report-final.md` mais relevante

### 3. Fazer as perguntas de revisão

Faça **uma de cada vez**, aguarde resposta antes de continuar:

**Pergunta 1:** "O que de fato aconteceu desde que essa decisão foi tomada? (resumo livre)"

**Pergunta 2:** "A decisão foi executada conforme planejado? Se não, o que mudou e por quê?"

**Pergunta 3:** "O raciocínio que levou à decisão estava correto? O que você subestimou ou superestimou?"

**Pergunta 4:** "Os critérios GO/NO-GO definidos no plano se confirmaram, foram cancelados ou precisam ser revistos?"

**Pergunta 5:** "O que você faria diferente se tivesse que tomar essa decisão hoje, sabendo o que sabe agora?"

**Pergunta 6:** "Qual é o status desta decisão agora? (ativa · concluída · revisada · revertida)"

### 4. Salvar a revisão no próprio plano

Adicione ao final do arquivo do plano:

```markdown
---

## Revisão — AAAA-MM-DD

**Status pós-revisão:** [ativa | concluída | revisada | revertida]
**Próxima revisita:** AAAA-MM-DD

### O que aconteceu
[resposta da pergunta 1]

### Execução vs. Planejado
[resposta da pergunta 2]

### Calibração do Raciocínio
[resposta da pergunta 3]

### Critérios GO/NO-GO — Status atual
[resposta da pergunta 4]

### O que faria diferente
[resposta da pergunta 5]
```

### 5. Atualizar o frontmatter do plano

```yaml
updated: AAAA-MM-DD
status: [ativo | concluido | revisado | revertido]
revisitar-em: AAAA-MM-DD  # próximo ciclo se ainda ativo; omitir se concluído/revertido
```

### 6. Atualizar `planos/PLANOS.md`

Atualize o bloco correspondente com o novo status e data de revisão.

### 7. Reavaliar HOME.md (obrigatório)

Releia `HOME.md` e responda explicitamente:
1. **Métricas** — a revisão altera algum número do dashboard?
2. **Próximas ações** — alguma ação decorre diretamente desta revisão?
3. **Riscos** — algum risco foi confirmado ou mitigado?
4. **Questões em aberto** — alguma questão foi respondida?
5. **Roadmap** — fase atual ou algum marco precisa ajuste?
6. **Callout de documentos** — o callout "Última entrada" precisa ser atualizado?

Se qualquer resposta for "sim", atualizar `HOME.md` imediatamente.
Se todas forem "não", declarar: *"HOME.md revisado — nenhuma atualização necessária."*

### 8. Confirmar ao usuário

Mostre:
- Caminho do arquivo atualizado
- Status pós-revisão em destaque
- O aprendizado mais importante (resposta da pergunta 5) em 1 frase
- Pergunta opcional: *"Quer levar algum aprendizado desta revisão ao conselho ou abrir um novo plano?"*
