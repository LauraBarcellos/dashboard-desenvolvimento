import type { Observacao } from '../types/observacao';

/**
 * Mock observações para clientes
 */
export const MOCK_OBSERVACOES: Record<string, Observacao[]> = {
  '1': [
    {
      id: 'obs-1',
      clienteId: '1',
      texto: 'Cliente premium com contrato anual. Responsável: João Silva.',
      createdBy: 'Marco Silva',
      createdAt: new Date('2025-01-15T10:30:00'),
      updatedAt: new Date('2025-01-15T10:30:00'),
    },
    {
      id: 'obs-2',
      clienteId: '1',
      texto: 'Reunião agendada para discussão de renovação do contrato em março/2026.',
      createdBy: 'Ana Costa',
      createdAt: new Date('2025-12-20T14:22:00'),
      updatedAt: new Date('2025-12-20T14:22:00'),
    },
    {
      id: 'obs-3',
      clienteId: '1',
      texto: 'Cliente demonstrou interesse em expandir serviços. Enviar proposta comercial.',
      createdBy: 'Pedro Santos',
      createdAt: new Date('2025-12-22T09:15:00'),
      updatedAt: new Date('2025-12-22T09:15:00'),
    },
  ],
  '2': [
    {
      id: 'obs-4',
      clienteId: '2',
      texto: 'Cliente desde 2024. Prefere contato por e-mail.',
      createdBy: 'Julia Oliveira',
      createdAt: new Date('2024-06-10T11:00:00'),
      updatedAt: new Date('2024-06-10T11:00:00'),
    },
  ],
};

/**
 * Função mock para adicionar observação
 */
export async function addObservacaoMock(
  clienteId: string,
  texto: string,
  createdBy: string = 'Marco Silva'
): Promise<Observacao> {
  const novaObservacao: Observacao = {
    id: `obs-${Date.now()}`,
    clienteId,
    texto,
    createdBy,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (!MOCK_OBSERVACOES[clienteId]) {
    MOCK_OBSERVACOES[clienteId] = [];
  }

  MOCK_OBSERVACOES[clienteId].unshift(novaObservacao);
  return novaObservacao;
}

/**
 * Função mock para excluir observação
 */
export async function deleteObservacaoMock(
  clienteId: string,
  observacaoId: string
): Promise<void> {
  if (MOCK_OBSERVACOES[clienteId]) {
    MOCK_OBSERVACOES[clienteId] = MOCK_OBSERVACOES[clienteId].filter(
      (obs) => obs.id !== observacaoId
    );
  }
}

