"use client";

import { CalendarIcon, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { MetricasFilters, WorkItemTipo } from "../types";
import { WORK_ITEM_TIPOS, PROJETOS, DATE_PRESETS } from "../constants";

interface MetricasFiltersProps {
  filters: MetricasFilters;
  onDateRangeChange: (from: Date, to: Date) => void;
  onTiposChange: (tipos: WorkItemTipo[]) => void;
  onProjetosChange: (projetos: string[]) => void;
  onPreset: (days: number) => void;
  onReset: () => void;
}

export function MetricasFilters({
  filters,
  onDateRangeChange,
  onTiposChange,
  onProjetosChange,
  onPreset,
  onReset,
}: MetricasFiltersProps) {
  const toggleTipo = (tipo: WorkItemTipo) => {
    const next = filters.tipos.includes(tipo)
      ? filters.tipos.filter((t) => t !== tipo)
      : [...filters.tipos, tipo];
    onTiposChange(next);
  };

  const toggleProjeto = (projeto: string) => {
    const next = filters.projetos.includes(projeto)
      ? filters.projetos.filter((p) => p !== projeto)
      : [...filters.projetos, projeto];
    onProjetosChange(next);
  };

  return (
    <div className="space-y-4">
      {/* Date range and presets */}
      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>
                {format(filters.dateRange.from, "dd/MM/yyyy", { locale: ptBR })}
                {" — "}
                {format(filters.dateRange.to, "dd/MM/yyyy", { locale: ptBR })}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{ from: filters.dateRange.from, to: filters.dateRange.to }}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  onDateRangeChange(range.from, range.to);
                }
              }}
              locale={ptBR}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        {DATE_PRESETS.map((preset) => (
          <Button
            key={preset.days}
            variant="outline"
            size="sm"
            onClick={() => onPreset(preset.days)}
          >
            {preset.label}
          </Button>
        ))}

        <Button variant="ghost" size="sm" onClick={onReset} className="gap-1.5">
          <RotateCcw className="h-3.5 w-3.5" />
          Limpar
        </Button>
      </div>

      {/* Type and project filters */}
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Tipo:</span>
          <div className="flex flex-wrap gap-1.5">
            {WORK_ITEM_TIPOS.map((tipo) => {
              const active = filters.tipos.length === 0 || filters.tipos.includes(tipo);
              return (
                <Button
                  key={tipo}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => toggleTipo(tipo)}
                >
                  {tipo}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Projeto:</span>
          <div className="flex flex-wrap gap-1.5">
            {PROJETOS.map((projeto) => {
              const active = filters.projetos.length === 0 || filters.projetos.includes(projeto);
              return (
                <Button
                  key={projeto}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => toggleProjeto(projeto)}
                >
                  {projeto}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
