"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartDataPoint, Granularidade } from "../types";

const chartConfig = {
  quantidade: {
    label: "Itens",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const GRANULARIDADE_LABELS: Record<Granularidade, string> = {
  diario: "Diário",
  semanal: "Semanal",
  mensal: "Mensal",
};

interface MetricasBarChartProps {
  data: ChartDataPoint[];
  granularidade: Granularidade;
}

export function MetricasBarChart({ data, granularidade }: MetricasBarChartProps) {
  const hasData = data.some((d) => d.quantidade > 0);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Itens de Trabalho por Período
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            ({GRANULARIDADE_LABELS[granularidade]})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!hasData ? (
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            Sem dados no período selecionado
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="periodo"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-xs"
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="quantidade" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
