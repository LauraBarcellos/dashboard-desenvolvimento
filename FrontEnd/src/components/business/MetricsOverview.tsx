import { ModalType } from '@/pages/DashboardPage';
import { MetricCard } from './MetricCard';
import { MetricData } from '@/types/metrics';

interface MetricsOverviewProps {
  leadTime: MetricData;
  cycleTime: MetricData;
  throughput: MetricData;
  aging: MetricData;
  onCardClick: (metric: ModalType) => void;
}

export const MetricsOverview = ({
  leadTime,
  cycleTime,
  throughput,
  aging,
  onCardClick,
}: MetricsOverviewProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Lead Time"
        value={leadTime.value}
        unit={leadTime.unit}
        trend={leadTime.trend}
        description="Média total"
        onClick={() => onCardClick('leadTime')}
      />
      <MetricCard
        title="Cycle Time"
        value={cycleTime.value}
        unit={cycleTime.unit}
        trend={cycleTime.trend}
        description="Média desenvolvimento"
        onClick={() => onCardClick('cycleTime')}
      />
      <MetricCard
        title="Throughput"
        value={throughput.value}
        unit={throughput.unit}
        trend={throughput.trend}
        description="Itens entregues"
        onClick={() => onCardClick('throughput')}
      />
      <MetricCard
        title="Aging"
        value={aging.value}
        unit={aging.unit}
        trend={aging.trend}
        description="Em andamento"
        onClick={() => onCardClick('aging')}
      />
    </div>
  );
};