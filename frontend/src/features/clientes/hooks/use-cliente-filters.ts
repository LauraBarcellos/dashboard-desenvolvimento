'use client';

import { useState } from 'react';
import type { ClienteFilters } from '../types';

/**
 * Hook for managing Cliente list filters
 */
export function useClienteFilters(initialFilters: ClienteFilters = {}) {
  const [filters, setFilters] = useState<ClienteFilters>(initialFilters);

  const updateFilter = <K extends keyof ClienteFilters>(
    key: K,
    value: ClienteFilters[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  const clearFilter = (key: keyof ClienteFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  return {
    filters,
    updateFilter,
    resetFilters,
    clearFilter,
  } as const;
}
