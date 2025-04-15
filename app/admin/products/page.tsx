"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Моковые данные для товаров
const products = [
  {
    id: 1,
    name: "Букет «Solar White Extra»",
    image: "/placeholder.svg?height=300&width=300",
    category: "Букеты",
    price: 12000,
    stock: 15,
    status: "В наличии",
  },
  {
    id: 2,
    name: "Розовые пионы",
    image: "/placeholder.svg?height=300&width=300",
    category: "Цветы",
    price: 4200,
    stock: 8,
    status: "В наличии",
  },
  {
    id: 3,
    name: "Белые лилии",
    image: "/placeholder.svg?height=300&width=300",
    category: "Цветы",
    price: 3800,
    stock: 12,
    status: "В наличии",
  },
  {
    id: 4,
    name: "Микс тюльпанов",
    image: "/placeholder.svg?height=300&width=300",
    category: "Букеты",
    price: 2900,
    stock: 0,
    status: "Нет в наличии",
  },
  {
    id: 5,
    name: "Букет невесты",
    image: "/placeholder.svg?height=300&width=300",
    category: "Свадебные",
    price: 5500,
    stock: 3,
    status: "В наличии",
  },
  {
    id: 6,
    name: "Розы в коробке",
    image: "/placeholder.svg?height=300&width=300",
    category: "В коробке",
    price: 4800,
    stock: 7,
    status: "В наличии",
  },
  {
    id: 7,
    name: "Полевые цветы",
    image: "/placeholder.svg?height=300&width=300",
    category: "Букеты",
    price: 3200,
    stock: 5,
    status: "В наличии",
  },
  {
    id: 8,
    name: "Орхидеи",
    image: "/placeholder.svg?height=300&width=300",
    category: "Цветы",
    price: 6500,
    stock: 0,
    status: "Нет в наличии",
  },
  {
    id: 9,
    name: "Букет «Весенний»",
    image: "/placeholder.svg?height=300&width=300",
    category: "Букеты",
    price: 3700,
    stock: 9,
    status: "В наличии",
  },
  {
    id: 10,
    name: "Красные розы",
    image: "/placeholder.svg?height=300&width=300",
    category: "Цветы",
    price: 5200,
    stock: 11,
    status: "В наличии",
  },
]

// Категории для фильтрации
const categories = ["Все", "Букеты", "Цветы", "В коробке", "Свадебные"]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Все")
  const [selectedStatus, setSelectedStatus] = useState("Все")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Фильтрация товаров
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Все" || product.category === selectedCategory
    const matchesStatus =
      selectedStatus === "Все" ||
      (selectedStatus === "В наличии" && product.stock > 0) ||
      (selectedStatus === "Нет в наличии" && product.stock === 0)

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Обработчики выбора товаров
  const toggleSelectProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(paginatedProducts.map((product) => product.id))
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление товарами</h1>
        <Link href="/admin/products/add">
          <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">
            <Plus className="h-4 w-4 mr-2" />
            Добавить товар
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Поиск товаров..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400 h-4 w-4" />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
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
                <SelectItem value="Все">Все статусы</SelectItem>
                <SelectItem value="В наличии">В наличии</SelectItem>
                <SelectItem value="Нет в наличии">Нет в наличии</SelectItem>
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

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={paginatedProducts.length > 0 && selectedProducts.length === paginatedProducts.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Товар</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Категория
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Цена
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Остаток
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleSelectProduct(product.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 mr-3 rounded overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.price.toLocaleString()} ₽</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          product.stock > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}
                      >
                        {product.status}
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
                  <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                    Товары не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-gray-500">
              Показано {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} из {filteredProducts.length} товаров
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
