import { z } from 'zod';
import { TIPOS_SOLICITACAO, SOLICITACAO_STATUSES } from './constants';

/**
 * Zod schema for Solicitacao validation
 */
export const solicitacaoSchema = z.object({
  tipo: z.enum(TIPOS_SOLICITACAO),
  titulo: z.string().min(5, 'Título deve ter no mínimo 5 caracteres').max(100, 'Título muito longo'),
  descricao: z.string().max(500, 'Descrição muito longa').optional(),
  status: z.enum(SOLICITACAO_STATUSES),
});

export type SolicitacaoFormData = z.infer<typeof solicitacaoSchema>;
