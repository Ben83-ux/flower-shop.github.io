"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Search, MoreVertical, Edit, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Upload } from "lucide-react"

// Моковые данные для категорий
const categories = [
  {
    id: 1,
    name: "Розы",
    slug: "roses",
    image: "/placeholder.svg?height=100&width=100",
    productsCount: 24,
    isActive: true,
  },
  {
    id: 2,
    name: "Тюльпаны",
    slug: "tulips",
    image: "/placeholder.svg?height=100&width=100",
    productsCount: 18,
    isActive: true,
  },
  {
    id: 3,
    name: "Пионы",
    slug: "peonies",
    image: "/placeholder.svg?height=100&width=100",
    productsCount: 12,
    isActive: true,
  },
  {
    id: 4,
    name: "Лилии",
    slug: "lilies",
    image: "/placeholder.svg?height=100&width=100",
    productsCount: 15,
    isActive: true,
  },
  {
    id: 5,
    name: "Орхидеи",
    slug: "orchids",
    image: "/placeholder.svg?height=100&width=100",
    productsCount: 9,
    isActive: true,
  },
  {
    id: 6,
    name: "Букеты",
    slug: "bouquets",
    image: "/placeholder.svg?height=100&width=100",
    productsCount: 32,
    isActive: true,
  },
  {
    id: 7,
    name: "Композиции",
    slug: "compositions",
    image: "/placeholder.svg?height=100&width=100",
    productsCount: 14,
    isActive: true,
  },
  {
    id: 8,
    name: "Подарки",
    slug: "gifts",
    image: "/placeholder.svg?height=100&width=100",
    productsCount: 21,
    isActive: true,
  },
  {
    id: 9,
    name: "Свадебные",
    slug: "wedding",
    image: "/placeholder.svg?height=100&width=100",
    productsCount: 8,
    isActive: false,
  },
  {
    id: 10,
    name: "Комнатные",
    slug: "indoor",
    image: "/placeholder.svg?height=100&width=100",
    productsCount: 16,
    isActive: true,
  },
]

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    isActive: true,
  })
  const itemsPerPage = 5

  // Фильтрация категорий
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Пагинация
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const paginatedCategories = filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Обработчики выбора категорий
  const toggleSelectCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    } else {
      setSelectedCategories([...selectedCategories, categoryId])
    }
  }

  const toggleSelectAll = () => {
    if (selectedCategories.length === paginatedCategories.length) {
      setSelectedCategories([])
    } else {
      setSelectedCategories(paginatedCategories.map((category) => category.id))
    }
  }

  // Обработчик добавления категории
  const handleAddCategory = () => {
    // Здесь будет логика добавления категории
    console.log("Добавление категории:", newCategory)
    setIsAddDialogOpen(false)
    setNewCategory({
      name: "",
      slug: "",
      isActive: true,
    })
  }

  // Обработчик изменения полей новой категории
  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCategory({
      ...newCategory,
      [name]: value,
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление категориями</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">
              <Plus className="h-4 w-4 mr-2" />
              Добавить категорию
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить новую категорию</DialogTitle>
              <DialogDescription>Заполните информацию о новой категории товаров</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Название
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newCategory.name}
                  onChange={handleNewCategoryChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="slug" className="text-right">
                  URL-slug
                </Label>
                <Input
                  id="slug"
                  name="slug"
                  value={newCategory.slug}
                  onChange={handleNewCategoryChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Изображение
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 border rounded-md flex items-center justify-center bg-gray-50">
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                    <Button variant="outline" size="sm">
                      Загрузить
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Активна</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isActive"
                    checked={newCategory.isActive}
                    onCheckedChange={(checked) =>
                      setNewCategory({
                        ...newCategory,
                        isActive: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="isActive">Отображать категорию на сайте</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddCategory} className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">
                Сохранить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Поиск категорий..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={paginatedCategories.length > 0 && selectedCategories.length === paginatedCategories.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Название
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Изображение</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    URL-slug
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Товары
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => toggleSelectCategory(category.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image
                          src={category.image || "/placeholder.svg"}
                          alt={category.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{category.slug}</TableCell>
                    <TableCell>{category.productsCount}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          category.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {category.isActive ? "Активна" : "Неактивна"}
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
                    Категории не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {filteredCategories.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-gray-500">
              Показано {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredCategories.length)} из {filteredCategories.length} категорий
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
