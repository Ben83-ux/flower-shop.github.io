import type { Metadata } from "next"
import { Bell, Filter, Check, Clock, ShoppingBag, User, MessageSquare, Truck, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Уведомления | Личный кабинет менеджера",
  description: "Управление уведомлениями и оповещениями",
}

interface Notification {
  id: string
  title: string
  description: string
  timestamp: string
  type: "order" | "customer" | "message" | "delivery" | "system"
  isRead: boolean
  priority?: "high" | "medium" | "low"
}

export default function NotificationsPage() {
  // Моковые данные для уведомлений
  const notifications: Notification[] = [
    {
      id: "1",
      title: "Новый заказ #1234",
      description: "Поступил новый заказ на сумму 5,600 ₽",
      timestamp: "10 минут назад",
      type: "order",
      isRead: false,
      priority: "high",
    },
    {
      id: "2",
      title: "Заказ #1230 готов к доставке",
      description: "Букет собран и готов к отправке",
      timestamp: "30 минут назад",
      type: "order",
      isRead: false,
    },
    {
      id: "3",
      title: "Новое сообщение от клиента",
      description: "Анна Смирнова отправила сообщение по заказу #1228",
      timestamp: "1 час назад",
      type: "message",
      isRead: true,
    },
    {
      id: "4",
      title: "Задержка доставки",
      description: "Доставка заказа #1225 задерживается из-за пробок",
      timestamp: "2 часа назад",
      type: "delivery",
      isRead: true,
      priority: "medium",
    },
    {
      id: "5",
      title: "Новый клиент",
      description: "Зарегистрирован новый клиент: Иван Петров",
      timestamp: "3 часа назад",
      type: "customer",
      isRead: true,
    },
    {
      id: "6",
      title: "Обновление системы",
      description: "Запланировано обновление системы сегодня в 23:00",
      timestamp: "5 часов назад",
      type: "system",
      isRead: true,
    },
    {
      id: "7",
      title: "Отмена заказа #1220",
      description: "Клиент отменил заказ. Причина: изменились планы",
      timestamp: "Вчера, 18:30",
      type: "order",
      isRead: true,
      priority: "high",
    },
    {
      id: "8",
      title: "Низкий запас роз",
      description: "Осталось менее 10 красных роз на складе",
      timestamp: "Вчера, 15:45",
      type: "system",
      isRead: true,
      priority: "medium",
    },
  ]

  // Получаем количество непрочитанных уведомлений
  const unreadCount = notifications.filter((n) => !n.isRead).length

  // Функция для получения иконки в зависимости от типа уведомления
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />
      case "customer":
        return <User className="h-5 w-5 text-green-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case "delivery":
        return <Truck className="h-5 w-5 text-orange-500" />
      case "system":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold flex items-center">
          <Bell className="mr-2 h-6 w-6" />
          Уведомления
          {unreadCount > 0 && <Badge className="ml-2 bg-[#8bc4c1]">{unreadCount}</Badge>}
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Check className="h-4 w-4 mr-2" />
            Отметить все как прочитанные
          </Button>
          <Button variant="outline" size="sm">
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
                <TabsTrigger value="all" className="flex-1">
                  Все
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Непрочитанные
                  {unreadCount > 0 && <Badge className="ml-2 bg-[#8bc4c1]">{unreadCount}</Badge>}
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex-1">
                  Заказы
                </TabsTrigger>
                <TabsTrigger value="messages" className="flex-1">
                  Сообщения
                </TabsTrigger>
                <TabsTrigger value="system" className="flex-1">
                  Система
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="flex-1 overflow-y-auto p-4 m-0 space-y-3">
              {notifications.map((notification) => (
                <Card key={notification.id} className={`${notification.isRead ? "bg-white" : "bg-[#f9fdfc]"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="mr-4 mt-0.5">{getNotificationIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-sm flex items-center">
                              {notification.title}
                              {notification.priority === "high" && <Badge className="ml-2 bg-red-500">Важно</Badge>}
                              {!notification.isRead && <span className="ml-2 h-2 w-2 rounded-full bg-[#8bc4c1]"></span>}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {notification.timestamp}
                          </div>
                        </div>
                        <div className="flex items-center justify-end mt-2">
                          <Button variant="ghost" size="sm" className="text-xs h-7">
                            Отметить как прочитанное
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="unread" className="flex-1 overflow-y-auto p-4 m-0 space-y-3">
              {notifications
                .filter((n) => !n.isRead)
                .map((notification) => (
                  <Card key={notification.id} className="bg-[#f9fdfc]">
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <div className="mr-4 mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-sm flex items-center">
                                {notification.title}
                                {notification.priority === "high" && <Badge className="ml-2 bg-red-500">Важно</Badge>}
                                <span className="ml-2 h-2 w-2 rounded-full bg-[#8bc4c1]"></span>
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.timestamp}
                            </div>
                          </div>
                          <div className="flex items-center justify-end mt-2">
                            <Button variant="ghost" size="sm" className="text-xs h-7">
                              Отметить как прочитанное
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            {/* Остальные вкладки с фильтрацией по типу */}
            <TabsContent value="orders" className="flex-1 overflow-y-auto p-4 m-0 space-y-3">
              {notifications
                .filter((n) => n.type === "order")
                .map((notification) => (
                  <Card key={notification.id} className={`${notification.isRead ? "bg-white" : "bg-[#f9fdfc]"}`}>
                    <CardContent className="p-4">
                      {/* Содержимое карточки такое же, как в других вкладках */}
                      <div className="flex items-start">
                        <div className="mr-4 mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-sm flex items-center">
                                {notification.title}
                                {notification.priority === "high" && <Badge className="ml-2 bg-red-500">Важно</Badge>}
                                {!notification.isRead && (
                                  <span className="ml-2 h-2 w-2 rounded-full bg-[#8bc4c1]"></span>
                                )}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.timestamp}
                            </div>
                          </div>
                          <div className="flex items-center justify-end mt-2">
                            <Button variant="ghost" size="sm" className="text-xs h-7">
                              Отметить как прочитанное
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

        {/* Боковая панель с настройками уведомлений */}
        <div className="w-80 border-l p-4 overflow-y-auto">
          <h2 className="font-semibold mb-4">Настройки уведомлений</h2>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Заказы</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="new-orders" className="text-sm">
                  Новые заказы
                </Label>
                <Switch id="new-orders" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="order-status" className="text-sm">
                  Изменения статуса
                </Label>
                <Switch id="order-status" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="order-cancel" className="text-sm">
                  Отмены заказов
                </Label>
                <Switch id="order-cancel" defaultChecked />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Клиенты</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="new-customers" className="text-sm">
                  Новые клиенты
                </Label>
                <Switch id="new-customers" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="customer-feedback" className="text-sm">
                  Отзывы клиентов
                </Label>
                <Switch id="customer-feedback" defaultChecked />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Сообщения</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="new-messages" className="text-sm">
                  Новые сообщения
                </Label>
                <Switch id="new-messages" defaultChecked />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Доставка</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="delivery-status" className="text-sm">
                  Статус доставки
                </Label>
                <Switch id="delivery-status" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="delivery-issues" className="text-sm">
                  Проблемы с доставкой
                </Label>
                <Switch id="delivery-issues" defaultChecked />
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Система</h3>
              <div className="flex items-center justify-between">
                <Label htmlFor="system-updates" className="text-sm">
                  Обновления системы
                </Label>
                <Switch id="system-updates" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="inventory-alerts" className="text-sm">
                  Оповещения о запасах
                </Label>
                <Switch id="inventory-alerts" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
