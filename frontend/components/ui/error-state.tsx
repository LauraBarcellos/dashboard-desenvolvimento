import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: string;
  retry?: () => void;
  className?: string;
}

/**
 * Standardized error state component
 * Follows design system: consistent spacing, destructive color, centered layout
 */
export function ErrorState({ 
  title = 'Algo deu errado',
  message,
  error,
  retry,
  className 
}: ErrorStateProps) {
  const displayMessage = error || message || 'Ocorreu um erro inesperado. Por favor, tente novamente.';

  return (
    <Card className={`border-destructive/50 bg-muted/30 shadow-sm ${className || ''}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-destructive/10 p-6 mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 max-w-md">
          {displayMessage}
        </p>
        {retry && (
          <Button onClick={retry} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Tentar Novamente
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

