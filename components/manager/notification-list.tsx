"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, AlertCircle, CheckCircle, Bell, Users } from "lucide-react"

// Моковые данные для уведомлений
const initialNotifications = [
  {
    id: 1,
    title: "Новый заказ #ORD-006",
    description: "Поступил новый заказ на сумму ₽8,500",
    time: "10 минут назад",
    type: "order",
    read: false,
  },
  {
    id: 2,
    title: "Низкий остаток товара",
    description: "Розовые пионы (ID: 102) заканчиваются на складе",
    time: "30 минут назад",
    type: "alert",
    read: false,
  },
  {
    id: 3,
    title: "Заказ #ORD-003 доставлен",
    description: "Курьер успешно доставил заказ клиенту",
    time: "1 час назад",
    type: "success",
    read: true,
  },
  {
    id: 4,
    title: "Новый клиент зарегистрирован",
    description: "Ольга Морозова создала аккаунт",
    time: "2 часа назад",
    type: "user",
    read: true,
  },
  {
    id: 5,
    title: "Проблема с доставкой #ORD-002",
    description: "Курьер не может связаться с получателем",
    time: "3 часа назад",
    type: "alert",
    read: true,
  },
]

export default function NotificationList() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAsRead = (notificationId: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification,
      ),
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "user":
        return <Users className="h-5 w-5 text-purple-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-3 border rounded-md ${notification.read ? "" : "border-[#8bc4c1] bg-[#e8f4f2]/20"}`}
        >
          <div className="flex items-start">
            <div className="mr-3 mt-1">{getNotificationIcon(notification.type)}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium">{notification.title}</div>
                {!notification.read && <Badge className="bg-[#8bc4c1]">Новое</Badge>}
              </div>
              <div className="text-sm text-gray-500 mt-1">{notification.description}</div>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-500">{notification.time}</div>
                {!notification.read && (
                  <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => markAsRead(notification.id)}>
                    Отметить как прочитанное
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
