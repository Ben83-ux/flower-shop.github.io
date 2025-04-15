"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"

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

export default function LiveShowcasePage() {
  const [selectedBranch, setSelectedBranch] = useState<number>(1)
  const [favorites, setFavorites] = useState<number[]>([])
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({})

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

  const toggleFavorite = (productId: number) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId))
    } else {
      setFavorites([...favorites, productId])
    }
  }

  // Получаем товары для выбранного филиала
  const products = liveShowcaseProducts[selectedBranch as keyof typeof liveShowcaseProducts] || []

  return (
    <div className="container py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Живая витрина</h1>

      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          Живая витрина показывает букеты, которые есть в наличии прямо сейчас в выбранном филиале. Вы можете заказать
          их с доставкой или забрать самовывозом.
        </p>

        <h2 className="text-xl font-semibold mb-4">Выберите филиал</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className={`relative overflow-hidden rounded-lg cursor-pointer transition-all ${
                selectedBranch === branch.id ? "ring-4 ring-[#8bc4c1]" : "ring-1 ring-gray-200 hover:ring-gray-300"
              }`}
              onClick={() => setSelectedBranch(branch.id)}
            >
              <div className="relative h-40 md:h-48">
                <Image src={branch.image || "/placeholder.svg"} alt={branch.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                  <h3 className="font-bold text-lg md:text-xl">{branch.address}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Доступно сейчас в филиале: {branches.find((b) => b.id === selectedBranch)?.address}
        </h2>
        <p className="text-sm text-gray-500">Обновлено: {new Date().toLocaleString("ru-RU")}</p>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(product.id)
                    }}
                    className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Heart
                      className={`h-5 w-5 ${favorites.includes(product.id) ? "fill-[#f5a7b6] text-[#f5a7b6]" : "text-gray-600"}`}
                    />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                <div className="flex justify-between items-center">
                  <div className="font-bold text-xl">{product.price} ₽</div>
                  <Button
                    onClick={() => handleAddToCart(product.id)}
                    className={`rounded-full ${
                      addedToCart[product.id] ? "bg-green-600 hover:bg-green-700" : "bg-[#8bc4c1] hover:bg-[#7ab3b0]"
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {addedToCart[product.id] ? "Добавлено" : "Купить"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">В этом филиале пока нет доступных букетов</h3>
          <p className="text-gray-500">Пожалуйста, выберите другой филиал или загляните позже</p>
        </div>
      )}

      <div className="mt-10 bg-[#e8f4f2] rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Как работает живая витрина?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#8bc4c1] text-white flex items-center justify-center text-xl font-bold mb-3">
              1
            </div>
            <h3 className="font-medium mb-2">Выберите филиал</h3>
            <p className="text-gray-600 text-sm">
              Выберите ближайший к вам филиал или тот, где есть понравившийся букет
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#8bc4c1] text-white flex items-center justify-center text-xl font-bold mb-3">
              2
            </div>
            <h3 className="font-medium mb-2">Выберите букет</h3>
            <p className="text-gray-600 text-sm">Все представленные букеты есть в наличии прямо сейчас</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#8bc4c1] text-white flex items-center justify-center text-xl font-bold mb-3">
              3
            </div>
            <h3 className="font-medium mb-2">Оформите заказ</h3>
            <p className="text-gray-600 text-sm">Выберите доставку или самовывоз и получите свежий букет</p>
          </div>
        </div>
      </div>
    </div>
  )
}
