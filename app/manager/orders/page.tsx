"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Phone,
  Truck,
  Package,
  CheckCircle,
  AlertCircle,
  Download,
  ShoppingBag,
  X,
} from "lucide-react"

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

// Моковые данные для заказов
const orders = [
  {
    id: "ORD-001",
    customer: "Иван Петров",
    phone: "+7 (921) 123-45-67",
    date: "15.03.2023",
    time: "10:25",
    amount: 12500,
    items: 3,
    status: ORDER_STATUSES.NEW,
    paymentStatus: "Оплачен",
    deliveryDate: "16.03.2023",
    deliveryTime: "12:00-15:00",
    address: "г. Омск, ул. Ленина, д. 15, кв. 42",
  },
  {
    id: "ORD-002",
    customer: "Анна Сидорова",
    phone: "+7 (921) 234-56-78",
    date: "15.03.2023",
    time: "09:15",
    amount: 8200,
    items: 2,
    status: ORDER_STATUSES.CONFIRMED,
    paymentStatus: "Оплачен",
    deliveryDate: "15.03.2023",
    deliveryTime: "16:00-18:00",
    address: "г. Омск, ул. Мира, д. 28, кв. 15",
  },
  {
    id: "ORD-003",
    customer: "Петр Иванов",
    phone: "+7 (921) 345-67-89",
    date: "14.03.2023",
    time: "18:30",
    amount: 5700,
    items: 1,
    status: ORDER_STATUSES.NEW,
    paymentStatus: "Не оплачен",
    deliveryDate: "16.03.2023",
    deliveryTime: "10:00-13:00",
    address: "г. Омск, ул. Гагарина, д. 5, кв. 78",
  },
  {
    id: "ORD-004",
    customer: "Мария Кузнецова",
    phone: "+7 (921) 456-78-90",
    date: "14.03.2023",
    time: "16:45",
    amount: 15300,
    items: 4,
    status: ORDER_STATUSES.ASSEMBLED,
    paymentStatus: "Оплачен",
    deliveryDate: "15.03.2023",
    deliveryTime: "18:00-20:00",
    address: "г. Омск, ул. Декабристов, д. 112, кв. 34",
  },
  {
    id: "ORD-005",
    customer: "Алексей Смирнов",
    phone: "+7 (921) 567-89-01",
    date: "14.03.2023",
    time: "14:20",
    amount: 7800,
    items: 2,
    status: ORDER_STATUSES.PROBLEM,
    paymentStatus: "Оплачен",
    deliveryDate: "15.03.2023",
    deliveryTime: "12:00-15:00",
    address: "г. Омск, ул. Пушкина, д. 7, кв. 12",
  },
  {
    id: "ORD-006",
    customer: "Елена Козлова",
    phone: "+7 (921) 678-90-12",
    date: "14.03.2023",
    time: "11:10",
    amount: 9500,
    items: 3,
    status: ORDER_STATUSES.DELIVERING,
    paymentStatus: "Оплачен",
    deliveryDate: "14.03.2023",
    deliveryTime: "16:00-18:00",
    address: "г. Омск, ул. Лермонтова, д. 22, кв. 56",
  },
  {
    id: "ORD-007",
    customer: "Дмитрий Новиков",
    phone: "+7 (921) 789-01-23",
    date: "13.03.2023",
    time: "17:35",
    amount: 6200,
    items: 2,
    status: ORDER_STATUSES.DELIVERED,
    paymentStatus: "Оплачен",
    deliveryDate: "14.03.2023",
    deliveryTime: "10:00-13:00",
    address: "г. Омск, ул. Маяковского, д. 15, кв. 89",
  },
  {
    id: "ORD-008",
    customer: "Ольга Морозова",
    phone: "+7 (921) 890-12-34",
    date: "13.03.2023",
    time: "15:20",
    amount: 11800,
    items: 3,
    status: ORDER_STATUSES.DELIVERED,
    paymentStatus: "Оплачен",
    deliveryDate: "14.03.2023",
    deliveryTime: "14:00-16:00",
    address: "г. Омск, ул. Чехова, д. 33, кв. 45",
  },
  {
    id: "ORD-009",
    customer: "Сергей Волков",
    phone: "+7 (921) 901-23-45",
    date: "13.03.2023",
    time: "12:15",
    amount: 4300,
    items: 1,
    status: ORDER_STATUSES.CANCELED,
    paymentStatus: "Возврат",
    deliveryDate: "14.03.2023",
    deliveryTime: "16:00-18:00",
    address: "г. Омск, ул. Достоевского, д. 18, кв. 23",
  },
  {
    id: "ORD-010",
    customer: "Наталья Павлова",
    phone: "+7 (921) 012-34-56",
    date: "13.03.2023",
    time: "09:45",
    amount: 8900,
    items: 2,
    status: ORDER_STATUSES.DELIVERED,
    paymentStatus: "Оплачен",
    deliveryDate: "13.03.2023",
    deliveryTime: "14:00-16:00",
    address: "г. Омск, ул. Тургенева, д. 9, кв. 67",
  },
  {
    id: "ORD-011",
    customer: "Виктор Соколов",
    phone: "+7 (921) 123-45-67",
    date: "15.03.2023",
    time: "14:30",
    amount: 6700,
    items: 2,
    status: ORDER_STATUSES.READY_FOR_DELIVERY,
    paymentStatus: "Оплачен",
    deliveryDate: "16.03.2023",
    deliveryTime: "10:00-13:00",
    address: "г. Омск, ул. Кирова, д. 45, кв. 12",
  },
]

