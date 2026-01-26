export interface WorkItem {
  id: string;
  title: string;
  type: 'feature' | 'bug' | 'task' | 'improvement';
  project: string;
  status: 'backlog' | 'active' | 'resolved' | 'closed';
  createdDate: string;
  activatedDate: string | null;
  resolvedDate: string | null;
  closedDate: string | null;
}

export interface Filters {
  startDate: Date | null;
  endDate: Date | null;
  project: string | null;
  type: string | null;
  status: string | null;
}

export interface MetricData {
  value: number;
  unit: string;
  items: WorkItem[];
}

export interface DistributionItem {
  name: string;
  value: number;
  color: string;
}

export interface ThroughputDataPoint {
  period: string;
  count: number;
}

export interface CycleTimeDataPoint {
  period: string;
  value: number;
}

export interface MetricsState {
  leadTime: MetricData;
  cycleTime: MetricData;
  throughput: MetricData;
  aging: MetricData;
  distributionByType: DistributionItem[];
  throughputTrend: ThroughputDataPoint[];
  cycleTimeTrend: CycleTimeDataPoint[];
  projects: string[];
  types: string[];
}
