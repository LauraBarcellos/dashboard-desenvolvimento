import type { Documento } from '../types';

/**
 * Mock data for Documentos
 */
export const MOCK_DOCUMENTOS: Documento[] = [
  {
    id: 'doc-1',
    clienteId: '1',
    nome: 'Contrato de Prestação de Serviços',
    tipo: 'Contrato',
    descricao: 'Contrato principal de prestação de serviços',
    url: '/documentos/contrato-bcb.pdf',
    tamanho: 245760, // 240 KB
    extensao: 'pdf',
    uploadedBy: 'user-1',
    createdAt: new Date('2024-01-10T10:30:00'),
    updatedAt: new Date('2024-01-10T10:30:00'),
  },
  {
    id: 'doc-2',
    clienteId: '1',
    nome: 'Proposta Técnica - Sistema Financeiro',
    tipo: 'Proposta',
    descricao: 'Proposta técnica detalhada do projeto',
    url: '/documentos/proposta-bcb.pdf',
    tamanho: 1024000, // 1 MB
    extensao: 'pdf',
    uploadedBy: 'user-1',
    createdAt: new Date('2024-01-08T14:20:00'),
    updatedAt: new Date('2024-01-08T14:20:00'),
  },
  {
    id: 'doc-3',
    clienteId: '1',
    nome: 'Ata de Reunião - Kickoff',
    tipo: 'Ata de Reunião',
    descricao: 'Ata da reunião de kickoff do projeto',
    url: '/documentos/ata-kickoff-bcb.docx',
    tamanho: 51200, // 50 KB
    extensao: 'docx',
    uploadedBy: 'user-1',
    createdAt: new Date('2024-01-12T09:15:00'),
    updatedAt: new Date('2024-01-12T09:15:00'),
  },
  {
    id: 'doc-4',
    clienteId: '2',
    nome: 'Contrato Petrobras',
    tipo: 'Contrato',
    descricao: 'Contrato de desenvolvimento',
    url: '/documentos/contrato-petrobras.pdf',
    tamanho: 307200, // 300 KB
    extensao: 'pdf',
    uploadedBy: 'user-2',
    createdAt: new Date('2024-03-15T09:15:00'),
    updatedAt: new Date('2024-03-15T09:15:00'),
  },
  {
    id: 'doc-5',
    clienteId: '2',
    nome: 'Documentação Técnica - Refinarias',
    tipo: 'Documentação Técnica',
    descricao: 'Documentação técnica completa do sistema',
    url: '/documentos/doc-tecnica-petrobras.pdf',
    tamanho: 2048000, // 2 MB
    extensao: 'pdf',
    uploadedBy: 'user-2',
    createdAt: new Date('2024-03-20T11:00:00'),
    updatedAt: new Date('2024-03-20T11:00:00'),
  },
  {
    id: 'doc-6',
    clienteId: '3',
    nome: 'Proposta Comercial - Magazine Luiza',
    tipo: 'Proposta',
    descricao: 'Proposta comercial do projeto mobile',
    url: '/documentos/proposta-magalu.pdf',
    tamanho: 768000, // 750 KB
    extensao: 'pdf',
    uploadedBy: 'user-1',
    createdAt: new Date('2024-06-01T11:00:00'),
    updatedAt: new Date('2024-06-01T11:00:00'),
  },
];

/**
 * Get documentos by cliente ID
 */
export function getDocumentosByClienteId(clienteId: string): Documento[] {
  return MOCK_DOCUMENTOS.filter(d => d.clienteId === clienteId);
}

/**
 * Add new documento (mock)
 */
export async function addDocumentoMock(documento: Omit<Documento, 'id' | 'createdAt' | 'updatedAt'>): Promise<Documento> {
  const novoDocumento: Documento = {
    ...documento,
    id: `doc-${Date.now()}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  MOCK_DOCUMENTOS.push(novoDocumento);
  return novoDocumento;
}

/**
 * Delete documento (mock)
 */
export async function deleteDocumentoMock(documentoId: string): Promise<void> {
  const index = MOCK_DOCUMENTOS.findIndex(d => d.id === documentoId);
  if (index > -1) {
    MOCK_DOCUMENTOS.splice(index, 1);
  }
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

