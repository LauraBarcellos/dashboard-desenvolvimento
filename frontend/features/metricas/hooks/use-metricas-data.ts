import {
  differenceInDays,
  differenceInCalendarDays,
  startOfDay,
  startOfWeek,
  startOfMonth,
  format,
  addDays,
  addWeeks,
  addMonths,
  isWithinInterval,
  isBefore,
  isAfter,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import type {
  WorkItem,
  MetricasFilters,
  MetricasKPIs,
  ChartDataPoint,
  Granularidade,
} from "../types";
import { WORK_ITEM_STATUS_FINAIS } from "../constants";

export function filterWorkItems(items: WorkItem[], filters: MetricasFilters): WorkItem[] {
  return items.filter((item) => {
    // Date filter: item must have been created before range end AND
    // (not concluded OR concluded after range start)
    const { from, to } = filters.dateRange;
    const createdBeforeEnd = !isAfter(startOfDay(item.dataCriacao), to);
    const relevantInRange =
      !item.dataConclusao || !isBefore(startOfDay(item.dataConclusao), from);
    if (!createdBeforeEnd || !relevantInRange) return false;

    // Type filter
    if (filters.tipos.length > 0 && !filters.tipos.includes(item.tipo)) return false;

    // Project filter
    if (filters.projetos.length > 0 && !filters.projetos.includes(item.projeto)) return false;

    return true;
  });
}

export function calculateKPIs(items: WorkItem[], dateRange: MetricasFilters["dateRange"]): MetricasKPIs {
  const hoje = new Date();

  // Items concluded within the date range
  const concluidos = items.filter(
    (i) =>
      WORK_ITEM_STATUS_FINAIS.includes(i.status) &&
      i.dataConclusao &&
      isWithinInterval(startOfDay(i.dataConclusao), { start: dateRange.from, end: dateRange.to }),
  );

  // Cycle time: average days from dataInicio to dataConclusao
  const comCiclo = concluidos.filter((i) => i.dataInicio && i.dataConclusao);
  const cycleTime =
    comCiclo.length > 0
      ? comCiclo.reduce((sum, i) => sum + differenceInDays(i.dataConclusao!, i.dataInicio!), 0) /
        comCiclo.length
      : 0;

  // Vazão: count of concluded items
  const vazao = concluidos.length;

  // Bugs
  const bugs = items.filter((i) => i.tipo === "Bug");
  const bugsAbertos = bugs.filter((i) => !WORK_ITEM_STATUS_FINAIS.includes(i.status)).length;
  const bugsEncerrados = bugs.filter(
    (i) =>
      WORK_ITEM_STATUS_FINAIS.includes(i.status) &&
      i.dataConclusao &&
      isWithinInterval(startOfDay(i.dataConclusao), { start: dateRange.from, end: dateRange.to }),
  ).length;

  // Aging: average age of open items
  const abertos = items.filter((i) => !WORK_ITEM_STATUS_FINAIS.includes(i.status));
  const aging =
    abertos.length > 0
      ? abertos.reduce((sum, i) => sum + differenceInCalendarDays(hoje, i.dataCriacao), 0) /
        abertos.length
      : 0;

  return {
    cycleTime: Math.round(cycleTime * 10) / 10,
    vazao,
    bugsAbertos,
    bugsEncerrados,
    aging: Math.round(aging * 10) / 10,
  };
}

export function getGranularidade(dateRange: MetricasFilters["dateRange"]): Granularidade {
  const days = differenceInCalendarDays(dateRange.to, dateRange.from);
  if (days <= 30) return "diario";
  if (days <= 90) return "semanal";
  return "mensal";
}

export function buildChartData(
  items: WorkItem[],
  dateRange: MetricasFilters["dateRange"],
): ChartDataPoint[] {
  const granularidade = getGranularidade(dateRange);
  const buckets = new Map<string, number>();

  // Generate all period buckets
  let current = dateRange.from;
  const end = dateRange.to;

  while (!isAfter(current, end)) {
    const key = formatBucketKey(current, granularidade);
    buckets.set(key, 0);

    if (granularidade === "diario") current = addDays(current, 1);
    else if (granularidade === "semanal") current = addWeeks(current, 1);
    else current = addMonths(current, 1);
  }

  // Count items per bucket based on dataCriacao
  for (const item of items) {
    const key = formatBucketKey(item.dataCriacao, granularidade);
    if (buckets.has(key)) {
      buckets.set(key, buckets.get(key)! + 1);
    }
  }

  return Array.from(buckets.entries()).map(([periodo, quantidade]) => ({
    periodo,
    quantidade,
  }));
}

function formatBucketKey(date: Date, granularidade: Granularidade): string {
  switch (granularidade) {
    case "diario":
      return format(date, "dd/MM", { locale: ptBR });
    case "semanal":
      return format(startOfWeek(date, { locale: ptBR }), "dd/MM", { locale: ptBR });
    case "mensal":
      return format(startOfMonth(date), "MMM/yy", { locale: ptBR });
  }
}
