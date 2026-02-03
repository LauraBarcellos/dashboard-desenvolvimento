import type { WorkItem } from "../types";

function d(year: number, month: number, day: number): Date {
  return new Date(year, month - 1, day);
}

export const MOCK_WORK_ITEMS: WorkItem[] = [
  // Portal Devio — Bugs
  { id: "WI-001", titulo: "Erro no login com SSO", tipo: "Bug", status: "Closed", projeto: "Portal Devio", dataCriacao: d(2025, 12, 5), dataInicio: d(2025, 12, 6), dataConclusao: d(2025, 12, 8) },
  { id: "WI-002", titulo: "Sidebar não colapsa em mobile", tipo: "Bug", status: "Done", projeto: "Portal Devio", dataCriacao: d(2025, 12, 10), dataInicio: d(2025, 12, 11), dataConclusao: d(2025, 12, 13) },
  { id: "WI-003", titulo: "Paginação quebra com filtro ativo", tipo: "Bug", status: "Aberto", projeto: "Portal Devio", dataCriacao: d(2026, 1, 3) },
  { id: "WI-004", titulo: "Tooltip cortado em telas pequenas", tipo: "Bug", status: "Em Progresso", projeto: "Portal Devio", dataCriacao: d(2026, 1, 10), dataInicio: d(2026, 1, 15) },
  { id: "WI-005", titulo: "Formulário perde dados ao navegar", tipo: "Bug", status: "Aberto", projeto: "Portal Devio", dataCriacao: d(2026, 1, 18) },

  // Portal Devio — Tasks
  { id: "WI-006", titulo: "Configurar ESLint flat config", tipo: "Task", status: "Done", projeto: "Portal Devio", dataCriacao: d(2025, 12, 1), dataInicio: d(2025, 12, 2), dataConclusao: d(2025, 12, 3) },
  { id: "WI-007", titulo: "Migrar para Tailwind v4", tipo: "Task", status: "Done", projeto: "Portal Devio", dataCriacao: d(2025, 12, 8), dataInicio: d(2025, 12, 9), dataConclusao: d(2025, 12, 15) },
  { id: "WI-008", titulo: "Implementar dark mode", tipo: "Task", status: "Closed", projeto: "Portal Devio", dataCriacao: d(2025, 12, 16), dataInicio: d(2025, 12, 17), dataConclusao: d(2025, 12, 20) },
  { id: "WI-009", titulo: "Criar componente PageHeader", tipo: "Task", status: "Done", projeto: "Portal Devio", dataCriacao: d(2026, 1, 2), dataInicio: d(2026, 1, 3), dataConclusao: d(2026, 1, 5) },
  { id: "WI-010", titulo: "Adicionar breadcrumbs", tipo: "Task", status: "Done", projeto: "Portal Devio", dataCriacao: d(2026, 1, 6), dataInicio: d(2026, 1, 7), dataConclusao: d(2026, 1, 9) },

  // Portal Devio — Stories
  { id: "WI-011", titulo: "CRUD de clientes", tipo: "Story", status: "Done", projeto: "Portal Devio", dataCriacao: d(2025, 12, 1), dataInicio: d(2025, 12, 5), dataConclusao: d(2025, 12, 20) },
  { id: "WI-012", titulo: "Dashboard pessoal", tipo: "Story", status: "Done", projeto: "Portal Devio", dataCriacao: d(2026, 1, 2), dataInicio: d(2026, 1, 5), dataConclusao: d(2026, 1, 18) },
  { id: "WI-013", titulo: "Timeline de eventos do cliente", tipo: "Story", status: "Em Progresso", projeto: "Portal Devio", dataCriacao: d(2026, 1, 10), dataInicio: d(2026, 1, 12) },
  { id: "WI-014", titulo: "Dashboard de métricas", tipo: "Story", status: "Aberto", projeto: "Portal Devio", dataCriacao: d(2026, 1, 28) },

  // Portal Devio — Epic
  { id: "WI-015", titulo: "MVP Portal Interno", tipo: "Epic", status: "Em Progresso", projeto: "Portal Devio", dataCriacao: d(2025, 11, 15), dataInicio: d(2025, 12, 1) },

  // App Mobile Devio — Bugs
  { id: "WI-016", titulo: "Crash ao abrir notificações", tipo: "Bug", status: "Done", projeto: "App Mobile Devio", dataCriacao: d(2025, 12, 12), dataInicio: d(2025, 12, 13), dataConclusao: d(2025, 12, 14) },
  { id: "WI-017", titulo: "Imagem de perfil não carrega", tipo: "Bug", status: "Closed", projeto: "App Mobile Devio", dataCriacao: d(2026, 1, 5), dataInicio: d(2026, 1, 6), dataConclusao: d(2026, 1, 7) },
  { id: "WI-018", titulo: "Push notification duplicada", tipo: "Bug", status: "Aberto", projeto: "App Mobile Devio", dataCriacao: d(2026, 1, 20) },
  { id: "WI-019", titulo: "Tela branca após logout", tipo: "Bug", status: "Em Progresso", projeto: "App Mobile Devio", dataCriacao: d(2026, 1, 22), dataInicio: d(2026, 1, 25) },

  // App Mobile Devio — Tasks
  { id: "WI-020", titulo: "Setup CI/CD mobile", tipo: "Task", status: "Done", projeto: "App Mobile Devio", dataCriacao: d(2025, 12, 1), dataInicio: d(2025, 12, 2), dataConclusao: d(2025, 12, 5) },
  { id: "WI-021", titulo: "Configurar Sentry", tipo: "Task", status: "Done", projeto: "App Mobile Devio", dataCriacao: d(2025, 12, 6), dataInicio: d(2025, 12, 7), dataConclusao: d(2025, 12, 8) },
  { id: "WI-022", titulo: "Atualizar React Native", tipo: "Task", status: "Done", projeto: "App Mobile Devio", dataCriacao: d(2026, 1, 8), dataInicio: d(2026, 1, 9), dataConclusao: d(2026, 1, 14) },
  { id: "WI-023", titulo: "Implementar deep linking", tipo: "Task", status: "Em Progresso", projeto: "App Mobile Devio", dataCriacao: d(2026, 1, 15), dataInicio: d(2026, 1, 16) },

  // App Mobile Devio — Stories
  { id: "WI-024", titulo: "Tela de onboarding", tipo: "Story", status: "Done", projeto: "App Mobile Devio", dataCriacao: d(2025, 12, 1), dataInicio: d(2025, 12, 3), dataConclusao: d(2025, 12, 18) },
  { id: "WI-025", titulo: "Chat interno", tipo: "Story", status: "Em Progresso", projeto: "App Mobile Devio", dataCriacao: d(2026, 1, 5), dataInicio: d(2026, 1, 8) },
  { id: "WI-026", titulo: "Notificações push", tipo: "Story", status: "Aberto", projeto: "App Mobile Devio", dataCriacao: d(2026, 1, 20) },

  // API Gateway — Bugs
  { id: "WI-027", titulo: "Rate limiting não funciona com IPv6", tipo: "Bug", status: "Done", projeto: "API Gateway", dataCriacao: d(2025, 12, 3), dataInicio: d(2025, 12, 4), dataConclusao: d(2025, 12, 5) },
  { id: "WI-028", titulo: "CORS bloqueando requests legítimos", tipo: "Bug", status: "Closed", projeto: "API Gateway", dataCriacao: d(2025, 12, 15), dataInicio: d(2025, 12, 15), dataConclusao: d(2025, 12, 16) },
  { id: "WI-029", titulo: "Memory leak no connection pool", tipo: "Bug", status: "Aberto", projeto: "API Gateway", dataCriacao: d(2026, 1, 12) },
  { id: "WI-030", titulo: "Timeout inconsistente em rotas /api/v2", tipo: "Bug", status: "Aberto", projeto: "API Gateway", dataCriacao: d(2026, 1, 25) },

  // API Gateway — Tasks
  { id: "WI-031", titulo: "Implementar health check endpoint", tipo: "Task", status: "Done", projeto: "API Gateway", dataCriacao: d(2025, 12, 1), dataInicio: d(2025, 12, 1), dataConclusao: d(2025, 12, 2) },
  { id: "WI-032", titulo: "Adicionar métricas Prometheus", tipo: "Task", status: "Done", projeto: "API Gateway", dataCriacao: d(2025, 12, 10), dataInicio: d(2025, 12, 11), dataConclusao: d(2025, 12, 14) },
  { id: "WI-033", titulo: "Migrar para Node 22", tipo: "Task", status: "Done", projeto: "API Gateway", dataCriacao: d(2026, 1, 2), dataInicio: d(2026, 1, 3), dataConclusao: d(2026, 1, 6) },
  { id: "WI-034", titulo: "Configurar cache Redis", tipo: "Task", status: "Em Progresso", projeto: "API Gateway", dataCriacao: d(2026, 1, 15), dataInicio: d(2026, 1, 17) },

  // API Gateway — Stories
  { id: "WI-035", titulo: "Autenticação OAuth2", tipo: "Story", status: "Done", projeto: "API Gateway", dataCriacao: d(2025, 11, 20), dataInicio: d(2025, 12, 1), dataConclusao: d(2025, 12, 22) },
  { id: "WI-036", titulo: "Rate limiting por tenant", tipo: "Story", status: "Done", projeto: "API Gateway", dataCriacao: d(2026, 1, 2), dataInicio: d(2026, 1, 5), dataConclusao: d(2026, 1, 20) },
  { id: "WI-037", titulo: "API versioning v2", tipo: "Story", status: "Aberto", projeto: "API Gateway", dataCriacao: d(2026, 1, 22) },

  // Design System — Bugs
  { id: "WI-038", titulo: "Botão ghost sem hover state", tipo: "Bug", status: "Done", projeto: "Design System", dataCriacao: d(2025, 12, 8), dataInicio: d(2025, 12, 8), dataConclusao: d(2025, 12, 9) },
  { id: "WI-039", titulo: "Token de cor inconsistente no dark mode", tipo: "Bug", status: "Closed", projeto: "Design System", dataCriacao: d(2026, 1, 4), dataInicio: d(2026, 1, 4), dataConclusao: d(2026, 1, 5) },
  { id: "WI-040", titulo: "Select não acessível via teclado", tipo: "Bug", status: "Aberto", projeto: "Design System", dataCriacao: d(2026, 1, 28) },

  // Design System — Tasks
  { id: "WI-041", titulo: "Documentar tokens OKLCH", tipo: "Task", status: "Done", projeto: "Design System", dataCriacao: d(2025, 12, 1), dataInicio: d(2025, 12, 2), dataConclusao: d(2025, 12, 4) },
  { id: "WI-042", titulo: "Criar styleguide interativo", tipo: "Task", status: "Done", projeto: "Design System", dataCriacao: d(2025, 12, 10), dataInicio: d(2025, 12, 11), dataConclusao: d(2025, 12, 18) },
  { id: "WI-043", titulo: "Adicionar componente Timeline", tipo: "Task", status: "Done", projeto: "Design System", dataCriacao: d(2026, 1, 5), dataInicio: d(2026, 1, 6), dataConclusao: d(2026, 1, 10) },
  { id: "WI-044", titulo: "Revisar acessibilidade dos forms", tipo: "Task", status: "Em Progresso", projeto: "Design System", dataCriacao: d(2026, 1, 20), dataInicio: d(2026, 1, 22) },

  // Design System — Stories
  { id: "WI-045", titulo: "Sistema de tokens de cor OKLCH", tipo: "Story", status: "Done", projeto: "Design System", dataCriacao: d(2025, 11, 25), dataInicio: d(2025, 12, 1), dataConclusao: d(2025, 12, 15) },
  { id: "WI-046", titulo: "Componentes de formulário", tipo: "Story", status: "Done", projeto: "Design System", dataCriacao: d(2025, 12, 16), dataInicio: d(2025, 12, 17), dataConclusao: d(2026, 1, 8) },
  { id: "WI-047", titulo: "Componentes de data display", tipo: "Story", status: "Em Progresso", projeto: "Design System", dataCriacao: d(2026, 1, 10), dataInicio: d(2026, 1, 12) },

  // Extra items for volume
  { id: "WI-048", titulo: "Ajustar padding do card em mobile", tipo: "Bug", status: "Done", projeto: "Portal Devio", dataCriacao: d(2026, 1, 12), dataInicio: d(2026, 1, 13), dataConclusao: d(2026, 1, 14) },
  { id: "WI-049", titulo: "Adicionar skeleton loading", tipo: "Task", status: "Done", projeto: "Portal Devio", dataCriacao: d(2026, 1, 14), dataInicio: d(2026, 1, 15), dataConclusao: d(2026, 1, 17) },
  { id: "WI-050", titulo: "Refatorar hook de autenticação", tipo: "Task", status: "Aberto", projeto: "App Mobile Devio", dataCriacao: d(2026, 1, 27) },
];
