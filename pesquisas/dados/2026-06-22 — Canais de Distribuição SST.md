---
tags:
  - pesquisa
  - sst
  - distribuicao
  - tecnico-seguranca
  - pgr
  - pcmso
  - canais
tipo: pesquisa
created: 2026-06-22
relacionado:
  - "[[pesquisas/dados/2026-06-22 — Análise Comparativa Mercados B2B]]"
---

# Canais de Distribuição para Software SST no Brasil

> Pesquisa sobre distribuidores naturais, dores do mercado, modelos de parceria e acesso local (Matão/Ribeirão Preto) para software de SST focado em PGR, PCMSO e laudos NR.

---

## 1. Distribuidores Naturais de SST

### Técnicos de Segurança do Trabalho

- **Volume total:** 814.697 técnicos industriais registrados no Sistema CFT/CRTs (2024), sendo 464.371 ativos. Os técnicos de segurança do trabalho estavam impedidos de registro direto no CFT até 2025 — a Resolução CFT nº 284/2025 passou a permitir a inclusão do título como modalidade complementar ao registro principal.
- **Perfil freelancer:** Atuam como pessoas físicas ou microempresas de consultoria, atendendo carteiras de 10–50 clientes pequenos (comércio, indústria leve, construção). Cobram por programa elaborado ou por pacote anual.
- **Canal principal:** São os assinantes diretos dos sistemas SST existentes e os responsáveis técnicos pelos laudos das empresas clientes — ou seja, são tanto o usuário do sistema quanto o distribuidor natural para as empresas finais.

### Engenheiros de Segurança do Trabalho

- Vinculados ao CREA, com habilitação para assinar LTCAT, laudos NR-12, NR-13 e NR-10 (os técnicos não podem assinar laudos de engenharia).
- Atuam em empresas de médio/grande porte ou como consultores de projetos específicos (laudos de instalações, análise de risco complexa).
- Diferença prática: o técnico atende volume (muitas empresas pequenas, contratos recorrentes de PGR+PCMSO); o engenheiro atende projetos pontuais de maior valor.
- **Para o modelo proposto:** técnicos são o canal prioritário (volume + recorrência); engenheiros são parceiros para laudos que exigem ART.

### Médicos do Trabalho / Clínicas Ocupacionais

- Responsáveis pela assinatura do PCMSO — nenhuma empresa emite PCMSO sem médico do trabalho responsável.
- Clínicas de medicina ocupacional têm carteiras de dezenas a centenas de empresas clientes (exames admissionais, periódicos, demissionais).
- **Oportunidade:** Clínicas já têm o relacionamento com o RH/DP das empresas. Um sistema que integre PGR+PCMSO e envie eventos eSocial automaticamente é diretamente útil para elas. Modelo possível: clínica assina o sistema e oferece como serviço incluído no contrato com a empresa.

### Escritórios Contábeis

- Responsáveis pelo envio do eSocial na maioria das pequenas empresas — podem ser contratados para enviar também os eventos de SST (S-2220, S-2240).
- Fontes identificadas confirmam: "a empresa pode acordar para que o envio de SST no eSocial seja realizado por contadores ou escritórios de contabilidade."
- **Dor real:** contadores orientam clientes sobre obrigações de PGR+PCMSO mas não elaboram os documentos — precisam indicar alguém. Multas por não envio chegam a R$ 42.563 por infração, o que cria urgência.
- **Canal de indicação:** Contador não vende SST, mas pode indicar o sistema + o técnico parceiro como solução integrada. Modelo de comissão por indicação é viável.

### Sindicatos Patronais / SEBRAE / Associações Comerciais

- CDL, ACIM, SEBRAE regional — têm base de microempresas e pequenas empresas que precisam de PGR+PCMSO mas não sabem como cumprir.
- Canal de acesso coletivo: uma parceria com CDL local pode gerar 20–50 leads qualificados em uma única ação (palestra, feira, workshop).
- **Fricção:** ciclo de venda via sindicato é lento; mais útil para construção de marca local do que para os primeiros 5 clientes.

