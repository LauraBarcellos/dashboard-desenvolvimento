import type { TimelineEventTipo, TimelineEventTypeConfig } from './types';
import {
  Plus,
  Edit,
  MessageSquare,
  FileText,
  ToggleLeft,
  Mail,
  Phone,
  Users,
} from 'lucide-react';

/**
 * Available event types
 */
export const TIMELINE_EVENT_TYPES: readonly TimelineEventTipo[] = [
  'criacao',
  'atualizacao',
  'comentario',
  'documento',
  'status_mudanca',
  'email',
  'ligacao',
  'reuniao',
] as const;

/**
 * Alias for Portuguese naming
 */
export const EVENTO_TIPOS = TIMELINE_EVENT_TYPES;

/**
 * Event type display configuration
 */
export const EVENT_TYPE_CONFIG: Record<TimelineEventTipo, TimelineEventTypeConfig> = {
  criacao: {
    label: 'Criação',
    icon: 'Plus',
    color: 'text-success',
    variant: 'default',
    className: 'border-success text-success',
  },
  atualizacao: {
    label: 'Atualização',
    icon: 'Edit',
    color: 'text-primary',
    variant: 'default',
    className: 'border-primary text-primary',
  },
  comentario: {
    label: 'Comentário',
    icon: 'MessageSquare',
    color: 'text-foreground',
    variant: 'secondary',
    className: 'border-border text-foreground',
  },
  documento: {
    label: 'Documento',
    icon: 'FileText',
    color: 'text-foreground',
    variant: 'secondary',
    className: 'border-border text-foreground',
  },
  status_mudanca: {
    label: 'Mudança de Status',
    icon: 'ToggleLeft',
    color: 'text-warning',
    variant: 'outline',
    className: 'border-warning text-warning',
  },
  email: {
    label: 'E-mail',
    icon: 'Mail',
    color: 'text-foreground',
    variant: 'secondary',
    className: 'border-border text-foreground',
  },
  ligacao: {
    label: 'Ligação',
    icon: 'Phone',
    color: 'text-foreground',
    variant: 'secondary',
    className: 'border-border text-foreground',
  },
  reuniao: {
    label: 'Reunião',
    icon: 'Users',
    color: 'text-foreground',
    variant: 'secondary',
    className: 'border-border text-foreground',
  },
};

/**
 * Alias for Portuguese naming
 */
export const EVENTO_CONFIG = EVENT_TYPE_CONFIG;

/**
 * Icon mapping for event types
 */
export const EVENT_TYPE_ICONS = {
  Plus,
  Edit,
  MessageSquare,
  FileText,
  ToggleLeft,
  Mail,
  Phone,
  Users,
} as const;

/**
 * Items per page options for timeline
 */
export const TIMELINE_PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

/**
 * Default page size for timeline
 */
export const TIMELINE_DEFAULT_PAGE_SIZE = 20;
