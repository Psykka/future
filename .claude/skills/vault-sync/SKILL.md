---
name: vault-sync
description: >-
  Sincroniza o vault Obsidian com o GitHub. Verifica se o repositório git existe,
  configura o remote se necessário, gera automaticamente uma mensagem de commit
  descritiva com base nos arquivos alterados e faz push para origin/main.
  Use quando quiser salvar e publicar mudanças no vault. Aceita mensagem de commit
  como argumento opcional para pular a confirmação.
---

# vault-sync

Sincroniza o vault Obsidian com o GitHub: inicializa git se necessário, gera commit com mensagem descritiva e faz push.

## Instruções

1. **Verifique se o repositório git já existe:**
   - Execute `git status` no diretório atual
   - Se retornar erro "not a git repository", inicialize com `git init -b main`

2. **Verifique se o remote `origin` está configurado:**
   - Execute `git remote -v`
   - Se não houver remote, pergunte ao usuário: *"Qual é a URL do repositório GitHub? (ex: https://github.com/usuario/repo.git)"*
   - Configure com `git remote add origin <URL informada>`

3. **Crie um `.gitignore` se não existir**, com o conteúdo:
   ```
   .obsidian/workspace.json
   .obsidian/workspace-mobile.json
   .obsidian/cache
   .DS_Store
   ```

4. **Liste os arquivos modificados/novos:**
   - Execute `git status --short` para ver o que mudou
   - Leia os nomes dos arquivos alterados para gerar uma mensagem de commit relevante

5. **Gere a mensagem de commit automaticamente** com base nos arquivos alterados:
   - Se mudou `HOME.md` → mencione "dashboard"
   - Se mudou algo em `council/` → mencione a sessão e o tema
   - Se mudou algo em `planos/` → mencione o plano
   - Se são muitos arquivos → use uma mensagem geral como "vault: atualiza documentação do projeto"
   - Formato: `tipo: descrição curta` (ex: `council: adiciona sessão 2026-06-17 mineração bitcoin`)

6. **Mostre a mensagem de commit gerada** e pergunte: *"Quer usar essa mensagem ou prefere digitar outra?"*
   - Se o usuário der uma mensagem nova, use ela
   - Se confirmar, prossiga

7. **Execute o commit e push:**
   ```bash
   git add .
   git commit -m "<mensagem>"
   git push -u origin main
   ```
   Se o push falhar por divergência, informe o usuário e sugira `git pull --rebase origin main` antes de tentar novamente.

8. **Confirme o sucesso** mostrando o link do repositório no GitHub.

## Argumentos opcionais

Se o usuário passar `$ARGUMENTS`, use como mensagem de commit diretamente (pulando o passo 6).

Exemplo: `/vault-sync council: adiciona nova sessão sobre piloto Frimesa`
