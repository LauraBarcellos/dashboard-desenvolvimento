import { useMemo, useState } from 'react';
import { WorkItem, Filters, MetricsState } from '@/types/metrics';
import { mockWorkItems, availableProjects, availableTypes } from '@/data/mockData';

const calculateDaysBetween = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
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

export const useMetrics = () => {
  const [filters, setFilters] = useState<Filters>({
    startDate: null,
    endDate: null,
    project: null,
    type: null,
    status: null,
  });

  const filteredItems = useMemo(() => {
    return mockWorkItems.filter((item) => {
      if (filters.startDate) {
        const itemDate = new Date(item.createdDate);
        if (itemDate < filters.startDate) return false;
      }
      if (filters.endDate) {
        const itemDate = new Date(item.createdDate);
        if (itemDate > filters.endDate) return false;
      }
      if (filters.project && item.project !== filters.project) return false;
      if (filters.type && item.type !== filters.type) return false;
      if (filters.status && item.status !== filters.status) return false;
      return true;
    });
  }, [filters]);

  const metrics: MetricsState = useMemo(() => {
    // Lead Time: Created → Closed
    const closedItems = filteredItems.filter((item) => item.closedDate);
    const leadTimeValues = closedItems.map((item) =>
      calculateDaysBetween(item.createdDate, item.closedDate!)
    );
    const avgLeadTime = leadTimeValues.length
      ? Math.round(leadTimeValues.reduce((a, b) => a + b, 0) / leadTimeValues.length)
      : 0;

    // Cycle Time: Activated → Resolved
    const resolvedItems = filteredItems.filter((item) => item.activatedDate && item.resolvedDate);
    const cycleTimeValues = resolvedItems.map((item) =>
      calculateDaysBetween(item.activatedDate!, item.resolvedDate!)
    );
    const avgCycleTime = cycleTimeValues.length
      ? Math.round(cycleTimeValues.reduce((a, b) => a + b, 0) / cycleTimeValues.length)
      : 0;

    // Throughput: Items closed in period
    const throughputItems = filteredItems.filter((item) => item.closedDate);

    // Aging: Active items (not resolved)
    const activeItems = filteredItems.filter(
      (item) => item.activatedDate && !item.resolvedDate
    );
    const agingValues = activeItems.map((item) => calculateDaysSince(item.activatedDate!));
    const avgAging = agingValues.length
      ? Math.round(agingValues.reduce((a, b) => a + b, 0) / agingValues.length)
      : 0;

    // Distribution by type
    const typeCount = filteredItems.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const distributionByType = Object.entries(typeCount).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: typeColors[name] || 'hsl(0, 0%, 50%)',
    }));

    // Throughput trend (last 6 months)
    const throughputTrend = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const month = date.toLocaleString('pt-BR', { month: 'short' });
      const year = date.getFullYear();
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const count = filteredItems.filter((item) => {
        if (!item.closedDate) return false;
        const closed = new Date(item.closedDate);
        return closed >= monthStart && closed <= monthEnd;
      }).length;

      return { period: `${month}/${year.toString().slice(2)}`, count };
    });

    // Cycle Time trend
    const cycleTimeTrend = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const month = date.toLocaleString('pt-BR', { month: 'short' });
      const year = date.getFullYear();
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const monthItems = filteredItems.filter((item) => {
        if (!item.resolvedDate || !item.activatedDate) return false;
        const resolved = new Date(item.resolvedDate);
        return resolved >= monthStart && resolved <= monthEnd;
      });

      const values = monthItems.map((item) =>
        calculateDaysBetween(item.activatedDate!, item.resolvedDate!)
      );
      const avg = values.length
        ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
        : 0;

      return { period: `${month}/${year.toString().slice(2)}`, value: avg };
    });

    return {
      leadTime: { value: avgLeadTime, unit: 'dias', items: closedItems },
      cycleTime: { value: avgCycleTime, unit: 'dias', items: resolvedItems },
      throughput: { value: throughputItems.length, unit: 'itens', items: throughputItems },
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
    updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    clearFilters: () => {
      setFilters({
        startDate: null,
        endDate: null,
        project: null,
        type: null,
        status: null,
      });
    },
  };
};
