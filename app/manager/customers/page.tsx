"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  Download,
  UserPlus,
} from "lucide-react"

// Моковые данные для клиентов
const customers = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (921) 123-45-67",
    orders: 5,
    totalSpent: 32500,
    lastOrder: "15.03.2023",
    registered: "10.01.2023",
    status: "Активен",
    type: "Постоянный",
  },
  {
    id: 2,
    name: "Анна Сидорова",
    email: "anna@example.com",
    phone: "+7 (921) 234-56-78",
    orders: 3,
    totalSpent: 18700,
    lastOrder: "14.03.2023",
    registered: "20.01.2023",
    status: "Активен",
    type: "Новый",
  },
  {
    id: 3,
    name: "Петр Иванов",
    email: "petr@example.com",
    phone: "+7 (921) 345-67-89",
    orders: 1,
    totalSpent: 5700,
    lastOrder: "14.03.2023",
    registered: "25.01.2023",
    status: "Неактивен",
    type: "Новый",
  },
  {
    id: 4,
    name: "Мария Кузнецова",
    email: "maria@example.com",
    phone: "+7 (921) 456-78-90",
    orders: 7,
    totalSpent: 45300,
    lastOrder: "13.03.2023",
    registered: "05.12.2022",
    status: "Активен",
    type: "Постоянный",
  },
  {
    id: 5,
    name: "Алексей Смирнов",
    email: "alexey@example.com",
    phone: "+7 (921) 567-89-01",
    orders: 2,
    totalSpent: 12800,
    lastOrder: "12.03.2023",
    registered: "05.02.2023",
    status: "Активен",
    type: "Новый",
  },
  {
    id: 6,
    name: "Елена Козлова",
    email: "elena@example.com",
    phone: "+7 (921) 678-90-12",
    orders: 4,
    totalSpent: 28500,
    lastOrder: "10.03.2023",
    registered: "12.12.2022",
    status: "Активен",
    type: "Постоянный",
  },
  {
    id: 7,
    name: "Дмитрий Новиков",
    email: "dmitry@example.com",
    phone: "+7 (921) 789-01-23",
    orders: 0,
    totalSpent: 0,
    lastOrder: "-",
    registered: "18.02.2023",
    status: "Неактивен",
    type: "Новый",
  },
  {
    id: 8,
    name: "Ольга Морозова",
    email: "olga@example.com",
    phone: "+7 (921) 890-12-34",
    orders: 1,
    totalSpent: 4300,
    lastOrder: "08.03.2023",
    registered: "22.02.2023",
    status: "Активен",
    type: "Новый",
  },
  {
    id: 9,
    name: "Сергей Волков",
    email: "sergey@example.com",
    phone: "+7 (921) 901-23-45",
    orders: 0,
    totalSpent: 0,
    lastOrder: "-",
    registered: "01.03.2023",
    status: "Неактивен",
    type: "Новый",
  },
  {
    id: 10,
    name: "Наталья Павлова",
    email: "natalia@example.com",
    phone: "+7 (921) 012-34-56",
    orders: 2,
    totalSpent: 15900,
    lastOrder: "05.03.2023",
    registered: "15.01.2023",
    status: "Активен",
    type: "Новый",
  },
]

export default function ManagerCustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("Все")
  const [selectedType, setSelectedType] = useState("Все")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Фильтрация клиентов
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "Все" || customer.status === selectedStatus
    const matchesType = selectedType === "Все" || customer.type === selectedType

    return matchesSearch && matchesStatus && matchesType
  })

  // Пагинация
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Получение класса для статуса клиента
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Активен":
        return "bg-green-100 text-green-600"
      case "Неактивен":
        return "bg-gray-100 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  // Получение класса для типа клиента
  const getTypeClass = (type: string) => {
    switch (type) {
      case "Постоянный":
        return "bg-purple-100 text-purple-600"
      case "Новый":
        return "bg-blue-100 text-blue-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Клиенты</h1>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
          <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0] flex items-center">
            <UserPlus className="h-4 w-4 mr-2" />
            Добавить клиента
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>База клиентов</CardTitle>
          <CardDescription>
            Управляйте клиентами, просматривайте историю заказов и контактную информацию
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Поиск клиентов..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="text-gray-400 h-4 w-4" />
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Все">Все статусы</SelectItem>
                    <SelectItem value="Активен">Активен</SelectItem>
                    <SelectItem value="Неактивен">Неактивен</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Тип клиента" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Все">Все типы</SelectItem>
                    <SelectItem value="Постоянный">Постоянный</SelectItem>
                    <SelectItem value="Новый">Новый</SelectItem>
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
                    setSelectedType("Все")
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </div>
          </div>

          {/* Customers Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Контакты</TableHead>
                  <TableHead>Заказы</TableHead>
                  <TableHead>Сумма покупок</TableHead>
                  <TableHead>Последний заказ</TableHead>
                  <TableHead>Регистрация</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCustomers.length > 0 ? (
                  paginatedCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <Badge className={`mt-1 ${getTypeClass(customer.type)}`}>{customer.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-500" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <Phone className="h-3 w-3 mr-1 text-gray-500" />
                          {customer.phone}
                        </div>
                      </TableCell>
                      <TableCell>{customer.orders}</TableCell>
                      <TableCell>{customer.totalSpent.toLocaleString()} ₽</TableCell>
                      <TableCell>{customer.lastOrder}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                          {customer.registered}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusClass(customer.status)}>{customer.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ShoppingBag className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-gray-500">
                      Клиенты не найдены
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredCustomers.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 mt-4">
              <div className="text-sm text-gray-500">
                Показано {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} из {filteredCustomers.length} клиентов
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
    </div>
  )
}
