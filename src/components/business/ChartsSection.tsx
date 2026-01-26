import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ChartWrapper } from '@/components/charts/ChartWrapper';
import { ThroughputDataPoint, CycleTimeDataPoint, DistributionItem } from '@/types/metrics';
import { useTheme } from '@/contexts/ThemeContext';

interface ChartsSectionProps {
  throughputTrend: ThroughputDataPoint[];
  cycleTimeTrend: CycleTimeDataPoint[];
  distributionByType: DistributionItem[];
}

export const ChartsSection = ({
  throughputTrend,
  cycleTimeTrend,
  distributionByType,
}: ChartsSectionProps) => {
  const { theme } = useTheme();
  
  const axisColor = theme === 'dark' ? 'hsl(0, 0%, 60%)' : 'hsl(0, 0%, 45%)';
  const gridColor = theme === 'dark' ? 'hsl(0, 3%, 22%)' : 'hsl(0, 0%, 90%)';

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ChartWrapper title="Throughput (últimos 6 meses)">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={throughputTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis 
                dataKey="period" 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? 'hsl(0, 3%, 14%)' : 'white',
                  border: `1px solid ${gridColor}`,
                  borderRadius: '8px',
                }}
                labelStyle={{ color: theme === 'dark' ? 'white' : 'hsl(0, 4%, 10%)' }}
              />
              <Bar dataKey="count" fill="hsl(333, 100%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartWrapper>

      <ChartWrapper title="Cycle Time Médio (últimos 6 meses)">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cycleTimeTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis 
                dataKey="period" 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: gridColor }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? 'hsl(0, 3%, 14%)' : 'white',
                  border: `1px solid ${gridColor}`,
                  borderRadius: '8px',
                }}
                labelStyle={{ color: theme === 'dark' ? 'white' : 'hsl(0, 4%, 10%)' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(333, 100%, 50%)"
                strokeWidth={2}
                dot={{ fill: 'hsl(333, 100%, 50%)', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: 'hsl(333, 100%, 50%)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartWrapper>

      <ChartWrapper 
        title="Distribuição por Tipo"
        legend={
          <div className="flex flex-wrap gap-4">
            {distributionByType.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        }
      >
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionByType}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {distributionByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? 'hsl(0, 3%, 14%)' : 'white',
                  border: `1px solid ${gridColor}`,
                  borderRadius: '8px',
                }}
                labelStyle={{ color: theme === 'dark' ? 'white' : 'hsl(0, 4%, 10%)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartWrapper>
    </div>
  );
};
