'use client';

import { memo } from 'react';
import { Activity, MessageSquare, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { TimelineEvent } from '../types';

interface TimelineStatsProps {
  events: TimelineEvent[];
}

/**
 * Premium stats cards for timeline
 * Fintech-secure personality: professional data visualization with rich colors
 * Gradient backgrounds, glassmorphism effects, animated hover states
 */
export const TimelineStats = memo(function TimelineStats({ events }: TimelineStatsProps) {
  // Calculate statistics
  const total = events.length;
  const comentarios = events.filter((e) => e.tipo === 'comentario').length;
  const documentos = events.filter((e) => e.tipo === 'documento').length;
  const emails = events.filter((e) => e.tipo === 'email').length;
  const ligacoes = events.filter((e) => e.tipo === 'ligacao').length;
  const reunioes = events.filter((e) => e.tipo === 'reuniao').length;

  // Get recent events (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentEvents = events.filter((e) => e.createdAt >= sevenDaysAgo).length;

  const stats = [
    {
      id: 'total',
      label: 'Total de Eventos',
      value: total,
      icon: Activity,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      borderColor: 'border-border',
      trend: recentEvents > 0 ? `+${recentEvents} esta semana` : 'Nenhum novo',
      trendIcon: TrendingUp,
      trendColor: recentEvents > 0 ? 'text-success' : 'text-muted-foreground',
    },
    {
      id: 'comunicacao',
      label: 'Comunicações',
      value: emails + ligacoes + reunioes,
      icon: MessageSquare,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      borderColor: 'border-border',
      trend: `${emails} emails, ${ligacoes} chamadas`,
      trendIcon: Activity,
      trendColor: 'text-muted-foreground',
    },
    {
      id: 'comentarios',
      label: 'Comentários',
      value: comentarios,
      icon: MessageSquare,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      borderColor: 'border-border',
      trend: comentarios > 0 ? 'Engajamento ativo' : 'Sem comentários',
      trendIcon: Activity,
      trendColor: comentarios > 0 ? 'text-muted-foreground' : 'text-muted-foreground',
    },
    {
      id: 'documentos',
      label: 'Documentos',
      value: documentos,
      icon: FileText,
      iconBg: 'bg-primary/10',
      iconColor: 'text-primary',
      borderColor: 'border-border',
      trend: documentos > 0 ? 'Arquivos anexados' : 'Sem documentos',
      trendIcon: Activity,
      trendColor: documentos > 0 ? 'text-muted-foreground' : 'text-muted-foreground',
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.id}
          className={`relative overflow-hidden border ${stat.borderColor} bg-muted/30 shadow-md`}
        >
          <CardContent className="pt-6 space-y-4">
            {/* Icon and value */}
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg}`}>
                <stat.icon className={`h-5 w-5 ${stat.iconColor}`} strokeWidth={2} />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold tabular-nums tracking-tight text-foreground">
                  {stat.value}
                </p>
              </div>
            </div>

            {/* Label */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-primary leading-tight">
                {stat.label}
              </h3>

              {/* Trend indicator */}
              <div className={`flex items-center gap-1.5 text-xs font-medium ${stat.trendColor}`}>
                <stat.trendIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                <span>{stat.trend}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
});
