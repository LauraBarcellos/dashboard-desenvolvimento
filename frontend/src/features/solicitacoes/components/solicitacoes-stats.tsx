"use client";

import { memo } from "react";
import { CheckCircle2, FileText } from "lucide-react";
import { StatsGrid } from "@/components/ui/stat-card";
import type { StatItem } from "@/components/ui/stat-card";
import type { Solicitacao } from "../types";

interface SolicitacoesStatsProps {
  solicitacoes: Solicitacao[];
}

export const SolicitacoesStats = memo(function SolicitacoesStats({
  solicitacoes,
}: SolicitacoesStatsProps) {
  const total = solicitacoes.length;
  const pendentes = solicitacoes.filter((s) => s.status === "pendente").length;
  const emAnalise = solicitacoes.filter((s) => s.status === "em_analise").length;
  const aprovadas = solicitacoes.filter((s) => s.status === "aprovada").length;
  const abertas = pendentes + emAnalise;

  const stats: StatItem[] = [
    {
      id: "abertas",
      label: "Abertas",
      value: abertas,
      icon: FileText,
      trend: `${pendentes} pendentes, ${emAnalise} em análise`,
      trendColor: "text-muted-foreground",
    },
    {
      id: "aprovadas",
      label: "Aprovadas",
      value: aprovadas,
      icon: CheckCircle2,
      iconBg: "bg-success/10",
      iconColor: "text-success",
      trend: total > 0 ? `${Math.round((aprovadas / total) * 100)}% do total` : "0%",
      trendColor: "text-muted-foreground",
    },
  ];

  return <StatsGrid stats={stats} columns={2} />;
});
