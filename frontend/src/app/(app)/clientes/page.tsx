'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/page-header';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ClientesStats } from '@/features/clientes/components/clientes-stats';
import { ClientesTable } from '@/features/clientes/components/clientes-table';
import { ClientesFilters } from '@/features/clientes/components/clientes-filters';
import { ClienteEmptyState, ClienteEmptyFilteredState } from '@/features/clientes/components/cliente-empty-state';
import { useClienteFilters } from '@/features/clientes/hooks/use-cliente-filters';
import { usePagination } from '@/features/clientes/hooks/use-pagination';
import { MOCK_CLIENTES } from '@/features/clientes/mocks/data';

/**
 * Clientes list page
 * Route: /clientes
 * Premium design with fintech-secure personality: generous spacing, subtle animations, professional hierarchy
 */
export default function ClientesPage() {
  const { filters, updateFilter, resetFilters } = useClienteFilters();
  const [clientes] = useState(MOCK_CLIENTES);

  // Filter clientes based on current filters
  const filteredClientes = useMemo(() => {
    return clientes.filter((cliente) => {
      // Status filter
      if (filters.status && cliente.status !== filters.status) {
        return false;
      }

      // Search filter (nome, email, documento)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesNome = cliente.nome.toLowerCase().includes(searchLower);
        const matchesEmail = cliente.email?.toLowerCase().includes(searchLower);
        const matchesDocumento = cliente.documento?.toLowerCase().includes(searchLower);

        if (!matchesNome && !matchesEmail && !matchesDocumento) {
          return false;
        }
      }

      return true;
    });
  }, [clientes, filters]);

  // Pagination
  const pagination = usePagination({
    totalItems: filteredClientes.length,
    pageSize: 10,
    initialPage: 1,
  });

  const paginatedClientes = useMemo(() => {
    return pagination.paginatedData(filteredClientes);
  }, [filteredClientes, pagination]);

  const hasFilters = Boolean(filters.search || filters.status);
  const isEmpty = filteredClientes.length === 0;

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

  return (
    <>
      <PageHeader
        title="Clientes"
        description="Gerencie todos os clientes do sistema com segurança e precisão"
        actions={
          <Button asChild size="default">
            <Link href="/clientes/new">
              <Plus className="h-4 w-4" />
              <span>Novo Cliente</span>
            </Link>
          </Button>
        }
      />

      <div className="w-full max-w-full p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in fade-in duration-500 overflow-x-hidden">

      {/* Premium stats cards */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
        <ClientesStats clientes={clientes} />
      </div>

      {/* Filters with premium card styling */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
        <ClientesFilters
          filters={filters}
          onFilterChange={updateFilter}
          onReset={resetFilters}
        >
          {/* Content with staggered animation */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 border-b border-border p-4 sm:p-6 bg-muted/30">
            {isEmpty ? (
              hasFilters ? (
                <ClienteEmptyFilteredState />
              ) : (
                <ClienteEmptyState />
              )
            ) : (
              <ClientesTable clientes={paginatedClientes} />
            )}
          </div>

          {/* Pagination with premium styling */}
          {!isEmpty && filteredClientes.length > 0 && (
            <div className="p-4 sm:p-6 bg-muted/30">
              <div className="grid grid-cols-3 gap-4 items-center">
                {/* Results info - left aligned */}
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground justify-start">
                  <span>Mostrando</span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {pagination.startIndex + 1}
                  </span>
                  <span>até</span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {pagination.endIndex}
                  </span>
                  <span>de</span>
                  <span className="font-semibold text-foreground tabular-nums">
                    {filteredClientes.length}
                  </span>
                  <span>{filteredClientes.length === 1 ? 'cliente' : 'clientes'}</span>
                </div>

                {/* Pagination controls - centered */}
                <div className="flex justify-center">
                  {pagination.totalPages > 1 ? (
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
                  ) : null}
                </div>

                {/* Right space - reserved for future features */}
                <div className="flex justify-end">
                  {/* Space reserved for future functionality */}
                </div>
              </div>
            </div>
          )}
        </ClientesFilters>
      </div>
      </div>
    </>
  );
}
