import type { Solicitacao } from '../types';

/**
 * Mock data for Solicitacoes
 * 15 realistic solicitations distributed across 6 users
 */
export const MOCK_SOLICITACOES: Solicitacao[] = [
  // User 1 (João Silva) - 3 solicitações
  {
    id: 'sol-1',
    tipo: 'ferias',
    titulo: 'Férias em fevereiro',
    descricao: 'Solicitação de férias de 10 a 20 de fevereiro',
    status: 'aprovada',
    userId: 'user-1',
    userName: 'João Silva',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-12'),
    resolvidaEm: new Date('2026-01-12'),
  },
  {
    id: 'sol-2',
    tipo: 'equipamento',
    titulo: 'Notebook novo',
    descricao: 'Notebook atual está lento, preciso de upgrade',
    status: 'em_analise',
    userId: 'user-1',
    userName: 'João Silva',
    createdAt: new Date('2026-01-17'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'sol-3',
    tipo: 'acesso',
    titulo: 'Acesso ao servidor de produção',
    status: 'pendente',
    userId: 'user-1',
    userName: 'João Silva',
    createdAt: new Date('2026-01-19'),
    updatedAt: new Date('2026-01-19'),
  },

  // User 2 (Maria Santos) - 2 solicitações
  {
    id: 'sol-4',
    tipo: 'suporte',
    titulo: 'VPN não conecta',
    descricao: 'VPN apresenta erro de conexão desde ontem',
    status: 'aprovada',
    userId: 'user-2',
    userName: 'Maria Santos',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-16'),
    resolvidaEm: new Date('2026-01-16'),
  },
  {
    id: 'sol-5',
    tipo: 'equipamento',
    titulo: 'Monitor adicional',
    descricao: 'Segundo monitor para aumentar produtividade',
    status: 'em_analise',
    userId: 'user-2',
    userName: 'Maria Santos',
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-19'),
  },

  // User 3 (Pedro Costa) - 3 solicitações
  {
    id: 'sol-6',
    tipo: 'acesso',
    titulo: 'Permissão no repositório GitHub',
    descricao: 'Acesso de admin no repo portal-devio',
    status: 'aprovada',
    userId: 'user-3',
    userName: 'Pedro Costa',
    createdAt: new Date('2026-01-14'),
    updatedAt: new Date('2026-01-15'),
    resolvidaEm: new Date('2026-01-15'),
  },
  {
    id: 'sol-7',
    tipo: 'ferias',
    titulo: 'Férias em março',
    status: 'pendente',
    userId: 'user-3',
    userName: 'Pedro Costa',
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'sol-8',
    tipo: 'suporte',
    titulo: 'Problema com email corporativo',
    descricao: 'Não consigo receber emails desde hoje',
    status: 'rejeitada',
    userId: 'user-3',
    userName: 'Pedro Costa',
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-13'),
  },

  // User 4 (Ana Oliveira) - 2 solicitações
  {
    id: 'sol-9',
    tipo: 'equipamento',
    titulo: 'Licença Figma Professional',
    descricao: 'Upgrade de licença para trabalhar com protótipos avançados',
    status: 'aprovada',
    userId: 'user-4',
    userName: 'Ana Oliveira',
    createdAt: new Date('2026-01-11'),
    updatedAt: new Date('2026-01-13'),
    resolvidaEm: new Date('2026-01-13'),
  },
  {
    id: 'sol-10',
    tipo: 'outros',
    titulo: 'Participação em conferência UX',
    status: 'em_analise',
    userId: 'user-4',
    userName: 'Ana Oliveira',
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-17'),
  },

  // User 5 (Carlos Souza) - 3 solicitações
  {
    id: 'sol-11',
    tipo: 'acesso',
    titulo: 'Acesso AWS console produção',
    descricao: 'Preciso configurar novos recursos na AWS',
    status: 'aprovada',
    userId: 'user-5',
    userName: 'Carlos Souza',
    createdAt: new Date('2026-01-13'),
    updatedAt: new Date('2026-01-14'),
    resolvidaEm: new Date('2026-01-14'),
  },
  {
    id: 'sol-12',
    tipo: 'equipamento',
    titulo: 'Upgrade de RAM',
    descricao: 'Preciso de 32GB para rodar containers Docker',
    status: 'pendente',
    userId: 'user-5',
    userName: 'Carlos Souza',
    createdAt: new Date('2026-01-19'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    id: 'sol-13',
    tipo: 'suporte',
    titulo: 'Configuração de ambiente local',
    status: 'aprovada',
    userId: 'user-5',
    userName: 'Carlos Souza',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-11'),
    resolvidaEm: new Date('2026-01-11'),
  },

  // User 6 (Julia Lima) - 2 solicitações
  {
    id: 'sol-14',
    tipo: 'ferias',
    titulo: 'Férias em abril',
    descricao: 'Férias de 15 a 30 de abril',
    status: 'em_analise',
    userId: 'user-6',
    userName: 'Julia Lima',
    createdAt: new Date('2026-01-17'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'sol-15',
    tipo: 'acesso',
    titulo: 'Acesso base de dados staging',
    descricao: 'Preciso debugar queries no ambiente de staging',
    status: 'pendente',
    userId: 'user-6',
    userName: 'Julia Lima',
    createdAt: new Date('2026-01-19'),
    updatedAt: new Date('2026-01-19'),
  },
];

/**
 * Get solicitacoes for a specific user
 */
export function getSolicitacoesByUserId(userId: string): Solicitacao[] {
  return MOCK_SOLICITACOES.filter((sol) => sol.userId === userId);
}

/**
 * Get solicitacoes by status for a specific user
 */
export function getSolicitacoesByUserAndStatus(userId: string, status: Solicitacao['status']): Solicitacao[] {
  return MOCK_SOLICITACOES.filter((sol) => sol.userId === userId && sol.status === status);
}
