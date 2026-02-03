import type { TipoSolicitacao, TipoSolicitacaoConfig, SolicitacaoStatus, SolicitacaoStatusConfig } from './types';

/**
 * Available solicitation types
 */
export const TIPOS_SOLICITACAO: readonly TipoSolicitacao[] = [
  'ferias',
  'equipamento',
  'acesso',
  'suporte',
  'outros',
] as const;

/**
 * Tipo display configuration
 */
export const TIPO_CONFIG: Record<TipoSolicitacao, TipoSolicitacaoConfig> = {
  ferias: {
    label: 'Férias',
    icon: 'Calendar',
    color: 'text-primary',
    className: 'bg-primary/10 text-primary border-primary/50',
  },
  equipamento: {
    label: 'Equipamento',
    icon: 'Laptop',
    color: 'text-primary',
    className: 'bg-primary/10 text-primary border-primary/50',
  },
  acesso: {
    label: 'Acesso',
    icon: 'Key',
    color: 'text-primary',
    className: 'bg-primary/10 text-primary border-primary/50',
  },
  suporte: {
    label: 'Suporte',
    icon: 'HelpCircle',
    color: 'text-primary',
    className: 'bg-primary/10 text-primary border-primary/50',
  },
  outros: {
    label: 'Outros',
    icon: 'MoreHorizontal',
    color: 'text-muted-foreground',
    className: 'bg-muted/30 text-muted-foreground border-border/50',
  },
};

/**
 * Available solicitation statuses
 */
export const SOLICITACAO_STATUSES: readonly SolicitacaoStatus[] = [
  'pendente',
  'em_analise',
  'aprovada',
  'rejeitada',
] as const;

/**
 * Status display configuration
 */
export const STATUS_CONFIG: Record<SolicitacaoStatus, SolicitacaoStatusConfig> = {
  pendente: {
    label: 'Pendente',
    variant: 'outline',
    className: 'bg-background text-foreground border-border/50',
    dotColor: 'bg-muted-foreground',
  },
  em_analise: {
    label: 'Em Análise',
    variant: 'default',
    className: 'bg-primary/10 text-primary border-primary/50',
    dotColor: 'bg-primary',
  },
  aprovada: {
    label: 'Aprovada',
    variant: 'outline',
    className: 'bg-success/10 text-success border-success/50',
    dotColor: 'bg-success',
  },
  rejeitada: {
    label: 'Rejeitada',
    variant: 'destructive',
    className: 'bg-destructive/10 text-destructive border-destructive/50',
    dotColor: 'bg-destructive',
  },
};
