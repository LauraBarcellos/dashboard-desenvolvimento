/**
 * Timeline Event Entity Types
 * Based on spec: features/04-timeline-cliente/spec.json
 */

export interface TimelineEvent {
  id: string;
  clienteId: string;
  tipo: TimelineEventTipo;
  titulo: string;
  descricao?: string;
  usuarioId: string;
  usuarioNome: string;
  metadata?: Record<string, unknown>;
  isDeletable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TimelineEventTipo =
  | 'criacao'
  | 'atualizacao'
  | 'comentario'
  | 'documento'
  | 'status_mudanca'
  | 'email'
  | 'ligacao'
  | 'reuniao';

/**
 * Form data for creating timeline events
 */
export interface TimelineEventFormData {
  tipo: TimelineEventTipo;
  titulo: string;
  descricao?: string;
}

/**
 * Filters for timeline view
 */
export interface TimelineFilters {
  tipo?: TimelineEventTipo;
  usuario?: string;
  dataInicio?: string;
  dataFim?: string;
}

/**
 * API Response types
 */
export interface TimelineEventResponse {
  success: boolean;
  data?: TimelineEvent;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface TimelineEventsListResponse {
  success: boolean;
  data?: TimelineEvent[];
  error?: string;
  total?: number;
  page?: number;
  pageSize?: number;
}

/**
 * Timeline event type configuration
 */
export interface TimelineEventTypeConfig {
  label: string;
  icon: string;
  color: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}
