'use client';

import { memo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Laptop, Key, HelpCircle, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Solicitacao, TipoSolicitacao } from '../types';
import { STATUS_CONFIG, TIPO_CONFIG } from '../constants';

interface SolicitacaoItemProps {
  solicitacao: Solicitacao;
}

const TIPO_ICONS: Record<TipoSolicitacao, typeof Calendar> = {
  ferias: Calendar,
  equipamento: Laptop,
  acesso: Key,
  suporte: HelpCircle,
  outros: MoreHorizontal,
};

export const SolicitacaoItem = memo(function SolicitacaoItem({ solicitacao }: SolicitacaoItemProps) {
  const statusConfig = STATUS_CONFIG[solicitacao.status];
  const tipoConfig = TIPO_CONFIG[solicitacao.tipo];
  const TipoIcon = TIPO_ICONS[solicitacao.tipo];

  return (
    <Card className="border-border bg-muted/30 hover:border-primary/40 transition-all duration-200">
      <CardContent className="pt-6 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <TipoIcon className="h-4 w-4 text-primary" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground leading-tight">
                {solicitacao.titulo}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {format(solicitacao.createdAt, "dd/MM/yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>
          <Badge
            variant={statusConfig.variant}
            className={`${statusConfig.className} shrink-0`}
          >
            {statusConfig.label}
          </Badge>
        </div>

        {/* Descrição */}
        {solicitacao.descricao && (
          <p className="text-xs text-muted-foreground leading-relaxed pl-12">
            {solicitacao.descricao}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-2 pl-12">
          <Badge
            variant="outline"
            className={tipoConfig.className}
          >
            {tipoConfig.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
});
