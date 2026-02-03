import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatItem {
  id: string;
  label: string;
  value: number;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  trend?: string;
  trendColor?: string;
}

interface StatCardProps {
  stat: StatItem;
  className?: string;
}

export function StatCard({ stat, className }: StatCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border border-border bg-muted/30 shadow-sm hover:border-primary/40 transition-all duration-200",
        className
      )}
    >
      <CardContent className="pt-6 space-y-4">
        {/* Icon and value */}
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
              stat.iconBg || "bg-primary/10"
            )}
          >
            <stat.icon
              className={cn("h-5 w-5", stat.iconColor || "text-primary")}
              strokeWidth={2}
            />
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold tabular-nums tracking-tight text-foreground">
              {stat.value}
            </p>
          </div>
        </div>

        {/* Label */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-primary leading-tight">{stat.label}</h3>

          {/* Trend indicator */}
          {stat.trend && (
            <p className={cn("text-xs font-medium", stat.trendColor || "text-muted-foreground")}>
              {stat.trend}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatsGrid({ stats, columns, className }: StatsGridProps) {
  const cols = columns || (Math.min(stats.length, 4) as 2 | 3 | 4);
  const gridCols: Record<2 | 3 | 4, string> = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4 sm:gap-6 grid-cols-1", gridCols[cols], className)}>
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
