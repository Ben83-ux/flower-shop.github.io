import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="space-y-8">
        <Skeleton className="h-12 w-full" />

        <div className="space-y-6">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}
