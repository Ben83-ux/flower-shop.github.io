import { Skeleton } from "@/components/ui/skeleton"
import { Truck, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectTrigger } from "@/components/ui/select"

export default function DeliveryLoading() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold flex items-center">
          <Truck className="mr-2 h-6 w-6" />
          Доставка
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
          <Button disabled>Назначить курьера</Button>
        </div>
      </div>

      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              type="search"
              placeholder="Поиск по номеру заказа, адресу или клиенту..."
              className="pl-8"
              disabled
            />
          </div>
          <div className="w-[200px]">
            <Select disabled>
              <SelectTrigger>
                <Skeleton className="h-4 w-24" />
              </SelectTrigger>
            </Select>
          </div>
          <div className="w-[200px]">
            <Select disabled>
              <SelectTrigger>
                <Skeleton className="h-4 w-24" />
              </SelectTrigger>
            </Select>
          </div>
          <div className="w-[200px]">
            <Select disabled>
              <SelectTrigger>
                <Skeleton className="h-4 w-24" />
              </SelectTrigger>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1" disabled>
              Все доставки
              <Skeleton className="ml-2 h-5 w-6 rounded-full" />
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex-1" disabled>
              Ожидают
              <Skeleton className="ml-2 h-5 w-6 rounded-full" />
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="flex-1" disabled>
              В пути
              <Skeleton className="ml-2 h-5 w-6 rounded-full" />
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1" disabled>
              Доставлены
              <Skeleton className="ml-2 h-5 w-6 rounded-full" />
            </TabsTrigger>
            <TabsTrigger value="issues" className="flex-1" disabled>
              Проблемы
              <Skeleton className="ml-2 h-5 w-6 rounded-full" />
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto p-4 m-0 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-6 w-24 rounded-full" />
                  </div>

                  <div className="mt-3">
                    <Skeleton className="h-4 w-full max-w-md mb-2" />
                    <Skeleton className="h-3 w-3/4 max-w-sm" />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 md:w-64">
                  <Skeleton className="h-5 w-16 mb-2" />
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-2" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col space-y-2">
                    <Skeleton className="h-9 w-full rounded-md" />
                    <Skeleton className="h-9 w-full rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
