"use client";

import { memo } from "react";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { StatsGrid } from "@/components/ui/stat-card";
import type { StatItem } from "@/components/ui/stat-card";
import type { Cliente } from "../types";

interface ClientesStatsProps {
  clientes: Cliente[];
}

export const ClientesStats = memo(function ClientesStats({ clientes }: ClientesStatsProps) {
  const total = clientes.length;
  const ativos = clientes.filter((c) => c.status === "ativo").length;
  const inativos = clientes.filter((c) => c.status === "inativo").length;
  const ativosPercent = total > 0 ? Math.round((ativos / total) * 100) : 0;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentClients = clientes.filter((c) => c.createdAt >= sevenDaysAgo).length;

  const emDesenvolvimento = clientes.filter((c) => c.faseInicial === "Desenvolvimento").length;

  const stats: StatItem[] = [
    {
      id: "total",
      label: "Total de Clientes",
      value: total,
      icon: Users,
      trend: recentClients > 0 ? `+${recentClients} esta semana` : "Nenhum novo",
      trendColor: recentClients > 0 ? "text-success" : "text-muted-foreground",
    },
    {
      id: "ativos",
      label: "Clientes Ativos",
      value: ativos,
      icon: UserCheck,
      trend: `${ativosPercent}% do total`,
      trendColor: "text-success",
    },
    {
      id: "desenvolvimento",
      label: "Em Desenvolvimento",
      value: emDesenvolvimento,
      icon: Clock,
      trend: emDesenvolvimento > 0 ? "Projetos ativos" : "Nenhum projeto",
      trendColor: emDesenvolvimento > 0 ? "text-success" : "text-muted-foreground",
    },
    {
      id: "inativos",
      label: "Inativos",
      value: inativos,
      icon: UserX,
      trend: inativos > 0 ? "Verificar motivos" : "Todos ativos",
      trendColor: "text-muted-foreground",
    },
  ];

  return <StatsGrid stats={stats} columns={4} />;
});
