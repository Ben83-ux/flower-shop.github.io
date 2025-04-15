import { Skeleton } from "@/components/ui/skeleton"
import { Bell, Filter, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsLoading() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold flex items-center">
          <Bell className="mr-2 h-6 w-6" />
          Уведомления
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Check className="h-4 w-4 mr-2" />
            Отметить все как прочитанные
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <div className="px-4 pt-4">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1" disabled>
                  Все
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1" disabled>
                  Непрочитанные
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex-1" disabled>
                  Заказы
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex-1" disabled>
                  Сообщения
                </TabsTrigger>
                <TabsTrigger value="system" className="flex-1" disabled>
                  Система
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto p-4 m-0 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <Skeleton className="h-5 w-5 mr-4" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <Skeleton className="h-4 w-48 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-3 w-full mb-2" />
                      <div className="flex justify-end">
                        <Skeleton className="h-7 w-40" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs>
        </div>

        <div className="w-80 border-l p-4 overflow-y-auto">
          <Skeleton className="h-6 w-48 mb-4" />

          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-32 mb-2" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-10 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-5 w-10 rounded-full" />
                  </div>
                </div>
                {i < 5 && <Skeleton className="h-px w-full my-3" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
