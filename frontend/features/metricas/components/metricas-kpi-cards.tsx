"use client";

import { Timer, TrendingUp, Bug, Clock } from "lucide-react";
import { StatsGrid } from "@/components/ui/stat-card";
import type { StatItem } from "@/components/ui/stat-card";
import type { MetricasKPIs } from "../types";

interface MetricasKPICardsProps {
  kpis: MetricasKPIs;
}

export function MetricasKPICards({ kpis }: MetricasKPICardsProps) {
  const stats: StatItem[] = [
    {
      id: "cycle-time",
      label: "Cycle Time",
      value: kpis.cycleTime,
      icon: Timer,
      iconBg: "bg-chart-1/10",
      iconColor: "text-chart-1",
      trend: `${kpis.cycleTime} dias em média`,
    },
    {
      id: "vazao",
      label: "Vazão (Throughput)",
      value: kpis.vazao,
      icon: TrendingUp,
      iconBg: "bg-chart-2/10",
      iconColor: "text-chart-2",
      trend: "itens concluídos",
    },
    {
      id: "bugs",
      label: "Bugs",
      value: kpis.bugsAbertos + kpis.bugsEncerrados,
      icon: Bug,
      iconBg: "bg-chart-3/10",
      iconColor: "text-chart-3",
      trend: `${kpis.bugsAbertos} abertos · ${kpis.bugsEncerrados} encerrados`,
    },
    {
      id: "aging",
      label: "Aging (Envelhecimento)",
      value: kpis.aging,
      icon: Clock,
      iconBg: "bg-chart-4/10",
      iconColor: "text-chart-4",
      trend: `${kpis.aging} dias em média`,
    },
  ];

  return <StatsGrid stats={stats} columns={4} />;
}
