import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Заголовок блога */}
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-3/4 md:w-1/2 mx-auto mb-4" />
        <Skeleton className="h-4 w-full md:w-2/3 mx-auto" />
        <Skeleton className="h-4 w-full md:w-1/2 mx-auto mt-2" />
      </div>

      {/* Фильтр по категориям */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 md:space-x-4 min-w-max pb-2">
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-10 w-24 rounded-full" />
            ))}
        </div>
      </div>

      {/* Популярная статья */}
      <div className="mb-12">
        <div className="relative rounded-xl overflow-hidden">
          <Skeleton className="h-[300px] md:h-[400px] lg:h-[500px] w-full" />
        </div>
      </div>

      {/* Список статей */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md">
              <Skeleton className="h-48 md:h-56 w-full" />
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <Skeleton className="h-4 w-20 mr-4" />
                  <Skeleton className="h-4 w-24 mr-4" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4 mt-1" />
                <Skeleton className="h-4 w-1/2 mt-1" />
              </div>
            </div>
          ))}
      </div>

      {/* Пагинация */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center space-x-2">
          {Array(7)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} className="h-10 w-10 rounded-md" />
            ))}
        </div>
      </div>

      {/* Подписка на блог */}
      <div className="mt-16 bg-gray-50 rounded-xl p-6 md:p-8">
        <div className="max-w-3xl mx-auto text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-full md:w-3/4 mx-auto mb-2" />
          <Skeleton className="h-4 w-full md:w-1/2 mx-auto mb-6" />
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Skeleton className="h-12 flex-grow rounded-lg" />
            <Skeleton className="h-12 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
