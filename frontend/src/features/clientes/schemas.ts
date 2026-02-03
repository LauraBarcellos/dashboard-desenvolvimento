import { z } from 'zod';

/**
 * Estados brasileiros (UF)
 */
const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;

/**
 * Schema para contatos do cliente
 */
export const contatoClienteSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres').max(200, 'Nome muito longo'),
  cargo: z.string().optional(),
  email: z
    .string()
    .email('E-mail inválido')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Formato de e-mail inválido'
    ),
});

/**
 * Cliente Form Validation Schema - COMPLETO conforme spec
 *
 * Campos OBRIGATÓRIOS da spec:
 * - nome (min 2, max 200 caracteres)
 * - faseInicial (enum)
 * - situacao (enum)
 * - dataInicio (date)
 *
 * Campos OPCIONAIS da spec:
 * - modeloContrato, pm, po, techLead, linkBoard, linkChat, linkHomologacao, contatos
 * - Campos adicionais: email, telefone, documento, endereço, observacoes, fotoPerfil
 */
export const clienteFormSchema = z.object({
  // ===== INFORMAÇÕES BÁSICAS (OBRIGATÓRIAS) =====
  nome: z
    .string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(200, 'Nome deve ter no máximo 200 caracteres'),

  faseInicial: z.enum(['Planejamento', 'Design', 'Desenvolvimento', 'Garantia']),

  situacao: z.enum(['No prazo', 'Atrasado', 'Adiantado']),

  dataInicio: z.string().min(1, 'Data de início é obrigatória'),

  // ===== STATUS =====
  status: z.enum(['ativo', 'inativo']),

  // ===== MODELO E EQUIPE (OPCIONAIS) =====
  modeloContrato: z.string().optional(),
  pm: z.string().optional(), // ID do usuário PM
  po: z.string().optional(), // ID do usuário PO
  techLead: z.string().optional(), // ID do usuário Tech Lead

  // ===== LINKS (OPCIONAIS) =====
  linkBoard: z
    .string()
    .url('Link do Board deve ser uma URL válida')
    .optional()
    .or(z.literal('')),

  linkChat: z
    .string()
    .url('Link do Chat deve ser uma URL válida')
    .optional()
    .or(z.literal('')),

  linkHomologacao: z
    .string()
    .url('Link de Homologação deve ser uma URL válida')
    .optional()
    .or(z.literal('')),

  // ===== CONTATOS (OPCIONAL) =====
  contatos: z.array(contatoClienteSchema).optional(),

  // ===== CAMPOS ADICIONAIS (OPCIONAIS) =====
  email: z
    .string()
    .email('E-mail inválido')
    .optional()
    .or(z.literal('')),

  telefone: z.string().optional(),
  documento: z.string().optional(),

  // Endereço detalhado
  cep: z.string().optional(),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.enum(ESTADOS_BRASIL).optional(),

  // Endereço simples (para compatibilidade)
  endereco: z.string().optional(),

  observacoes: z
    .string()
    .max(1000, 'Observações devem ter no máximo 1000 caracteres')
    .optional(),

  fotoPerfil: z.unknown().optional(), // File object
});

/**
 * Export estados para uso em componentes
 */
export { ESTADOS_BRASIL };

/**
 * Infer TypeScript type from Zod schema
 */
export type ClienteFormData = z.infer<typeof clienteFormSchema>;

/**
 * Search/Filter schema - ATUALIZADO com novos filtros
 */
export const clienteFiltersSchema = z.object({
  faseInicial: z.enum(['Planejamento', 'Design', 'Desenvolvimento', 'Garantia']).optional(),
  situacao: z.enum(['No prazo', 'Atrasado', 'Adiantado']).optional(),
  pm: z.string().optional(),
  status: z.enum(['ativo', 'inativo']).optional(),
  search: z.string().optional(),
});

export type ClienteFiltersData = z.infer<typeof clienteFiltersSchema>;
