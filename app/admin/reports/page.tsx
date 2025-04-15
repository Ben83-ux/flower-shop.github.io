"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import {
  CalendarIcon,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
} from "lucide-react"

// Моковые данные для графиков и отчетов
const salesData = [
  { month: "Январь", sales: 125000 },
  { month: "Февраль", sales: 165000 },
  { month: "Март", sales: 190000 },
  { month: "Апрель", sales: 210000 },
  { month: "Май", sales: 250000 },
  { month: "Июнь", sales: 220000 },
  { month: "Июль", sales: 180000 },
  { month: "Август", sales: 195000 },
  { month: "Сентябрь", sales: 230000 },
  { month: "Октябрь", sales: 260000 },
  { month: "Ноябрь", sales: 290000 },
  { month: "Декабрь", sales: 350000 },
]

const topProducts = [
  { id: 1, name: "Букет «Solar White Extra»", sales: 145, revenue: 1740000, growth: 12.5 },
  { id: 2, name: "Розовые пионы", sales: 132, revenue: 554400, growth: 8.2 },
  { id: 3, name: "Белые лилии", sales: 118, revenue: 448400, growth: -2.3 },
  { id: 4, name: "Микс тюльпанов", sales: 105, revenue: 304500, growth: 5.7 },
  { id: 5, name: "Букет невесты", sales: 98, revenue: 539000, growth: 15.3 },
]

const categoryPerformance = [
  { category: "Букеты", sales: 450, revenue: 2250000, percentage: 45 },
  { category: "Цветы поштучно", sales: 320, revenue: 960000, percentage: 25 },
  { category: "Композиции", sales: 180, revenue: 1080000, percentage: 15 },
  { category: "Подарки", sales: 120, revenue: 600000, percentage: 10 },
  { category: "Другое", sales: 60, revenue: 300000, percentage: 5 },
]

