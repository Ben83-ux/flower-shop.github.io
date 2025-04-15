export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 h-64 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>

      <div className="h-8 w-96 bg-gray-200 animate-pulse rounded"></div>

      <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
    </div>
  )
}
