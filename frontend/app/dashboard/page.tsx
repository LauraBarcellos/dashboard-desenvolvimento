'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type DashboardMetrics = {
  cycleTime: {
    userStory: number | null;
    bug: number | null;
    ajuste: number | null;
  };
  throughput: {
    userStory: number;
    bug: number;
    ajuste: number;
  };
  bugs: {
    opened: number;
    closed: number;
  };
  agingAvg: number | null;
  windowDays: number;
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(
        'https://zany-disco-w49vrwrx4gvh5rgv-3001.app.github.dev/dashboard/metrics'
      )
      .then(res => setMetrics(res.data))
      .catch(() => setError(true));
  }, []);

  const format = (value: number | null) =>
    value === null ? '—' : value.toFixed(1);

  if (error) {
    return <div className="p-6">Erro ao carregar métricas</div>;
  }

  if (!metrics) {
    return <div className="p-6">Carregando…</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Cycle Time */}
        <Card>
          <CardHeader>
            <CardTitle>Cycle Time (dias)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>User Story: {format(metrics.cycleTime.userStory)}</div>
            <div>Bug: {format(metrics.cycleTime.bug)}</div>
            <div>Ajuste: {format(metrics.cycleTime.ajuste)}</div>
          </CardContent>
        </Card>

        {/* Vazão */}
        <Card>
          <CardHeader>
            <CardTitle>Vazão (desde 01/01/2025)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>User Story: {metrics.throughput.userStory}</div>
            <div>Bug: {metrics.throughput.bug}</div>
            <div>Ajuste: {metrics.throughput.ajuste}</div>
          </CardContent>
        </Card>

        {/* Bugs */}
        <Card>
          <CardHeader>
            <CardTitle>Bugs (últimos 30 dias)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>Abertos: {metrics.bugs.opened}</div>
            <div>Fechados: {metrics.bugs.closed}</div>
          </CardContent>
        </Card>

        {/* Aging */}
        <Card>
          <CardHeader>
            <CardTitle>Aging médio (dias)</CardTitle>
          </CardHeader>
          <CardContent>
            {format(metrics.agingAvg)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
