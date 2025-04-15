"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Bell, Search, Settings, User, LogOut, Menu, X, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function ManagerHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo and mobile menu button */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Открыть меню</span>
          </Button>

          <Link href="/manager/dashboard" className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <Image src="/images/logo.png" alt="NFLOWER.RU" fill className="object-contain" />
            </div>
            <span className="hidden md:inline-block font-bold text-xl">Панель менеджера</span>
          </Link>
        </div>

        {/* Search */}
        <div className="hidden md:flex md:w-1/3 lg:w-1/4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск заказов..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Поиск">
            <Search className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">2</Badge>
                <span className="sr-only">Сообщения</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Сообщения</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {[1, 2].map((item) => (
                  <DropdownMenuItem key={item} className="cursor-pointer py-3">
                    <div>
                      <p className="font-medium">Анна Иванова</p>
                      <p className="text-sm text-muted-foreground truncate">
                        Здравствуйте, подскажите пожалуйста, когда будет доставлен мой заказ?
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleString()}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer justify-center font-medium">
                <Link href="/manager/messages">Все сообщения</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">5</Badge>
                <span className="sr-only">Уведомления</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Уведомления</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {[1, 2, 3, 4, 5].map((item) => (
                  <DropdownMenuItem key={item} className="cursor-pointer py-3">
                    <div>
                      <p className="font-medium">Новый заказ #{1000 + item}</p>
                      <p className="text-sm text-muted-foreground">Требуется подтверждение заказа</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date().toLocaleString()}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer justify-center font-medium">
                <Link href="/manager/notifications">Все уведомления</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
                <span className="sr-only">Профиль</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/manager/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Профиль</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/manager/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Настройки</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden">
          <div className="fixed inset-y-0 left-0 z-50 w-3/4 max-w-xs bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <Link href="/manager/dashboard" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="relative h-8 w-8 mr-2">
                  <Image src="/images/logo.png" alt="NFLOWER.RU" fill className="object-contain" />
                </div>
                <span className="font-bold text-xl">Панель менеджера</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Закрыть меню</span>
              </Button>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск заказов..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <nav className="flex flex-col space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold">Основное</h3>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                    asChild
                  >
                    <Link href="/manager/dashboard">Дашборд</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                    asChild
                  >
                    <Link href="/manager/orders">Заказы</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                    asChild
                  >
                    <Link href="/manager/customers">Клиенты</Link>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Коммуникации</h3>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                    asChild
                  >
                    <Link href="/manager/messages">Сообщения</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                    asChild
                  >
                    <Link href="/manager/notifications">Уведомления</Link>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-semibold">Управление</h3>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                    asChild
                  >
                    <Link href="/manager/delivery">Доставка</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsMobileMenuOpen(false)}
                    asChild
                  >
                    <Link href="/manager/settings">Настройки</Link>
                  </Button>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t">
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Выйти
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
