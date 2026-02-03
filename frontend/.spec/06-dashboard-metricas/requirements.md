# Requirements — Dashboard de Métricas de Engenharia

## Contexto

Solicitação da Laura Barcellos (reunião 02/02/2026). Backend já codificado com endpoints prontos. Frontend consome e exibe. Como o projeto ainda não tem backend real integrado, esta v1 usará **mock data** seguindo o padrão existente, pronta para substituição futura por chamadas reais.

## Referência

- Spec original: [dashboard-metricas.md](dashboard-metricas.md)

---

## Requisitos Funcionais (EARS Notation)

### RF-01 — Rota e Navegação

**When** o usuário acessa `/metricas`, **the system shall** exibir a página do Dashboard de Métricas de Engenharia.

**When** a sidebar está visível, **the system shall** exibir o item "Métricas" no menu de navegação com o ícone `BarChart3`, abaixo de "Clientes".

### RF-02 — Header (PageHeader)

**The system shall** exibir um PageHeader sticky com título "Métricas de Engenharia" e descrição mostrando o intervalo de datas filtrado (ex: "Dados filtrados: Jan–Mar 2026").

### RF-03 — Cards de KPI

**The system shall** exibir 4 cards de KPI em layout horizontal (2×2 em mobile):

| Card | Métrica | Regra |
|------|---------|-------|
| Cycle Time | Tempo médio de ciclo (dias) dos itens concluídos no período | Apenas itens com data de conclusão no período filtrado |
| Vazão | Nº de itens concluídos no período | Apenas itens com status Done/Closed |
| Bugs | Bugs abertos vs encerrados | Formato: "X abertos · Y encerrados" |
| Aging | Idade média (dias) dos itens em aberto | Exclui itens concluídos; data atual − data criação |

**When** nenhum filtro é aplicado, **the system shall** exibir KPIs dos últimos 30 dias como padrão.

**When** um filtro é alterado, **the system shall** recalcular todos os KPIs com base nos filtros ativos.

### RF-04 — Filtros

**The system shall** exibir 3 filtros horizontais que afetam KPIs e gráfico simultaneamente:

| Filtro | Tipo | Comportamento padrão |
|--------|------|---------------------|
| Data | Date range picker com presets (7d, 30d, mês atual, custom) | Últimos 30 dias |
| Tipo de Item | Multi-select (Bug, Task, Story, Epic) | Todos selecionados |
| Projeto | Multi-select (lista dinâmica do mock) | Todos selecionados |

**When** nenhum item é selecionado num multi-select, **the system shall** considerar todos os itens.

### RF-05 — Gráfico de Barras

**The system shall** exibir um gráfico de barras com eixo X = período temporal e eixo Y = quantidade de itens.

**When** o intervalo filtrado é ≤ 30 dias, **the system shall** usar granularidade diária.
**When** o intervalo filtrado é 31–90 dias, **the system shall** usar granularidade semanal.
**When** o intervalo filtrado é > 90 dias, **the system shall** usar granularidade mensal.

**When** o usuário passa o mouse sobre uma barra, **the system shall** exibir tooltip com número exato de itens.

### RF-06 — Footer

**The system shall** exibir no rodapé: fonte dos dados ("Mock Data — Portal Devio") e timestamp da última atualização.

---

## Requisitos Não-Funcionais

### RNF-01 — Design System

**The system shall** usar exclusivamente tokens do design system existente (OKLCH, --chart-1..5 para cores do gráfico). Nenhum valor hardcoded.

### RNF-02 — Responsividade

- KPI cards: 4 colunas em desktop, 2×2 em tablet/mobile
- Filtros: horizontal em desktop, empilhados em mobile
- Gráfico: largura 100% com altura mínima de 300px

### RNF-03 — Dark Mode

**The system shall** funcionar corretamente nos modos claro e escuro.

### RNF-04 — Linguagem

Toda UI em português brasileiro, seguindo padrão do projeto.

---

## Fora do Escopo (v1)

- Drill-down ao clicar nas barras do gráfico
- Exportação CSV/PDF/imagem
- Integração com backend real (usará mock data)
- Autenticação dos endpoints

---

## Decisões Tomadas

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| Rota | `/metricas` | Separada do dashboard pessoal existente em `/dashboard` |
| Charting | shadcn/ui `chart` (Recharts) | Já integrado ao design system shadcn, usa tokens de cor |
| Mock data | Novo feature module `src/features/metricas/` | Padrão existente do projeto |
| KPI cards | Reutilizar `StatCard` / `StatsGrid` | Componente já existe e suporta trend indicators |

---

## Confiança: 88% (Alta)

Motivos: spec clara, padrões de feature bem definidos no projeto, componentes reutilizáveis disponíveis. Único risco: contratos de API não definidos (irrelevante para v1 mock).
