# Design — Dashboard de Métricas de Engenharia

## Arquitetura de Alto Nível

```
src/features/metricas/
├── components/
│   ├── metricas-filters.tsx       # Filtros (data, tipo, projeto)
│   ├── metricas-kpi-cards.tsx     # Cards de KPI usando StatsGrid
│   ├── metricas-bar-chart.tsx     # Gráfico de barras (Recharts via shadcn chart)
│   └── metricas-footer.tsx        # Footer com fonte e timestamp
├── hooks/
│   └── use-metricas-filters.ts   # Estado dos filtros + lógica de filtragem
├── mocks/
│   └── data.ts                    # Mock data de work items
├── types/
│   └── index.ts                   # Interfaces TypeScript
├── constants.ts                   # Enums, presets, configurações
└── schemas.ts                     # Zod schemas (filtros)

src/app/(app)/metricas/
└── page.tsx                       # Página principal (orquestra componentes)
```

---

## Modelo de Dados

### WorkItem (tipo base)

```typescript
interface WorkItem {
  id: string;
  titulo: string;
  tipo: "Bug" | "Task" | "Story" | "Epic";
  status: "Aberto" | "Em Progresso" | "Done" | "Closed";
  projeto: string;
  dataCriacao: Date;
  dataInicio?: Date;       // quando começou a ser trabalhado
  dataConclusao?: Date;    // quando foi concluído
}
```

### Filtros

```typescript
interface MetricasFilters {
  dateRange: { from: Date; to: Date };
  tipos: WorkItemTipo[];     // [] = todos
  projetos: string[];        // [] = todos
}
```

### KPI Calculados

```typescript
interface MetricasKPIs {
  cycleTime: number;           // média em dias
  vazao: number;               // itens concluídos
  bugsAbertos: number;
  bugsEncerrados: number;
  aging: number;               // média em dias
}
```

---

## Fluxo de Dados

```
page.tsx
  ├── useMetricasFilters() → { filters, updateFilter, resetFilters }
  ├── useMemo: filteredItems = filterWorkItems(MOCK_ITEMS, filters)
  ├── useMemo: kpis = calculateKPIs(filteredItems, filters.dateRange)
  ├── useMemo: chartData = buildChartData(filteredItems, filters.dateRange)
  │
  ├── <PageHeader />
  ├── <MetricasKPICards kpis={kpis} />
  ├── <MetricasFilters filters={filters} onFilterChange={updateFilter} projetos={projetos} />
  ├── <MetricasBarChart data={chartData} />
  └── <MetricasFooter />
```

---

## Componentes

### page.tsx (Orquestrador)

- `"use client"` — necessário para hooks de estado
- Importa mock data, aplica filtros, calcula KPIs, monta chart data
- Passa dados calculados para componentes filhos (dumb components)

### MetricasKPICards

- Recebe `MetricasKPIs` como prop
- Monta array de `StatItem[]` e renderiza via `<StatsGrid columns={4} />`
- Ícones: `Timer` (cycle time), `TrendingUp` (vazão), `Bug` (bugs), `Clock` (aging)

### MetricasFilters

- Layout horizontal com gap, wrap em mobile
- Date range: `<Popover>` com `<Calendar>` do shadcn (necessário instalar `calendar`)
- Multi-selects: `<Select>` com múltipla seleção ou checkboxes em dropdown
- Presets de data como `<Button variant="outline" size="sm">`

### MetricasBarChart

- Usa `<ChartContainer>` + `<BarChart>` do shadcn/recharts
- Cores: `--chart-1` a `--chart-5` (tokens existentes)
- Tooltip customizado via `<ChartTooltip>`
- Responsivo via `<ResponsiveContainer>`
- Granularidade calculada automaticamente com base no intervalo

### MetricasFooter

- Componente simples com texto de fonte e timestamp
- `text-xs text-muted-foreground`

---

## Lógica de Negócio (funções puras em hooks ou utils)

### filterWorkItems(items, filters)

1. Filtra por dateRange (dataCriacao ou dataConclusao dentro do range)
2. Filtra por tipos (se array não vazio)
3. Filtra por projetos (se array não vazio)

### calculateKPIs(items, dateRange)

- **Cycle Time**: média de `(dataConclusao - dataInicio)` em dias, apenas itens concluídos
- **Vazão**: count de itens com status Done/Closed e dataConclusao no range
- **Bugs Abertos**: count de tipo=Bug e status != Done/Closed
- **Bugs Encerrados**: count de tipo=Bug e status = Done/Closed no range
- **Aging**: média de `(hoje - dataCriacao)` para itens não concluídos

### buildChartData(items, dateRange)

1. Determina granularidade (diária/semanal/mensal) pelo tamanho do range
2. Agrupa itens por período
3. Retorna array de `{ periodo: string, quantidade: number }`

---

## Dependências a Instalar

| Pacote | Motivo |
|--------|--------|
| `@shadcn/chart` | Componente de gráfico (instala recharts como dependência) |
| `@shadcn/calendar` | Date range picker |
| `@shadcn/popover` | Container para o date picker |

Comando: `npx shadcn@latest add chart calendar popover`

---

## Impacto em Arquivos Existentes

| Arquivo | Mudança |
|---------|---------|
| `src/components/app-sidebar.tsx` | Adicionar item "Métricas" ao `menuItems` |
| `.design-system/components.md` | Registrar novos componentes |

---

## Edge Cases

- **Sem itens no período**: KPIs = 0, gráfico vazio com mensagem "Sem dados no período"
- **Cycle time sem dataInicio**: Ignorar item no cálculo (usar apenas itens com ambas as datas)
- **Todos os filtros vazios**: Equivale a "todos selecionados"
- **Range de 1 dia**: Granularidade diária, 1 barra no gráfico
