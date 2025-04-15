"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react"

// Моковые данные для заказов
const orders = [
  {
    id: "ORD-001",
    customer: "Иван Петров",
    email: "ivan@example.com",
    date: "15.03.2023",
    amount: 12500,
    status: "Доставлен",
    paymentStatus: "Оплачен",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Анна Сидорова",
    email: "anna@example.com",
    date: "14.03.2023",
    amount: 8200,
    status: "В пути",
    paymentStatus: "Оплачен",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Петр Иванов",
    email: "petr@example.com",
    date: "14.03.2023",
    amount: 5700,
    status: "Обработка",
    paymentStatus: "Ожидает оплаты",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Мария Кузнецова",
    email: "maria@example.com",
    date: "13.03.2023",
    amount: 15300,
    status: "Доставлен",
    paymentStatus: "Оплачен",
    items: 4,
  },
  {
    id: "ORD-005",
    customer: "Алексей Смирнов",
    email: "alexey@example.com",
    date: "13.03.2023",
    amount: 7800,
    status: "Отменен",
    paymentStatus: "Возврат",
    items: 2,
  },
  {
    id: "ORD-006",
    customer: "Елена Козлова",
    email: "elena@example.com",
    date: "12.03.2023",
    amount: 9500,
    status: "Доставлен",
    paymentStatus: "Оплачен",
    items: 3,
  },
  {
    id: "ORD-007",
    customer: "Дмитрий Новиков",
    email: "dmitry@example.com",
    date: "12.03.2023",
    amount: 6200,
    status: "Обработка",
    paymentStatus: "Ожидает оплаты",
    items: 2,
  },
  {
    id: "ORD-008",
    customer: "Ольга Морозова",
    email: "olga@example.com",
    date: "11.03.2023",
    amount: 11800,
    status: "В пути",
    paymentStatus: "Оплачен",
    items: 3,
  },
  {
    id: "ORD-009",
    customer: "Сергей Волков",
    email: "sergey@example.com",
    date: "11.03.2023",
    amount: 4300,
    status: "Доставлен",
    paymentStatus: "Оплачен",
    items: 1,
  },
  {
    id: "ORD-010",
    customer: "Наталья Павлова",
    email: "natalia@example.com",
    date: "10.03.2023",
    amount: 8900,
    status: "Отменен",
    paymentStatus: "Возврат",
    items: 2,
  },
]

// Статусы для фильтрации
const orderStatuses = ["Все", "Обработка", "В пути", "Доставлен", "Отменен"]
const paymentStatuses = ["Все", "Оплачен", "Ожидает оплаты", "Возврат"]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Все")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("Все")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Фильтрация заказов
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "Все" || order.status === selectedStatus
    const matchesPaymentStatus = selectedPaymentStatus === "Все" || order.paymentStatus === selectedPaymentStatus

    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  // Пагинация
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Обработчики выбора заказов
  const toggleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    } else {
      setSelectedOrders([...selectedOrders, orderId])
    }
  }

  const toggleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(paginatedOrders.map((order) => order.id))
    }
  }

  // Получение класса для статуса заказа
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Доставлен":
        return "bg-green-100 text-green-600"
      case "В пути":
        return "bg-blue-100 text-blue-600"
      case "Обработка":
        return "bg-amber-100 text-amber-600"
      case "О��менен":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Получение класса для статуса оплаты
  const getPaymentStatusClass = (status: string) => {
    switch (status) {
      case "Оплачен":
        return "bg-green-100 text-green-600"
      case "Ожидает оплаты":
        return "bg-amber-100 text-amber-600"
      case "Возврат":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление заказами</h1>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Экспорт
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
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
                {orderStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={selectedPaymentStatus} onValueChange={setSelectedPaymentStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Статус оплаты" />
              </SelectTrigger>
              <SelectContent>
                {paymentStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" className="text-gray-500">
              Сбросить фильтры
            </Button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={paginatedOrders.length > 0 && selectedOrders.length === paginatedOrders.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    ID заказа
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Дата
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Сумма
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Оплата</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() => toggleSelectOrder(order.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-xs text-gray-500">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.amount.toLocaleString()} ₽</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusClass(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            Просмотр
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
          <div className="flex items-center justify-between px-4 py-3 border-t">
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
      </div>
    </div>
  )
}
