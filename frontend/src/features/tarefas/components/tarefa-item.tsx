'use client';

import { memo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Tarefa } from '../types';
import { STATUS_CONFIG, PRIORIDADE_CONFIG } from '../constants';

interface TarefaItemProps {
  tarefa: Tarefa;
}

export const TarefaItem = memo(function TarefaItem({ tarefa }: TarefaItemProps) {
  const statusConfig = STATUS_CONFIG[tarefa.status];
  const prioridadeConfig = PRIORIDADE_CONFIG[tarefa.prioridade];

  // Check if task is overdue
  const isOverdue = tarefa.dataVencimento &&
    tarefa.status !== 'concluida' &&
    tarefa.status !== 'cancelada' &&
    tarefa.dataVencimento < new Date();

  return (
    <Card className="border-border bg-muted/30 hover:border-primary/40 transition-all duration-200">
      <CardContent className="pt-6 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h4 className="text-sm font-medium text-foreground leading-tight flex-1">
            {tarefa.titulo}
          </h4>
          <Badge
            variant={statusConfig.variant}
            className={`${statusConfig.className} shrink-0`}
          >
            {statusConfig.label}
          </Badge>
        </div>

        {/* Descrição */}
        {tarefa.descricao && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            {tarefa.descricao}
          </p>
        )}

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Badge
            variant={prioridadeConfig.variant}
            className={`${prioridadeConfig.className} text-xs`}
          >
            {prioridadeConfig.label}
          </Badge>

          {tarefa.dataVencimento && (
            <Badge
              variant="outline"
              className={`text-xs ${isOverdue ? 'bg-destructive/10 text-destructive border-destructive/50' : 'bg-background text-muted-foreground border-border/50'}`}
            >
              <Calendar className="h-3 w-3 mr-1" />
              {format(tarefa.dataVencimento, "dd/MM/yyyy", { locale: ptBR })}
              {isOverdue && <AlertCircle className="h-3 w-3 ml-1" />}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
