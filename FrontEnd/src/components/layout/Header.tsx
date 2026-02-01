import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { BarChart3 } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold tracking-tight">
            Dev Metrics
          </h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};
