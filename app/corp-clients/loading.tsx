import { Skeleton } from "@/components/ui/skeleton"

export default function CorpClientsLoading() {
  return (
    <div className="container py-8">
      {/* Hero skeleton */}
      <Skeleton className="w-full h-[300px] md:h-[400px] mb-8" />

      {/* Benefits section skeleton */}
      <div className="mb-12">
        <Skeleton className="h-10 w-[300px] mx-auto mb-4" />
        <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-6 border rounded-lg">
              <Skeleton className="h-10 w-10 mb-4" />
              <Skeleton className="h-6 w-[200px] mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>

      {/* Services section skeleton */}
      <div className="mb-12">
        <Skeleton className="h-10 w-[300px] mx-auto mb-4" />
        <Skeleton className="h-6 w-full max-w-3xl mx-auto mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 p-6 border rounded-lg">
              <Skeleton className="w-full md:w-1/2 h-[200px] rounded-lg" />
              <div className="w-full md:w-1/2">
                <Skeleton className="h-6 w-[200px] mb-3" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-10 w-[120px]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <Skeleton className="h-8 w-[250px] mb-4" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-full mb-6" />

          <div className="space-y-4 mb-6">
            <div className="flex">
              <Skeleton className="h-5 w-5 mr-3" />
              <div className="flex-1">
                <Skeleton className="h-5 w-[100px] mb-1" />
                <Skeleton className="h-4 w-[150px] mb-1" />
                <Skeleton className="h-3 w-[120px]" />
              </div>
            </div>
            <div className="flex">
              <Skeleton className="h-5 w-5 mr-3" />
              <div className="flex-1">
                <Skeleton className="h-5 w-[100px] mb-1" />
                <Skeleton className="h-4 w-[150px] mb-1" />
                <Skeleton className="h-3 w-[120px]" />
              </div>
            </div>
          </div>
        </div>

        <Skeleton className="h-[400px] rounded-lg" />
      </div>
    </div>
  )
}
