"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Eye, EyeOff, Info } from "lucide-react"

// Моковые данные для филиалов
const branches = [
  {
    id: 1,
    name: "Филиал на 21-й Амурской",
    address: "г.Омск, ул. 21-я Амурская, д. 37",
  },
  {
    id: 2,
    name: "Филиал на Декабристов",
    address: "г.Омск, ул. Декабристов, д. 98",
  },
  {
    id: 3,
    name: "Филиал на 2-й Поселковой",
    address: "г.Омск, ул. 2-я Поселковая, д. 24",
  },
]

export default function AddUserPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "client", // client, manager, courier, admin
    isActive: true,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedBranches, setSelectedBranches] = useState<string[]>([])
  const [deliveryZones, setDeliveryZones] = useState("")
  const [workingHours, setWorkingHours] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setUserData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleBranch = (branchId: string) => {
    if (selectedBranches.includes(branchId)) {
      setSelectedBranches(selectedBranches.filter((id) => id !== branchId))
    } else {
      setSelectedBranches([...selectedBranches, branchId])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Проверка паролей
    if (userData.password !== userData.confirmPassword) {
      alert("Пароли не совпадают!")
      return
    }

    // Проверка выбора филиалов для менеджера и курьера
    if ((userData.role === "manager" || userData.role === "courier") && selectedBranches.length === 0) {
      alert("Выберите хотя бы один филиал!")
      return
    }

    // Здесь будет логика сохранения пользователя
    console.log({
      ...userData,
      branches: selectedBranches,
      deliveryZones: userData.role === "courier" ? deliveryZones : undefined,
      workingHours: userData.role === "courier" || userData.role === "manager" ? workingHours : undefined,
    })
    alert("Пользователь успешно добавлен!")
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/admin/users" className="text-[#8bc4c1] hover:underline flex items-center mr-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Назад к списку пользователей
        </Link>
        <h1 className="text-2xl font-bold">Добавление нового пользователя</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="general">Основное</TabsTrigger>
                <TabsTrigger value="role">Роль и доступ</TabsTrigger>
                <TabsTrigger value="branches">Филиалы</TabsTrigger>
              </TabsList>

              {/* General Tab */}
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Основная информация</CardTitle>
                    <CardDescription>Заполните основную информацию о пользователе</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">ФИО *</Label>
                        <Input id="name" name="name" value={userData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={userData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        placeholder="+7 (XXX) XXX-XX-XX"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль *</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={userData.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Подтверждение пароля *</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={userData.confirmPassword}
                          onChange={handleChange}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isActive"
                        checked={userData.isActive}
                        onCheckedChange={(checked) => handleCheckboxChange("isActive", checked as boolean)}
                      />
                      <Label htmlFor="isActive">Активный пользователь</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Role Tab */}
              <TabsContent value="role">
                <Card>
                  <CardHeader>
                    <CardTitle>Роль и права доступа</CardTitle>
                    <CardDescription>Выберите роль пользователя в системе</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Роль пользователя *</Label>
                      <Select value={userData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Выберите роль" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="client">Клиент</SelectItem>
                          <SelectItem value="manager">Менеджер</SelectItem>
                          <SelectItem value="courier">Курьер</SelectItem>
                          <SelectItem value="admin">Администратор</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {userData.role === "manager" && (
                      <div className="p-4 bg-blue-50 rounded-md">
                        <h3 className="font-medium text-blue-700 mb-2">Права менеджера</h3>
                        <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                          <li>Управление заказами</li>
                          <li>Просмотр товаров</li>
                          <li>Работа с клиентами</li>
                          <li>Доступ только к назначенным филиалам</li>
                        </ul>
                      </div>
                    )}

                    {userData.role === "courier" && (
                      <div className="p-4 bg-blue-50 rounded-md">
                        <h3 className="font-medium text-blue-700 mb-2">Права курьера</h3>
                        <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                          <li>Просмотр назначенных доставок</li>
                          <li>Обновление статуса доставки</li>
                          <li>Доступ только к назначенным филиалам</li>
                        </ul>
                      </div>
                    )}

                    {userData.role === "admin" && (
                      <div className="p-4 bg-blue-50 rounded-md">
                        <h3 className="font-medium text-blue-700 mb-2">Права администратора</h3>
                        <ul className="list-disc list-inside text-sm text-blue-600 space-y-1">
                          <li>Полный доступ ко всем разделам</li>
                          <li>Управление пользователями</li>
                          <li>Настройка системы</li>
                          <li>Доступ ко всем филиалам</li>
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Branches Tab */}
              <TabsContent value="branches">
                <Card>
                  <CardHeader>
                    <CardTitle>Филиалы и зоны работы</CardTitle>
                    <CardDescription>
                      {userData.role === "manager"
                        ? "Выберите филиалы, которыми будет управлять менеджер"
                        : userData.role === "courier"
                          ? "Выберите филиалы, из которых будет осуществляться доставка"
                          : "Настройки филиалов доступны только для менеджеров и курьеров"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {(userData.role === "manager" || userData.role === "courier") && (
                      <>
                        <div>
                          <Label className="block mb-2">Филиалы *</Label>
                          <div className="grid grid-cols-1 gap-2">
                            {branches.map((branch) => (
                              <div
                                key={branch.id}
                                className={`border rounded-md p-3 cursor-pointer transition-colors ${
                                  selectedBranches.includes(branch.id.toString())
                                    ? "border-[#8bc4c1] bg-[#e8f4f2]"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => toggleBranch(branch.id.toString())}
                              >
                                <div className="flex items-center">
                                  <Checkbox
                                    checked={selectedBranches.includes(branch.id.toString())}
                                    onCheckedChange={() => toggleBranch(branch.id.toString())}
                                    className="mr-2"
                                  />
                                  <div>
                                    <div className="font-medium">{branch.name}</div>
                                    <div className="text-sm text-gray-500">{branch.address}</div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="workingHours">Рабочие часы</Label>
                          <Input
                            id="workingHours"
                            value={workingHours}
                            onChange={(e) => setWorkingHours(e.target.value)}
                            placeholder="Например: 09:00 - 18:00, Пн-Пт"
                          />
                        </div>

                        {userData.role === "courier" && (
                          <div className="space-y-2">
                            <Label htmlFor="deliveryZones">Зоны доставки</Label>
                            <Input
                              id="deliveryZones"
                              value={deliveryZones}
                              onChange={(e) => setDeliveryZones(e.target.value)}
                              placeholder="Например: Центральный район, Советский район"
                            />
                          </div>
                        )}
                      </>
                    )}

                    {userData.role === "client" && (
                      <div className="flex items-center justify-center h-40 text-gray-500">
                        Для клиентов настройка филиалов не требуется
                      </div>
                    )}

                    {userData.role === "admin" && (
                      <div className="flex items-center justify-center h-40 text-gray-500">
                        Администраторы имеют доступ ко всем филиалам
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2 text-sm">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                  <p className="text-gray-600">Заполните все обязательные поля, отмеченные звездочкой (*).</p>
                </div>
                {(userData.role === "manager" || userData.role === "courier") && (
                  <div className="flex items-start space-x-2 text-sm">
                    <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                    <p className="text-gray-600">
                      Не забудьте выбрать филиалы для {userData.role === "manager" ? "менеджера" : "курьера"}.
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button type="submit" className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0]">
                  Сохранить пользователя
                </Button>
                <Button type="button" variant="outline" className="w-full" onClick={() => window.history.back()}>
                  Отмена
                </Button>
              </CardFooter>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Информация о пользователе</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">ФИО:</span>
                    <p className="font-medium">{userData.name || "Не указано"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Email:</span>
                    <p className="font-medium">{userData.email || "Не указано"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Телефон:</span>
                    <p className="font-medium">{userData.phone || "Не указано"}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Роль:</span>
                    <p className="font-medium">
                      {userData.role === "client"
                        ? "Клиент"
                        : userData.role === "manager"
                          ? "Менеджер"
                          : userData.role === "courier"
                            ? "Курьер"
                            : "Администратор"}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Статус:</span>
                    <p className="font-medium">{userData.isActive ? "Активен" : "Неактивен"}</p>
                  </div>
                  {(userData.role === "manager" || userData.role === "courier") && selectedBranches.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-500">Филиалы:</span>
                      <p className="font-medium">
                        {selectedBranches.map((id) => branches.find((b) => b.id.toString() === id)?.name).join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
