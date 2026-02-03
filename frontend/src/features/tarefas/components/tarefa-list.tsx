"use client";

import { CheckCircle2 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import type { Tarefa } from "../types";
import { TarefaItem } from "./tarefa-item";
import { TarefaListSkeleton } from "./tarefa-skeleton";

interface TarefaListProps {
  tarefas: Tarefa[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function TarefaList({ tarefas, isLoading, emptyMessage }: TarefaListProps) {
  if (isLoading) {
    return <TarefaListSkeleton />;
  }

  if (tarefas.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle2}
        title={emptyMessage || "Nenhuma tarefa encontrada"}
        description="Não há tarefas para exibir no momento."
      />
    );
  }

  return (
    <div className="space-y-4">
      {tarefas.map((tarefa) => (
        <TarefaItem key={tarefa.id} tarefa={tarefa} />
      ))}
    </div>
  );
}
