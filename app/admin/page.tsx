"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Calendar,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Моковые данные для статистики
const stats = [
  {
    title: "Выручка",
    value: "₽256,500",
    change: "+12.5%",
    trend: "up",
    icon: <DollarSign className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Заказы",
    value: "145",
    change: "+8.2%",
    trend: "up",
    icon: <ShoppingBag className="h-5 w-5" />,
    color: "bg-[#e8f4f2] text-[#8bc4c1]",
  },
  {
    title: "Клиенты",
    value: "98",
    change: "+5.7%",
    trend: "up",
    icon: <Users className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Товары",
    value: "256",
    change: "-2.3%",
    trend: "down",
    icon: <Package className="h-5 w-5" />,
    color: "bg-amber-100 text-amber-600",
  },
]

// Моковые данные для последних заказов
const recentOrders = [
  {
    id: "ORD-001",
    customer: "Иван Петров",
    date: "15.03.2023",
    amount: "₽12,500",
    status: "Доставлен",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: "ORD-002",
    customer: "Анна Сидорова",
    date: "14.03.2023",
    amount: "₽8,200",
    status: "В пути",
    statusColor: "bg-blue-100 text-blue-600",
  },
  {
    id: "ORD-003",
    customer: "Петр Иванов",
    date: "14.03.2023",
    amount: "₽5,700",
    status: "Обработка",
    statusColor: "bg-amber-100 text-amber-600",
  },
  {
    id: "ORD-004",
    customer: "Мария Кузнецова",
    date: "13.03.2023",
    amount: "₽15,300",
    status: "Доставлен",
    statusColor: "bg-green-100 text-green-600",
  },
  {
    id: "ORD-005",
    customer: "Алексей Смирнов",
    date: "13.03.2023",
    amount: "₽7,800",
    status: "Отменен",
    statusColor: "bg-red-100 text-red-600",
  },
]

// Моковые данные для популярных товаров
const popularProducts = [
  {
    id: 1,
    name: "Букет «Solar White Extra»",
    category: "Букеты",
    price: "₽12,000",
    sales: 45,
  },
  {
    id: 2,
    name: "Розовые пионы",
    category: "Цветы",
    price: "₽4,200",
    sales: 38,
  },
  {
    id: 3,
    name: "Белые лилии",
    category: "Цветы",
    price: "₽3,800",
    sales: 32,
  },
  {
    id: 4,
    name: "Микс тюльпанов",
    category: "Букеты",
    price: "₽2,900",
    sales: 28,
  },
  {
    id: 5,
    name: "Букет невесты",
    category: "Свадебные",
    price: "₽5,500",
    sales: 25,
  },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7days")

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Панель управления</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Сегодня</SelectItem>
              <SelectItem value="yesterday">Вчера</SelectItem>
              <SelectItem value="7days">Последние 7 дней</SelectItem>
              <SelectItem value="30days">Последние 30 дней</SelectItem>
              <SelectItem value="90days">Последние 90 дней</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <div className="flex items-center mt-1">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">vs. пред. период</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${stat.color}`}>{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Последние заказы</CardTitle>
              <Link href="/admin/orders" className="text-sm text-[#8bc4c1] hover:underline flex items-center">
                Все заказы
                <TrendingUp className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <CardDescription>Последние 5 заказов в системе</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b">
                    <th className="font-medium text-left py-2">ID</th>
                    <th className="font-medium text-left py-2">Клиент</th>
                    <th className="font-medium text-left py-2">Дата</th>
                    <th className="font-medium text-left py-2">Сумма</th>
                    <th className="font-medium text-left py-2">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-3 text-sm font-medium">{order.id}</td>
                      <td className="py-3 text-sm">{order.customer}</td>
                      <td className="py-3 text-sm text-gray-500">{order.date}</td>
                      <td className="py-3 text-sm font-medium">{order.amount}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${order.statusColor}`}>{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Popular Products */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle>Популярные товары</CardTitle>
              <Link href="/admin/products" className="text-sm text-[#8bc4c1] hover:underline flex items-center">
                Все товары
                <TrendingUp className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <CardDescription>Топ-5 продаваемых товаров</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularProducts.map((product) => (
                <div key={product.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-medium">{product.name}</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">{product.category}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs font-medium">{product.price}</span>
                    </div>
                  </div>
                  <div className="bg-[#e8f4f2] text-[#8bc4c1] px-2 py-1 rounded text-xs font-medium">
                    {product.sales} продаж
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
