"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Tag,
  Settings,
  Truck,
  BarChart3,
  Percent,
  CreditCard,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarLink {
  href: string
  label: string
  icon: React.ReactNode
  subItems?: { href: string; label: string }[]
}

export default function AdminSidebar() {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const links: SidebarLink[] = [
    {
      href: "/admin",
      label: "Панель управления",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      href: "/admin/orders",
      label: "Заказы",
      icon: <ShoppingBag className="h-5 w-5" />,
    },
    {
      href: "/admin/products",
      label: "Товары",
      icon: <Package className="h-5 w-5" />,
      subItems: [
        { href: "/admin/products", label: "Все товары" },
        { href: "/admin/products/add", label: "Добавить товар" },
      ],
    },
    {
      href: "/admin/categories",
      label: "Категории",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      href: "/admin/users",
      label: "Пользователи",
      icon: <Users className="h-5 w-5" />,
    },
    {
      href: "/admin/reports",
      label: "Отчеты",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      href: "/admin/delivery-settings",
      label: "Доставка",
      icon: <Truck className="h-5 w-5" />,
    },
    {
      href: "/admin/discounts",
      label: "Скидки и акции",
      icon: <Percent className="h-5 w-5" />,
    },
    {
      href: "/admin/payments",
      label: "Платежи",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      href: "/admin/settings",
      label: "Настройки",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const toggleSubmenu = (href: string) => {
    if (openSubmenu === href) {
      setOpenSubmenu(null)
    } else {
      setOpenSubmenu(href)
    }
  }

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
            <Link href="/admin" className="flex items-center">
              <div className="relative w-32 h-16">
                <Image src="/images/logo.png" alt="NFLOWER.RU" fill className="object-contain" />
              </div>
              <span className="ml-2 font-semibold text-gray-800">Админ</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {links.map((link) => (
                <li key={link.href}>
                  {link.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleSubmenu(link.href)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-sm ${
                          isActive(link.href) ? "bg-[#e8f4f2] text-[#8bc4c1]" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center">
                          {link.icon}
                          <span className="ml-3">{link.label}</span>
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            openSubmenu === link.href ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>
                      {openSubmenu === link.href && (
                        <ul className="mt-1 ml-6 space-y-1">
                          {link.subItems.map((subItem) => (
                            <li key={subItem.href}>
                              <Link
                                href={subItem.href}
                                className={`block px-3 py-2 rounded-md text-sm ${
                                  pathname === subItem.href
                                    ? "bg-[#e8f4f2] text-[#8bc4c1]"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm ${
                        isActive(link.href) ? "bg-[#e8f4f2] text-[#8bc4c1]" : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon}
                      <span className="ml-3">{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* User */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#8bc4c1] flex items-center justify-center text-white">A</div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Администратор</p>
                <p className="text-xs text-gray-500">admin@nflower.ru</p>
              </div>
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
