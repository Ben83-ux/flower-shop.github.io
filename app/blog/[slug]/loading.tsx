import { Skeleton } from "@/components/ui/skeleton"

export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Навигация */}
      <div className="mb-6">
        <Skeleton className="h-6 w-40" />
      </div>

      {/* Заголовок статьи */}
      <div className="max-w-4xl mx-auto mb-8">
        <Skeleton className="h-6 w-24 mb-4" />
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-2/3 mb-6" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center">
            <Skeleton className="h-12 w-12 rounded-full mr-3" />
            <div>
              <Skeleton className="h-5 w-40 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </div>

      {/* Изображение статьи */}
      <div className="max-w-5xl mx-auto mb-10">
        <Skeleton className="h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-xl" />
      </div>

      {/* Содержимое статьи */}
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 md:gap-8">
          {/* Боковая панель с действиями */}
          <div className="hidden md:flex flex-col items-center space-y-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          {/* Текст статьи */}
          <div className="flex-1 space-y-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-8 w-1/2 my-4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-8 w-1/2 my-4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />
          </div>
        </div>

        {/* Теги */}
        <div className="mt-8 mb-12">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((tag) => (
              <Skeleton key={tag} className="h-8 w-24 rounded-full" />
            ))}
          </div>
        </div>

        {/* Автор */}
        <Skeleton className="h-40 w-full rounded-xl mb-12" />

        {/* Похожие статьи */}
        <div className="mb-12">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((post) => (
              <Skeleton key={post} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        </div>

        {/* Комментарии */}
        <div className="mb-12">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-6">
            {[1, 2, 3].map((comment) => (
              <div key={comment} className="border-b pb-6">
                <div className="flex items-start mb-2">
                  <Skeleton className="h-10 w-10 rounded-full mr-3" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-full mt-1" />
                <Skeleton className="h-4 w-2/3 mt-1" />
              </div>
            ))}
          </div>

          {/* Форма комментария */}
          <div className="mt-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-32 w-full mb-4 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
