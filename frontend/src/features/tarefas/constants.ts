import type { TarefaStatus, TarefaStatusConfig, TarefaPrioridade, TarefaPrioridadeConfig } from './types';

/**
 * Available task statuses
 */
export const TAREFA_STATUSES: readonly TarefaStatus[] = [
  'pendente',
  'em_andamento',
  'concluida',
  'cancelada',
] as const;

/**
 * Status display configuration
 */
export const STATUS_CONFIG: Record<TarefaStatus, TarefaStatusConfig> = {
  pendente: {
    label: 'Pendente',
    variant: 'outline',
    className: 'bg-background text-foreground border-border/50',
    dotColor: 'bg-muted-foreground',
  },
  em_andamento: {
    label: 'Em Andamento',
    variant: 'default',
    className: 'bg-primary/10 text-primary border-primary/50',
    dotColor: 'bg-primary',
  },
  concluida: {
    label: 'Concluída',
    variant: 'outline',
    className: 'bg-success/10 text-success border-success/50',
    dotColor: 'bg-success',
  },
  cancelada: {
    label: 'Cancelada',
    variant: 'outline',
    className: 'bg-muted text-muted-foreground border-border/50',
    dotColor: 'bg-muted-foreground',
  },
};

/**
 * Available task priorities
 */
export const TAREFA_PRIORIDADES: readonly TarefaPrioridade[] = [
  'baixa',
  'media',
  'alta',
  'urgente',
] as const;

/**
 * Prioridade display configuration
 */
export const PRIORIDADE_CONFIG: Record<TarefaPrioridade, TarefaPrioridadeConfig> = {
  baixa: {
    label: 'Baixa',
    variant: 'outline',
    className: 'bg-background text-muted-foreground border-border/50',
    color: 'text-muted-foreground',
  },
  media: {
    label: 'Média',
    variant: 'outline',
    className: 'bg-primary/10 text-primary border-primary/50',
    color: 'text-primary',
  },
  alta: {
    label: 'Alta',
    variant: 'outline',
    className: 'bg-warning/10 text-warning border-warning/50',
    color: 'text-warning',
  },
  urgente: {
    label: 'Urgente',
    variant: 'destructive',
    className: 'bg-destructive/10 text-destructive border-destructive/50',
    color: 'text-destructive',
  },
};
