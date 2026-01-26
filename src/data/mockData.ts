import { WorkItem } from '@/types/metrics';

const projects = ['Portal Web', 'Mobile App', 'API Gateway', 'Analytics'];
const types: WorkItem['type'][] = ['feature', 'bug', 'task', 'improvement'];
const statuses: WorkItem['status'][] = ['backlog', 'active', 'resolved', 'closed'];

const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
};

const generateWorkItem = (id: number): WorkItem => {
  const createdDate = new Date(2024, 9, 1);
  const endDate = new Date(2025, 0, 26);
  
  const created = randomDate(createdDate, endDate);
  const createdTime = new Date(created).getTime();
  
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  let activatedDate: string | null = null;
  let resolvedDate: string | null = null;
  let closedDate: string | null = null;
  
  if (status !== 'backlog') {
    activatedDate = randomDate(new Date(createdTime), new Date(createdTime + 3 * 24 * 60 * 60 * 1000));
    
    if (status === 'resolved' || status === 'closed') {
      const activatedTime = new Date(activatedDate).getTime();
      resolvedDate = randomDate(new Date(activatedTime), new Date(activatedTime + 7 * 24 * 60 * 60 * 1000));
      
      if (status === 'closed') {
        const resolvedTime = new Date(resolvedDate).getTime();
        closedDate = randomDate(new Date(resolvedTime), new Date(resolvedTime + 2 * 24 * 60 * 60 * 1000));
      }
    }
  }
  
  return {
    id: `ITEM-${id.toString().padStart(4, '0')}`,
    title: `Work Item ${id}`,
    type: types[Math.floor(Math.random() * types.length)],
    project: projects[Math.floor(Math.random() * projects.length)],
    status,
    createdDate: created,
    activatedDate,
    resolvedDate,
    closedDate,
  };
};

export const mockWorkItems: WorkItem[] = Array.from({ length: 150 }, (_, i) => generateWorkItem(i + 1));

export const availableProjects = projects;
export const availableTypes = types;
export const availableStatuses = statuses;
