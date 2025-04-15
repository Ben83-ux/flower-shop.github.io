import { Skeleton } from "@/components/ui/skeleton"
import { MessageSquare, Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MessagesLoading() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageSquare className="mr-2 h-6 w-6" />
          Сообщения
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Левая панель с чатами */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Поиск сообщений..." className="pl-8" disabled />
            </div>
          </div>

          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <div className="px-3 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1" disabled>
                  Все
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1" disabled>
                  Непрочитанные
                </TabsTrigger>
                <TabsTrigger value="starred" className="flex-1" disabled>
                  Избранные
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-3 flex items-start">
                    <Skeleton className="h-10 w-10 rounded-full mr-3" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-3 w-8" />
                      </div>
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Tabs>
        </div>

        {/* Правая панель с активным чатом */}
        <div className="flex-1 flex flex-col">
          {/* Заголовок чата */}
          <div className="p-3 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Skeleton className="h-9 w-9 rounded-full mr-3" />
              <div>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex justify-start">
              <Skeleton className="h-20 w-2/3 rounded-lg" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-16 w-2/3 rounded-lg" />
            </div>
            <div className="flex justify-start">
              <Skeleton className="h-12 w-1/2 rounded-lg" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-24 w-2/3 rounded-lg" />
            </div>
          </div>

          {/* Форма отправки сообщения */}
          <div className="p-3 border-t">
            <div className="flex items-end space-x-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="flex-1 h-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