const customerStats = [
  { type: "Новые клиенты", count: 245, growth: 12.5 },
  { type: "Повторные клиенты", count: 178, growth: 8.2 },
  { type: "Постоянные клиенты", count: 132, growth: 5.7 },
  { type: "Корпоративные клиенты", count: 45, growth: 15.3 },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    to: new Date(),
  })

  const [period, setPeriod] = useState("month")

  // Функция для форматирования чисел в денежном формате
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(value)
  }

  // Функция для отображения тренда (рост/падение)
  const renderTrend = (value: number) => {
    if (value > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+{value}%</span>
        </div>
      )
    } else if (value < 0) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span>{value}%</span>
        </div>
      )
    }
    return <span>0%</span>
  }

  // Расчет общей статистики
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0)
  const totalOrders = topProducts.reduce((sum, item) => sum + item.sales, 0)
  const averageOrderValue = Math.round(totalSales / totalOrders)
  const totalCustomers = customerStats.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Отчеты и аналитика</h1>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "dd.MM.yyyy", { locale: ru })} -{" "}
                      {format(dateRange.to, "dd.MM.yyyy", { locale: ru })}
                    </>
                  ) : (
                    format(dateRange.from, "dd.MM.yyyy", { locale: ru })
                  )
                ) : (
                  "Выберите период"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range as { from: Date; to: Date | undefined })}
                locale={ru}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">По дням</SelectItem>
              <SelectItem value="week">По неделям</SelectItem>
              <SelectItem value="month">По месяцам</SelectItem>
              <SelectItem value="quarter">По кварталам</SelectItem>
              <SelectItem value="year">По годам</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Общая выручка</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalSales)}</h3>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+8.2%</span>
                  <span className="text-xs text-gray-500 ml-1">vs. пред. период</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Заказы</p>
                <h3 className="text-2xl font-bold mt-1">{totalOrders}</h3>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+5.7%</span>
                  <span className="text-xs text-gray-500 ml-1">vs. пред. период</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-[#e8f4f2] text-[#8bc4c1]">
                <ShoppingCart className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Средний чек</p>
                <h3 className="text-2xl font-bold mt-1">{formatCurrency(averageOrderValue)}</h3>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+2.3%</span>
                  <span className="text-xs text-gray-500 ml-1">vs. пред. период</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <Package className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Клиенты</p>
                <h3 className="text-2xl font-bold mt-1">{totalCustomers}</h3>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+10.5%</span>
                  <span className="text-xs text-gray-500 ml-1">vs. пред. период</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Вкладки с отчетами */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="sales" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Продажи
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Товары
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center">
            <PieChart className="h-4 w-4 mr-2" />
            Категории
          </TabsTrigger>
          <TabsTrigger value="customers" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Клиенты
          </TabsTrigger>
        </TabsList>

        {/* Вкладка Продажи */}
        <TabsContent value="sales">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Динамика продаж</CardTitle>
                <CardDescription>Общая выручка по месяцам</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end space-x-2">
                  {salesData.map((item, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0] rounded-t-sm transition-all cursor-pointer group relative"
                        style={{ height: `${(item.sales / 350000) * 100}%` }}
                      >
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {formatCurrency(item.sales)}
                        </div>
                      </div>
                      <div className="text-xs mt-1 text-gray-500 w-full text-center truncate">{item.month}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика продаж</CardTitle>
                <CardDescription>Ключевые показатели</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Общая выручка</span>
                    <span className="font-medium">{formatCurrency(totalSales)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Количество заказов</span>
                    <span className="font-medium">{totalOrders}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Средний чек</span>
                    <span className="font-medium">{formatCurrency(averageOrderValue)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Отмененные заказы</span>
                    <span className="font-medium">23 (3.8%)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Возвраты</span>
                    <span className="font-medium">12 (2.0%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Конверсия</span>
                    <span className="font-medium">4.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Вкладка Товары */}
        <TabsContent value="products">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Топ товаров</CardTitle>
                <CardDescription>Самые продаваемые товары за выбранный период</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название товара</TableHead>
                      <TableHead className="text-right">Продажи (шт.)</TableHead>
                      <TableHead className="text-right">Выручка</TableHead>
                      <TableHead className="text-right">Динамика</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-right">{product.sales}</TableCell>
                        <TableCell className="text-right">{formatCurrency(product.revenue)}</TableCell>
                        <TableCell className="text-right">{renderTrend(product.growth)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика товаров</CardTitle>
                <CardDescription>Ключевые показатели</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Всего товаров</span>
                    <span className="font-medium">256</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Активные товары</span>
                    <span className="font-medium">235 (91.8%)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Товары без остатка</span>
                    <span className="font-medium">21 (8.2%)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Новые товары</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Средняя цена</span>
                    <span className="font-medium">{formatCurrency(4500)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Вкладка Категории */}
        <TabsContent value="categories">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Продажи по категориям</CardTitle>
                <CardDescription>Распределение продаж по категориям товаров</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryPerformance.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.category}</span>
                        <span>
                          {formatCurrency(category.revenue)} ({category.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-[#8bc4c1] h-2.5 rounded-full"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика категорий</CardTitle>
                <CardDescription>Ключевые показатели</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Всего категорий</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Самая популярная</span>
                    <span className="font-medium">Букеты</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Наибольшая выручка</span>
                    <span className="font-medium">Букеты</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Наибольший рост</span>
                    <span className="font-medium">Композиции (+15.3%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Наименьший рост</span>
                    <span className="font-medium">Подарки (+2.1%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Вкладка Клиенты */}
        <TabsContent value="customers">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Сегментация клиентов</CardTitle>
                <CardDescription>Распределение клиентов по типам</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Тип клиентов</TableHead>
                      <TableHead className="text-right">Количество</TableHead>
                      <TableHead className="text-right">Доля</TableHead>
                      <TableHead className="text-right">Динамика</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerStats.map((stat, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{stat.type}</TableCell>
                        <TableCell className="text-right">{stat.count}</TableCell>
                        <TableCell className="text-right">{Math.round((stat.count / totalCustomers) * 100)}%</TableCell>
                        <TableCell className="text-right">{renderTrend(stat.growth)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика клиентов</CardTitle>
                <CardDescription>Ключевые показатели</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Всего клиентов</span>
                    <span className="font-medium">{totalCustomers}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Новые клиенты</span>
                    <span className="font-medium">245 (41%)</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Повторные покупки</span>
                    <span className="font-medium">58%</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-sm text-gray-500">Средний LTV</span>
                    <span className="font-medium">{formatCurrency(15800)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Стоимость привлечения</span>
                    <span className="font-medium">{formatCurrency(850)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
