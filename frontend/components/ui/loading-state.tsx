import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

/**
 * Standardized loading state component
 * Follows design system: consistent spacing, primary color, centered layout
 */
export function LoadingState({ message = 'Carregando...', className }: LoadingStateProps) {
  return (
    <Card className={`border-border bg-muted/30 shadow-sm ${className || ''}`}>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}

