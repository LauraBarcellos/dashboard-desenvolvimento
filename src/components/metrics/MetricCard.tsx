import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: number | string;
  unit: string;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const MetricCard = ({
  title,
  value,
  unit,
  icon,
  onClick,
  className,
}: MetricCardProps) => {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-colors hover:border-primary/50',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="metric-label">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className="metric-value">{value}</span>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
          {icon && (
            <div className="text-muted-foreground">{icon}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
