import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

/**
 * Timeline loading skeleton
 * Matches the structure of TimelineEventItem
 */
export function TimelineEventSkeleton() {
  return (
    <div className="relative flex gap-4 pb-8">
      {/* Timeline line */}
      <div className="relative flex flex-col items-center">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="h-full w-px bg-border mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <Skeleton className="h-4 w-[100px]" />
        </div>
        <Card className="p-4 mt-2">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </Card>
      </div>
    </div>
  );
}

/**
 * Timeline list skeleton
 * Shows 5 event skeletons by default
 */
export function TimelineListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-0">
      {Array.from({ length: count }).map((_, i) => (
        <TimelineEventSkeleton key={i} />
      ))}
    </div>
  );
}
