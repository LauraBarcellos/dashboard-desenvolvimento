import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricsOverview } from '@/components/business/MetricsOverview';
import { ChartsSection } from '@/components/business/ChartsSection';
import { FiltersPanel } from '@/components/filters/FiltersPanel';
import { DetailsModal } from '@/components/modals/DetailsModal';
import { useMetrics } from '@/hooks/useMetrics';
import { WorkItem } from '@/types/metrics';

type ModalType = 'leadTime' | 'cycleTime' | 'throughput' | 'aging' | null;

const modalTitles: Record<string, string> = {
  leadTime: 'Itens - Lead Time',
  cycleTime: 'Itens - Cycle Time',
  throughput: 'Itens - Throughput',
  aging: 'Itens - Aging (Em Andamento)',
};

export const DashboardPage = () => {
  const { metrics, filters, updateFilter, clearFilters } = useMetrics();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleCardClick = (metric: string) => {
    setActiveModal(metric as ModalType);
  };

  const getModalItems = (): WorkItem[] => {
    if (!activeModal) return [];
    return metrics[activeModal]?.items || [];
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Visão Geral</h2>
          <FiltersPanel
            filters={filters}
            projects={metrics.projects}
            types={metrics.types}
            onFilterChange={updateFilter}
            onClear={clearFilters}
          />
        </div>

        <MetricsOverview
          leadTime={metrics.leadTime}
          cycleTime={metrics.cycleTime}
          throughput={metrics.throughput}
          aging={metrics.aging}
          onCardClick={handleCardClick}
        />

        <ChartsSection
          throughputTrend={metrics.throughputTrend}
          cycleTimeTrend={metrics.cycleTimeTrend}
          distributionByType={metrics.distributionByType}
        />
      </div>

      <DetailsModal
        open={activeModal !== null}
        onClose={() => setActiveModal(null)}
        title={activeModal ? modalTitles[activeModal] : ''}
        items={getModalItems()}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;
