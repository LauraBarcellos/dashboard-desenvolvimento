"use client";

import { memo } from "react";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { StatsGrid } from "@/components/ui/stat-card";
import type { StatItem } from "@/components/ui/stat-card";
import type { Tarefa } from "../types";

interface TarefasStatsProps {
  tarefas: Tarefa[];
}

export const TarefasStats = memo(function TarefasStats({ tarefas }: TarefasStatsProps) {
  const total = tarefas.length;
  const pendentes = tarefas.filter((t) => t.status === "pendente").length;
  const emAndamento = tarefas.filter((t) => t.status === "em_andamento").length;
  const concluidas = tarefas.filter((t) => t.status === "concluida").length;

  const now = new Date();
  const atrasadas = tarefas.filter(
    (t) =>
      t.dataVencimento &&
      t.status !== "concluida" &&
      t.status !== "cancelada" &&
      t.dataVencimento < now
  ).length;

  const stats: StatItem[] = [
    {
      id: "pendentes",
      label: "Pendentes",
      value: pendentes,
      icon: Clock,
      trend: atrasadas > 0 ? `${atrasadas} atrasadas` : "No prazo",
      trendColor: atrasadas > 0 ? "text-destructive" : "text-success",
    },
    {
      id: "em_andamento",
      label: "Em Andamento",
      value: emAndamento,
      icon: TrendingUp,
      trend: "Em progresso",
      trendColor: "text-muted-foreground",
    },
    {
      id: "concluidas",
      label: "Concluídas",
      value: concluidas,
      icon: CheckCircle2,
      iconBg: "bg-success/10",
      iconColor: "text-success",
      trend: total > 0 ? `${Math.round((concluidas / total) * 100)}% do total` : "0%",
      trendColor: "text-muted-foreground",
    },
  ];

  return <StatsGrid stats={stats} columns={3} />;
});
