import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';

/**
 * Loading state for cliente detail page
 * Follows design system: uses PageHeader, consistent spacing, premium layout
 */
export default function ClienteDetailLoading() {
  return (
    <>
      <PageHeader
        title={<Skeleton className="h-8 w-[200px]" />}
        description={<Skeleton className="h-5 w-[300px] mt-2" />}
        actions={
          <div className="flex gap-2">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        }
        showBackButton
      />

      <div className="p-4 sm:p-6 animate-in fade-in duration-500">
        <Card className="w-full max-w-full border-border bg-card shadow-md overflow-hidden">
          {/* Tabs skeleton */}
          <div className="border-b border-border bg-muted/30 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-6">
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          {/* Content skeleton */}
          <div className="p-4 sm:p-6 space-y-6">
            <Card className="border-border bg-muted/30 shadow-sm">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-7 w-[200px]" />
                  <Skeleton className="h-8 w-[100px]" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-4 rounded-lg bg-muted/30 border border-border">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Card>
      </div>
    </>
  );
}
