import { Clock, Zap, TrendingUp, AlertCircle } from 'lucide-react';
import { MetricCard } from '@/components/metrics/MetricCard';
import { MetricData } from '@/types/metrics';

interface MetricsOverviewProps {
  leadTime: MetricData;
  cycleTime: MetricData;
  throughput: MetricData;
  aging: MetricData;
  onCardClick: (metric: string) => void;
}

export const MetricsOverview = ({
  leadTime,
  cycleTime,
  throughput,
  aging,
  onCardClick,
}: MetricsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Lead Time"
        value={leadTime.value}
        unit={leadTime.unit}
        icon={<Clock className="h-5 w-5" />}
        onClick={() => onCardClick('leadTime')}
      />
      <MetricCard
        title="Cycle Time"
        value={cycleTime.value}
        unit={cycleTime.unit}
        icon={<Zap className="h-5 w-5" />}
        onClick={() => onCardClick('cycleTime')}
      />
      <MetricCard
        title="Throughput"
        value={throughput.value}
        unit={throughput.unit}
        icon={<TrendingUp className="h-5 w-5" />}
        onClick={() => onCardClick('throughput')}
      />
      <MetricCard
        title="Aging"
        value={aging.value}
        unit={aging.unit}
        icon={<AlertCircle className="h-5 w-5" />}
        onClick={() => onCardClick('aging')}
      />
    </div>
  );
};
