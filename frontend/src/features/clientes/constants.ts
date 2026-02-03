import type { ClienteStatus, ClienteStatusConfig, FaseInicial, FaseConfig, SituacaoProjeto, SituacaoConfig } from './types';

/**
 * Available status values - ATUALIZADO: removido 'pendente'
 */
export const CLIENTE_STATUSES: readonly ClienteStatus[] = [
  'ativo',
  'inativo',
] as const;

/**
 * Status display configuration
 */
export const STATUS_CONFIG: Record<ClienteStatus, ClienteStatusConfig> = {
  ativo: {
    label: 'Ativo',
    variant: 'outline',
    className: 'bg-background text-foreground border-border/50',
    dotColor: 'bg-success',
  },
  inativo: {
    label: 'Inativo',
    variant: 'outline',
    className: 'bg-background text-muted-foreground border-border/50',
    dotColor: 'bg-muted-foreground',
  },
};

/**
 * Fases iniciais do projeto - CONFORME SPEC
 */
export const FASES_INICIAIS: readonly FaseInicial[] = [
  'Planejamento',
  'Design',
  'Desenvolvimento',
  'Garantia',
] as const;

/**
 * Configuração visual das fases
 */
export const FASE_CONFIG: Record<FaseInicial, FaseConfig> = {
  Planejamento: {
    label: 'Planejamento',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  Design: {
    label: 'Design',
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  Desenvolvimento: {
    label: 'Desenvolvimento',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  Garantia: {
    label: 'Garantia',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
};

/**
 * Situações do projeto - CONFORME SPEC
 */
export const SITUACOES_PROJETO: readonly SituacaoProjeto[] = [
  'No prazo',
  'Atrasado',
  'Adiantado',
] as const;

/**
 * Configuração visual das situações
 */
export const SITUACAO_CONFIG: Record<SituacaoProjeto, SituacaoConfig> = {
  'No prazo': {
    label: 'No prazo',
    variant: 'default',
  },
  'Atrasado': {
    label: 'Atrasado',
    variant: 'destructive',
  },
  'Adiantado': {
    label: 'Adiantado',
    variant: 'secondary',
  },
};

/**
 * Modelos de contrato disponíveis
 */
export const MODELOS_CONTRATO = [
  'Escopo Fechado',
  'Time & Materials',
  'Alocação de Equipe',
  'Squad as a Service',
  'Consultoria',
  'Outros',
] as const;

/**
 * Estados brasileiros (UF)
 */
export const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const;

/**
 * Table columns configuration - ATUALIZADO com novas colunas
 */
export const CLIENTE_TABLE_COLUMNS = [
  { key: 'nome', label: 'Cliente', sortable: true },
  { key: 'faseInicial', label: 'Fase', sortable: true },
  { key: 'situacao', label: 'Situação', sortable: true },
  { key: 'dataInicio', label: 'Início', sortable: true },
  { key: 'pm', label: 'PM', sortable: false },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'actions', label: 'Ações', sortable: false },
] as const;

/**
 * Items per page options
 */
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;

/**
 * Default page size
 */
export const DEFAULT_PAGE_SIZE = 10;

/**
 * Mock users para selects de PM, PO, Tech Lead
 * (Em produção, viriam de uma API de usuários)
 */
export const MOCK_USERS = [
  { id: 'user-1', name: 'João Silva', role: 'PM' },
  { id: 'user-2', name: 'Maria Santos', role: 'PM' },
  { id: 'user-3', name: 'Pedro Costa', role: 'PO' },
  { id: 'user-4', name: 'Ana Oliveira', role: 'PO' },
  { id: 'user-5', name: 'Carlos Souza', role: 'Tech Lead' },
  { id: 'user-6', name: 'Julia Lima', role: 'Tech Lead' },
] as const;
