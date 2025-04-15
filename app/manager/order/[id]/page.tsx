"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import {
  ChevronLeft,
  Printer,
  Download,
  Phone,
  Mail,
  MapPin,
  Clock,
  CreditCard,
  Truck,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Package,
  Calendar,
  User,
  Send,
  Upload,
  Camera,
  X,
  Check,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Статусы заказа
const ORDER_STATUSES = {
  NEW: "Новый",
  CONFIRMED: "Подтвержден",
  ASSEMBLED: "Собран",
  READY_FOR_DELIVERY: "Готов к отправке",
  DELIVERING: "Доставляется",
  DELIVERED: "Доставлен",
  PROBLEM: "Проблема",
  CANCELED: "Отменен",
}

// Моковые данные для заказа
const orderData = {
  id: "ORD-001",
  date: "15.03.2023",
  time: "10:25",
  status: ORDER_STATUSES.NEW,
  paymentStatus: "Оплачен",
  paymentMethod: "Банковская карта",
  amount: 12500,
  deliveryDate: "16.03.2023",
  deliveryTime: "12:00-15:00",
  deliveryMethod: "Курьерская доставка",
  deliveryPrice: 500,
  address: "г. Омск, ул. Ленина, д. 15, кв. 42",
  comment: "Позвонить за час до доставки. Код домофона: 4231",
  customer: {
    name: "Иван Петров",
    phone: "+7 (921) 123-45-67",
    email: "ivan.petrov@example.com",
    orders: 5,
    totalSpent: 45800,
    lastOrder: "10.03.2023",
  },
  items: [
    {
      id: 1,
      name: "Букет 'Весеннее настроение'",
      image: "/placeholder.svg?height=80&width=80",
      price: 5500,
      quantity: 1,
      total: 5500,
    },
    {
      id: 2,
      name: "Букет 'Нежность'",
      image: "/placeholder.svg?height=80&width=80",
      price: 4200,
      quantity: 1,
      total: 4200,
    },
    {
      id: 3,
      name: "Открытка с поздравлением",
      image: "/placeholder.svg?height=80&width=80",
      price: 300,
      quantity: 1,
      total: 300,
    },
    {
      id: 4,
      name: "Упаковка премиум",
      image: "/placeholder.svg?height=80&width=80",
      price: 2000,
      quantity: 1,
      total: 2000,
    },
  ],
  history: [
    {
      date: "15.03.2023",
      time: "10:25",
      status: "Создан",
      user: "Система",
      comment: "Заказ создан клиентом через сайт",
    },
    {
      date: "15.03.2023",
      time: "10:30",
      status: "Оплачен",
      user: "Система",
      comment: "Оплата получена через банковскую карту",
    },
  ],
}

