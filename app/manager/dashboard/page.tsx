"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  TrendingUp,
  Users,
  Truck,
  Calendar,
  Clock,
  ArrowRight,
  Package,
  CheckCircle,
  AlertCircle,
  Target,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

// Моковые данные для заказов
const recentOrders = [
  {
    id: "ORD-001",
    customer: "Иван Петров",
    date: "15.03.2023",
    time: "10:25",
    amount: 12500,
    status: "Новый",
  },
  {
    id: "ORD-002",
    customer: "Анна Сидорова",
    date: "15.03.2023",
    time: "09:15",
    amount: 8200,
    status: "Подтвержден",
  },
  {
    id: "ORD-003",
    customer: "Петр Иванов",
    date: "14.03.2023",
    time: "18:30",
    amount: 5700,
    status: "Ожидает оплаты",
  },
  {
    id: "ORD-004",
    customer: "Мария Кузнецова",
    date: "14.03.2023",
    time: "16:45",
    amount: 15300,
    status: "Готов к отправке",
  },
]

// Моковые данные для задач
const tasks = [
  {
    id: 1,
    title: "Позвонить клиенту по заказу ORD-005",
    priority: "Высокий",
    dueDate: "Сегодня, 14:00",
    completed: false,
  },
  {
    id: 2,
    title: "Подготовить букеты для заказа ORD-002",
    priority: "Средний",
    dueDate: "Сегодня, 16:00",
    completed: false,
  },
  {
    id: 3,
    title: "Проверить наличие цветов для завтрашних заказов",
    priority: "Средний",
    dueDate: "Сегодня, 18:00",
    completed: false,
  },
]

// Моковые данные для уведомлений
const notifications = [
  {
    id: 1,
    title: "Новый заказ",
    message: "Поступил новый заказ ORD-001",
    time: "10 минут назад",
    read: false,
  },
  {
    id: 2,
    title: "Проблема с доставкой",
    message: "Курьер не может найти адрес для заказа ORD-005",
    time: "30 минут назад",
    read: false,
  },
  {
    id: 3,
    title: "Оплата получена",
    message: "Получена оплата за заказ ORD-003",
    time: "1 час назад",
    read: true,
  },
]

// Моковые данные для расписания
const schedule = [
  {
    id: 1,
    time: "10:00",
    title: "Сборка заказов",
    description: "Подготовка 5 букетов для доставки",
  },
  {
    id: 2,
    time: "12:30",
    title: "Встреча с поставщиком",
    description: "Обсуждение поставки на следующую неделю",
  },
  {
    id: 3,
    time: "15:00",
    title: "Инвентаризация",
    description: "Проверка остатков цветов и материалов",
  },
  {
    id: 4,
    time: "17:30",
    title: "Планирование на завтра",
    description: "Составление графика работы",
  },
]

