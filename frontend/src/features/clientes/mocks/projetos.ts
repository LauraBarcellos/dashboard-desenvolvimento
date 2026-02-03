import type { Projeto } from '../types';

/**
 * Mock data for Projetos
 */
export const MOCK_PROJETOS: Projeto[] = [
  {
    id: 'proj-1',
    clienteId: '1',
    nome: 'Sistema de Gestão Financeira',
    descricao: 'Plataforma completa para gestão financeira do Banco Central',
    fase: 'Desenvolvimento',
    situacao: 'No prazo',
    dataInicio: new Date('2024-01-15'),
    status: 'ativo',
    createdBy: 'user-1',
    createdAt: new Date('2024-01-10T10:30:00'),
    updatedAt: new Date('2024-12-20T14:22:00'),
  },
  {
    id: 'proj-2',
    clienteId: '1',
    nome: 'Portal de Transparência',
    descricao: 'Portal público para transparência de dados',
    fase: 'Design',
    situacao: 'No prazo',
    dataInicio: new Date('2024-03-01'),
    status: 'ativo',
    createdBy: 'user-1',
    createdAt: new Date('2024-02-25T09:00:00'),
    updatedAt: new Date('2024-12-18T11:30:00'),
  },
  {
    id: 'proj-3',
    clienteId: '2',
    nome: 'Sistema de Gestão de Refinarias',
    descricao: 'Sistema integrado para gestão de refinarias da Petrobras',
    fase: 'Garantia',
    situacao: 'Adiantado',
    dataInicio: new Date('2024-03-20'),
    dataFim: new Date('2024-12-31'),
    status: 'ativo',
    createdBy: 'user-2',
    createdAt: new Date('2024-03-15T09:15:00'),
    updatedAt: new Date('2024-12-18T16:40:00'),
  },
  {
    id: 'proj-4',
    clienteId: '3',
    nome: 'E-commerce Mobile',
    descricao: 'Aplicativo mobile para vendas online',
    fase: 'Design',
    situacao: 'No prazo',
    dataInicio: new Date('2024-06-10'),
    status: 'ativo',
    createdBy: 'user-1',
    createdAt: new Date('2024-06-01T11:00:00'),
    updatedAt: new Date('2024-12-15T10:20:00'),
  },
  {
    id: 'proj-5',
    clienteId: '4',
    nome: 'Plataforma de Investimentos',
    descricao: 'Plataforma digital para investimentos do Itaú',
    fase: 'Desenvolvimento',
    situacao: 'Atrasado',
    dataInicio: new Date('2024-02-05'),
    status: 'ativo',
    createdBy: 'user-2',
    createdAt: new Date('2024-01-28T13:45:00'),
    updatedAt: new Date('2024-12-19T09:30:00'),
  },
];

/**
 * Get projetos by cliente ID
 */
export function getProjetosByClienteId(clienteId: string): Projeto[] {
  return MOCK_PROJETOS.filter(p => p.clienteId === clienteId);
}

/**
 * Add new projeto (mock)
 */
export async function addProjetoMock(projeto: Omit<Projeto, 'id' | 'createdAt' | 'updatedAt'>): Promise<Projeto> {
  const novoProjeto: Projeto = {
    ...projeto,
    id: `proj-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  MOCK_PROJETOS.push(novoProjeto);
  return novoProjeto;
}

/**
 * Delete projeto (mock)
 */
export async function deleteProjetoMock(projetoId: string): Promise<void> {
  const index = MOCK_PROJETOS.findIndex(p => p.id === projetoId);
  if (index > -1) {
    MOCK_PROJETOS.splice(index, 1);
  }
}

/**
 * Update projeto (mock)
 */
export async function updateProjetoMock(projetoId: string, data: Partial<Projeto>): Promise<Projeto> {
  const index = MOCK_PROJETOS.findIndex(p => p.id === projetoId);
  if (index === -1) {
    throw new Error('Projeto não encontrado');
  }
  MOCK_PROJETOS[index] = {
    ...MOCK_PROJETOS[index],
    ...data,
    updatedAt: new Date(),
  };
  return MOCK_PROJETOS[index];
}

