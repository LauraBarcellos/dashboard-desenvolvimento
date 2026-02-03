/**
 * Observação/Comentário sobre um cliente
 */
export interface Observacao {
  id: string;
  clienteId: string;
  texto: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

