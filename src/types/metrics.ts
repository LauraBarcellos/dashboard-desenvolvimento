export interface WorkItem {
  id: string;
  title: string;
  status: string;
  type: string;
  project: string;
  startDate?: string;
  endDate?: string;
}

export interface MetricData {
  value: string | number;
  unit: string;
  trend?: number;
  items: WorkItem[];
}

export interface Filters {
  startDate: Date | null;
  endDate: Date | null;
  project: string | null;
  type: string | null;
  status: string | null;
}

export interface ChartDataPoint {
  period: string;
  value: number;
}

export interface TypeDistribution {
  name: string;
  value: number;
  color: string;
}

export interface DashboardMetrics {
  leadTime: MetricData;
  cycleTime: MetricData;
  throughput: MetricData;
  aging: MetricData;
  throughputTrend: ChartDataPoint[];
  cycleTimeTrend: ChartDataPoint[];
  distributionByType: TypeDistribution[];
  projects: string[];
  types: string[];
}