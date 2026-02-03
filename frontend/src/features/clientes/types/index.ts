/**
 * Cliente Entity Types
 * Based on spec: features/03-criar-cliente/spec.json
 * ATUALIZADO para incluir TODOS os campos da spec
 */

/**
 * Fase inicial do projeto
 */
export type FaseInicial = 'Planejamento' | 'Design' | 'Desenvolvimento' | 'Garantia';

/**
 * Situação do projeto em relação ao prazo
 */
export type SituacaoProjeto = 'No prazo' | 'Atrasado' | 'Adiantado';

/**
 * Status do cliente
 */
export type ClienteStatus = 'ativo' | 'inativo';

/**
 * Contato do Cliente
 */
export interface ContatoCliente {
  id: string;
  nome: string;
  cargo?: string; // ex: CTO, Product Owner
  email: string;
}

/**
 * Link do Projeto
 */
export interface LinkProjeto {
  id: string;
  tipo: 'Board' | 'Chat' | 'Homologação' | 'Repositório' | 'Documentação' | 'Outro';
  nome: string; // ex: "Azure DevOps", "Teams Principal"
  url: string;
}

/**
 * Cliente Entity - COMPLETO conforme spec
 */
export interface Cliente {
  id: string;

  // Informações Básicas (OBRIGATÓRIAS)
  nome: string;
  faseInicial: FaseInicial;
  situacao: SituacaoProjeto;
  dataInicio: Date;

  // Modelo e Equipe (OPCIONAIS)
  modeloContrato?: string;
  pm?: string; // ID do usuário Project Manager
  po?: string; // ID do usuário Product Owner
  techLead?: string; // ID do usuário Tech Lead

  // Links (OPCIONAIS) - NOVO formato dinâmico
  links?: LinkProjeto[];

  // Links antigos (mantidos para compatibilidade, deprecated)
  /** @deprecated Use links[] */
  linkBoard?: string;
  /** @deprecated Use links[] */
  linkChat?: string;
  /** @deprecated Use links[] */
  linkHomologacao?: string;

  // Contatos (OPCIONAL)
  contatos?: ContatoCliente[];

  // Campos Adicionais (mantidos para compatibilidade)
  email?: string;
  telefone?: string;
  documento?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  endereco?: string;
  observacoes?: string;
  fotoPerfil?: string;

  // Status (adaptado: apenas ativo/inativo, removido pendente)
  status: ClienteStatus;

  // Auditoria
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Form data para criação/edição
 * Inclui TODOS os campos do formulário
 */
export interface ClienteFormData {
  // Informações Básicas - OBRIGATÓRIAS
  nome: string;
  faseInicial: FaseInicial;
  situacao: SituacaoProjeto;
  dataInicio: string; // ISO date string

  // Modelo e Equipe - OPCIONAIS
  modeloContrato?: string;
  pm?: string;
  po?: string;
  techLead?: string;

  // Links - OPCIONAIS
  linkBoard?: string;
  linkChat?: string;
  linkHomologacao?: string;

  // Contatos - OPCIONAL
  contatos?: Omit<ContatoCliente, 'id'>[]; // IDs são gerados no submit

  // Campos Adicionais
  email?: string;
  telefone?: string;
  status: ClienteStatus;
  documento?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  endereco?: string;
  observacoes?: string;
  fotoPerfil?: File | undefined;
}

/**
 * Filters para list view - ATUALIZADO com filtros da spec
 */
export interface ClienteFilters {
  faseInicial?: FaseInicial;
  situacao?: SituacaoProjeto;
  pm?: string; // Filtro por PM
  status?: ClienteStatus;
  search?: string;
}

/**
 * API Response types
 */
export interface ClienteResponse {
  success: boolean;
  data?: Cliente;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface ClientesListResponse {
  success: boolean;
  data?: Cliente[];
  error?: string;
  total?: number;
  page?: number;
  pageSize?: number;
}

/**
 * Status display configuration
 */
export interface ClienteStatusConfig {
  label: string;
  variant: 'default' | 'secondary' | 'destructive' | 'outline';
  className: string;
  dotColor?: string;
}

/**
 * Fase display configuration
 */
export interface FaseConfig {
  label: FaseInicial;
  color: string;
  bgColor: string;
  icon?: string;
}

/**
 * Situação display configuration
 */
export interface SituacaoConfig {
  label: SituacaoProjeto;
  variant: 'default' | 'secondary' | 'destructive';
  icon?: string;
}

/**
 * Projeto vinculado ao cliente
 * Projetos vêm do Azure DevOps via API
 */
export interface Projeto {
  id: string;
  clienteId: string;
  nome: string;
  descricao?: string;
  fase: FaseInicial;
  situacao: SituacaoProjeto;
  dataInicio: Date;
  dataFim?: Date;
  status: 'ativo' | 'pausado' | 'concluido' | 'cancelado';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  azureUrl?: string; // URL do projeto no Azure DevOps
}

/**
 * Documento vinculado ao cliente
 */
export interface Documento {
  id: string;
  clienteId: string;
  nome: string;
  tipo: string; // ex: 'Contrato', 'Proposta', 'Ata de Reunião', 'Documentação Técnica'
  descricao?: string;
  url: string;
  tamanho?: number; // em bytes
  extensao?: string; // ex: 'pdf', 'docx', 'xlsx'
  uploadedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
