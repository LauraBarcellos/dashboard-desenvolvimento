'use client';

import { use, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/page-header';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ClienteAvatar } from '@/features/clientes/components/cliente-avatar';
import { ClienteDetails } from '@/features/clientes/components/cliente-details';
import { ErrorState } from '@/components/ui/error-state';
import { ClienteProjetos } from '@/features/clientes/components/cliente-projetos';
import { ClienteDocumentos } from '@/features/clientes/components/cliente-documentos';
import { TimelineEventList } from '@/features/timeline/components/timeline-event-list';
import { TimelineFilters } from '@/features/timeline/components/timeline-filters';
import { TimelineEmptyState, TimelineEmptyFilteredState } from '@/features/timeline/components/timeline-empty-state';
import { useTimelineFilters } from '@/features/timeline/hooks/use-timeline-filters';
import type { TimelineEventTipo } from '@/features/timeline/types';
import { usePagination } from '@/features/clientes/hooks/use-pagination';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { STATUS_CONFIG } from '@/features/clientes/constants';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import { MOCK_CLIENTES } from '@/features/clientes/mocks/data';
import { MOCK_TIMELINE_EVENTS, addTimelineEventMock } from '@/features/timeline/mocks/data';
import { MOCK_OBSERVACOES, addObservacaoMock, deleteObservacaoMock } from '@/features/clientes/mocks/observacoes';
import { TimelineEventForm } from '@/features/timeline/components/timeline-event-form';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { getProjetosByClienteId } from '@/features/clientes/mocks/projetos';
import { getDocumentosByClienteId } from '@/features/clientes/mocks/documentos';

interface ClientePageProps {
  params: Promise<{ id: string }>;
}

/**
 * Cliente detail page with tabs for overview and timeline
 * Route: /clientes/[id]
 */
export default function ClientePage({ params }: ClientePageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Ordenar observações por data (mais recentes primeiro)
  const sortedObservacoes = useMemo(() => {
    const obs = MOCK_OBSERVACOES[id] || [];
    return [...obs].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [id]);
  
  const [observacoes, setObservacoes] = useState(sortedObservacoes);
  
  // Atualizar observações quando o id mudar
  useEffect(() => {
    setObservacoes(sortedObservacoes);
  }, [sortedObservacoes]);

  // Find cliente by ID and manage local state for updates
  const [cliente, setCliente] = useState(() => MOCK_CLIENTES.find((c) => c.id === id));

  // Timeline filters
  const { filters, updateFilter, resetFilters, hasActiveFilters } = useTimelineFilters();

  // Filter timeline events for this cliente
  const [clienteEvents, setClienteEvents] = useState(() => {
    return MOCK_TIMELINE_EVENTS.filter((event) => event.clienteId === id);
  });

  // Update events when id changes
  useEffect(() => {
    setClienteEvents(MOCK_TIMELINE_EVENTS.filter((event) => event.clienteId === id));
  }, [id]);

  // Apply filters to events and sort by date (newest first)
  const filteredEvents = useMemo(() => {
    const filtered = clienteEvents.filter((event) => {
      // Filter by event type
      if (filters.tipo && event.tipo !== filters.tipo) {
        return false;
      }

      // Filter by user
      if (filters.usuario) {
        const searchLower = filters.usuario.toLowerCase();
        if (!event.usuarioNome.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Filter by date range
      if (filters.dataInicio) {
        const startDate = new Date(filters.dataInicio);
        if (event.createdAt < startDate) {
          return false;
        }
      }

      if (filters.dataFim) {
        const endDate = new Date(filters.dataFim);
        endDate.setHours(23, 59, 59, 999); // End of day
        if (event.createdAt > endDate) {
          return false;
        }
      }

      return true;
    });

    // Sort by date in descending order (newest first)
    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [clienteEvents, filters]);

  // Pagination
  const pagination = usePagination({
    totalItems: filteredEvents.length,
    pageSize: 10,
    initialPage: 1,
  });

  const paginatedEvents = useMemo(() => {
    return pagination.paginatedData(filteredEvents);
  }, [filteredEvents, pagination]);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const { currentPage, totalPages } = pagination;

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the start
        pages.push(2, 3, 4, 'ellipsis', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push('ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // In the middle
        pages.push('ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
      }
    }

    return pages;
  };

  // Handle delete
  const handleDelete = () => {
    if (!cliente) return;
    
    // Verificar se o cliente pode ser excluído
    const projetos = getProjetosByClienteId(cliente.id);
    const documentos = getDocumentosByClienteId(cliente.id);
    
    if (projetos.length > 0 || documentos.length > 0) {
      toast.error('Não é possível excluir o cliente', {
        description: `Este cliente possui ${projetos.length} projeto(s) e ${documentos.length} documento(s) vinculados. Remova-os antes de excluir o cliente.`,
      });
      setIsDeleteDialogOpen(false);
      return;
    }
    
    toast.success('Cliente excluído', {
      description: `${cliente.nome} foi removido do sistema.`,
    });
    setIsDeleteDialogOpen(false);
    router.push('/clientes');
  };

  // Handle add observação
  const handleAddObservacao = async (texto: string) => {
    const novaObservacao = await addObservacaoMock(id, texto);
    setObservacoes((prev) => {
      const updated = [novaObservacao, ...prev];
      // Garantir ordenação (mais recentes primeiro)
      return updated.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    });
  };

  // Handle delete observação
  const handleDeleteObservacao = async (observacaoId: string) => {
    await deleteObservacaoMock(id, observacaoId);
    setObservacoes((prev) => prev.filter((obs) => obs.id !== observacaoId));
  };

  // Handle add timeline event
  const handleAddEvent = async (data: { tipo: string; titulo: string; descricao?: string }) => {
    try {
      const newEvent = addTimelineEventMock(
        id,
        data.tipo as TimelineEventTipo,
        data.titulo,
        data.descricao
      );
      setClienteEvents((prev) => [newEvent, ...prev]);
      toast.success('Evento adicionado com sucesso');
    } catch {
      toast.error('Erro ao adicionar evento');
    }
  };

  // Handle update projeto (inline editing)
  const handleUpdateProjeto = async (data: Partial<typeof cliente>) => {
    if (!cliente) return;

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update local cliente state
    setCliente({
      ...cliente,
      ...data,
      updatedAt: new Date(),
    });

    toast.success('Projeto atualizado', {
      description: 'As informações do projeto foram atualizadas com sucesso.',
    });
  };

  if (!cliente) {
    return (
      <>
        <PageHeader
          title="Cliente Não Encontrado"
          description="O cliente solicitado não foi encontrado no sistema"
        breadcrumbs={[
          { label: 'Clientes', href: '/clientes' },
          { label: 'Não Encontrado' },
        ]}
        showBackButton
        />
        <div className="p-6">
          <ErrorState
            title="Algo deu errado"
            message="O cliente solicitado não foi encontrado."
            retry={() => router.push('/clientes')}
          />
        </div>
      </>
    );
  }

  const hasTimelineFilters = hasActiveFilters;
  const isTimelineEmpty = filteredEvents.length === 0;
  const statusConfig = STATUS_CONFIG[cliente.status];

  return (
    <>
      <PageHeader
        title={cliente.nome}
        description={
          <div className="flex items-center gap-3 mt-2">
            <p className="text-sm font-mono text-muted-foreground flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              ID: {cliente.id}
            </p>
            <Badge
              variant={statusConfig.variant}
              className={`${statusConfig.className} shrink-0 font-medium text-xs px-2.5 py-1 rounded-md`}
            >
              <span className={`inline-block w-2 h-2 rounded-full ${statusConfig.dotColor || 'bg-current'} mr-2`} />
              {statusConfig.label}
            </Badge>
          </div>
        }
        breadcrumbs={[
          { label: 'Clientes', href: '/clientes' },
          { label: cliente.nome },
        ]}
        showBackButton
        avatar={<ClienteAvatar cliente={cliente} size={40} />}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/clientes/${id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </Button>
          </div>
        }
      />

      {/* Main Content Container - Card único que atinge o limite da view */}
      <div className="p-4 sm:p-6 animate-in fade-in duration-500">
        <Card className="w-full max-w-full border-border bg-card shadow-md overflow-hidden">
          {/* Tabs Container - dentro do card */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tabs Header - fixo no topo do card */}
            <div className="border-b border-border bg-muted/30 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
              <TabsList className="w-full">
                <TabsTrigger value="overview" className="flex-1">
                  Informações
                </TabsTrigger>
                <TabsTrigger value="projetos" className="flex-1">
                  Projetos
                </TabsTrigger>
                <TabsTrigger value="documentos" className="flex-1">
                  Documentos
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex-1">
                  Timeline
                  {clienteEvents.length > 0 && (
                    <span className="ml-2 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold tabular-nums text-primary border border-primary/20 shadow-sm">
                      {clienteEvents.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Tabs Content - dentro do card com padding adequado */}
            <div className="p-4 sm:p-6">
              <TabsContent value="overview" className="mt-0 space-y-0">
                <ClienteDetails
                  cliente={cliente}
                  observacoes={observacoes}
                  onAddObservacao={handleAddObservacao}
                  onDeleteObservacao={handleDeleteObservacao}
                  onUpdateProjeto={handleUpdateProjeto}
                />
              </TabsContent>

              <TabsContent value="projetos" className="mt-0 space-y-6">
                <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
                  <ClienteProjetos clienteId={id} cliente={cliente} />
                </div>
              </TabsContent>

              <TabsContent value="documentos" className="mt-0 space-y-6">
                <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
                  <ClienteDocumentos clienteId={id} />
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-0 space-y-6">
                <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-100 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Timeline
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {filteredEvents.length} de {clienteEvents.length} {clienteEvents.length === 1 ? 'evento' : 'eventos'}
                      </p>
                    </div>
                    <Button onClick={() => setIsEventFormOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Evento
                    </Button>
                  </div>

                  <Separator />

                  {/* Filtros */}
                  <TimelineFilters
                    filters={filters}
                    onFilterChange={updateFilter}
                    onReset={resetFilters}
                    hasActiveFilters={hasTimelineFilters}
                  />

                  {/* Content */}
                  <div className="border-border p-4 sm:p-6 bg-muted/30 rounded-lg">
                    {isTimelineEmpty ? (
                      hasTimelineFilters ? (
                        <TimelineEmptyFilteredState />
                      ) : (
                        <TimelineEmptyState />
                      )
                    ) : (
                      <TimelineEventList events={paginatedEvents} />
                    )}
                  </div>

                  {/* Pagination - apenas controles */}
                  {!isTimelineEmpty && filteredEvents.length > 0 && pagination.totalPages > 1 && (
                    <div className="flex justify-center">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                pagination.previousPage();
                              }}
                              className={!pagination.hasPreviousPage ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            />
                          </PaginationItem>

                          {getPageNumbers().map((page, index) => {
                            if (page === 'ellipsis') {
                              return (
                                <PaginationItem key={`ellipsis-${index}`}>
                                  <PaginationEllipsis />
                                </PaginationItem>
                              );
                            }

                            return (
                              <PaginationItem key={page}>
                                <PaginationLink
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    pagination.goToPage(page);
                                  }}
                                  isActive={pagination.currentPage === page}
                                  className="cursor-pointer"
                                >
                                  {page}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          })}

                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                pagination.nextPage();
                              }}
                              className={!pagination.hasNextPage ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    </div>
                  )}
                </div>
              </TabsContent>
            </div>

            {/* Footer - Criado em / Atualizado em - apenas na aba overview */}
            {activeTab === 'overview' && (
              <div className="border-t border-border bg-muted/30 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" strokeWidth={2} />
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-muted-foreground mb-1">Criado em</span>
                      <time
                        dateTime={cliente.createdAt.toISOString()}
                        className="text-sm font-mono tabular-nums text-foreground"
                      >
                        {format(cliente.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </time>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" strokeWidth={2} />
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-muted-foreground mb-1">Atualizado em</span>
                      <time
                        dateTime={cliente.updatedAt.toISOString()}
                        className="text-sm font-mono tabular-nums text-foreground"
                      >
                        {format(cliente.updatedAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Tabs>
        </Card>
      </div>

      {/* Timeline Event Form Dialog */}
      <TimelineEventForm
        open={isEventFormOpen}
        onOpenChange={setIsEventFormOpen}
        onSubmit={handleAddEvent}
        clienteId={id}
      />

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-semibold text-foreground">
              Confirmar exclusão
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground leading-relaxed">
              Tem certeza que deseja excluir o cliente{' '}
              <span className="font-semibold text-foreground">{cliente?.nome}</span>?
            </DialogDescription>
          </DialogHeader>
          
          {(() => {
            const projetos = cliente ? getProjetosByClienteId(cliente.id) : [];
            const documentos = cliente ? getDocumentosByClienteId(cliente.id) : [];
            const totalVinculos = projetos.length + documentos.length;
            
            if (totalVinculos > 0) {
              return (
                <div className="mt-4 p-4 rounded-lg bg-destructive/5 border border-destructive/30 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-destructive">
                        <span className="text-destructive-foreground text-xs font-bold">!</span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm font-semibold text-destructive">
                        Não é possível excluir este cliente
                      </p>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        Este cliente possui{' '}
                        <span className="font-semibold text-foreground">{projetos.length}</span>{' '}
                        {projetos.length === 1 ? 'projeto' : 'projetos'} e{' '}
                        <span className="font-semibold text-foreground">{documentos.length}</span>{' '}
                        {documentos.length === 1 ? 'documento' : 'documentos'} vinculados.
                        Remova todos os vínculos antes de excluir o cliente.
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-border space-y-2">
                <p className="text-sm font-medium text-foreground">
                  ⚠️ Esta ação não pode ser desfeita
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Todos os dados relacionados a este cliente serão permanentemente removidos do sistema.
                </p>
              </div>
            );
          })()}

          <DialogFooter className="mt-6 gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="flex-1 sm:flex-none"
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={(() => {
                if (!cliente) return true;
                const projetos = getProjetosByClienteId(cliente.id);
                const documentos = getDocumentosByClienteId(cliente.id);
                return projetos.length > 0 || documentos.length > 0;
              })()}
              className="flex-1 sm:flex-none"
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
