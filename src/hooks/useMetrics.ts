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

import { MOCK_DASHBOARD_METRICS } from '@/data/mockMetrics';

const fetchMetrics = async (filters: Filters): Promise<DashboardMetrics> => {
  if (import.meta.env.VITE_USE_MOCKS === 'true') {

    const filtered = structuredClone(MOCK_DASHBOARD_METRICS);
    if (filters.project) {
      filtered.leadTime.items = filtered.leadTime.items.filter(i => i.project === filters.project);
      filtered.cycleTime.items = filtered.cycleTime.items.filter(i => i.project === filters.project);
      filtered.throughput.items = filtered.throughput.items.filter(i => i.project === filters.project);
      filtered.aging.items = filtered.aging.items.filter(i => i.project === filters.project);
    }
    if (filters.type) {
      filtered.leadTime.items = filtered.leadTime.items.filter(i => i.type === filters.type);
      filtered.cycleTime.items = filtered.cycleTime.items.filter(i => i.type === filters.type);
      filtered.throughput.items = filtered.throughput.items.filter(i => i.type === filters.type);
      filtered.aging.items = filtered.aging.items.filter(i => i.type === filters.type);
    }
    return filtered;
  }

  const params = new URLSearchParams();
  if (filters.project) params.append('project', filters.project);
  if (filters.type) params.append('type', filters.type);

  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';
  const response = await fetch(`${base}/api/work-items?${params.toString()}`);
  
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