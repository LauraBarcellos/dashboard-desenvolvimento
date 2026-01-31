import { useMemo, useState, useCallback } from 'react';
import { Filters, MetricsState } from '@/types/metrics';
import { mockWorkItems, availableProjects, availableTypes } from '@/data/mockData';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const calculateDaysBetween = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.ceil((endDate.getTime() - startDate.getTime()) / MS_PER_DAY);
};

const calculateDaysSince = (date: string): number => {
  return calculateDaysBetween(date, new Date().toISOString());
};

const typeColors: Record<string, string> = {
  feature: 'hsl(333, 100%, 50%)',
  bug: 'hsl(0, 84%, 60%)',
  task: 'hsl(200, 80%, 50%)',
  improvement: 'hsl(150, 60%, 45%)',
};

const INITIAL_FILTERS: Filters = {
  startDate: null,
  endDate: null,
  project: null,
  type: null,
  status: null,
};

export const useMetrics = () => {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const filteredItems = useMemo(() => {
    return mockWorkItems.filter((item) => {
      const itemDate = new Date(item.createdDate);
      if (filters.startDate && itemDate < filters.startDate) return false;
      if (filters.endDate && itemDate > filters.endDate) return false;
      if (filters.project && item.project !== filters.project) return false;
      if (filters.type && item.type !== filters.type) return false;
      if (filters.status && item.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const metrics: MetricsState = useMemo(() => {
    const closedItems = filteredItems.filter((item) => item.closedDate);
    const resolvedItems = filteredItems.filter((item) => item.activatedDate && item.resolvedDate);
    const activeItems = filteredItems.filter((item) => item.activatedDate && !item.resolvedDate);

    const getAverage = (values: number[]) => 
      values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0;

    const avgLeadTime = getAverage(closedItems.map((item) => calculateDaysBetween(item.createdDate, item.closedDate!)));
    const avgCycleTime = getAverage(resolvedItems.map((item) => calculateDaysBetween(item.activatedDate!, item.resolvedDate!)));
    const avgAging = getAverage(activeItems.map((item) => calculateDaysSince(item.activatedDate!)));

    const typeCount = filteredItems.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const distributionByType = Object.entries(typeCount).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: typeColors[name] || 'hsl(0, 0%, 50%)',
    }));

    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - (5 - i));
      return {
        start: new Date(d.getFullYear(), d.getMonth(), 1),
        end: new Date(d.getFullYear(), d.getMonth() + 1, 0),
        label: `${d.toLocaleString('pt-BR', { month: 'short' })}/${d.getFullYear().toString().slice(2)}`
      };
    });

    const throughputTrend = lastSixMonths.map(({ start, end, label }) => ({
      period: label,
      count: filteredItems.filter((item) => {
        if (!item.closedDate) return false;
        const closed = new Date(item.closedDate);
        return closed >= start && closed <= end;
      }).length
    }));

    const cycleTimeTrend = lastSixMonths.map(({ start, end, label }) => {
      const monthItems = filteredItems.filter((item) => {
        if (!item.resolvedDate || !item.activatedDate) return false;
        const resolved = new Date(item.resolvedDate);
        return resolved >= start && resolved <= end;
      });
      return {
        period: label,
        value: getAverage(monthItems.map((item) => calculateDaysBetween(item.activatedDate!, item.resolvedDate!)))
      };
    });

    return {
      leadTime: { value: avgLeadTime, unit: 'dias', items: closedItems },
      cycleTime: { value: avgCycleTime, unit: 'dias', items: resolvedItems },
      throughput: { value: closedItems.length, unit: 'itens', items: closedItems },
      aging: { value: avgAging, unit: 'dias', items: activeItems },
      distributionByType,
      throughputTrend,
      cycleTimeTrend,
      projects: availableProjects,
      types: availableTypes,
    };
  }, [filteredItems]);

  return {
    metrics,
    filters,
    setFilters,
    updateFilter,
    clearFilters,
  };
};