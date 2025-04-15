"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag, Clock, Award, Minus, Plus, ChevronLeft } from "lucide-react"

// Это будет заменено на данные из базы данных
const product = {
  id: 1,
  name: "Букет «Solar White Extra»",
  price: 12000,
  oldPrice: 15000,
  cashback: 600,
  description: "Нежный букет из белых пионов, роз и эвкалипта. Идеально подходит для свадьбы или особого случая.",
  sizes: [
    { value: "10cm", label: "10см" },
    { value: "20cm", label: "20см" },
    { value: "50cm", label: "50см", default: true },
    { value: "70cm", label: "70см" },
  ],
  quantities: [
    { value: "standard", label: "В 1,5 раза" },
    { value: "double", label: "В 2 раза" },
  ],
  colors: [
    { value: "pink", label: "Розовый", hex: "#f8a5c2" },
    { value: "red", label: "Красный", hex: "#e63946" },
    { value: "blue", label: "Синий", hex: "#457b9d" },
    { value: "green", label: "Зеленый", hex: "#2a9d8f" },
  ],
  images: [
    "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
    "/placeholder.svg?height=600&width=500",
  ],
  delivery: "Доставка в день заказа при оформлении до 18:00",
  payment: "Наличными или картой при получении, онлайн-оплата",
  composition: "25 белых пионов, 10 белых роз, эвкалипт, декоративная зелень, упаковка",
  care: "Держите в прохладном месте, меняйте воду каждый день, подрезайте стебли.",
}

