"use client";

import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { useMetricasFilters } from "@/features/metricas/hooks/use-metricas-filters";
import {
  filterWorkItems,
  calculateKPIs,
  buildChartData,
  getGranularidade,
} from "@/features/metricas/hooks/use-metricas-data";
import { MOCK_WORK_ITEMS } from "@/features/metricas/mocks/data";
import { MetricasKPICards } from "@/features/metricas/components/metricas-kpi-cards";
import { MetricasFilters } from "@/features/metricas/components/metricas-filters";
import { MetricasBarChart } from "@/features/metricas/components/metricas-bar-chart";
import { MetricasFooter } from "@/features/metricas/components/metricas-footer";

export default function MetricasPage() {
  const {
    filters,
    updateDateRange,
    updateTipos,
    updateProjetos,
    resetFilters,
    applyPreset,
    dateRangeLabel,
  } = useMetricasFilters();

  const filteredItems = useMemo(
    () => filterWorkItems(MOCK_WORK_ITEMS, filters),
    [filters],
  );

  const kpis = useMemo(
    () => calculateKPIs(filteredItems, filters.dateRange),
    [filteredItems, filters.dateRange],
  );

  const chartData = useMemo(
    () => buildChartData(filteredItems, filters.dateRange),
    [filteredItems, filters.dateRange],
  );

  const granularidade = useMemo(
    () => getGranularidade(filters.dateRange),
    [filters.dateRange],
  );

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Métricas de Engenharia"
        description={`Dados filtrados: ${dateRangeLabel}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Métricas" },
        ]}
      />

      <div className="flex flex-col gap-6 p-4 sm:p-6">
        <MetricasKPICards kpis={kpis} />

        <MetricasFilters
          filters={filters}
          onDateRangeChange={updateDateRange}
          onTiposChange={updateTipos}
          onProjetosChange={updateProjetos}
          onPreset={applyPreset}
          onReset={resetFilters}
        />

        <MetricasBarChart data={chartData} granularidade={granularidade} />

        <MetricasFooter />
      </div>
    </div>
  );
}
