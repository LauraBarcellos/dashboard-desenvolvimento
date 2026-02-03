import { z } from 'zod';

/**
 * Timeline Event Form Validation Schema
 * Based on spec.json validation rules
 */
export const timelineEventFormSchema = z.object({
  tipo: z.enum([
    'criacao',
    'atualizacao',
    'comentario',
    'documento',
    'status_mudanca',
    'email',
    'ligacao',
    'reuniao',
  ]),

  titulo: z
    .string()
    .min(1, 'Título é obrigatório')
    .max(200, 'Título deve ter no máximo 200 caracteres'),

  descricao: z
    .string()
    .max(2000, 'Descrição deve ter no máximo 2000 caracteres')
    .optional()
    .or(z.literal('')),
});

/**
 * Infer TypeScript type from Zod schema
 */
export type TimelineEventFormData = z.infer<typeof timelineEventFormSchema>;

/**
 * Timeline filters schema
 */
export const timelineFiltersSchema = z.object({
  tipo: z
    .enum([
      'criacao',
      'atualizacao',
      'comentario',
      'documento',
      'status_mudanca',
      'email',
      'ligacao',
      'reuniao',
    ])
    .optional(),
  search: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type TimelineFiltersData = z.infer<typeof timelineFiltersSchema>;
