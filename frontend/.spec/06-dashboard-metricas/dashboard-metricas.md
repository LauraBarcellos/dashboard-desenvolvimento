# Dashboard de Métricas de Engenharia

## Contexto

Solicitação da Laura Barcellos (reunião semanal Portal Dev\<io\> — 02/02/2026). O backend já está codificado com endpoints e cálculos prontos. O frontend consome e exibe os dados.

## Layout Macro

Estrutura vertical, de cima para baixo:

```
┌─────────────────────────────────────┐
│             HEADER (sticky)         │
├────────┬────────┬────────┬──────────┤
│ Cycle  │ Vazão  │  Bugs  │  Aging   │
│ Time   │        │        │          │
├────────┴────────┴────────┴──────────┤
│  Data  │  Tipo de Item  │  Projeto  │
├─────────────────────────────────────┤
│                                     │
│        GRÁFICO DE BARRAS            │
│                                     │
├─────────────────────────────────────┤
│              FOOTER                 │
└─────────────────────────────────────┘
```

---

## 1. Header

- **Sticky** ao rolar a página
- Título do dashboard (ex: "Flow & Quality Overview" — nome ajustável)
- Contexto temporal atual (ex: "Dados filtrados: Jan–Mar 2026")
- Opcional: botão de exportação (CSV / imagem / PDF)

---

## 2. Cards de KPI

Layout: 4 cards horizontais, responsivos (2×2 em telas menores).

### 2.1 Cycle Time

- **Métrica:** tempo médio de ciclo (data início → data conclusão)
- **Unidade:** dias (ou horas, se aplicável)
- **Escopo:** apenas itens concluídos no período filtrado
- **Indicadores opcionais:** tendência (↑ ↓ →), comparação com período anterior

### 2.2 Vazão (Throughput)

- **Métrica:** número de itens concluídos
- **Base temporal:** depende do filtro (diário / semanal / mensal)
- **Regra:** conta apenas itens com status final (Done / Closed)

### 2.3 Bugs Abertos vs Encerrados

- **Formato:** dois números destacados — bugs abertos e bugs encerrados
- **Escopo:** apenas itens do tipo Bug
- **Regra:** respeita todos os filtros ativos

### 2.4 Aging (Envelhecimento)

- **Métrica:** idade média dos itens em aberto (data atual − data de criação)
- **Regra:** excluir itens já concluídos
- **Opcional:** classificação por faixas (0–7 / 8–14 / 15+ dias)

---

## 3. Filtros

Layout horizontal, todos visíveis sem scroll. Afetam KPIs e gráfico.

### 3.1 Data

- **Tipo:** intervalo de datas (date range picker)
- **Presets:** Últimos 7 dias, Últimos 30 dias, Mês atual, Intervalo customizado

### 3.2 Tipo de Item de Trabalho

- **Tipo:** multi-select
- **Opções:** Bug, Task, Story, Epic
- **Regra:** nenhum selecionado → considera todos

### 3.3 Projeto

- **Tipo:** multi-select
- **Fonte:** lista dinâmica de projetos disponíveis (endpoint)
- **Regra:** nenhum selecionado → considera todos

---

## 4. Gráfico de Barras

### 4.1 Eixos

- **X:** tempo (período)
- **Y:** quantidade de itens de trabalho

### 4.2 Granularidade temporal

Parametrizável. Comportamento automático recomendado:

| Intervalo filtrado | Granularidade |
|--------------------|---------------|
| ≤ 30 dias          | Diário        |
| 31–90 dias         | Semanal       |
| > 90 dias          | Mensal        |

### 4.3 Lógica

Dado os filtros de data, tipo e projeto aplicados, o gráfico mostra a quantidade de itens de trabalho agrupados por período, apenas dos tipos e projetos selecionados.

Exemplo: "Entre 01/01 e 31/01, por semana, quantos Bugs e Tasks existiram no Projeto X e Y"

### 4.4 Interação (recomendado)

- **Hover:** exibe número exato de itens
- **Clique na barra:** drill-down para lista de itens daquele período

---

## 5. Footer

- Fonte dos dados (ex: Jira, Azure DevOps, etc.)
- Última atualização (timestamp)

---

## Requisitos Técnicos

- Backend já pronto — frontend apenas consome e exibe
- Manter o design system existente (alerta explícito da Laura: não mudar design no meio do projeto)
- Cards de KPI com valores padrão dos últimos 30 dias antes de qualquer filtro ser aplicado

## Questões em Aberto

- [ ] Contratos exatos dos endpoints (request/response)
- [ ] Tipos de item de trabalho confirmados (Bug/Task/Story/Epic ou Bug/Ajuste/História?)
- [ ] Esta página será a home (`/dashboard`) ou rota própria (`/metricas`)?
- [ ] Autenticação dos endpoints (token, mecanismo)
- [ ] Drill-down no gráfico: será implementado na v1?
- [ ] Exportação (CSV/PDF): será implementada na v1?
