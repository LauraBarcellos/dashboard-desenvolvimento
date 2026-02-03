import type { WorkItemTipo, WorkItemStatus } from "./types";

export const WORK_ITEM_TIPOS: WorkItemTipo[] = ["Bug", "Task", "Story", "Epic"];

export const WORK_ITEM_STATUS_FINAIS: WorkItemStatus[] = ["Done", "Closed"];

export const PROJETOS = [
  "Portal Devio",
  "App Mobile Devio",
  "API Gateway",
  "Design System",
];

export const DATE_PRESETS = [
  { label: "Últimos 7 dias", days: 7 },
  { label: "Últimos 30 dias", days: 30 },
  { label: "Últimos 90 dias", days: 90 },
] as const;

export const TIPO_LABELS: Record<WorkItemTipo, string> = {
  Bug: "Bug",
  Task: "Task",
  Story: "Story",
  Epic: "Epic",
};
