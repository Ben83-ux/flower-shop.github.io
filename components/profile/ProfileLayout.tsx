"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import type { User } from "@/types/user"
import { cn } from "@/lib/utils"

interface ProfileLayoutProps {
  user: User | null
  children: ReactNode
  activeTab: string
}

export default function ProfileLayout({ user, children, activeTab }: ProfileLayoutProps) {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Необходима авторизация</h1>
          <p className="mb-4">Для доступа к личному кабинету необходимо войти в аккаунт</p>
          <Link href="/login" className="inline-block bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white py-2 px-4 rounded-md">
            Войти
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: "profile", label: "Профиль", href: "/profile" },
    { id: "orders", label: "Заказы", href: "/profile/orders" },
    { id: "favorites", label: "Избранное", href: "/profile/favorites" },
    { id: "cashback", label: "Бонусы", href: "/profile/cashback" },
    { id: "subscription", label: "Подписка", href: "/profile/subscription" },
    { id: "payment", label: "Способы оплаты", href: "/profile/payment" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Личный кабинет</h1>
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-[#8bc4c1]">
            Главная
          </Link>
          <span className="mx-2">→</span>
          <Link href="/profile" className="hover:text-[#8bc4c1]">
            Личный кабинет
          </Link>
          {activeTab !== "profile" && (
            <>
              <span className="mx-2">→</span>
              <span>{tabs.find((tab) => tab.id === activeTab)?.label}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-wrap mb-6 border-b">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "px-4 py-3 font-medium text-sm",
              activeTab === tab.id
                ? "border-b-2 border-[#8bc4c1] text-[#8bc4c1]"
                : "text-gray-600 hover:text-[#8bc4c1]",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">{children}</div>
    </div>
  )
}
