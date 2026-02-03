import { z } from 'zod';
import { TAREFA_STATUSES, TAREFA_PRIORIDADES } from './constants';

/**
 * Zod schema for Tarefa validation
 */
export const tarefaSchema = z.object({
  titulo: z.string().min(3, 'Título deve ter no mínimo 3 caracteres').max(100, 'Título muito longo'),
  descricao: z.string().max(500, 'Descrição muito longa').optional(),
  status: z.enum(TAREFA_STATUSES),
  prioridade: z.enum(TAREFA_PRIORIDADES),
  dataVencimento: z.date().optional(),
});

export type TarefaFormData = z.infer<typeof tarefaSchema>;
