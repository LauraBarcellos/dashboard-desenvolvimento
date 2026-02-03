export type WorkItemTipo = "Bug" | "Task" | "Story" | "Epic";

export type WorkItemStatus = "Aberto" | "Em Progresso" | "Done" | "Closed";

export interface WorkItem {
  id: string;
  titulo: string;
  tipo: WorkItemTipo;
  status: WorkItemStatus;
  projeto: string;
  dataCriacao: Date;
  dataInicio?: Date;
  dataConclusao?: Date;
}

export interface MetricasFilters {
  dateRange: { from: Date; to: Date };
  tipos: WorkItemTipo[];
  projetos: string[];
}

export interface MetricasKPIs {
  cycleTime: number;
  vazao: number;
  bugsAbertos: number;
  bugsEncerrados: number;
  aging: number;
}

export interface ChartDataPoint {
  periodo: string;
  quantidade: number;
}

export type Granularidade = "diario" | "semanal" | "mensal";
