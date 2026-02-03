import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/page-header';
import { ClienteTableSkeleton } from '@/features/clientes/components/cliente-skeleton';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Loading state for clientes page
 * Follows design system: uses PageHeader, consistent spacing, premium layout
 */
export default function ClientesLoading() {
  return (
    <>
      <PageHeader
        title="Clientes"
        description="Gerencie todos os clientes do sistema com segurança e precisão"
        actions={
          <Skeleton className="h-10 w-[140px]" />
        }
      />

      <div className="w-full max-w-full p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in fade-in duration-500 overflow-x-hidden">
        {/* Stats skeleton */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="border-border bg-muted/30 shadow-sm">
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters skeleton */}
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
          <Card className="border-border bg-muted/30 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-11 flex-1" />
                <Skeleton className="h-11 w-[180px]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Table skeleton */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          <ClienteTableSkeleton />
        </div>
      </div>
    </>
  );
}
