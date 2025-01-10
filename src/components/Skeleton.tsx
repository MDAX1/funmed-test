import { cn } from '../lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200 dark:bg-gray-700",
        className
      )}
    />
  );
}

export function AssetCardSkeleton() {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-4">
        <Skeleton className="h-5 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}

export function AssetGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <AssetCardSkeleton key={index} />
      ))}
    </div>
  );
}
