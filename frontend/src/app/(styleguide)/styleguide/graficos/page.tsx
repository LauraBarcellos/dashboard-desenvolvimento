"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

const barChartConfig = {
  itens: {
    label: "Itens",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const lineChartConfig = {
  bugs: {
    label: "Bugs",
    color: "var(--chart-3)",
  },
  tasks: {
    label: "Tasks",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const demoBarData = [
  { periodo: "01/01", itens: 5 },
  { periodo: "08/01", itens: 12 },
  { periodo: "15/01", itens: 8 },
  { periodo: "22/01", itens: 15 },
  { periodo: "29/01", itens: 10 },
];

const demoLineData = [
  { periodo: "Sem 1", bugs: 3, tasks: 7 },
  { periodo: "Sem 2", bugs: 5, tasks: 10 },
  { periodo: "Sem 3", bugs: 2, tasks: 8 },
  { periodo: "Sem 4", bugs: 4, tasks: 12 },
];

export default function GraficosStyleguidePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 0, 31),
  });

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Gráficos & Data Pickers</h1>
        <p className="mt-1 text-muted-foreground">
          Componentes de visualização de dados e seleção de datas.
        </p>
      </div>

      {/* Bar Chart */}
      <ShowcaseSection
        title="Gráfico de Barras"
        description="ChartContainer + BarChart (Recharts). Usa tokens --chart-1..5 para cores."
      >
        <ChartContainer config={barChartConfig} className="h-[250px] w-full">
          <BarChart data={demoBarData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="periodo" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="itens" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </ShowcaseSection>

      {/* Line Chart */}
      <ShowcaseSection
        title="Gráfico de Linhas"
        description="ChartContainer + LineChart com múltiplas séries."
      >
        <ChartContainer config={lineChartConfig} className="h-[250px] w-full">
          <LineChart data={demoLineData} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="periodo" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="bugs" stroke="var(--chart-3)" strokeWidth={2} />
            <Line type="monotone" dataKey="tasks" stroke="var(--chart-2)" strokeWidth={2} />
          </LineChart>
        </ChartContainer>
      </ShowcaseSection>

      {/* Calendar */}
      <ShowcaseSection
        title="Calendar"
        description="Componente de calendário (react-day-picker). Suporta seleção única e range."
      >
        <div className="flex flex-wrap gap-8">
          <div className="space-y-2">
            <p className="text-sm font-medium">Seleção única</p>
            <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Seleção de intervalo</p>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              locale={ptBR}
              numberOfMonths={2}
            />
          </div>
        </div>
      </ShowcaseSection>

      {/* Popover + Date Picker */}
      <ShowcaseSection
        title="Popover"
        description="Container flutuante (Radix). Exemplo: date picker em popover."
      >
        <div className="flex flex-wrap gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={setDate} locale={ptBR} />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="h-4 w-4" />
                {dateRange?.from && dateRange?.to
                  ? `${format(dateRange.from, "dd/MM", { locale: ptBR })} — ${format(dateRange.to, "dd/MM", { locale: ptBR })}`
                  : "Selecionar intervalo"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                locale={ptBR}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </ShowcaseSection>
    </>
  );
}
