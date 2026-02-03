'use client';

import { useState, useCallback } from 'react';
import type { TimelineFilters } from '../types';

/**
 * Custom hook for managing timeline filters
 */
export function useTimelineFilters(initialFilters: TimelineFilters = {}) {
  const [filters, setFilters] = useState<TimelineFilters>(initialFilters);

  const updateFilter = useCallback(
    (key: keyof TimelineFilters, value: TimelineFilters[keyof TimelineFilters]) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasActiveFilters = Boolean(
    filters.tipo || filters.usuario || filters.dataInicio || filters.dataFim
  );

  return {
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
  } as const;
}
