/**
 * Solicitacao Entity Types
 */

export interface Solicitacao {
  id: string;
  tipo: TipoSolicitacao;
  titulo: string;
  descricao?: string;
  status: SolicitacaoStatus;
  userId: string;          // ID do usuário solicitante
  userName: string;        // Nome para exibição
  createdAt: Date;
  updatedAt: Date;
  resolvidaEm?: Date;
}

export type TipoSolicitacao =
  | 'ferias'
  | 'equipamento'
  | 'acesso'
  | 'suporte'
  | 'outros';

export type SolicitacaoStatus =
  | 'pendente'
  | 'em_analise'
  | 'aprovada'
  | 'rejeitada';

/**
 * Tipo configuration
 */
export interface TipoSolicitacaoConfig {
  label: string;
  icon: string;
  color: string;
  className?: string;
}

/**
 * Status configuration
 */
export interface SolicitacaoStatusConfig {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  dotColor?: string;
}