export default function ManagerOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Все")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("Все")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const itemsPerPage = 5

  // Фильтрация заказов по статусу и поисковому запросу
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "Все" || order.status === selectedStatus
    const matchesPaymentStatus = selectedPaymentStatus === "Все" || order.paymentStatus === selectedPaymentStatus

    // Фильтрация по вкладкам
    if (activeTab === "new") {
      return matchesSearch && matchesPaymentStatus && [ORDER_STATUSES.NEW].includes(order.status)
    } else if (activeTab === "confirmed") {
      return matchesSearch && matchesPaymentStatus && [ORDER_STATUSES.CONFIRMED].includes(order.status)
    } else if (activeTab === "assembled") {
      return (
        matchesSearch &&
        matchesPaymentStatus &&
        [ORDER_STATUSES.ASSEMBLED, ORDER_STATUSES.READY_FOR_DELIVERY].includes(order.status)
      )
    } else if (activeTab === "delivering") {
      return matchesSearch && matchesPaymentStatus && [ORDER_STATUSES.DELIVERING].includes(order.status)
    } else if (activeTab === "completed") {
      return matchesSearch && matchesPaymentStatus && order.status === ORDER_STATUSES.DELIVERED
    } else if (activeTab === "problems") {
      return (
        matchesSearch &&
        matchesPaymentStatus &&
        [ORDER_STATUSES.PROBLEM, ORDER_STATUSES.CANCELED].includes(order.status)
      )
    }

    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  // Пагинация
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Получение класса для статуса заказа
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

  // Получение класса для статуса оплаты
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

  // Получение иконки для статуса заказа
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

  // Получение следующего шага для заказа
  const getNextStepLabel = (status: string) => {
    switch (status) {
      case ORDER_STATUSES.NEW:
        return "Принять заказ"
      case ORDER_STATUSES.CONFIRMED:
        return "Собрать заказ"
      case ORDER_STATUSES.ASSEMBLED:
        return "Загрузить фото"
      case ORDER_STATUSES.READY_FOR_DELIVERY:
        return "Передать курьеру"
      case ORDER_STATUSES.DELIVERING:
        return "Завершить заказ"
      case ORDER_STATUSES.DELIVERED:
        return "Завершен"
      case ORDER_STATUSES.PROBLEM:
        return "Решить проблему"
      case ORDER_STATUSES.CANCELED:
        return "Отменен"
      default:
        return "Обработать"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Управление заказами</h1>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Экспорт
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Все заказы</TabsTrigger>
          <TabsTrigger value="new">Новые</TabsTrigger>
          <TabsTrigger value="confirmed">Подтвержденные</TabsTrigger>
          <TabsTrigger value="assembled">Собранные</TabsTrigger>
          <TabsTrigger value="delivering">В доставке</TabsTrigger>
          <TabsTrigger value="completed">Доставленные</TabsTrigger>
          <TabsTrigger value="problems">Проблемные</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Список заказов</CardTitle>
            <CardDescription>Управляйте заказами, меняйте их статус и просматривайте детали</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Поиск заказов..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Filter className="text-gray-400 h-4 w-4" />
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Статус заказа" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Все">Все статусы</SelectItem>
                      <SelectItem value={ORDER_STATUSES.NEW}>Новый</SelectItem>
                      <SelectItem value={ORDER_STATUSES.CONFIRMED}>Подтвержден</SelectItem>
                      <SelectItem value={ORDER_STATUSES.ASSEMBLED}>Собран</SelectItem>
                      <SelectItem value={ORDER_STATUSES.READY_FOR_DELIVERY}>Готов к отправке</SelectItem>
                      <SelectItem value={ORDER_STATUSES.DELIVERING}>Доставляется</SelectItem>
                      <SelectItem value={ORDER_STATUSES.DELIVERED}>Доставлен</SelectItem>
                      <SelectItem value={ORDER_STATUSES.PROBLEM}>Проблема</SelectItem>
                      <SelectItem value={ORDER_STATUSES.CANCELED}>Отменен</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Статус оплаты" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Все">Все статусы</SelectItem>
                      <SelectItem value="Оплачен">Оплачен</SelectItem>
                      <SelectItem value="Не оплачен">Не оплачен</SelectItem>
                      <SelectItem value="Возврат">Возврат</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="text-gray-500"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedStatus("Все")
                      setSelectedPaymentStatus("Все")
                    }}
                  >
                    Сбросить фильтры
                  </Button>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID заказа</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Дата и время</TableHead>
                    <TableHead>Сумма</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Оплата</TableHead>
                    <TableHead>Доставка</TableHead>
                    <TableHead className="text-right">Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{order.customer}</div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {order.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{order.date}</div>
                          <div className="text-xs text-gray-500">{order.time}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{order.amount.toLocaleString()} ₽</div>
                          <div className="text-xs text-gray-500">{order.items} товара</div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`flex items-center space-x-1 ${getStatusClass(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span>{order.status}</span>
                          </Badge>
                          <div className="text-xs text-gray-500 mt-1">
                            Следующий шаг: {getNextStepLabel(order.status)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPaymentStatusClass(order.paymentStatus)}`}>
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{order.deliveryDate}</div>
                          <div className="text-xs text-gray-500">{order.deliveryTime}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <Link href={`/manager/order/${order.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                        Заказы не найдены
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {filteredOrders.length > 0 && (
              <div className="flex items-center justify-between px-4 py-3 mt-4">
                <div className="text-sm text-gray-500">
                  Показано {(currentPage - 1) * itemsPerPage + 1} -{" "}
                  {Math.min(currentPage * itemsPerPage, filteredOrders.length)} из {filteredOrders.length} заказов
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-[#8bc4c1] hover:bg-[#7ab3b0]" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  )
}
