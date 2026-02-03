"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit, Trash2, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Cliente } from "../types";
import { FASE_CONFIG, SITUACAO_CONFIG, MOCK_USERS } from "../constants";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ClienteAvatar } from "./cliente-avatar";
import { getProjetosByClienteId } from "../mocks/projetos";

interface ClientesTableProps {
  clientes: Cliente[];
  onDelete?: (id: string) => void;
}

/**
 * Premium table component for displaying clientes
 * Fintech-secure personality: professional, data-focused, with subtle hover effects
 * Uses semantic tokens only, premium spacing, and smooth transitions
 */
export const ClientesTable = memo(function ClientesTable({
  clientes,
  onDelete,
}: ClientesTableProps) {
  const router = useRouter();

  const handleRowClick = (clienteId: string, event: React.MouseEvent<HTMLTableRowElement>) => {
    // Não navegar se o clique foi em um botão, link ou elemento interativo
    const target = event.target as HTMLElement;
    const isInteractiveElement =
      target.closest('button') ||
      target.closest('a') ||
      target.closest('[role="button"]') ||
      target.closest('input') ||
      target.closest('select') ||
      target.closest('textarea');

    if (!isInteractiveElement) {
      router.push(`/clientes/${clienteId}`);
    }
  };

  return (
    <Card className="relative border-border bg-muted/30 shadow-sm overflow-hidden w-full max-w-full">
      <Table className="w-full">
          <TableCaption className="sr-only">Lista de clientes do sistema</TableCaption>
          <TableHeader>
            <TableRow className="border-border bg-muted/30 hover:bg-muted/40 transition-all duration-200">
              <TableHead className="font-semibold text-foreground h-14 px-3 sm:px-6">Cliente</TableHead>
              <TableHead className="font-semibold text-foreground h-14 px-3 sm:px-6 hidden lg:table-cell">Fase</TableHead>
              <TableHead className="font-semibold text-foreground h-14 px-3 sm:px-6 hidden xl:table-cell">Situação</TableHead>
              <TableHead className="font-semibold text-foreground h-14 px-3 sm:px-6 hidden xl:table-cell">PM</TableHead>
              <TableHead className="font-semibold text-foreground h-14 px-3 sm:px-6 hidden md:table-cell">Data de Início</TableHead>
              <TableHead className="font-semibold text-foreground h-14 px-3 sm:px-6 hidden lg:table-cell">Qtd. Projetos</TableHead>
              <TableHead className="text-right font-semibold text-foreground h-14 px-3 sm:px-6">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => {
              const faseConfig = cliente.faseInicial ? FASE_CONFIG[cliente.faseInicial] : null;
              const situacaoConfig = cliente.situacao ? SITUACAO_CONFIG[cliente.situacao] : null;
              const pmUser = cliente.pm ? MOCK_USERS.find(u => u.id === cliente.pm) : null;
              const projetosCount = getProjetosByClienteId(cliente.id).length;

              return (
                <TableRow
                  key={cliente.id}
                  onClick={(e) => handleRowClick(cliente.id, e)}
                  className="group border-border hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                >
                  {/* Cliente (nome + avatar) */}
                  <TableCell className="font-semibold text-foreground py-4 sm:py-5 px-3 sm:px-6 group-hover:text-primary transition-all duration-200">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <ClienteAvatar cliente={cliente} size={32} />
                      <div className="min-w-0 flex-1">
                        <span className="block truncate">{cliente.nome}</span>
                        <span className="block text-xs text-muted-foreground lg:hidden mt-1 truncate">
                          {cliente.faseInicial || '—'}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Fase do Projeto */}
                  <TableCell className="py-4 sm:py-5 px-3 sm:px-6 hidden lg:table-cell">
                    {faseConfig ? (
                      <Badge
                        variant="outline"
                        className={`${faseConfig.bgColor} ${faseConfig.color} border-transparent font-medium text-xs px-2.5 py-1 rounded-md whitespace-nowrap`}
                      >
                        {faseConfig.label}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground/50 text-sm">—</span>
                    )}
                  </TableCell>

                  {/* Situação do Projeto */}
                  <TableCell className="py-4 sm:py-5 px-3 sm:px-6 hidden xl:table-cell">
                    {situacaoConfig ? (
                      <Badge
                        variant={situacaoConfig.variant}
                        className="font-medium text-xs px-2.5 py-1 rounded-md whitespace-nowrap"
                      >
                        {situacaoConfig.label}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground/50 text-sm">—</span>
                    )}
                  </TableCell>

                  {/* PM (Project Manager) */}
                  <TableCell className="py-4 sm:py-5 px-3 sm:px-6 hidden xl:table-cell">
                    {pmUser ? (
                      <span className="text-sm text-foreground truncate block">{pmUser.name}</span>
                    ) : (
                      <span className="text-muted-foreground/50 text-sm">—</span>
                    )}
                  </TableCell>

                  {/* Data de Início */}
                  <TableCell className="text-muted-foreground py-4 sm:py-5 px-3 sm:px-6 tabular-nums hidden md:table-cell whitespace-nowrap">
                    {cliente.dataInicio ? format(cliente.dataInicio, "dd/MM/yyyy", { locale: ptBR }) : '—'}
                  </TableCell>

                  {/* Qtd. Projetos */}
                  <TableCell className="py-4 sm:py-5 px-3 sm:px-6 hidden lg:table-cell">
                    <span className="text-sm text-foreground font-medium">{projetosCount}</span>
                  </TableCell>
                  <TableCell className="py-4 sm:py-5 px-3 sm:px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        aria-label={`Visualizar ${cliente.nome}`}
                        className="h-9 w-9 rounded-lg hover:bg-primary/10 hover:text-primary hover:border hover:border-primary/20 transition-all duration-200 hover:scale-110"
                      >
                        <Link href={`/clientes/${cliente.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        aria-label={`Editar ${cliente.nome}`}
                        className="h-9 w-9 rounded-lg hover:bg-success/10 hover:text-success hover:border hover:border-success/20 transition-all duration-200 hover:scale-110"
                      >
                        <Link href={`/clientes/${cliente.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(cliente.id)}
                          aria-label={`Excluir ${cliente.nome}`}
                          className="h-9 w-9 rounded-lg hover:bg-destructive/10 hover:text-destructive hover:border hover:border-destructive/20 transition-all duration-200 hover:scale-110"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
    </Card>
  );
});