// Функция для получения класса статуса заказа
const getStatusClass = (status: string) => {
  switch (status) {
    case ORDER_STATUSES.NEW:
      return "bg-blue-100 text-blue-600"
    case ORDER_STATUSES.CONFIRMED:
      return "bg-green-100 text-green-600"
    case ORDER_STATUSES.ASSEMBLED:
      return "bg-amber-100 text-amber-600"
    case ORDER_STATUSES.READY_FOR_DELIVERY:
      return "bg-purple-100 text-purple-600"
    case ORDER_STATUSES.DELIVERING:
      return "bg-indigo-100 text-indigo-600"
    case ORDER_STATUSES.DELIVERED:
      return "bg-green-100 text-green-600"
    case ORDER_STATUSES.PROBLEM:
      return "bg-red-100 text-red-600"
    case ORDER_STATUSES.CANCELED:
      return "bg-gray-100 text-gray-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

// Функция для получения класса статуса оплаты
const getPaymentStatusClass = (status: string) => {
  switch (status) {
    case "Оплачен":
      return "bg-green-100 text-green-600"
    case "Не оплачен":
      return "bg-amber-100 text-amber-600"
    case "Возврат":
      return "bg-red-100 text-red-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

// Функция для получения иконки статуса заказа
const getStatusIcon = (status: string) => {
  switch (status) {
    case ORDER_STATUSES.NEW:
      return <Package className="h-4 w-4" />
    case ORDER_STATUSES.CONFIRMED:
      return <CheckCircle className="h-4 w-4" />
    case ORDER_STATUSES.ASSEMBLED:
      return <ShoppingBag className="h-4 w-4" />
    case ORDER_STATUSES.READY_FOR_DELIVERY:
      return <Package className="h-4 w-4" />
    case ORDER_STATUSES.DELIVERING:
      return <Truck className="h-4 w-4" />
    case ORDER_STATUSES.DELIVERED:
      return <CheckCircle className="h-4 w-4" />
    case ORDER_STATUSES.PROBLEM:
      return <AlertCircle className="h-4 w-4" />
    case ORDER_STATUSES.CANCELED:
      return <X className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

export default function OrderDetailsPage() {
  const params = useParams()
  const orderId = params.id
  const [status, setStatus] = useState(orderData.status)
  const [comment, setComment] = useState("")
  const [bouquetImage, setBouquetImage] = useState<string | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)

  // Обработчик изменения статуса
  const updateOrderStatus = (newStatus: string, actionComment = "") => {
    setIsUpdatingStatus(true)

    // Имитация API-запроса
    setTimeout(() => {
      setStatus(newStatus)
      setIsUpdatingStatus(false)

      // Добавляем запись в историю (в реальном приложении это будет делать бэкенд)
      const now = new Date()
      const dateStr = now.toLocaleDateString("ru-RU")
      const timeStr = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })

      // В реальном приложении здесь будет API-запрос
      console.log(`Статус заказа изменен на: ${newStatus}`)
      console.log(`Комментарий: ${actionComment}`)

      // Очищаем комментарий после отправки
      setComment("")
    }, 800)
  }

  // Обработчик добавления комментария
  const handleAddComment = () => {
    if (comment.trim()) {
      // В реальном приложении здесь будет API-запрос
      console.log(`Добавлен комментарий: ${comment}`)
      setComment("")
    }
  }

  // Обработчик загрузки изображения
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setBouquetImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Обработчик отправки фото клиенту
  const handleSendToCustomer = () => {
    if (!bouquetImage) return

    setIsSending(true)
    // Имитация отправки фото клиенту
    setTimeout(() => {
      setIsSending(false)
      updateOrderStatus(ORDER_STATUSES.READY_FOR_DELIVERY, "Фотография букета отправлена клиенту")
    }, 1500)
  }

  // Функция для отображения действий в зависимости от статуса
  const renderStatusActions = () => {
    switch (status) {
      case ORDER_STATUSES.NEW:
        return (
          <div className="flex space-x-3">
            <Button
              className="bg-[#8bc4c1] hover:bg-[#7ab3b0]"
              onClick={() => updateOrderStatus(ORDER_STATUSES.CONFIRMED, "Заказ принят в работу")}
              disabled={isUpdatingStatus}
            >
              <Check className="h-4 w-4 mr-2" />
              Принять заказ
            </Button>
            <Button
              variant="destructive"
              onClick={() => updateOrderStatus(ORDER_STATUSES.CANCELED, "Заказ отменен")}
              disabled={isUpdatingStatus}
            >
              <X className="h-4 w-4 mr-2" />
              Отменить заказ
            </Button>
          </div>
        )

      case ORDER_STATUSES.CONFIRMED:
        return (
          <Button
            className="bg-[#8bc4c1] hover:bg-[#7ab3b0]"
            onClick={() => updateOrderStatus(ORDER_STATUSES.ASSEMBLED, "Заказ собран и готов к фотографированию")}
            disabled={isUpdatingStatus}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Заказ собран
          </Button>
        )

      case ORDER_STATUSES.ASSEMBLED:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Загрузите фотографию собранного букета</h3>

            {!bouquetImage ? (
              <div className="flex flex-col items-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 w-full flex flex-col items-center justify-center">
                  <Camera className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Загрузите фотографию готового букета</p>
                  <label className="cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    <div className="bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white py-2 px-4 rounded-md flex items-center">
                      <Upload className="h-4 w-4 mr-2" />
                      Выбрать фото
                    </div>
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden">
                  <Image src={bouquetImage || "/placeholder.svg"} alt="Фото букета" fill className="object-cover" />
                </div>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" onClick={() => setBouquetImage(null)}>
                    Заменить фото
                  </Button>
                  <Button
                    className="bg-[#8bc4c1] hover:bg-[#7ab3b0]"
                    onClick={handleSendToCustomer}
                    disabled={isSending}
                  >
                    {isSending ? (
                      <>Отправка...</>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Отправить клиенту
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )

      case ORDER_STATUSES.READY_FOR_DELIVERY:
        return (
          <Button
            className="bg-[#8bc4c1] hover:bg-[#7ab3b0]"
            onClick={() => updateOrderStatus(ORDER_STATUSES.DELIVERING, "Заказ передан курьеру")}
            disabled={isUpdatingStatus}
          >
            <Truck className="h-4 w-4 mr-2" />
            Передать курьеру
          </Button>
        )

      case ORDER_STATUSES.DELIVERING:
        return (
          <Button
            className="bg-[#8bc4c1] hover:bg-[#7ab3b0]"
            onClick={() => updateOrderStatus(ORDER_STATUSES.DELIVERED, "Заказ доставлен клиенту")}
            disabled={isUpdatingStatus}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Завершить заказ
          </Button>
        )

      case ORDER_STATUSES.DELIVERED:
        return (
          <div className="bg-green-50 p-4 rounded-lg text-green-700 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            Заказ успешно выполнен
          </div>
        )

      case ORDER_STATUSES.CANCELED:
        return (
          <div className="bg-red-50 p-4 rounded-lg text-red-700 flex items-center">
            <X className="h-5 w-5 mr-2" />
            Заказ отменен
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Верхняя панель с навигацией и действиями */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/manager/orders">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Заказ {orderData.id}</h1>
            <p className="text-sm text-gray-500">
              от {orderData.date} {orderData.time}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Printer className="h-4 w-4 mr-2" />
            Печать
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Статус заказа и основная информация */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Информация о заказе</CardTitle>
                <CardDescription>Детали заказа и статус</CardDescription>
              </div>
              <Badge className={`flex items-center space-x-1 ${getStatusClass(status)}`}>
                {getStatusIcon(status)}
                <span>{status}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Управление статусом заказа</h3>
              <div className="bg-gray-50 p-4 rounded-lg">{renderStatusActions()}</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Способ оплаты</h3>
                <p className="mt-1 flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-gray-400" />
                  {orderData.paymentMethod}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Статус оплаты</h3>
                <div className="mt-2">
                  <Badge className={`${getPaymentStatusClass(orderData.paymentStatus)}`}>
                    {orderData.paymentStatus}
                  </Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Сумма заказа</h3>
                <p className="mt-1 text-lg font-semibold">{orderData.amount.toLocaleString()} ₽</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Информация о клиенте</CardTitle>
            <CardDescription>Контактные данные</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={orderData.customer.name} />
                <AvatarFallback className="bg-[#8bc4c1] text-white">
                  {orderData.customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{orderData.customer.name}</h3>
                <p className="text-sm text-gray-500">Постоянный клиент</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                <div>
                  <p className="text-sm">{orderData.customer.phone}</p>
                  <p className="text-xs text-gray-500">Мобильный телефон</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                <div>
                  <p className="text-sm">{orderData.customer.email}</p>
                  <p className="text-xs text-gray-500">Email</p>
                </div>
              </div>
              <div className="flex items-start">
                <User className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                <div>
                  <p className="text-sm">{orderData.customer.orders} заказов</p>
                  <p className="text-xs text-gray-500">На сумму {orderData.customer.totalSpent.toLocaleString()} ₽</p>
                </div>
              </div>
              <div className="flex items-start">
                <Calendar className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                <div>
                  <p className="text-sm">Последний заказ: {orderData.customer.lastOrder}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/manager/customers/${orderData.customer.name.toLowerCase().replace(" ", "-")}`}>
                Профиль клиента
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Детали заказа в табах */}
      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Товары</TabsTrigger>
          <TabsTrigger value="delivery">Доставка</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
          <TabsTrigger value="comments">Комментарии</TabsTrigger>
        </TabsList>

        {/* Вкладка с товарами */}
        <TabsContent value="items" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Товары в заказе</CardTitle>
              <CardDescription>Список товаров и услуг</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]"></TableHead>
                    <TableHead>Наименование</TableHead>
                    <TableHead className="text-right">Цена</TableHead>
                    <TableHead className="text-right">Кол-во</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="relative w-16 h-16 rounded-md overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">{item.price.toLocaleString()} ₽</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right font-medium">{item.total.toLocaleString()} ₽</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Подытог:</span>
                  <span>{(orderData.amount - orderData.deliveryPrice).toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Доставка:</span>
                  <span>{orderData.deliveryPrice.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between py-1 font-semibold">
                  <span>Итого:</span>
                  <span>{orderData.amount.toLocaleString()} ₽</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Вкладка с информацией о доставке */}
        <TabsContent value="delivery" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Информация о доставке</CardTitle>
              <CardDescription>Адрес и детали доставки</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Адрес доставки</h3>
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                    <p>{orderData.address}</p>
                  </div>

                  <h3 className="text-sm font-medium text-gray-500 mb-2">Дата и время доставки</h3>
                  <div className="flex items-start mb-4">
                    <Clock className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                    <div>
                      <p>{orderData.deliveryDate}</p>
                      <p className="text-sm text-gray-500">{orderData.deliveryTime}</p>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium text-gray-500 mb-2">Способ доставки</h3>
                  <div className="flex items-start mb-4">
                    <Truck className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                    <p>{orderData.deliveryMethod}</p>
                  </div>

                  <h3 className="text-sm font-medium text-gray-500 mb-2">Комментарий к доставке</h3>
                  <div className="flex items-start">
                    <MessageSquare className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                    <p>{orderData.comment}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-3">Карта доставки</h3>
                  <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Карта с маршрутом доставки</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Вкладка с историей заказа */}
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>История заказа</CardTitle>
              <CardDescription>Хронология изменений статуса</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.history.map((event, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#8bc4c1]"></div>
                      {index < orderData.history.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center">
                        <p className="font-medium">{event.status}</p>
                        <span className="mx-2 text-gray-400">•</span>
                        <p className="text-sm text-gray-500">
                          {event.date} {event.time}
                        </p>
                      </div>
                      <p className="text-sm mt-1">{event.comment}</p>
                      <p className="text-xs text-gray-500 mt-1">Пользователь: {event.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Вкладка с комментариями */}
        <TabsContent value="comments" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Комментарии</CardTitle>
              <CardDescription>Внутренние заметки по заказу</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                <div className="flex items-start">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Мария Иванова" />
                    <AvatarFallback className="bg-[#8bc4c1] text-white">МИ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-medium text-sm">Мария Иванова</p>
                      <p className="text-xs text-gray-500">15.03.2023 11:20</p>
                    </div>
                    <p className="text-sm">Клиент подтвердил заказ по телефону. Букеты будут готовы к 10:00.</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Мария Иванова" />
                  <AvatarFallback className="bg-[#8bc4c1] text-white">МИ</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Добавить комментарий..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="resize-none mb-2"
                  />
                  <Button
                    onClick={handleAddComment}
                    className="bg-[#8bc4c1] hover:bg-[#7ab3b0]"
                    disabled={!comment.trim()}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Отправить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
