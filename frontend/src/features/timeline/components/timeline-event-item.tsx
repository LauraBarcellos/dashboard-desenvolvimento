'use client';

import { memo } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Plus,
  Edit,
  MessageSquare,
  FileText,
  TrendingUp,
  Mail,
  Phone,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { TimelineEvent, TimelineEventTipo } from '../types';
// EVENTO_CONFIG removed - unused

interface TimelineEventItemProps {
  event: TimelineEvent;
  isLast?: boolean;
  index?: number;
}

/**
 * Icon mapping for event types
 */
const EVENT_ICONS: Record<TimelineEventTipo, typeof Plus> = {
  criacao: Plus,
  atualizacao: Edit,
  comentario: MessageSquare,
  documento: FileText,
  status_mudanca: TrendingUp,
  email: Mail,
  ligacao: Phone,
  reuniao: Users,
};

/**
 * Premium timeline event item component
 * Fintech-secure personality: professional timeline design with rich color coding
 * Glassmorphism effects, gradient overlays, sophisticated animations
 */
export const TimelineEventItem = memo(function TimelineEventItem({
  event,
  isLast = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index = 0,
}: TimelineEventItemProps) {
  const Icon = EVENT_ICONS[event.tipo];

  // Simplified color scheme - all use primary for consistency
  const colors = {
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    lineColor: 'bg-border',
  };

  return (
    <div className="relative flex gap-6 pb-10">
      {/* Timeline line */}
      <div className="relative flex flex-col items-center shrink-0">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${colors.iconBg}`}
          aria-hidden="true"
        >
          <Icon className={`h-5 w-5 ${colors.iconColor}`} strokeWidth={2} />
        </div>
        {!isLast && (
          <div className={`absolute top-10 left-1/2 h-full w-1 -translate-x-1/2 ${colors.lineColor}`} />
        )}
      </div>

      {/* Event content */}
      <div className="flex-1 pt-1 min-w-0">
        {/* Header */}
        <div className="mb-3 space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Evento
          </p>
          <h4 className="text-sm text-foreground font-medium">
            {event.titulo}
          </h4>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <p className="text-xs text-muted-foreground">
              por <span className="text-foreground font-medium">{event.usuarioNome}</span>
            </p>
            <span className="hidden sm:inline text-muted-foreground">•</span>
            <time
              dateTime={event.createdAt.toISOString()}
              className="text-xs text-muted-foreground tabular-nums font-mono"
            >
              {format(event.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </time>
          </div>
        </div>

        {/* Descrição */}
        {event.descricao && (
          <div className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
              Descrição
            </p>
            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {event.descricao}
            </p>

            {/* Metadata - só renderiza se houver conteúdo válido */}
            {(() => {
              const hasStatusChange = typeof event.metadata?.statusAnterior === 'string' &&
                typeof event.metadata?.statusNovo === 'string';
              const hasDocumentoTipo = typeof event.metadata?.documentoTipo === 'string';
              const hasAssunto = typeof event.metadata?.assunto === 'string';
              const hasDuracao = typeof event.metadata?.duracao === 'string';
              const hasParticipantes = Array.isArray(event.metadata?.participantes) && event.metadata.participantes.length > 0;

              const hasAnyMetadata = hasStatusChange || hasDocumentoTipo || hasAssunto || hasDuracao || hasParticipantes;

              if (!hasAnyMetadata) return null;

              return (
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Detalhes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {hasStatusChange && event.metadata && (
                      <Badge
                        variant="outline"
                        className="tabular-nums bg-primary/10 text-primary border-transparent font-medium text-xs px-2.5 py-1"
                      >
                        {String(event.metadata.statusAnterior)} → {String(event.metadata.statusNovo)}
                      </Badge>
                    )}
                    {hasDocumentoTipo && event.metadata && (
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-transparent font-medium text-xs px-2.5 py-1"
                      >
                        {String(event.metadata.documentoTipo)}
                      </Badge>
                    )}
                    {hasAssunto && event.metadata && (
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-transparent font-medium text-xs px-2.5 py-1"
                      >
                        {String(event.metadata.assunto)}
                      </Badge>
                    )}
                    {hasDuracao && event.metadata && (
                      <Badge
                        variant="outline"
                        className="tabular-nums bg-primary/10 text-primary border-transparent font-medium text-xs px-2.5 py-1"
                      >
                        {String(event.metadata.duracao)}
                      </Badge>
                    )}
                    {hasParticipantes && event.metadata && Array.isArray(event.metadata.participantes) && (
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-transparent font-medium text-xs px-2.5 py-1"
                      >
                        {event.metadata.participantes.length} participante(s)
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
});
