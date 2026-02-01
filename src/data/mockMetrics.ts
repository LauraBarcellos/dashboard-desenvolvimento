import { DashboardMetrics } from '@/types/metrics';

export const MOCK_DASHBOARD_METRICS: DashboardMetrics = {
  leadTime: {
    value: '3.4',
    unit: 'days',
    trend: -0.2,
    items: [
      { id: 'WI-100', title: 'Fix login bug', status: 'Done', type: 'Bug', project: 'devsight', startDate: '2026-01-10', endDate: '2026-01-13' },
      { id: 'WI-101', title: 'Implement search', status: 'In Progress', type: 'Feature', project: 'devsight', startDate: '2026-01-11' }
    ]
  },
  cycleTime: {
    value: '1.8',
    unit: 'days',
    trend: 0.1,
    items: [
      { id: 'WI-200', title: 'Refactor API', status: 'Done', type: 'Task', project: 'devsight', startDate: '2026-01-12', endDate: '2026-01-13' }
    ]
  },
  throughput: {
    value: 24,
    unit: 'items/mo',
    items: [
      { id: 'WI-300', title: 'Add analytics', status: 'Done', type: 'Task', project: 'devsight' }
    ]
  },
  aging: {
    value: 5,
    unit: 'days',
    items: [
      { id: 'WI-400', title: 'Investigate SLO', status: 'To Do', type: 'Task', project: 'devsight', startDate: '2026-01-20' }
    ]
  },
  throughputTrend: [
    { period: '2025-11', value: 20 },
    { period: '2025-12', value: 22 },
    { period: '2026-01', value: 24 }
  ],
  cycleTimeTrend: [
    { period: '2025-11', value: 2.1 },
    { period: '2025-12', value: 2.0 },
    { period: '2026-01', value: 1.8 }
  ],
  distributionByType: [
    { name: 'Feature', value: 12, color: '#4F46E5' },
    { name: 'Bug', value: 8, color: '#EA580C' },
    { name: 'Task', value: 4, color: '#059669' }
  ],
  projects: ['devsight'],
  types: ['Feature', 'Bug', 'Task']
};
