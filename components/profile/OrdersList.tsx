"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import type { Order } from "@/types/user"
import { getUserOrders } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate, formatPrice } from "@/lib/utils"

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      const data = await getUserOrders()
      setOrders(data)
      setIsLoading(false)
    }

    fetchOrders()
  }, [])

  const getStatusBadge = (status: Order["status"]) => {
    const statusMap: Record<Order["status"], { label: string; className: string }> = {
      pending: { label: "Ожидает обработки", className: "bg-yellow-100 text-yellow-800" },
      processing: { label: "В обработке", className: "bg-blue-100 text-blue-800" },
      shipped: { label: "Отправлен", className: "bg-purple-100 text-purple-800" },
      delivered: { label: "Доставлен", className: "bg-green-100 text-green-800" },
      cancelled: { label: "Отменен", className: "bg-red-100 text-red-800" },
    }

    const { label, className } = statusMap[status]
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>{label}</span>
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">У вас пока нет заказов</h2>
        <p className="text-gray-500 mb-6">Самое время выбрать красивый букет!</p>
        <Link href="/catalog">
          <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">Перейти в каталог</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Мои заказы</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 flex flex-wrap justify-between items-center">
              <div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Заказ №{order.id}</span>
                  <span className="text-sm text-gray-500">от {formatDate(order.createdAt)}</span>
                  {getStatusBadge(order.status)}
                </div>
                <div className="mt-1">
                  <span className="font-medium">{formatPrice(order.totalAmount)} ₽</span>
                  {order.cashbackEarned > 0 && (
                    <span className="ml-2 text-sm text-green-600">+{order.cashbackEarned} ₽ кэшбэк</span>
                  )}
                </div>
              </div>

              <Link href={`/profile/orders/${order.id}`}>
                <Button variant="outline" size="sm" className="mt-2 sm:mt-0">
                  Подробнее
                </Button>
              </Link>
            </div>

            <div className="p-4">
              <div className="flex flex-wrap gap-4">
                {order.items.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                      {item.productImage ? (
                        <Image
                          src={item.productImage || "/placeholder.svg"}
                          alt={item.productName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">Нет фото</div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.productName}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} шт. × {formatPrice(item.price)} ₽
                      </p>
                    </div>
                  </div>
                ))}

                {order.items.length > 4 && (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500">и еще {order.items.length - 4} товаров</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
