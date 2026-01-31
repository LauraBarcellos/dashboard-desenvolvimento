import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Filters, DashboardMetrics } from '@/types/metrics';

const INITIAL_FILTERS: Filters = {
  startDate: null,
  endDate: null,
  project: null,
  type: null,
  status: null,
};

const fetchMetrics = async (filters: Filters): Promise<DashboardMetrics> => {
  const params = new URLSearchParams();
  if (filters.project) params.append('project', filters.project);
  if (filters.type) params.append('type', filters.type);

  const response = await fetch(`/api/metrics?${params.toString()}`);
  if (!response.ok) throw new Error('Erro ao buscar dados');
  
  const data = (await response.json()) as DashboardMetrics;
  return data;
};

export const useMetrics = () => {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const { data, isLoading } = useQuery({
    queryKey: ['metrics', filters],
    queryFn: () => fetchMetrics(filters),
  });

  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev: Filters) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  return {
    metrics: data,
    isLoading,
    filters,
    updateFilter,
    clearFilters,
  };
};