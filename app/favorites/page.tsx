"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, ChevronLeft, Heart } from "lucide-react"

// Моковые данные для избранных товаров
const initialFavorites = [
  {
    id: 1,
    name: "Букет «Solar White Extra»",
    price: 12000,
    oldPrice: 15000,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Розовые пионы",
    price: 4200,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Белые лилии",
    price: 3800,
    oldPrice: 4500,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Микс тюльпанов",
    price: 2900,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(initialFavorites)
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({})

  const handleRemoveFromFavorites = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id))
  }

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

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <div className="container py-6 md:py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-4 md:mb-6">
          <Link href="/" className="flex items-center text-[#8bc4c1] hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Назад на главную</span>
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Избранное</h1>

        {favorites.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 divide-y">
              {favorites.map((product) => (
                <div key={product.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center flex-1">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-medium text-gray-900 hover:text-[#8bc4c1] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center mt-1">
                        <span className="font-bold text-gray-900">{product.price} ₽</span>
                        {product.oldPrice && (
                          <span className="ml-2 text-sm text-gray-500 line-through">{product.oldPrice} ₽</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0 space-x-3">
                    <Button
                      onClick={() => handleAddToCart(product.id)}
                      className={`${
                        addedToCart[product.id] ? "bg-green-600 hover:bg-green-700" : "bg-[#8bc4c1] hover:bg-[#7ab3b0]"
                      } text-white`}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {addedToCart[product.id] ? "Добавлено" : "В корзину"}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveFromFavorites(product.id)}
                      className="border-gray-300 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center">
              <Heart className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">В избранном пока пусто</h3>
            <p className="mt-2 text-gray-500">Добавляйте понравившиеся товары в избранное, чтобы не потерять их</p>
            <div className="mt-6">
              <Link href="/products">
                <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white">Перейти в каталог</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
