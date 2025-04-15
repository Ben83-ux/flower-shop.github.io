"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  CheckSquare,
  Truck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface SidebarLink {
  href: string
  label: string
  icon: React.ReactNode
  badge?: number
}

export default function ManagerSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const links: SidebarLink[] = [
    {
      href: "/manager/dashboard",
      label: "Панель управления",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/manager/orders",
      label: "Заказы",
      icon: <ShoppingBag className="h-5 w-5" />,
      badge: 5,
    },
    {
      href: "/manager/customers",
      label: "Клиенты",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/manager/schedule",
      label: "Расписание",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      href: "/manager/tasks",
      label: "Задачи",
      icon: <CheckSquare className="h-5 w-5" />,
      badge: 3,
    },
    {
      href: "/manager/delivery",
      label: "Доставка",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      href: "/manager/messages",
      label: "Сообщения",
      icon: <MessageSquare className="h-5 w-5" />,
      badge: 2,
    },
    {
      href: "/manager/notifications",
      label: "Уведомления",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      href: "/manager/settings",
      label: "Настройки",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <Button
          variant="outline"
          size="icon"
          className="bg-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 w-64 fixed top-0 bottom-0 left-0 z-20 transition-transform duration-300 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link href="/manager/dashboard" className="flex items-center">
              <div className="relative w-32 h-16">
                <Image src="/images/logo.png" alt="NFLOWER.RU" fill className="object-contain" />
              </div>
              <span className="ml-2 font-semibold text-gray-800">Менеджер</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-sm ${
                      isActive(link.href) ? "bg-[#e8f4f2] text-[#8bc4c1]" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      {link.icon}
                      <span className="ml-3">{link.label}</span>
                    </div>
                    {link.badge && (
                      <Badge variant="default" className="bg-[#8bc4c1]">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Мария Иванова" />
                <AvatarFallback className="bg-[#8bc4c1] text-white">МИ</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Мария Иванова</p>
                <p className="text-xs text-gray-500">Старший менеджер</p>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full justify-start text-gray-700" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  )
}
