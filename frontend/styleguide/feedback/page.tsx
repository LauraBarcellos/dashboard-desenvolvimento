"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";
import { toast } from "sonner";
import { Users, Search } from "lucide-react";

export default function FeedbackPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Feedback</h1>
        <p className="mt-1 text-muted-foreground">
          Dialog, Toast, Skeleton, EmptyState, ErrorState, LoadingState.
        </p>
      </div>

      <ShowcaseSection title="Dialog">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Abrir Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar ação</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja executar esta ação? Esta operação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ShowcaseSection>

      <ShowcaseSection title="Toast (Sonner)">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => toast.success("Operação realizada com sucesso!")}>
            Toast Success
          </Button>
          <Button variant="outline" onClick={() => toast.error("Ocorreu um erro na operação.")}>
            Toast Error
          </Button>
          <Button variant="outline" onClick={() => toast.info("Informação importante.")}>
            Toast Info
          </Button>
          <Button variant="outline" onClick={() => toast.warning("Atenção: verifique os dados.")}>
            Toast Warning
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Skeleton">
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <div className="flex gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Empty State — default"
        description="Usado quando não há dados (ClienteEmptyState, TimelineEmptyState, TarefaList, SolicitacaoList)"
      >
        <EmptyState
          icon={Users}
          title="Nenhum cliente encontrado"
          description="Comece criando seu primeiro cliente para gerenciar operações."
          action={{ label: "Criar Primeiro Cliente", href: "#" }}
          variant="default"
        />
      </ShowcaseSection>

      <ShowcaseSection
        title="Empty State — filtered"
        description="Usado quando filtros não retornam resultados"
      >
        <EmptyState
          icon={Search}
          title="Nenhum resultado encontrado"
          description="Não encontramos itens que correspondam aos filtros aplicados."
          variant="filtered"
        />
      </ShowcaseSection>

      <ShowcaseSection title="Error State">
        <ErrorState
          title="Erro ao carregar dados"
          message="Ocorreu um erro inesperado. Tente novamente."
          retry={() => toast.info("Tentando novamente...")}
        />
      </ShowcaseSection>

      <ShowcaseSection title="Loading State">
        <LoadingState />
      </ShowcaseSection>
    </>
  );
}
