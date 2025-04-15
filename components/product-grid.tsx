"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"

// Это будет заменено на данные из базы данных
const products = [
  {
    id: 1,
    name: "Весенний букет",
    price: 3500,
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
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Микс тюльпанов",
    price: 2900,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Букет невесты",
    price: 5500,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Розы в коробке",
    price: 4800,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Полевые цветы",
    price: 3200,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Орхидеи",
    price: 6500,
    image: "/placeholder.svg?height=300&width=300",
  },
]

interface ProductGridProps {
  title?: string
  limit?: number
  showMoreLink?: string
}

export default function ProductGrid({ title, limit = 8, showMoreLink }: ProductGridProps) {
  const [addedToCart, setAddedToCart] = useState<Record<number, boolean>>({})
  const [favorites, setFavorites] = useState<number[]>([])

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

  const displayedProducts = products.slice(0, limit)

  return (
    <div className="py-4 md:py-8">
      {title && <h2 className="text-lg md:text-2xl font-semibold mb-3 md:mb-6 px-1">{title}</h2>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
        {displayedProducts.map((product) => (
          <div key={product.id} className="group bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative overflow-hidden">
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-square">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
                >
                  <Heart
                    className={`h-3.5 w-3.5 md:h-4 md:w-4 ${favorites.includes(product.id) ? "fill-[#f5a7b6] text-[#f5a7b6]" : "text-gray-600"}`}
                  />
                </button>
              </div>
              <Button
                onClick={() => handleAddToCart(product.id)}
                className={`absolute bottom-2 right-2 md:bottom-3 md:right-3 rounded-full w-7 h-7 md:w-8 md:h-8 p-0 ${
                  addedToCart[product.id] ? "bg-green-600 hover:bg-green-700" : "bg-[#8bc4c1] hover:bg-[#7ab3b0]"
                }`}
                size="icon"
              >
                <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="sr-only">Добавить в корзину</span>
              </Button>
            </div>
            <div className="p-2 md:p-3">
              <Link href={`/product/${product.id}`} className="block">
                <h3 className="font-medium text-gray-800 group-hover:text-[#8bc4c1] text-sm md:text-base truncate">
                  {product.name}
                </h3>
              </Link>
              <p className="font-bold mt-1 text-sm md:text-base">{product.price} ₽</p>
            </div>
          </div>
        ))}
      </div>

      {showMoreLink && (
        <div className="flex justify-center mt-6 md:mt-8">
          <Link href={showMoreLink}>
            <Button
              variant="outline"
              className="rounded-full px-6 md:px-8 text-sm border-[#8bc4c1] text-[#8bc4c1] hover:bg-[#8bc4c1] hover:text-white"
            >
              Показать больше
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