### Despachantes Trabalhistas e Consultorias de RH/DP

- Atuam entre a empresa e o Ministério do Trabalho — orientam sobre obrigações, autuações e regularizações.
- Canal de indicação natural para SST quando a empresa está em risco de autuação.

---

## 2. Dores dos Distribuidores (Técnicos SST)

### Como gerenciam hoje

- **Planilha Excel / Google Sheets:** controle manual de vencimentos de PGR (anual), PCMSO (anual), ASOs (por cargo), treinamentos NRs. Sem alerta automático.
- **WhatsApp:** comunicação com clientes para lembrar renovações — processo informal e não escalável.
- **Word/Google Docs:** geração de laudos e relatórios por edição manual de templates. Cada cliente é uma pasta com arquivos renomeados.
- **Sem sistema integrado com eSocial:** a maioria não tem integração nativa com eSocial SST — precisa exportar dados manualmente ou usar o sistema do contador.

### Sistemas SST existentes no mercado

| Sistema | Perfil | Observação |
|---------|--------|------------|
| SOC Software | Grandes empresas / SESMT interno | Robusto, caro, foco enterprise |
| Sistema ESO | Clínicas, técnicos, assessorias | Mais acessível, integrado ao eSocial |
| Indexmed | Clínicas ocupacionais | Cobra por funcionário ativo (R$ 0,18/funcionário acima de 500) |
| Bevart | SST geral com IA | Sem taxa de implementação, modelo Netflix |
| ProSESMT | Clínicas e SESMT interno | Integrado ao Omie |
| RS Data | SST genérico | — |

### Custo aproximado de sistema para técnico freelancer

- Não foi possível obter preço público do Sistema ESO (página de planos sem valores visíveis nas buscas).
- Indexmed: gratuito até 500 funcionários gerenciados, R$ 0,18/funcionário ativo acima disso.
- Bevart: modelo de assinatura sem taxa de implantação, preços não públicos.
- **Estimativa de mercado:** R$ 150–500/mês para sistema básico voltado a técnico autônomo com carteira de 20–40 clientes.

### Dores específicas do técnico freelancer vs CLT

| Dimensão | Freelancer | CLT em empresa |
|----------|-----------|----------------|
| Controle de vencimentos | Manual, por conta própria | Sistema da empresa |
| Geração de relatórios | Word/template próprio | Pode ter sistema do SESMT |
| Relacionamento com cliente | Direto, informal | Via RH/gestor |
| Risco de perder cliente | Alto se atrasar renovação | Não se aplica |
| Renda | Por contrato; escala limitada | Salário fixo |

**Dor prioritária do freelancer:** perder cliente por esquecimento de renovação + tempo gasto em formatação de documentos que poderiam ser automatizados.

---

## 3. Modelo de Parceria Tech + Técnico SST

### White label / marca do parceiro

- **SpeakSafely** oferece white label explícito para clínicas e consultorias SST — o parceiro apresenta o sistema com sua própria marca.
- **Modelo de indicação com comissão:** várias plataformas SST operam com link de afiliado — vendas geradas pelo link geram créditos mensais transferidos ao parceiro.

### O que existe hoje

- Parcerias entre softwares SST e técnicos/consultores já existem, mas são pouco estruturadas. A maioria é informal: técnico usa o sistema e indica para clientes como parte do seu serviço.
- Não há modelo dominante de "técnico como revendedor exclusivo de software SST" — o mercado é fragmentado.

### O que motivaria um técnico com 20–30 clientes a indicar

1. **Reduz seu próprio trabalho:** sistema que automatiza alertas de vencimento, geração de documentos e envio ao eSocial libera horas por semana.
2. **Diferencial competitivo:** poder oferecer "portal do cliente" ou relatório profissional aumenta o valor percebido do serviço do técnico.
3. **Receita adicional:** comissão de indicação ou participação na mensalidade do cliente.
4. **Sem esforço de venda:** se o sistema já é usado pelo técnico, a indicação é natural ("uso esse sistema para gerenciar seu PGR").

