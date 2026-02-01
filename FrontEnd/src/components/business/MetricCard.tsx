import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  description?: string;
  onClick?: () => void;
}

export const MetricCard = ({
  title,
  value,
  unit,
  trend,
  description,
  onClick,
}: MetricCardProps) => {
  const isPositive = trend ? trend > 0 : false;
  const isNeutral = trend === 0;

  return (
    <Card 
      className={cn(
        "transition-all duration-200", 
        onClick && "cursor-pointer hover:border-primary/50 hover:bg-accent/50"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          {unit && <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>}
        </div>
        
        {(trend !== undefined || description) && (
          <div className="mt-1 flex items-center text-xs">
            {trend !== undefined && !isNeutral && (
              <span className={cn(
                "mr-1 flex items-center font-medium",
                isPositive ? "text-destructive" : "text-emerald-500"
              )}>
                {isPositive ? <ArrowUpIcon className="mr-0.5 h-3 w-3" /> : <ArrowDownIcon className="mr-0.5 h-3 w-3" />}
                {Math.abs(trend)}%
              </span>
            )}
            <span className="text-muted-foreground">{description}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};