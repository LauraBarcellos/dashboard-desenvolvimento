import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: 'default' | 'filtered';
  className?: string;
}

/**
 * Standardized empty state component
 * Follows design system: consistent spacing, primary color, centered layout
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = 'default',
  className,
}: EmptyStateProps) {
  const isFiltered = variant === 'filtered';
  const borderColor = isFiltered ? 'border-warning/30' : 'border-primary/30';
  const bgColor = isFiltered ? 'bg-warning/10' : 'bg-primary/10';
  const iconColor = isFiltered ? 'text-warning' : 'text-primary';

  const buttonContent = action && (
    <Button 
      asChild={!!action.href}
      onClick={action.onClick}
      size="lg" 
      className="shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
    >
      {action.href ? (
        <Link href={action.href}>{action.label}</Link>
      ) : (
        <span>{action.label}</span>
      )}
    </Button>
  );

  return (
    <Card className={cn(
      'relative overflow-hidden border-dashed bg-card shadow-lg',
      borderColor,
      className
    )}>
      <CardContent className="relative flex flex-col items-center justify-center py-12 px-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className={cn(
          'group flex h-20 w-20 items-center justify-center rounded-2xl border-2 mb-6 shadow-md transition-all duration-300 hover:scale-110',
          bgColor,
          borderColor
        )}>
          <Icon className={cn('h-10 w-10 transition-all duration-300 group-hover:scale-110', iconColor)} strokeWidth={2.5} />
        </div>
        <div className="space-y-3 mb-6">
          <h3 className="text-2xl font-bold text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            {description}
          </p>
        </div>
        {buttonContent}
      </CardContent>
    </Card>
  );
}

