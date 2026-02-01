import { useState, useCallback, useMemo } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricsOverview } from '@/components/business/MetricsOverview';
import { ChartsSection } from '@/components/business/ChartsSection';
import { FiltersPanel } from '@/components/filters/FiltersPanel';
import { DetailsModal } from '@/components/modals/DetailsModal';
import { useMetrics } from '@/hooks/useMetrics';

export type ModalType = 'leadTime' | 'cycleTime' | 'throughput' | 'aging';

const MODAL_CONFIG: Record<ModalType, { title: string }> = {
  leadTime: { title: 'Itens - Lead Time' },
  cycleTime: { title: 'Itens - Cycle Time' },
  throughput: { title: 'Itens - Throughput' },
  aging: { title: 'Itens - Aging (Em Andamento)' },
};

export const DashboardPage = () => {
  const { metrics, filters, updateFilter, clearFilters, isLoading } = useMetrics();
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const handleCardClick = useCallback((metric: ModalType) => {
    setActiveModal(metric);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  const modalItems = useMemo(() => {
    if (!activeModal || !metrics) return [];
    return metrics[activeModal]?.items ?? [];
  }, [activeModal, metrics]);

  // Trava de segurança para carregamento
  if (isLoading || !metrics) {
    return (
      <DashboardLayout>
        <div className="flex h-[80vh] items-center justify-center font-mono text-sm">
          Carregando métricas do banco de dados...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <header className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Visão Geral</h2>
          <FiltersPanel
            filters={filters}
            // GARANTIA: Se o back-end não enviou a lista de projetos/tipos, 
            // passamos um array vazio para evitar o erro de .map()
            projects={metrics.projects ?? []}
            types={metrics.types ?? []}
            onFilterChange={updateFilter}
            onClear={clearFilters}
          />
        </header>

        <main className="space-y-8">
          <MetricsOverview
            leadTime={metrics.leadTime}
            cycleTime={metrics.cycleTime}
            throughput={metrics.throughput}
            aging={metrics.aging}
            onCardClick={handleCardClick}
          />

          <ChartsSection
            // GARANTIA: Passamos arrays vazios se as tendências ainda não existirem
            throughputTrend={metrics.throughputTrend ?? []}
            cycleTimeTrend={metrics.cycleTimeTrend ?? []}
            distributionByType={metrics.distributionByType ?? []}
          />
        </main>
      </div>

      <DetailsModal
        open={activeModal !== null}
        onClose={handleCloseModal}
        title={activeModal ? MODAL_CONFIG[activeModal].title : ''}
        items={modalItems}
      />
    </DashboardLayout>
  );
};

export default DashboardPage;