// Дополнительные товары
const additionalProducts = [
  {
    id: 101,
    name: "Конфеты Charmante XL",
    price: 2750,
    oldPrice: 3750,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 102,
    name: "Конфеты Charmante L",
    price: 2750,
    oldPrice: 3750,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 103,
    name: "Конфеты Charmante M",
    price: 2750,
    oldPrice: 3750,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 104,
    name: "Конфеты Charmante S",
    price: 2750,
    oldPrice: 3750,
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Похожие товары
const relatedProducts = [
  {
    id: 201,
    name: "Букет «Pink Sunset Astrana Errada Extra»",
    price: 2750,
    oldPrice: 3750,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["С пионовидными розами, розовый, романтичный"],
  },
  {
    id: 202,
    name: "Букет «Pink Sunset Astrana Errada Extra»",
    price: 2750,
    oldPrice: 3750,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["С пионовидными розами, розовый, романтичный"],
  },
  {
    id: 203,
    name: "Букет «Solar White Extra»",
    price: 2750,
    oldPrice: 3750,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["С пионовидными розами, розовый, романтичный"],
  },
  {
    id: 204,
    name: "Букет «Pink Sunset Astrana Errada Extra»",
    price: 2750,
    oldPrice: 3750,
    image: "/placeholder.svg?height=300&width=300",
    tags: ["С пионовидными розами, розовый, романтичный"],
    hit: true,
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => s.default)?.value || product.sizes[0].value,
  )
  const [selectedQuantity, setSelectedQuantity] = useState(product.quantities[0].value)
  const [selectedColor, setSelectedColor] = useState(product.colors[0].value)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState("description")
  const [isFavorite, setIsFavorite] = useState(false)

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <main className="bg-white pb-16 md:pb-0">
      <div className="container py-3 md:py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mb-3 md:mb-6">
          <Link href="/products" className="flex items-center text-[#8bc4c1] md:hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">Назад к каталогу</span>
          </Link>
          <div className="hidden md:flex items-center ml-2">
            <span className="mx-2">/</span>
            <Link href="/" className="hover:text-[#8bc4c1]">
              Главная
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-[#8bc4c1]">
              Каталог
            </Link>
            <span className="mx-2">/</span>
            <span>{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Product Gallery */}
          <div>
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mb-2 md:mb-4 rounded-lg overflow-hidden">
              <Image
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden ${
                    activeImage === index ? "ring-2 ring-[#8bc4c1]" : ""
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - изображение ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium">{product.name}</h1>

            {/* Size Selector */}
            <div>
              <h3 className="text-gray-500 uppercase text-xs md:text-sm mb-2 md:mb-3">РАЗМЕР</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.value}
                    className={`rounded-md min-w-[50px] md:min-w-[60px] py-1.5 md:py-2 px-2 md:px-3 text-sm ${
                      selectedSize === size.value ? "bg-[#8bc4c1] text-white" : "border border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setSelectedSize(size.value)}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-gray-500 uppercase text-xs md:text-sm mb-2 md:mb-3">УВЕЛИЧИТЬ КОЛИЧЕСТВО ЦВЕТОВ</h3>
              <div className="flex flex-wrap gap-2">
                {product.quantities.map((qty) => (
                  <button
                    key={qty.value}
                    className={`rounded-md py-1.5 md:py-2 px-2 md:px-3 text-sm ${
                      selectedQuantity === qty.value
                        ? "bg-[#8bc4c1] text-white"
                        : "border border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setSelectedQuantity(qty.value)}
                  >
                    {qty.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <h3 className="text-gray-500 uppercase text-xs md:text-sm mb-2 md:mb-3">ЦВЕТ УПАКОВКИ</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full ${
                      selectedColor === color.value ? "ring-2 ring-offset-2 ring-gray-400" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color.value)}
                    aria-label={`Select ${color.label} color`}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              <div className="text-xl md:text-2xl font-bold">{product.price} ₽</div>
              {product.oldPrice && (
                <div className="text-gray-400 line-through text-sm md:text-base">{product.oldPrice} ₽</div>
              )}
              {product.cashback && (
                <div className="ml-auto text-right">
                  <div className="text-xs uppercase font-bold">CASH-BACK</div>
                  <div className="text-xs md:text-sm text-gray-500">{product.cashback} ₽</div>
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center">
              <div className="flex items-center border rounded-md mr-3 md:mr-4">
                <button
                  className="px-2 md:px-3 py-1.5 md:py-2 text-gray-600 hover:text-[#8bc4c1]"
                  onClick={decrementQuantity}
                >
                  <Minus size={16} />
                </button>
                <span className="px-2 md:px-3 py-1.5 md:py-2">{quantity}</span>
                <button
                  className="px-2 md:px-3 py-1.5 md:py-2 text-gray-600 hover:text-[#8bc4c1]"
                  onClick={incrementQuantity}
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white text-sm" onClick={() => {}}>
                В корзину
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="ml-2 border-gray-300"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`h-4 w-4 md:h-5 md:w-5 ${isFavorite ? "fill-[#f5a7b6] text-[#f5a7b6]" : "text-gray-400"}`}
                />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-between text-xs md:text-sm text-gray-500 border-t border-b py-2 md:py-3">
              <div>Купить в 1 клик</div>
              <div>IP доставка</div>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex border-b overflow-x-auto scrollbar-hide">
                <button
                  className={`py-2 px-3 md:px-4 text-sm whitespace-nowrap ${activeTab === "description" ? "border-b-2 border-[#8bc4c1] text-[#8bc4c1]" : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  Описание
                </button>
                <button
                  className={`py-2 px-3 md:px-4 text-sm whitespace-nowrap ${activeTab === "composition" ? "border-b-2 border-[#8bc4c1] text-[#8bc4c1]" : ""}`}
                  onClick={() => setActiveTab("composition")}
                >
                  Состав
                </button>
                <button
                  className={`py-2 px-3 md:px-4 text-sm whitespace-nowrap ${activeTab === "care" ? "border-b-2 border-[#8bc4c1] text-[#8bc4c1]" : ""}`}
                  onClick={() => setActiveTab("care")}
                >
                  Уход
                </button>
                <button
                  className={`py-2 px-3 md:px-4 text-sm whitespace-nowrap ${activeTab === "delivery" ? "border-b-2 border-[#8bc4c1] text-[#8bc4c1]" : ""}`}
                  onClick={() => setActiveTab("delivery")}
                >
                  Доставка
                </button>
              </div>
              <div className="py-3 md:py-4 text-sm md:text-base">
                {activeTab === "description" && <p>{product.description}</p>}
                {activeTab === "composition" && <p>{product.composition}</p>}
                {activeTab === "care" && <p>{product.care}</p>}
                {activeTab === "delivery" && <p>{product.delivery}</p>}
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs text-gray-500 mt-4 md:mt-6">
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                </div>
                <span className="text-[10px] md:text-xs">Бесплатная доставка</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Award className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                </div>
                <span className="text-[10px] md:text-xs">Проверенное качество</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Award className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                </div>
                <span className="text-[10px] md:text-xs">Гарантия свежести</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
                </div>
                <span className="text-[10px] md:text-xs">Фото доставки</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Products */}
        <section className="mt-8 md:mt-16">
          <h2 className="text-lg md:text-2xl font-medium text-center mb-4 md:mb-8">Добавьте к букету</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {additionalProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-2 relative group">
                <button className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-[#f5a7b6]" />
                </button>
                <div className="relative aspect-square mb-2 md:mb-3">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="font-bold text-sm md:text-base">{product.price} ₽</div>
                    <div className="text-gray-400 line-through text-xs md:text-sm">{product.oldPrice} ₽</div>
                  </div>
                  <h3 className="text-xs md:text-sm truncate">{product.name}</h3>
                  <Button className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white text-xs md:text-sm py-1">
                    Заказать
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section className="mt-8 md:mt-16">
          <h2 className="text-lg md:text-2xl font-medium text-center mb-4 md:mb-8">Также может понравиться</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {relatedProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-2 relative group">
                {product.hit && (
                  <div className="absolute top-2 left-2 z-10 bg-blue-500 text-white text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded">
                    ХИТ
                  </div>
                )}
                <button className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="h-4 w-4 md:h-5 md:w-5 text-gray-400 hover:text-[#f5a7b6]" />
                </button>
                <div className="relative aspect-square mb-2 md:mb-3">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="font-bold text-sm md:text-base">{product.price} ₽</div>
                    <div className="text-gray-400 line-through text-xs md:text-sm">{product.oldPrice} ₽</div>
                  </div>
                  <h3 className="text-xs md:text-sm truncate">{product.name}</h3>
                  <div className="text-[10px] md:text-xs text-gray-500 truncate">{product.tags.join(", ")}</div>
                  <Button className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white text-xs md:text-sm py-1">
                    Заказать
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
