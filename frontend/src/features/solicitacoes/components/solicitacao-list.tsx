"use client";

import { FileQuestion } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import type { Solicitacao } from "../types";
import { SolicitacaoItem } from "./solicitacao-item";
import { SolicitacaoListSkeleton } from "./solicitacao-skeleton";

interface SolicitacaoListProps {
  solicitacoes: Solicitacao[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function SolicitacaoList({ solicitacoes, isLoading, emptyMessage }: SolicitacaoListProps) {
  if (isLoading) {
    return <SolicitacaoListSkeleton />;
  }

  if (solicitacoes.length === 0) {
    return (
      <EmptyState
        icon={FileQuestion}
        title={emptyMessage || "Nenhuma solicitação encontrada"}
        description="Não há solicitações para exibir no momento."
      />
    );
  }

  return (
    <div className="space-y-4">
      {solicitacoes.map((solicitacao) => (
        <SolicitacaoItem key={solicitacao.id} solicitacao={solicitacao} />
      ))}
    </div>
  );
}