**Modelo recomendado:** técnico usa o sistema para gerenciar sua carteira (proposta de valor direta) + inclui acesso ao painel do cliente no pacote que cobra da empresa. O fundador opera e mantém; técnico assina os documentos e tem a relação comercial.

---

## 4. Acesso Local — Matão/Ribeirão Preto-SP

### Entidades relevantes

- **SINTESP** (Sindicato dos Técnicos em Segurança do Trabalho — SP): possui 10 regionais no interior do Estado de São Paulo. É o canal sindical direto para técnicos freelancers e CLT em SP.
- **FENATEST** (Federação Nacional): agrega sindicatos estaduais; mantém Cadastro Nacional dos Técnicos de Segurança do Trabalho — pode ser consultado para estimar volume regional.
- **ANEST** (Associação Nacional de Engenharia de Segurança do Trabalho): voltada a engenheiros, não técnicos. Tem entidades regionais.
- **ABHO** (Associação Brasileira de Higienistas Ocupacionais): foco em higiene ocupacional; participa de eventos nacionais (CBHO/EBHO).

### Volume estimado em Ribeirão Preto

- Não há dado público de quantidade exata de técnicos registrados por município no CFT/SINTESP.
- LinkedIn registra 24+ vagas abertas para técnico de segurança em Ribeirão Preto — indicador de mercado ativo.
- Empresas de SST identificadas na região: SESI-SP (unidade Ribeirão Preto com serviço de SST), Serwork Ribeirão, GraalSeg, CIPA Assessoria, Gescon Ocupacional, Instituto da Construção (NR-35).
- **Estimativa conservadora:** 50–150 técnicos ativos (freelancers + CLT) na região de Ribeirão Preto com raio de 50km — dado não confirmado, requer contato direto com SINTESP regional.

### Como acessar os técnicos localmente

1. **SINTESP regional interior SP** — contato direto para identificar base de associados e possibilidade de parceria/divulgação.
2. **SESI-SP Ribeirão Preto** — referência técnica regional em SST; pode conectar com consultores da região.
3. **Grupos WhatsApp de técnicos SST** — comunidades informais existem (segurancadotrabalhonwn.com é um hub informal do setor com fórum ativo). Buscar por "técnico segurança do trabalho Ribeirão Preto" em grupos do Facebook/WhatsApp.
4. **Senac Ribeirão Preto** — oferece curso técnico em SST; alunos recém-formados e professores são contatos diretos.
5. **Eventos:** Sipat (semana interna de prevenção) em empresas da região; feiras de SST em São Paulo (FISP, Fire Show) para contato com distribuidores estaduais.

---

## Síntese Executiva

| Canal | Potencial | Esforço | Velocidade |
|-------|-----------|---------|-----------|
| Técnico SST freelancer (parceiro operador) | Alto — acessa 20–50 clientes de uma vez | Médio — requer convencer 1 pessoa | Alta se técnico já quer sistema |
| Clínica de medicina ocupacional | Alto — carteira de empresas + assina PCMSO | Médio-alto — decisão por sócio | Média |
| Escritório contábil | Médio — indica mas não opera | Baixo — indicação passiva | Baixa (ciclo longo) |
| SINTESP/SEBRAE | Baixo para primeiros 5 clientes | Alto — processo lento | Muito baixa |
| Despachante trabalhista | Baixo-médio — nicho de autuações | Baixo | Média |

**Conclusão:** o canal de maior alavancagem para os primeiros 5 clientes em 90 dias é **1 técnico SST freelancer com carteira estabelecida** na região de Matão/Ribeirão Preto. O técnico usa o sistema para sua própria gestão + indica (ou inclui) para os clientes da carteira. Meta realista: 1 técnico parceiro com 20 clientes = 20 empresas com acesso ao sistema; 5 conversões pagas é 25% de taxa, viável.

> Fonte primária: CFT, FENATEST, SINTESP, Indexmed, Sistema ESO, Bevart, SpeakSafely, Guruseg Franchising, AlfaSeg, pvmed, creisconsultoria.
