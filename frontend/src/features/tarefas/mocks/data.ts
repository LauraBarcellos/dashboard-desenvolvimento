import type { Tarefa } from '../types';

/**
 * Mock data for Tarefas
 * 20 realistic tasks distributed across 6 users
 */
export const MOCK_TAREFAS: Tarefa[] = [
  // User 1 (João Silva) - 4 tarefas
  {
    id: 'tar-1',
    titulo: 'Revisar documentação do projeto',
    descricao: 'Atualizar documentação técnica com últimas mudanças de arquitetura',
    status: 'em_andamento',
    prioridade: 'alta',
    userId: 'user-1',
    userName: 'João Silva',
    dataVencimento: new Date('2026-01-25'),
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'tar-2',
    titulo: 'Implementar autenticação OAuth',
    descricao: 'Adicionar login social com Google e GitHub',
    status: 'pendente',
    prioridade: 'urgente',
    userId: 'user-1',
    userName: 'João Silva',
    dataVencimento: new Date('2026-01-22'),
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-16'),
  },
  {
    id: 'tar-3',
    titulo: 'Code review do PR #245',
    status: 'pendente',
    prioridade: 'media',
    userId: 'user-1',
    userName: 'João Silva',
    dataVencimento: new Date('2026-01-20'),
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'tar-4',
    titulo: 'Reunião de planning sprint',
    descricao: 'Alinhar prioridades da próxima sprint com o time',
    status: 'concluida',
    prioridade: 'media',
    userId: 'user-1',
    userName: 'João Silva',
    dataConclusao: new Date('2026-01-17'),
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-17'),
  },

  // User 2 (Maria Santos) - 3 tarefas
  {
    id: 'tar-5',
    titulo: 'Configurar ambiente de staging',
    descricao: 'Setup de servidor staging com Docker e CI/CD',
    status: 'em_andamento',
    prioridade: 'alta',
    userId: 'user-2',
    userName: 'Maria Santos',
    dataVencimento: new Date('2026-01-23'),
    createdAt: new Date('2026-01-14'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    id: 'tar-6',
    titulo: 'Otimizar queries do banco',
    status: 'pendente',
    prioridade: 'media',
    userId: 'user-2',
    userName: 'Maria Santos',
    dataVencimento: new Date('2026-01-28'),
    createdAt: new Date('2026-01-17'),
    updatedAt: new Date('2026-01-17'),
  },
  {
    id: 'tar-7',
    titulo: 'Migração de dados legados',
    descricao: 'Migrar dados do sistema antigo para nova estrutura',
    status: 'concluida',
    prioridade: 'alta',
    userId: 'user-2',
    userName: 'Maria Santos',
    dataConclusao: new Date('2026-01-16'),
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-16'),
  },

  // User 3 (Pedro Costa) - 4 tarefas
  {
    id: 'tar-8',
    titulo: 'Criar testes unitários módulo auth',
    status: 'em_andamento',
    prioridade: 'media',
    userId: 'user-3',
    userName: 'Pedro Costa',
    dataVencimento: new Date('2026-01-26'),
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    id: 'tar-9',
    titulo: 'Refatorar componente de formulários',
    descricao: 'Extrair lógica comum em hooks reutilizáveis',
    status: 'pendente',
    prioridade: 'baixa',
    userId: 'user-3',
    userName: 'Pedro Costa',
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'tar-10',
    titulo: 'Atualizar dependências do projeto',
    status: 'cancelada',
    prioridade: 'baixa',
    userId: 'user-3',
    userName: 'Pedro Costa',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-12'),
  },
  {
    id: 'tar-11',
    titulo: 'Documentar API endpoints',
    descricao: 'Criar documentação Swagger para todos os endpoints',
    status: 'concluida',
    prioridade: 'media',
    userId: 'user-3',
    userName: 'Pedro Costa',
    dataConclusao: new Date('2026-01-15'),
    createdAt: new Date('2026-01-05'),
    updatedAt: new Date('2026-01-15'),
  },

  // User 4 (Ana Oliveira) - 3 tarefas
  {
    id: 'tar-12',
    titulo: 'Design system - componentes de formulário',
    descricao: 'Criar variantes de inputs e selects no Figma',
    status: 'em_andamento',
    prioridade: 'alta',
    userId: 'user-4',
    userName: 'Ana Oliveira',
    dataVencimento: new Date('2026-01-24'),
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    id: 'tar-13',
    titulo: 'Protótipo de dashboard analytics',
    status: 'pendente',
    prioridade: 'media',
    userId: 'user-4',
    userName: 'Ana Oliveira',
    dataVencimento: new Date('2026-01-30'),
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'tar-14',
    titulo: 'Pesquisa de UX com usuários',
    descricao: 'Conduzir entrevistas com 5 usuários sobre novo fluxo',
    status: 'concluida',
    prioridade: 'alta',
    userId: 'user-4',
    userName: 'Ana Oliveira',
    dataConclusao: new Date('2026-01-17'),
    createdAt: new Date('2026-01-08'),
    updatedAt: new Date('2026-01-17'),
  },

  // User 5 (Carlos Souza) - 3 tarefas
  {
    id: 'tar-15',
    titulo: 'Implementar sistema de cache Redis',
    status: 'em_andamento',
    prioridade: 'urgente',
    userId: 'user-5',
    userName: 'Carlos Souza',
    dataVencimento: new Date('2026-01-21'),
    createdAt: new Date('2026-01-14'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    id: 'tar-16',
    titulo: 'Configurar monitoramento com Grafana',
    descricao: 'Setup de dashboards e alertas de performance',
    status: 'pendente',
    prioridade: 'alta',
    userId: 'user-5',
    userName: 'Carlos Souza',
    dataVencimento: new Date('2026-01-27'),
    createdAt: new Date('2026-01-17'),
    updatedAt: new Date('2026-01-17'),
  },
  {
    id: 'tar-17',
    titulo: 'Análise de vulnerabilidades de segurança',
    status: 'concluida',
    prioridade: 'urgente',
    userId: 'user-5',
    userName: 'Carlos Souza',
    dataConclusao: new Date('2026-01-16'),
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-16'),
  },

  // User 6 (Julia Lima) - 3 tarefas
  {
    id: 'tar-18',
    titulo: 'Implementar websockets para notificações',
    descricao: 'Notificações em tempo real usando Socket.io',
    status: 'em_andamento',
    prioridade: 'media',
    userId: 'user-6',
    userName: 'Julia Lima',
    dataVencimento: new Date('2026-01-29'),
    createdAt: new Date('2026-01-16'),
    updatedAt: new Date('2026-01-19'),
  },
  {
    id: 'tar-19',
    titulo: 'Criar pipeline de deploy automático',
    status: 'pendente',
    prioridade: 'alta',
    userId: 'user-6',
    userName: 'Julia Lima',
    dataVencimento: new Date('2026-01-25'),
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'tar-20',
    titulo: 'Backup automático de banco de dados',
    descricao: 'Configurar rotina diária de backup com retenção de 30 dias',
    status: 'concluida',
    prioridade: 'urgente',
    userId: 'user-6',
    userName: 'Julia Lima',
    dataConclusao: new Date('2026-01-15'),
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-15'),
  },
];

/**
 * Get tarefas for a specific user
 */
export function getTarefasByUserId(userId: string): Tarefa[] {
  return MOCK_TAREFAS.filter((tarefa) => tarefa.userId === userId);
}

/**
 * Get tarefas by status for a specific user
 */
export function getTarefasByUserAndStatus(userId: string, status: Tarefa['status']): Tarefa[] {
  return MOCK_TAREFAS.filter((tarefa) => tarefa.userId === userId && tarefa.status === status);
}
