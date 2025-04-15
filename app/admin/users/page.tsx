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
  UserPlus,
  Mail,
  Lock,
} from "lucide-react"

// Моковые данные для пользователей
const users = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (921) 123-45-67",
    role: "Клиент",
    orders: 5,
    registered: "15.01.2023",
    status: "Активен",
  },
  {
    id: 2,
    name: "Анна Сидорова",
    email: "anna@example.com",
    phone: "+7 (921) 234-56-78",
    role: "Клиент",
    orders: 3,
    registered: "20.01.2023",
    status: "Активен",
  },
  {
    id: 3,
    name: "Петр Иванов",
    email: "petr@example.com",
    phone: "+7 (921) 345-67-89",
    role: "Клиент",
    orders: 1,
    registered: "25.01.2023",
    status: "Неактивен",
  },
  {
    id: 4,
    name: "Мария Кузнецова",
    email: "maria@example.com",
    phone: "+7 (921) 456-78-90",
    role: "Администратор",
    orders: 0,
    registered: "10.01.2023",
    status: "Активен",
  },
  {
    id: 5,
    name: "Алексей Смирнов",
    email: "alexey@example.com",
    phone: "+7 (921) 567-89-01",
    role: "Клиент",
    orders: 2,
    registered: "05.02.2023",
    status: "Активен",
  },
  {
    id: 6,
    name: "Елена Козлова",
    email: "elena@example.com",
    phone: "+7 (921) 678-90-12",
    role: "Клиент",
    orders: 4,
    registered: "12.02.2023",
    status: "Активен",
  },
  {
    id: 7,
    name: "Дмитрий Новиков",
    email: "dmitry@example.com",
    phone: "+7 (921) 789-01-23",
    role: "Менеджер",
    orders: 0,
    registered: "18.02.2023",
    status: "Активен",
  },
  {
    id: 8,
    name: "Ольга Морозова",
    email: "olga@example.com",
    phone: "+7 (921) 890-12-34",
    role: "Клиент",
    orders: 1,
    registered: "22.02.2023",
    status: "Неактивен",
  },
  {
    id: 9,
    name: "Сергей Волков",
    email: "sergey@example.com",
    phone: "+7 (921) 901-23-45",
    role: "Клиент",
    orders: 0,
    registered: "01.03.2023",
    status: "Активен",
  },
  {
    id: 10,
    name: "Наталья Павлова",
    email: "natalia@example.com",
    phone: "+7 (921) 012-34-56",
    role: "Клиент",
    orders: 2,
    registered: "05.03.2023",
    status: "Активен",
  },
]

// Роли для фильтрации
const roles = ["Все", "Клиент", "Администратор", "Менеджер"]
const statuses = ["Все", "Активен", "Неактивен"]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("Все")
  const [selectedStatus, setSelectedStatus] = useState("Все")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Фильтрация пользователей
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "Все" || user.role === selectedRole
    const matchesStatus = selectedStatus === "Все" || user.status === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  // Пагинация
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Обработчики выбора пользователей
  const toggleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const toggleSelectAll = () => {
    if (selectedUsers.length === paginatedUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(paginatedUsers.map((user) => user.id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление пользователями</h1>
        <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">
          <UserPlus className="h-4 w-4 mr-2" />
          Добавить пользователя
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Поиск пользователей..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 h-4 w-4" />
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
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

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Имя
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Контакты</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Роль
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Заказы
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Регистрация
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleSelectUser(user.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3 w-3 mr-1 text-gray-500" />
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.orders}</TableCell>
                    <TableCell>{user.registered}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Активен" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.status}
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
                          <DropdownMenuItem>
                            <Lock className="h-4 w-4 mr-2" />
                            Сбросить пароль
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
                    Пользователи не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-gray-500">
              Показано {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} из {filteredUsers.length} пользователей
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