// Функция для получения класса статуса заказа
const getStatusClass = (status: string) => {
  switch (status) {
    case "Новый":
      return "bg-blue-100 text-blue-600"
    case "Подтвержден":
      return "bg-green-100 text-green-600"
    case "Ожидает оплаты":
      return "bg-amber-100 text-amber-600"
    case "Готов к отправке":
      return "bg-purple-100 text-purple-600"
    case "Доставляется":
      return "bg-indigo-100 text-indigo-600"
    case "Доставлен":
      return "bg-green-100 text-green-600"
    case "Проблема":
      return "bg-red-100 text-red-600"
    case "Отменен":
      return "bg-gray-100 text-gray-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

// Функция для получения иконки статуса заказа
const getStatusIcon = (status: string) => {
  switch (status) {
    case "Новый":
      return <Package className="h-4 w-4" />
    case "Подтвержден":
      return <CheckCircle className="h-4 w-4" />
    case "Ожидает оплаты":
      return <Clock className="h-4 w-4" />
    case "Готов к отправке":
      return <Package className="h-4 w-4" />
    case "Доставляется":
      return <Truck className="h-4 w-4" />
    case "Доставлен":
      return <CheckCircle className="h-4 w-4" />
    case "Проблема":
      return <AlertCircle className="h-4 w-4" />
    case "Отменен":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

export default function ManagerDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Панель управления</h1>
        <div className="flex items-center space-x-2">
          <p className="text-sm text-gray-500">Сегодня: 15 марта 2023</p>
        </div>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Заказы сегодня</p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +20% с прошлой недели
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Выручка сегодня</p>
                <h3 className="text-2xl font-bold mt-1">45 800 ₽</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15% с прошлой недели
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Новые клиенты</p>
                <h3 className="text-2xl font-bold mt-1">5</h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +10% с прошлой недели
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Доставки сегодня</p>
                <h3 className="text-2xl font-bold mt-1">8</h3>
                <p className="text-xs text-amber-600 mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />3 ожидают отправки
                </p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Последние заказы */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Последние заказы</CardTitle>
                <CardDescription>Недавно поступившие заказы</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/manager/orders" className="flex items-center">
                  Все заказы
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <Badge className={`flex items-center space-x-1 ${getStatusClass(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </Badge>
                    </div>
                    <div>
                      <Link href={`/manager/order/${order.id}`} className="font-medium hover:underline">
                        {order.id}
                      </Link>
                      <div className="text-sm text-gray-500">{order.customer}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.amount.toLocaleString()} ₽</div>
                    <div className="text-xs text-gray-500">
                      {order.date} {order.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/manager/orders">Просмотреть все заказы</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Задачи и уведомления */}
        <div className="space-y-6">
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="tasks" className="flex-1">
                Задачи
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1">
                Уведомления
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Мои задачи</CardTitle>
                  <CardDescription>Задачи на сегодня</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-[#8bc4c1] focus:ring-[#8bc4c1]"
                            checked={task.completed}
                            readOnly
                          />
                        </div>
                        <div className="ml-3">
                          <p className={`text-sm font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
                            {task.title}
                          </p>
                          <div className="flex items-center mt-1 space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-gray-500">{task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    Все задачи
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="notifications" className="mt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Уведомления</CardTitle>
                  <CardDescription>Последние обновления</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start">
                        <div
                          className={`flex-shrink-0 h-2 w-2 mt-2 rounded-full ${notification.read ? "bg-gray-300" : "bg-blue-500"}`}
                        ></div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full">
                    Все уведомления
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Расписание на день */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Расписание на день</CardTitle>
                  <CardDescription>15 марта 2023</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {schedule.map((item) => (
                  <div key={item.id} className="flex">
                    <div className="flex-shrink-0 w-16 text-sm font-medium text-gray-500">{item.time}</div>
                    <div className="flex-grow pl-4 border-l border-gray-200">
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* KPI и цели */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Показатели эффективности</CardTitle>
          <CardDescription>Прогресс по целям на месяц</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-2 text-[#8bc4c1]" />
                  <h4 className="text-sm font-medium">Продажи</h4>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2 bg-gray-100" indicatorClassName="bg-[#8bc4c1]" />
              <p className="text-xs text-gray-500">Цель: 500 000 ₽ / Текущий: 375 000 ₽</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-2 text-[#8bc4c1]" />
                  <h4 className="text-sm font-medium">Новые клиенты</h4>
                </div>
                <span className="text-sm font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2 bg-gray-100" indicatorClassName="bg-[#8bc4c1]" />
              <p className="text-xs text-gray-500">Цель: 50 / Текущий: 30</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Target className="h-4 w-4 mr-2 text-[#8bc4c1]" />
                  <h4 className="text-sm font-medium">Средний чек</h4>
                </div>
                <span className="text-sm font-medium">90%</span>
              </div>
              <Progress value={90} className="h-2 bg-gray-100" indicatorClassName="bg-[#8bc4c1]" />
              <p className="text-xs text-gray-500">Цель: 5 000 ₽ / Текущий: 4 500 ₽</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
