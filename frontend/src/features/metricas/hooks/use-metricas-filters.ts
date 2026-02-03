"use client";

import { useState, useCallback, useMemo } from "react";
import { subDays, startOfDay, endOfDay } from "date-fns";
import type { MetricasFilters, WorkItemTipo } from "../types";

const DEFAULT_DAYS = 30;

function getDefaultFilters(): MetricasFilters {
  const now = new Date();
  return {
    dateRange: {
      from: startOfDay(subDays(now, DEFAULT_DAYS)),
      to: endOfDay(now),
    },
    tipos: [],
    projetos: [],
  };
}

export function useMetricasFilters() {
  const [filters, setFilters] = useState<MetricasFilters>(getDefaultFilters);

  const updateDateRange = useCallback((from: Date, to: Date) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { from: startOfDay(from), to: endOfDay(to) },
    }));
  }, []);

  const updateTipos = useCallback((tipos: WorkItemTipo[]) => {
    setFilters((prev) => ({ ...prev, tipos }));
  }, []);

  const updateProjetos = useCallback((projetos: string[]) => {
    setFilters((prev) => ({ ...prev, projetos }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(getDefaultFilters());
  }, []);

  const applyPreset = useCallback((days: number) => {
    const now = new Date();
    setFilters((prev) => ({
      ...prev,
      dateRange: {
        from: startOfDay(subDays(now, days)),
        to: endOfDay(now),
      },
    }));
  }, []);

  const dateRangeLabel = useMemo(() => {
    const { from, to } = filters.dateRange;
    const fmt = (d: Date) =>
      d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
    return `${fmt(from)} — ${fmt(to)}`;
  }, [filters.dateRange]);

  return {
    filters,
    updateDateRange,
    updateTipos,
    updateProjetos,
    resetFilters,
    applyPreset,
    dateRangeLabel,
  };
}
