import { Skeleton } from "@/components/ui/skeleton"

export default function CareLoading() {
  return (
    <div className="container py-8 md:py-12">
      {/* Hero skeleton */}
      <Skeleton className="w-full h-64 md:h-80 lg:h-96 mb-8 md:mb-12 rounded-lg" />

      {/* Content skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Skeleton className="w-full h-24" />

          {/* Care instructions skeletons */}
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="w-full h-32 rounded-lg" />
            ))}

          <Skeleton className="w-full h-64 rounded-lg" />
          <Skeleton className="w-full h-48 rounded-lg" />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Skeleton className="w-full h-96 rounded-lg" />
          <Skeleton className="w-full h-64 rounded-lg" />
          <Skeleton className="w-full h-48 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
