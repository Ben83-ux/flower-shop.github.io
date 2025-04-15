"use client"

import { useState, useEffect } from "react"
import type { Subscription } from "@/types/user"
import { getUserSubscription } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"

export default function SubscriptionInfo() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscription = async () => {
      setIsLoading(true)
      const data = await getUserSubscription()
      setSubscription(data)
      setIsLoading(false)
    }

    fetchSubscription()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!subscription) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-6">Подписка на цветы</h2>

        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-2">У вас пока нет активной подписки</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Оформите подписку на регулярную доставку цветов и получайте свежие букеты каждую неделю или месяц
          </p>
          <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">Оформить подписку</Button>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Преимущества подписки</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Экономия времени</h4>
              <p className="text-sm text-gray-600">
                Не нужно каждый раз заказывать букет — мы доставим его автоматически
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Выгодная цена</h4>
              <p className="text-sm text-gray-600">Подписка дешевле, чем регулярные разовые заказы</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Свежие цветы</h4>
              <p className="text-sm text-gray-600">Мы отбираем лучшие цветы для наших подписчиков</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Подписка на цветы</h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="flex flex-wrap justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">
              Периодическая {subscription.plan === "standard" ? "Standard" : "Premium"}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Активная подписка</p>
          </div>

          <div className="mt-2 sm:mt-0">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Активна
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Действует до</p>
            <p className="font-medium">{formatDate(subscription.expiryDate)}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Следующая доставка</p>
            <p className="font-medium">{formatDate(subscription.nextDeliveryDate)}</p>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <Button variant="outline" className="text-[#8bc4c1] border-[#8bc4c1] hover:bg-[#8bc4c1] hover:text-white">
            Изменить план
          </Button>
          <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
            Отменить подписку
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">История доставок</h3>

        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Букет
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">12.12.2023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Букет "Весеннее настроение"</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Доставлен
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm">12.11.2023</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Букет "Зимняя сказка"</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Доставлен
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
