'use client';

import type React from 'react';
import { memo } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TimelineFilters as TimelineFiltersType } from '../types';
import { EVENTO_TIPOS, EVENTO_CONFIG } from '../constants';

interface TimelineFiltersProps {
  filters: TimelineFiltersType;
  onFilterChange: (key: keyof TimelineFiltersType, value: string | undefined) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  children?: React.ReactNode;
}

/**
 * Premium timeline filters component
 * Fintech-secure personality: professional card layout, clear visual hierarchy
 * Provides filters for event type, user, and date range
 */
export const TimelineFilters = memo(function TimelineFilters({
  filters,
  onFilterChange,
  onReset,
  hasActiveFilters,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
}: TimelineFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Filter controls */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Event type filter */}
        <div className="flex flex-col space-y-2 w-full">
          <Label htmlFor="tipo-filter" className="text-sm font-medium text-foreground">
            Tipo de Evento
          </Label>
          <Select
            value={filters.tipo || 'all'}
            onValueChange={(value) =>
              onFilterChange('tipo', value === 'all' ? undefined : value)
            }
          >
            <SelectTrigger
              id="tipo-filter"
              className="!h-11 w-full"
              size="default"
            >
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  {EVENTO_TIPOS.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>
                      {EVENTO_CONFIG[tipo].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

        {/* User filter */}
        <div className="flex flex-col space-y-2 w-full">
          <Label htmlFor="usuario-filter" className="text-sm font-medium text-foreground">
            Usuário
          </Label>
          <Input
            id="usuario-filter"
            placeholder="Filtrar por usuário..."
            value={filters.usuario || ''}
            onChange={(e) => onFilterChange('usuario', e.target.value || undefined)}
            className="!h-11 w-full"
          />
        </div>

        {/* Date range filters */}
        <div className="flex flex-col space-y-2 w-full">
          <Label htmlFor="data-inicio-filter" className="text-sm font-medium text-foreground">
            Data Início
          </Label>
          <Input
            id="data-inicio-filter"
            type="date"
            value={filters.dataInicio || ''}
            onChange={(e) => onFilterChange('dataInicio', e.target.value || undefined)}
            className="!h-11 w-full"
          />
        </div>

        <div className="flex flex-col space-y-2 w-full">
          <Label htmlFor="data-fim-filter" className="text-sm font-medium text-foreground">
            Data Fim
          </Label>
          <Input
            id="data-fim-filter"
            type="date"
            value={filters.dataFim || ''}
            onChange={(e) => onFilterChange('dataFim', e.target.value || undefined)}
            className="!h-11 w-full"
          />
        </div>
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-medium text-muted-foreground">Filtros ativos:</span>
          {filters.tipo && (
            <Badge variant="secondary" className="gap-1.5">
              Tipo: {EVENTO_CONFIG[filters.tipo].label}
              <button
                onClick={() => onFilterChange('tipo', undefined)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.usuario && (
            <Badge variant="secondary" className="gap-1.5">
              Usuário: {filters.usuario}
              <button
                onClick={() => onFilterChange('usuario', undefined)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.dataInicio && (
            <Badge variant="secondary" className="gap-1.5">
              Início: {filters.dataInicio}
              <button
                onClick={() => onFilterChange('dataInicio', undefined)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {filters.dataFim && (
            <Badge variant="secondary" className="gap-1.5">
              Fim: {filters.dataFim}
              <button
                onClick={() => onFilterChange('dataFim', undefined)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-7 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Limpar todos
          </Button>
        </div>
      )}
    </div>
  );
});
