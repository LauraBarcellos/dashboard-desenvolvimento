import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Loading state for edit cliente page
 * Follows design system: uses PageHeader, consistent spacing, premium layout
 */
export default function EditClienteLoading() {
  return (
    <>
      <PageHeader
        title="Editar Cliente"
        description={<Skeleton className="h-5 w-[300px] mt-2" />}
        breadcrumbs={[
          { label: 'Clientes', href: '/clientes' },
          { label: 'Editar' },
        ]}
        showBackButton
      />

      <div className="p-4 sm:p-6 animate-in fade-in duration-500">
        <Card className="border-border bg-muted/30 shadow-sm">
          <CardContent className="pt-6 space-y-6">
            {/* Form sections skeleton */}
            {Array.from({ length: 4 }).map((_, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-9 w-9 rounded-lg" />
                  <Skeleton className="h-6 w-[180px]" />
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {Array.from({ length: sectionIndex === 0 ? 2 : 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-11 w-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Actions skeleton */}
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-10 w-[120px]" />
              <Skeleton className="h-10 w-[140px]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
