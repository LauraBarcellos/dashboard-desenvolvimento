'use client';

import type React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { ClienteFilters, ClienteStatus, FaseInicial, SituacaoProjeto } from '../types';
import {
  CLIENTE_STATUSES,
  STATUS_CONFIG,
  FASES_INICIAIS,
  SITUACOES_PROJETO,
  MOCK_USERS,
} from '../constants';

interface ClientesFiltersProps {
  filters: ClienteFilters;
  onFilterChange: (key: keyof ClienteFilters, value: string | undefined) => void;
  onReset: () => void;
  children?: React.ReactNode;
}

/**
 * Premium filters component for Cliente list
 * Fintech-secure personality: professional card layout, clear visual hierarchy
 * Includes search, fase, situacao, PM, and status filters with active filter badges
 */
export function ClientesFilters({
  filters,
  onFilterChange,
  onReset,
  children,
}: ClientesFiltersProps) {
  const hasActiveFilters = Boolean(
    filters.search ||
    filters.faseInicial ||
    filters.situacao ||
    filters.pm ||
    filters.status
  );

  return (
    <Card className="relative border-border bg-muted/30 shadow-sm overflow-hidden flex flex-col gap-0 w-full max-w-full">
      <CardContent className="relative pt-6 px-6 border-b border-border">
        <div className="space-y-6">
          {/* Filter controls */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {/* Search input with premium styling - ocupa 2 colunas em telas grandes */}
            <div className="relative group sm:col-span-2 lg:col-span-2 xl:col-span-2">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center pointer-events-none z-10">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" strokeWidth={2} />
              </div>
              <Input
                placeholder="Buscar por nome, e-mail ou documento..."
                value={filters.search || ''}
                onChange={(e) => onFilterChange('search', e.target.value || undefined)}
                className="pl-10 !h-11 w-full bg-background border-border hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            {/* Fase filter */}
            <div className="w-full">
              <Select
                value={filters.faseInicial || 'all'}
                onValueChange={(value) =>
                  onFilterChange('faseInicial', value === 'all' ? undefined : (value as FaseInicial))
                }
              >
                <SelectTrigger className="w-full !h-11 bg-background border-border hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                  <SelectValue placeholder="Fase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as fases</SelectItem>
                  {FASES_INICIAIS.map((fase) => (
                    <SelectItem key={fase} value={fase}>
                      {fase}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Situacao filter */}
            <div className="w-full">
              <Select
                value={filters.situacao || 'all'}
                onValueChange={(value) =>
                  onFilterChange('situacao', value === 'all' ? undefined : (value as SituacaoProjeto))
                }
              >
                <SelectTrigger className="w-full !h-11 bg-background border-border hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                  <SelectValue placeholder="Situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as situações</SelectItem>
                  {SITUACOES_PROJETO.map((situacao) => (
                    <SelectItem key={situacao} value={situacao}>
                      {situacao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* PM filter */}
            <div className="w-full">
              <Select
                value={filters.pm || 'all'}
                onValueChange={(value) =>
                  onFilterChange('pm', value === 'all' ? undefined : value)
                }
              >
                <SelectTrigger className="w-full !h-11 bg-background border-border hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                  <SelectValue placeholder="PM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os PMs</SelectItem>
                  {MOCK_USERS.filter(u => u.role === 'PM').map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Status filter */}
            <div className="w-full">
              <Select
                value={filters.status || 'all'}
                onValueChange={(value) =>
                  onFilterChange('status', value === 'all' ? undefined : (value as ClienteStatus))
                }
              >
                <SelectTrigger className="w-full !h-11 bg-background border-border hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os status</SelectItem>
                  {CLIENTE_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {STATUS_CONFIG[status].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reset button */}
            {hasActiveFilters && (
              <div className="w-full sm:col-span-2 lg:col-span-1 xl:col-span-1">
                <Button
                  variant="outline"
                  onClick={onReset}
                  size="default"
                  className="w-full !h-11 border-border hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive transition-all duration-200 hover:scale-105"
                >
                  <X className="mr-2 h-4 w-4" strokeWidth={2.5} />
                  Limpar
                </Button>
              </div>
            )}
          </div>

          {/* Active filters badges with premium styling */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Filter className="h-4 w-4 text-primary" />
                <span>Filtros ativos:</span>
              </div>
              {filters.search && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 px-3 py-1.5 bg-muted/30 border border-border text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <span className="font-medium">Busca:</span>
                  <span>{filters.search}</span>
                  <button
                    onClick={() => onFilterChange('search', undefined)}
                    className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    aria-label="Remover filtro de busca"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.faseInicial && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 px-3 py-1.5 bg-muted/30 border border-border text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <span className="font-medium">Fase:</span>
                  <span>{filters.faseInicial}</span>
                  <button
                    onClick={() => onFilterChange('faseInicial', undefined)}
                    className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    aria-label="Remover filtro de fase"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.situacao && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 px-3 py-1.5 bg-muted/30 border border-border text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <span className="font-medium">Situação:</span>
                  <span>{filters.situacao}</span>
                  <button
                    onClick={() => onFilterChange('situacao', undefined)}
                    className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    aria-label="Remover filtro de situação"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.pm && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 px-3 py-1.5 bg-muted/30 border border-border text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <span className="font-medium">PM:</span>
                  <span>{MOCK_USERS.find(u => u.id === filters.pm)?.name || filters.pm}</span>
                  <button
                    onClick={() => onFilterChange('pm', undefined)}
                    className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    aria-label="Remover filtro de PM"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.status && (
                <Badge
                  variant="secondary"
                  className="gap-1.5 px-3 py-1.5 bg-muted/30 border border-border text-foreground hover:bg-muted/50 transition-all duration-200"
                >
                  <span className="font-medium">Status:</span>
                  <span>{STATUS_CONFIG[filters.status].label}</span>
                  <button
                    onClick={() => onFilterChange('status', undefined)}
                    className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    aria-label="Remover filtro de status"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      {children}
    </Card>
  );
}
