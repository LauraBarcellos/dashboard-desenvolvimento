'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MessageSquare, Plus, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { Observacao } from '../types/observacao';

interface ClienteObservacoesProps {
  clienteId: string;
  observacoes: Observacao[];
  onAddObservacao?: (texto: string) => Promise<void>;
  onDeleteObservacao?: (observacaoId: string) => Promise<void>;
}

/**
 * Seção de observações/comentários do cliente
 * Permite adicionar e visualizar múltiplas observações
 */
export function ClienteObservacoes({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clienteId,
  observacoes,
  onAddObservacao,
  onDeleteObservacao,
}: ClienteObservacoesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [novoTexto, setNovoTexto] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [observacaoToDelete, setObservacaoToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!novoTexto.trim()) {
      toast.error('Erro', {
        description: 'A observação não pode estar vazia.',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (onAddObservacao) {
        await onAddObservacao(novoTexto.trim());
      }
      setNovoTexto('');
      setIsAdding(false);
      toast.success('Observação adicionada', {
        description: 'A observação foi registrada com sucesso.',
      });
    } catch {
      toast.error('Erro ao adicionar observação', {
        description: 'Não foi possível adicionar a observação.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!observacaoToDelete || !onDeleteObservacao) return;

    setIsDeleting(true);
    try {
      await onDeleteObservacao(observacaoToDelete);
      setObservacaoToDelete(null);
      toast.success('Observação excluída', {
        description: 'A observação foi removida com sucesso.',
      });
    } catch {
      toast.error('Erro ao excluir observação', {
        description: 'Não foi possível excluir a observação.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
            <MessageSquare className="h-4 w-4 text-primary" strokeWidth={2} />
          </div>
          <h4 className="text-base font-semibold text-foreground">
            Observações
          </h4>
        </div>
        {!isAdding && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="gap-2 bg-primary/10 hover:!bg-primary/20 hover:!text-primary text-primary border-0"
          >
            <Plus className="h-4 w-4" />
            Adicionar Observação
          </Button>
        )}
      </div>

      {/* Formulário para adicionar nova observação */}
      {isAdding && (
        <Card className="border-border bg-muted/30">
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <Textarea
              placeholder="Digite sua observação sobre o cliente..."
              value={novoTexto}
              onChange={(e) => setNovoTexto(e.target.value)}
              className="min-h-[120px] resize-none bg-background border-border"
              disabled={isSubmitting}
            />
            <div className="flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  setNovoTexto('');
                }}
                disabled={isSubmitting}
                className="text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting || !novoTexto.trim()}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? 'Adicionando...' : 'Adicionar'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Lista de observações */}
      <div className="space-y-3">
        {observacoes.length === 0 ? (
          <Card className="border-dashed border-border bg-muted/30">
            <div className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm font-medium text-muted-foreground">
                Nenhuma observação registrada ainda.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Adicione a primeira observação para começar a registrar informações sobre este cliente.
              </p>
            </div>
          </Card>
        ) : (
          observacoes.map((observacao) => (
            <div
              key={observacao.id}
              className="group relative flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200"
            >
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <p className="text-sm font-medium text-foreground">
                    {observacao.createdBy}
                  </p>
                  <time
                    dateTime={observacao.createdAt.toISOString()}
                    className="text-xs text-muted-foreground"
                  >
                    {format(observacao.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </time>
                </div>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {observacao.texto}
                </p>
              </div>

              {/* Delete Button - Reveal on hover */}
              {onDeleteObservacao && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setObservacaoToDelete(observacao.id)}
                  className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                  aria-label="Excluir observação"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={observacaoToDelete !== null} onOpenChange={(open) => !open && setObservacaoToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Observação</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir esta observação? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setObservacaoToDelete(null)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              {isDeleting ? 'Excluindo...' : 'Excluir'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

