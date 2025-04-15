"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"

// Моковые данные для филиалов
const branches = [
  {
    id: 1,
    name: "Филиал на 21-й Амурской",
    address: "21-я Амурская д. 37",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "Филиал на 2-й Поселковой",
    address: "2-я Поселковая д. 24",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Филиал на Декабристов",
    address: "Декабристов д. 98",
    image: "/placeholder.svg?height=200&width=300",
  },
]

// Моковые данные для товаров в живой витрине (для каждого филиала)
const liveShowcaseProducts = {
  1: [
    {
      id: 101,
      name: "Букет «Весенний рассвет»",
      description: "Нежный букет из розовых пионов и эвкалипта",
      price: 3500,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 102,
      name: "Композиция «Солнечный день»",
      description: "Яркие подсолнухи с зеленью и декоративными элементами",
      price: 2800,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 103,
      name: "Букет «Романтика»",
      description: "Красные розы с гипсофилой в элегантной упаковке",
      price: 4200,
      image: "/placeholder.svg?height=400&width=400",
    },
  ],
  2: [
    {
      id: 201,
      name: "Букет «Нежность»",
      description: "Белые лилии и розы с декоративной зеленью",
      price: 3800,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 202,
      name: "Композиция «Летний сад»",
      description: "Разноцветные герберы с зеленью в корзине",
      price: 2500,
      image: "/placeholder.svg?height=400&width=400",
    },
  ],
  3: [
    {
      id: 301,
      name: "Букет «Элегантность»",
      description: "Белые и кремовые розы с эвкалиптом",
      price: 4500,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 302,
      name: "Букет «Яркое настроение»",
      description: "Микс из ярких тюльпанов разных сортов",
      price: 1963,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 303,
      name: "Композиция «Весенний аромат»",
      description: "Нежные хризантемы и диантусы в шикарной упаковке",
      price: 3200,
      image: "/placeholder.svg?height=400&width=400",
    },
    {
      id: 304,
      name: "Букет «Морской бриз»",
      description: "Голубые и белые цветы с декоративными элементами",
      price: 3600,
      image: "/placeholder.svg?height=400&width=400",
    },
  ],
}

export default function LiveShowcase() {
  const [selectedBranch, setSelectedBranch] = useState<number>(1)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({})
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true)

  // Получаем товары для выбранного филиала
  const products = liveShowcaseProducts[selectedBranch as keyof typeof liveShowcaseProducts] || []

  // Обработчик добавления в корзину
  const handleAddToCart = (productId: number) => {
    setAddedToCart((prev) => ({
      ...prev,
      [productId]: true,
    }))

    // Reset the button after 2 seconds
    setTimeout(() => {
      setAddedToCart((prev) => ({
        ...prev,
        [productId]: false,
      }))
    }, 2000)
  }

  // Функции для навигации по слайдеру
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1))
  }

  // Автоматическое переключение слайдов
  useEffect(() => {
    if (!isAutoplay || products.length <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, isAutoplay, products.length])

  // Сброс текущего слайда при смене филиала
  useEffect(() => {
    setCurrentSlide(0)
  }, [selectedBranch])

  // Если нет товаров, не отображаем секцию
  if (products.length === 0) return null

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Живая витрина</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Выбор филиала (боковая панель) */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-4">Выберите филиал</h3>

              <div className="space-y-3">
                {branches.map((branch) => (
                  <div
                    key={branch.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${
                      selectedBranch === branch.id
                        ? "bg-[#e8f4f2] border-[#8bc4c1] border"
                        : "bg-white border border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedBranch(branch.id)}
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image src={branch.image || "/placeholder.svg"} alt={branch.name} fill className="object-cover" />
                    </div>
                    <div className="ml-3">
                      <h4 className="font-medium">{branch.address}</h4>
                      <p className="text-sm text-gray-500">{branch.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">Обновлено: {new Date().toLocaleString("ru-RU")}</p>
              </div>
            </div>
          </div>

          {/* Слайдер с букетами */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="relative bg-gray-50 rounded-lg overflow-hidden">
              {/* Текущий слайд */}
              {products.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[450px]">
                  {/* Изображение букета */}
                  <div className="relative h-[250px] md:h-full">
                    <Image
                      src={products[currentSlide].image || "/placeholder.svg"}
                      alt={products[currentSlide].name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Информация о букете */}
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{products[currentSlide].name}</h3>
                    <p className="text-gray-600 mb-4">{products[currentSlide].description}</p>
                    <div className="text-2xl font-bold mb-4">{products[currentSlide].price} ₽</div>
                    <Button
                      onClick={() => handleAddToCart(products[currentSlide].id)}
                      className={`${
                        addedToCart[products[currentSlide].id]
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-[#8bc4c1] hover:bg-[#7ab3b0]"
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {addedToCart[products[currentSlide].id] ? "Добавлено в корзину" : "Купить сейчас"}
                    </Button>

                    <div className="mt-4 text-sm text-gray-500">
                      Доступно в филиале: {branches.find((b) => b.id === selectedBranch)?.address}
                    </div>
                  </div>
                </div>
              )}

              {/* Навигация по слайдеру */}
              {products.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    onClick={() => {
                      prevSlide()
                      setIsAutoplay(false)
                    }}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                    onClick={() => {
                      nextSlide()
                      setIsAutoplay(false)
                    }}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>

                  {/* Индикаторы слайдов */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {products.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-[#8bc4c1]" : "bg-gray-300"}`}
                        onClick={() => {
                          setCurrentSlide(index)
                          setIsAutoplay(false)
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
