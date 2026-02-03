/**
 * Tarefa Entity Types
 */

export interface Tarefa {
  id: string;
  titulo: string;
  descricao?: string;
  status: TarefaStatus;
  prioridade: TarefaPrioridade;
  userId: string;          // ID do usuário responsável
  userName: string;        // Nome para exibição
  dataVencimento?: Date;
  dataConclusao?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type TarefaStatus =
  | 'pendente'
  | 'em_andamento'
  | 'concluida'
  | 'cancelada';

export type TarefaPrioridade =
  | 'baixa'
  | 'media'
  | 'alta'
  | 'urgente';

/**
 * Status configuration
 */
export interface TarefaStatusConfig {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  dotColor?: string;
}

/**
 * Prioridade configuration
 */
export interface TarefaPrioridadeConfig {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
  color?: string;
}
