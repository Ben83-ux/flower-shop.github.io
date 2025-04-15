import type { Metadata } from "next"
import {
  Truck,
  Search,
  Filter,
  MapPin,
  Calendar,
  Clock,
  Package,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Доставка | Личный кабинет менеджера",
  description: "Управление доставками заказов",
}

interface DeliveryItem {
  id: string
  orderId: string
  customer: {
    name: string
    phone: string
    avatar?: string
  }
  address: string
  date: string
  time: string
  status: "pending" | "in_progress" | "completed" | "failed" | "canceled"
  courier?: {
    name: string
    phone: string
    avatar?: string
  }
  items: number
  price: number
  paymentStatus: "paid" | "unpaid" | "cash_on_delivery"
  priority: "normal" | "high" | "express"
  notes?: string
}

export default function DeliveryPage() {
  // Моковые данные для доставок
  const deliveries: DeliveryItem[] = [
    {
      id: "d1",
      orderId: "1234",
      customer: {
        name: "Анна Смирнова",
        phone: "+7 (901) 123-45-67",
      },
      address: "ул. Ленина, 42, кв. 56",
      date: "30.05.2023",
      time: "12:00 - 14:00",
      status: "pending",
      items: 1,
      price: 3500,
      paymentStatus: "paid",
      priority: "normal",
    },
    {
      id: "d2",
      orderId: "1235",
      customer: {
        name: "Иван Петров",
        phone: "+7 (902) 234-56-78",
      },
      address: "ул. Пушкина, 10, кв. 23",
      date: "30.05.2023",
      time: "14:00 - 16:00",
      status: "in_progress",
      courier: {
        name: "Алексей Иванов",
        phone: "+7 (999) 111-22-33",
      },
      items: 2,
      price: 5200,
      paymentStatus: "unpaid",
      priority: "high",
      notes: "Домофон не работает, позвонить по телефону",
    },
    {
      id: "d3",
      orderId: "1236",
      customer: {
        name: "Елена Сидорова",
        phone: "+7 (903) 345-67-89",
      },
      address: "пр. Мира, 78, кв. 45",
      date: "30.05.2023",
      time: "16:00 - 18:00",
      status: "completed",
      courier: {
        name: "Дмитрий Соколов",
        phone: "+7 (999) 222-33-44",
      },
      items: 1,
      price: 4800,
      paymentStatus: "paid",
      priority: "express",
    },
    {
      id: "d4",
      orderId: "1237",
      customer: {
        name: "Ольга Николаева",
        phone: "+7 (904) 456-78-90",
      },
      address: "ул. Гагарина, 15, кв. 78",
      date: "30.05.2023",
      time: "18:00 - 20:00",
      status: "failed",
      courier: {
        name: "Алексей Иванов",
        phone: "+7 (999) 111-22-33",
      },
      items: 3,
      price: 7200,
      paymentStatus: "cash_on_delivery",
      priority: "normal",
      notes: "Клиент не открыл дверь",
    },
    {
      id: "d5",
      orderId: "1238",
      customer: {
        name: "Дмитрий Козлов",
        phone: "+7 (905) 567-89-01",
      },
      address: "ул. Советская, 22, кв. 10",
      date: "31.05.2023",
      time: "10:00 - 12:00",
      status: "pending",
      items: 2,
      price: 6100,
      paymentStatus: "paid",
      priority: "high",
    },
    {
      id: "d6",
      orderId: "1239",
      customer: {
        name: "Мария Иванова",
        phone: "+7 (906) 678-90-12",
      },
      address: "пр. Ленина, 55, кв. 33",
      date: "31.05.2023",
      time: "12:00 - 14:00",
      status: "canceled",
      items: 1,
      price: 3900,
      paymentStatus: "paid",
      priority: "normal",
      notes: "Клиент отменил заказ",
    },
  ]

  // Функция для получения цвета статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "canceled":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Функция для получения текста статуса
  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Ожидает"
      case "in_progress":
        return "В пути"
      case "completed":
        return "Доставлен"
      case "failed":
        return "Не доставлен"
      case "canceled":
        return "Отменен"
      default:
        return "Неизвестно"
    }
  }

  // Функция для получения иконки статуса
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in_progress":
        return <Truck className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      case "canceled":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  // Функция для получения текста статуса оплаты
  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Оплачен"
      case "unpaid":
        return "Не оплачен"
      case "cash_on_delivery":
        return "Наличными при получении"
      default:
        return "Неизвестно"
    }
  }

  // Функция для получения цвета приоритета
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "normal":
        return "bg-gray-100 text-gray-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "express":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Функция для получения текста приоритета
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "normal":
        return "Обычный"
      case "high":
        return "Высокий"
      case "express":
        return "Экспресс"
      default:
        return "Обычный"
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold flex items-center">
          <Truck className="mr-2 h-6 w-6" />
          Доставка
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
          <Button className="bg-[#8bc4c1] hover:bg-[#7ab5b2]">Назначить курьера</Button>
        </div>
      </div>

      <div className="p-4 border-b bg-gray-50">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Поиск по номеру заказа, адресу или клиенту..." className="pl-8" />
            </div>
          </div>
          <div className="w-[200px]">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Статус доставки" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="pending">Ожидает</SelectItem>
                <SelectItem value="in_progress">В пути</SelectItem>
                <SelectItem value="completed">Доставлен</SelectItem>
                <SelectItem value="failed">Не доставлен</SelectItem>
                <SelectItem value="canceled">Отменен</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[200px]">
            <Select defaultValue="today">
              <SelectTrigger>
                <SelectValue placeholder="Дата доставки" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Сегодня</SelectItem>
                <SelectItem value="tomorrow">Завтра</SelectItem>
                <SelectItem value="week">Эта неделя</SelectItem>
                <SelectItem value="all">Все даты</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-[200px]">
            <Select defaultValue="all_priority">
              <SelectTrigger>
                <SelectValue placeholder="Приоритет" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all_priority">Все приоритеты</SelectItem>
                <SelectItem value="normal">Обычный</SelectItem>
                <SelectItem value="high">Высокий</SelectItem>
                <SelectItem value="express">Экспресс</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              Все доставки
              <Badge className="ml-2 bg-gray-200 text-gray-800">{deliveries.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex-1">
              Ожидают
              <Badge className="ml-2 bg-yellow-100 text-yellow-800">
                {deliveries.filter((d) => d.status === "pending").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="in_progress" className="flex-1">
              В пути
              <Badge className="ml-2 bg-blue-100 text-blue-800">
                {deliveries.filter((d) => d.status === "in_progress").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">
              Доставлены
              <Badge className="ml-2 bg-green-100 text-green-800">
                {deliveries.filter((d) => d.status === "completed").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="issues" className="flex-1">
              Проблемы
              <Badge className="ml-2 bg-red-100 text-red-800">
                {deliveries.filter((d) => ["failed", "canceled"].includes(d.status)).length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="flex-1 overflow-y-auto p-4 m-0 space-y-4">
          {deliveries.map((delivery) => (
            <Card key={delivery.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Левая часть карточки */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">Заказ #{delivery.orderId}</h3>
                          <Badge className={`ml-2 ${getPriorityColor(delivery.priority)}`}>
                            {getPriorityText(delivery.priority)}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" />
                          {delivery.date}
                          <Clock className="h-4 w-4 ml-3 mr-1" />
                          {delivery.time}
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(delivery.status)} flex items-center`}>
                        {getStatusIcon(delivery.status)}
                        <span className="ml-1">{getStatusText(delivery.status)}</span>
                      </Badge>
                    </div>

                    <div className="mt-3">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <p className="text-sm">{delivery.address}</p>
                          {delivery.notes && <p className="text-xs text-gray-500 mt-1">{delivery.notes}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-4">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">
                          {delivery.items} {delivery.items === 1 ? "товар" : "товара"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium">{delivery.price.toLocaleString()} ₽</span>
                        <span className="text-xs ml-1 text-gray-500">
                          ({getPaymentStatusText(delivery.paymentStatus)})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Правая часть карточки */}
                  <div className="bg-gray-50 p-4 md:w-64 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Клиент</h4>
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage
                            src={delivery.customer.avatar || `/placeholder.svg?height=32&width=32`}
                            alt={delivery.customer.name}
                          />
                          <AvatarFallback>
                            {delivery.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{delivery.customer.name}</p>
                          <p className="text-xs text-gray-500">{delivery.customer.phone}</p>
                        </div>
                      </div>
                    </div>

                    {delivery.courier && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Курьер</h4>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={delivery.courier.avatar || `/placeholder.svg?height=32&width=32`}
                              alt={delivery.courier.name}
                            />
                            <AvatarFallback>
                              {delivery.courier.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{delivery.courier.name}</p>
                            <p className="text-xs text-gray-500">{delivery.courier.phone}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex flex-col space-y-2">
                      <Button variant="outline" size="sm" className="justify-between">
                        Подробнее
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button size="sm" className="justify-between bg-[#8bc4c1] hover:bg-[#7ab5b2]">
                        Изменить статус
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Остальные вкладки с фильтрацией по статусу */}
        <TabsContent value="pending" className="flex-1 overflow-y-auto p-4 m-0 space-y-4">
          {deliveries
            .filter((d) => d.status === "pending")
            .map((delivery) => (
              <Card key={delivery.id} className="overflow-hidden">
                {/* Содержимое карточки такое же, как в первой вкладке */}
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Левая часть карточки */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">Заказ #{delivery.orderId}</h3>
                            <Badge className={`ml-2 ${getPriorityColor(delivery.priority)}`}>
                              {getPriorityText(delivery.priority)}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {delivery.date}
                            <Clock className="h-4 w-4 ml-3 mr-1" />
                            {delivery.time}
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(delivery.status)} flex items-center`}>
                          {getStatusIcon(delivery.status)}
                          <span className="ml-1">{getStatusText(delivery.status)}</span>
                        </Badge>
                      </div>

                      <div className="mt-3">
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                          <div>
                            <p className="text-sm">{delivery.address}</p>
                            {delivery.notes && <p className="text-xs text-gray-500 mt-1">{delivery.notes}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-4">
                        <div className="flex items-center">
                          <Package className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">
                            {delivery.items} {delivery.items === 1 ? "товар" : "товара"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium">{delivery.price.toLocaleString()} ₽</span>
                          <span className="text-xs ml-1 text-gray-500">
                            ({getPaymentStatusText(delivery.paymentStatus)})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Правая часть карточки */}
                    <div className="bg-gray-50 p-4 md:w-64 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Клиент</h4>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={delivery.customer.avatar || `/placeholder.svg?height=32&width=32`}
                              alt={delivery.customer.name}
                            />
                            <AvatarFallback>
                              {delivery.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{delivery.customer.name}</p>
                            <p className="text-xs text-gray-500">{delivery.customer.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col space-y-2">
                        <Button variant="outline" size="sm" className="justify-between">
                          Подробнее
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="justify-between bg-[#8bc4c1] hover:bg-[#7ab5b2]">
                          Назначить курьера
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
