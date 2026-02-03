# Tasks — Dashboard de Métricas de Engenharia

## Fase 1: Setup e Infraestrutura

- [ ] **T01** — Instalar dependências shadcn: `npx shadcn@latest add chart calendar popover`
- [ ] **T02** — Criar estrutura de feature `src/features/metricas/` (types, constants, schemas, mocks)

## Fase 2: Modelo de Dados e Mock

- [ ] **T03** — Definir tipos em `types/index.ts` (WorkItem, MetricasFilters, MetricasKPIs)
- [ ] **T04** — Criar constantes em `constants.ts` (enums de tipo/status, presets de data, projetos)
- [ ] **T05** — Criar schemas Zod em `schemas.ts` (filtros)
- [ ] **T06** — Criar mock data em `mocks/data.ts` (~50 work items variados, 3-4 projetos, tipos diversos)

## Fase 3: Lógica de Negócio

- [ ] **T07** — Implementar hook `useMetricasFilters` (estado dos filtros, updateFilter, resetFilters)
- [ ] **T08** — Implementar funções: `filterWorkItems`, `calculateKPIs`, `buildChartData`

## Fase 4: Componentes UI

- [ ] **T09** — Criar `MetricasKPICards` (usa StatsGrid com 4 StatItems)
- [ ] **T10** — Criar `MetricasFilters` (date range picker + multi-selects)
- [ ] **T11** — Criar `MetricasBarChart` (shadcn chart com Recharts)
- [ ] **T12** — Criar `MetricasFooter` (fonte + timestamp)

## Fase 5: Página e Navegação

- [ ] **T13** — Criar `src/app/(app)/metricas/page.tsx` (orquestra tudo)
- [ ] **T14** — Adicionar item "Métricas" no `app-sidebar.tsx`

## Fase 6: Validação e Documentação

- [ ] **T15** — Rodar `npm run build` + `npm run lint` — corrigir erros
- [ ] **T16** — Registrar novos componentes em `.design-system/components.md`
- [ ] **T17** — Verificar dark mode e responsividade

## Ordem de Execução

T01 → T02 → T03/T04/T05 (paralelo) → T06 → T07 → T08 → T09/T10/T11/T12 (paralelo) → T13 → T14 → T15 → T16 → T17

## Critério de Aceite Global

- [ ] Página acessível em `/metricas`
- [ ] 4 KPI cards exibindo dados corretos dos últimos 30 dias por padrão
- [ ] 3 filtros funcionais que afetam KPIs e gráfico simultaneamente
- [ ] Gráfico de barras com granularidade automática e tooltip
- [ ] Sidebar com link para Métricas
- [ ] Build sem erros
- [ ] Dark mode funcional
- [ ] Nenhum valor hardcoded (cores, spacing, etc.)
