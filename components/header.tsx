"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Search, ShoppingCart, Heart, Menu, X, Phone, Home, User, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"
import CallbackModal from "./callback-modal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false)

  // Отслеживаем скролл для изменения стиля шапки
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Блокируем скролл при открытом меню
  useEffect(() => {
    if (isMenuOpen || isCallbackModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen, isCallbackModalOpen])

  const openCallbackModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsCallbackModalOpen(true)
  }

  const navigation = [
    { name: "О нас", href: "/about" },
    { name: "Доставка и оплата", href: "/delivery" },
    { name: "Новости", href: "/news" },
    { name: "Контакты", href: "/contacts" },
    { name: "Уход за цветами", href: "/care" },
  ]

  return (
    <>
      <header className={`bg-white border-b border-gray-200 sticky top-0 z-30 ${isScrolled ? "shadow-md" : ""}`}>
        {/* Top bar - скрыт на мобильных */}
        <div className="bg-[#1e293b] text-white py-2 hidden md:block">
          <div className="container flex justify-between items-center">
            <nav className="flex space-x-6 text-sm">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="hover:text-gray-300">
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="hover:text-gray-300" onClick={openCallbackModal}>
                Обратный звонок
              </a>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>+7 (921) 234-56-78</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Мобильная кнопка меню */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative w-32 h-16 md:w-40 md:h-20">
                <Image src="/images/logo.png" alt="NFLOWER.RU" fill className="object-contain" />
              </div>
            </Link>

            {/* Search - скрыт на мобильных */}
            <div className="hidden md:flex relative w-1/3">
              <input
                type="text"
                placeholder="Поиск"
                className="w-full border rounded-md py-2 px-4 pr-10"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Support - скрыт на мобильных */}
            <div className="hidden md:block text-sm">
              <div className="text-gray-500">Мы в социальных сетях</div>
              <div className="flex items-center space-x-2 mt-1">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <Image src="/images/social/instagram.png" alt="Instagram" width={24} height={24} />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <Image src="/images/social/telegram.png" alt="Telegram" width={24} height={24} />
                </a>
                <a
                  href="https://wa.me/79212345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <Image src="/images/social/whatsapp.png" alt="WhatsApp" width={24} height={24} />
                </a>
                <a
                  href="https://vk.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-80"
                >
                  <Image src="/images/social/vk.png" alt="VK" width={24} height={24} />
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Поиск на мобильных */}
              <Button variant="ghost" size="icon" className="md:hidden" onClick={() => {}}>
                <Search className="h-6 w-6" />
              </Button>

              <Link href="/favorites" className="hidden md:block">
                <div className="relative">
                  <div className="absolute -top-1 -right-1 bg-[#8bc4c1] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </div>
                  <Heart className="h-6 w-6" />
                </div>
              </Link>
              <Link href="/cart">
                <div className="relative">
                  <div className="absolute -top-1 -right-1 bg-[#8bc4c1] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </div>
                  <ShoppingCart className="h-6 w-6" />
                </div>
              </Link>
              <div className="hidden md:flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost">Войти</Button>
                </Link>
                <Link href="/register">
                  <Button>Регистрация</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Category navigation - скрыт на мобильных */}
        <div className="bg-gray-100 hidden md:block">
          <div className="container">
            <nav className="flex items-center justify-center py-3 space-x-8">
              <Link href="/category/bouquets" className="text-gray-700 hover:text-[#8bc4c1] font-medium">
                Букеты
              </Link>
              <Link href="/category/compositions" className="text-gray-700 hover:text-[#8bc4c1] font-medium">
                Композиции
              </Link>
              <Link href="/category/occasions" className="text-gray-700 hover:text-[#8bc4c1] font-medium">
                Поводы
              </Link>
              <Link href="/category/toys" className="text-gray-700 hover:text-[#8bc4c1] font-medium">
                Мягкие игрушки
              </Link>
              <Link href="/category/balloons" className="text-gray-700 hover:text-[#8bc4c1] font-medium">
                Гелиевые шары
              </Link>
              <Link href="/category/sweets" className="text-gray-700 hover:text-[#8bc4c1] font-medium">
                Сладкие подарки
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu open" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <div className="relative w-28 h-14">
                <Image src="/images/logo.png" alt="NFLOWER.RU" fill className="object-contain" />
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Поиск"
                  className="w-full border rounded-md py-2 px-4 pr-10"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-sm uppercase text-gray-500 mb-2">Категории</h3>
                <nav className="flex flex-col space-y-1">
                  <Link href="/category/bouquets" className="mobile-nav-item">
                    Букеты
                  </Link>
                  <Link href="/category/compositions" className="mobile-nav-item">
                    Композиции
                  </Link>
                  <Link href="/category/occasions" className="mobile-nav-item">
                    Поводы
                  </Link>
                  <Link href="/category/toys" className="mobile-nav-item">
                    Мягкие игрушки
                  </Link>
                  <Link href="/category/balloons" className="mobile-nav-item">
                    Гелиевые шары
                  </Link>
                  <Link href="/category/sweets" className="mobile-nav-item">
                    Сладкие подарки
                  </Link>
                </nav>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-sm uppercase text-gray-500 mb-2">Информация</h3>
                <nav className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href} className="mobile-nav-item">
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col space-y-2 mt-6">
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    Войти
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full">Регистрация</Button>
                </Link>
              </div>

              <div className="mt-6 pt-4 border-t">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-[#8bc4c1]" />
                  <span className="font-medium">+7 (921) 234-56-78</span>
                </div>
                <a href="#" className="text-sm text-[#8bc4c1] mt-1 block" onClick={openCallbackModal}>
                  Обратный звонок
                </a>

                {/* Социальные сети в мобильном меню */}
                <div className="flex items-center space-x-3 mt-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Image src="/images/social/instagram.png" alt="Instagram" width={24} height={24} />
                  </a>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Image src="/images/social/telegram.png" alt="Telegram" width={24} height={24} />
                  </a>
                  <a
                    href="https://wa.me/79212345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Image src="/images/social/whatsapp.png" alt="WhatsApp" width={24} height={24} />
                  </a>
                  <a
                    href="https://vk.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <Image src="/images/social/vk.png" alt="VK" width={24} height={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Нижняя навигация для мобильных */}
      <div className="bottom-nav md:hidden">
        <Link href="/" className="bottom-nav-item">
          <Home className="h-5 w-5 bottom-nav-icon" />
          <span>Главная</span>
        </Link>
        <Link href="/categories" className="bottom-nav-item">
          <Grid className="h-5 w-5 bottom-nav-icon" />
          <span>Категории</span>
        </Link>
        <Link href="/favorites" className="bottom-nav-item">
          <Heart className="h-5 w-5 bottom-nav-icon" />
          <span>Избранное</span>
        </Link>
        <Link href="/account" className="bottom-nav-item">
          <User className="h-5 w-5 bottom-nav-icon" />
          <span>Профиль</span>
        </Link>
      </div>

      {/* Модальное окно обратного звонка */}
      <CallbackModal isOpen={isCallbackModalOpen} onClose={() => setIsCallbackModalOpen(false)} />
    </>
  )
}
