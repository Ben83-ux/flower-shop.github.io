"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Trash2,
  ChevronLeft,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  CreditCard,
  MapPin,
  Calendar,
  Home,
  Clock,
} from "lucide-react"
import YandexMap from "@/components/yandex-map"
import GreetingCardSelector from "@/components/greeting-card-selector"
import DeliveryCalculator from "@/components/delivery-calculator"

// Моковые данные для корзины
const initialCartItems = [
  {
    id: 1,
    name: "Букет «Solar White Extra»",
    price: 12000,
    quantity: 1,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Розовые пионы",
    price: 4200,
    quantity: 2,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Конфеты Charmante XL",
    price: 2750,
    quantity: 1,
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Список филиалов (в реальном приложении будет загружаться из базы данных)
const branches = [
  {
    id: 1,
    name: "Филиал на 21-й Амурской",
    address: "г.Омск, ул. 21-я Амурская, д. 37",
    coords: [73.3845, 55.0293] as [number, number],
    workingHours: "09:00 - 21:00",
  },
  {
    id: 2,
    name: "Филиал на Декабристов",
    address: "г.Омск, ул. Декабристов, д. 98",
    coords: [73.4012, 54.9812] as [number, number],
    workingHours: "09:00 - 21:00",
  },
  {
    id: 3,
    name: "Филиал на 2-й Поселковой",
    address: "г.Омск, ул. 2-я Поселковая, д. 24",
    coords: [73.3156, 54.9923] as [number, number],
    workingHours: "09:00 - 20:00",
  },
]

// Настройки бесплатной доставки
const freeDeliverySettings = {
  threshold: 5000,
  enabled: true,
}

// Доступные временные слоты для доставки
const timeSlots = [
  { from: "09:00", to: "12:00" },
  { from: "12:00", to: "15:00" },
  { from: "15:00", to: "18:00" },
  { from: "18:00", to: "21:00" },
]

export default function CartPage() {
  // Состояние корзины
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)

  // Тип получения заказа (доставка или самовывоз)
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery")

  // Информация о доставке
  const [deliveryInfo, setDeliveryInfo] = useState<{
    price: number
    distance: number
    eta: number
    branchId: number
    address: string
  } | null>(null)

  // Состояние расчета доставки
  const [isCalculatingDelivery, setIsCalculatingDelivery] = useState(false)
  const [showDeliveryCalculator, setShowDeliveryCalculator] = useState(true)

  // Данные формы
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    deliveryDate: "",
    timeSlot: "",
    pickupBranchId: "1",
    pickupDate: "",
    pickupTime: "",
    paymentMethod: "card",
    comment: "",
    addGreetingCard: false,
  })

  // Данные открытки
  const [greetingCard, setGreetingCard] = useState<{
    cardId: number | null
    message: string
  }>({
    cardId: null,
    message: "",
  })

  // Обработчики для корзины
  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "flower10") {
      setPromoApplied(true)
      setPromoDiscount(10)
    } else {
      alert("Промокод недействителен")
    }
  }

  // Обработчик расчета доставки
  const handleDeliveryCalculated = (data: {
    price: number
    distance: number
    eta: number
    branchId: number
    address: string
  }) => {
    setDeliveryInfo(data)
    setFormData((prev) => ({
      ...prev,
      address: data.address,
    }))
    setShowDeliveryCalculator(false)
  }

  // Обработчики для оформления заказа
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleGreetingCardSelected = (cardId: number, message: string) => {
    setGreetingCard({
      cardId,
      message,
    })
  }

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика оформления заказа
    console.log({
      deliveryType,
      ...formData,
      deliveryInfo: deliveryType === "delivery" ? deliveryInfo : null,
      greetingCard: formData.addGreetingCard ? greetingCard : null,
      cartItems,
      subtotal,
      deliveryCost,
      discount,
      total,
    })
    alert("Заказ успешно оформлен!")
  }

  // Расчет итоговой стоимости
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Расчет стоимости доставки с учетом настроек
  const getDeliveryCost = () => {
    if (deliveryType === "pickup") return 0

    // Если включена бесплатная доставка и сумма заказа превышает порог
    if (freeDeliverySettings.enabled && subtotal >= freeDeliverySettings.threshold) {
      return 0
    }

    return deliveryInfo?.price || 0
  }

  const deliveryCost = getDeliveryCost()
  const discount = promoApplied ? (subtotal * promoDiscount) / 100 : 0
  const total = subtotal - discount + deliveryCost

  // Получение информации о выбранном филиале для доставки
  const selectedDeliveryBranch = deliveryInfo ? branches.find((b) => b.id === deliveryInfo.branchId) : null

  // Получение информации о выбранном филиале для самовывоза
  const selectedPickupBranch = formData.pickupBranchId
    ? branches.find((b) => b.id.toString() === formData.pickupBranchId)
    : null

  // Генерация дат для выбора (следующие 7 дней)
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const formattedDate = date.toISOString().split("T")[0]
      const displayDate = date.toLocaleDateString("ru-RU", {
        weekday: "short",
        day: "numeric",
        month: "long",
      })

      dates.push({
        value: formattedDate,
        label: displayDate,
      })
    }

    return dates
  }

  const availableDates = getAvailableDates()

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

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Корзина и оформление заказа</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items and Checkout Form */}
            <div className="lg:col-span-2">
              {/* Cart Items */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 md:p-6 border-b">
                  <h2 className="text-lg font-bold">Товары в корзине</h2>
                </div>
                <div className="grid grid-cols-1 divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 md:p-6 flex flex-col md:flex-row md:items-center">
                      <div className="flex items-center flex-1">
                        <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-medium text-gray-900 hover:text-[#8bc4c1] transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <div className="flex items-center mt-1">
                            <span className="font-bold text-gray-900">{item.price} ₽</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 md:mt-0 space-x-3">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-2 py-1 text-gray-600 hover:text-[#8bc4c1]"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-2 py-1">{item.quantity}</span>
                          <button
                            className="px-2 py-1 text-gray-600 hover:text-[#8bc4c1]"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="border-gray-300 text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                {/* Contact Information */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-4">Контактная информация</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Имя и фамилия</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Type Tabs */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-4">Способ получения</h2>
                  <Tabs
                    defaultValue={deliveryType}
                    onValueChange={(value) => {
                      setDeliveryType(value as "delivery" | "pickup")
                      if (value === "delivery") {
                        setShowDeliveryCalculator(true)
                      }
                    }}
                    className="w-full"
                  >
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="delivery" className="flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Доставка
                      </TabsTrigger>
                      <TabsTrigger value="pickup" className="flex items-center">
                        <Home className="h-4 w-4 mr-2" />
                        Самовывоз
                      </TabsTrigger>
                    </TabsList>

                    {/* Delivery Tab Content */}
                    <TabsContent value="delivery" className="space-y-4">
                      {showDeliveryCalculator ? (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <h3 className="text-sm font-medium mb-3">Расчет стоимости доставки через Яндекс Курьер</h3>
                          <DeliveryCalculator onDeliveryCalculated={handleDeliveryCalculated} cartItems={cartItems} />
                        </div>
                      ) : (
                        <>
                          <div>
                            <Label htmlFor="address">Адрес доставки</Label>
                            <div className="flex mt-1">
                              <Input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required={deliveryType === "delivery"}
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                className="ml-2"
                                onClick={() => setShowDeliveryCalculator(true)}
                              >
                                Изменить
                              </Button>
                            </div>
                          </div>

                          {/* Информация о филиале */}
                          {selectedDeliveryBranch && (
                            <div className="bg-gray-50 p-3 rounded-md">
                              <h3 className="text-sm font-medium">Доставка из филиала:</h3>
                              <p className="text-sm mt-1">
                                {selectedDeliveryBranch.name} ({selectedDeliveryBranch.address})
                              </p>
                              <div className="mt-2 text-sm">
                                <p>
                                  Расстояние: <span className="font-medium">{deliveryInfo?.distance} км</span>
                                </p>
                                <p>
                                  Примерное время доставки: <span className="font-medium">{deliveryInfo?.eta} мин</span>
                                </p>
                                <p>
                                  Стоимость доставки: <span className="font-medium">{deliveryInfo?.price} ₽</span>
                                  {freeDeliverySettings.enabled && subtotal >= freeDeliverySettings.threshold && (
                                    <span className="text-green-600 ml-2">
                                      (Бесплатно при заказе от {freeDeliverySettings.threshold} ₽)
                                    </span>
                                  )}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Карта с маршрутом доставки */}
                          {selectedDeliveryBranch && formData.address && (
                            <div className="mt-2">
                              <h3 className="text-sm font-medium mb-2">Маршрут доставки:</h3>
                              <YandexMap
                                sourceAddress={selectedDeliveryBranch.address}
                                destinationAddress={formData.address}
                                sourceCoords={selectedDeliveryBranch.coords}
                              />
                            </div>
                          )}
                        </>
                      )}

                      {/* Дата и время доставки */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="deliveryDate">Дата доставки</Label>
                          <Select
                            value={formData.deliveryDate}
                            onValueChange={(value) => handleSelectChange("deliveryDate", value)}
                          >
                            <SelectTrigger id="deliveryDate" className="mt-1">
                              <SelectValue placeholder="Выберите дату" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableDates.map((date) => (
                                <SelectItem key={date.value} value={date.value}>
                                  {date.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="timeSlot">Время доставки</Label>
                          <Select
                            value={formData.timeSlot}
                            onValueChange={(value) => handleSelectChange("timeSlot", value)}
                          >
                            <SelectTrigger id="timeSlot" className="mt-1">
                              <SelectValue placeholder="Выберите время" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot, index) => (
                                <SelectItem key={index} value={`${slot.from}-${slot.to}`}>
                                  {slot.from} - {slot.to}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Pickup Tab Content */}
                    <TabsContent value="pickup" className="space-y-4">
                      <div>
                        <Label htmlFor="pickupBranchId">Выберите филиал для самовывоза</Label>
                        <Select
                          value={formData.pickupBranchId}
                          onValueChange={(value) => handleSelectChange("pickupBranchId", value)}
                        >
                          <SelectTrigger id="pickupBranchId" className="mt-1">
                            <SelectValue placeholder="Выберите филиал" />
                          </SelectTrigger>
                          <SelectContent>
                            {branches.map((branch) => (
                              <SelectItem key={branch.id} value={branch.id.toString()}>
                                {branch.name} ({branch.address})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Информация о выбранном филиале */}
                      {selectedPickupBranch && (
                        <div className="bg-gray-50 p-3 rounded-md">
                          <h3 className="text-sm font-medium">{selectedPickupBranch.name}</h3>
                          <p className="text-sm mt-1">{selectedPickupBranch.address}</p>
                          <p className="text-sm mt-1">
                            Часы работы: <span className="font-medium">{selectedPickupBranch.workingHours}</span>
                          </p>

                          {/* Карта с расположением филиала */}
                          <div className="mt-3">
                            <YandexMap
                              sourceAddress={selectedPickupBranch.address}
                              destinationAddress={selectedPickupBranch.address}
                              sourceCoords={selectedPickupBranch.coords}
                            />
                          </div>
                        </div>
                      )}

                      {/* Дата и время самовывоза */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="pickupDate">Дата самовывоза</Label>
                          <Select
                            value={formData.pickupDate}
                            onValueChange={(value) => handleSelectChange("pickupDate", value)}
                          >
                            <SelectTrigger id="pickupDate" className="mt-1">
                              <SelectValue placeholder="Выберите дату" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableDates.map((date) => (
                                <SelectItem key={date.value} value={date.value}>
                                  {date.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="pickupTime">Время самовывоза</Label>
                          <Select
                            value={formData.pickupTime}
                            onValueChange={(value) => handleSelectChange("pickupTime", value)}
                          >
                            <SelectTrigger id="pickupTime" className="mt-1">
                              <SelectValue placeholder="Выберите время" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => {
                                const hour = i + 9 // начиная с 9:00
                                if (hour < 21) {
                                  // до 21:00
                                  return (
                                    <SelectItem key={hour} value={`${hour}:00`}>
                                      {hour}:00
                                    </SelectItem>
                                  )
                                }
                                return null
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Greeting Card Option */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id="addGreetingCard"
                      checked={formData.addGreetingCard}
                      onCheckedChange={(checked) => handleCheckboxChange("addGreetingCard", checked as boolean)}
                    />
                    <Label htmlFor="addGreetingCard" className="font-medium">
                      Добавить бесплатную открытку
                    </Label>
                  </div>

                  {formData.addGreetingCard && <GreetingCardSelector onCardSelected={handleGreetingCardSelected} />}
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <h2 className="text-lg font-bold mb-4">Способ оплаты</h2>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleRadioChange("paymentMethod", value)}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Банковской картой онлайн
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Наличными при получении
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Comment */}
                <div className="mb-6">
                  <Label htmlFor="comment">Комментарий к заказу</Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white py-2"
                  disabled={deliveryType === "delivery" && !deliveryInfo}
                >
                  Оформить заказ
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 sticky top-4">
                <h2 className="text-lg font-bold mb-4">Ваш заказ</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-start">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-gray-500">{item.quantity} шт.</span>
                          <span className="text-sm font-medium">{item.price * item.quantity} ₽</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Промокод</h3>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Введите промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                      disabled={promoApplied}
                    />
                    <Button onClick={handleApplyPromo} variant="outline" disabled={promoApplied || !promoCode}>
                      {promoApplied ? "Применен" : "Применить"}
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-green-600 mt-1">Промокод применен! Скидка {promoDiscount}%</p>
                  )}
                </div>

                {/* Order Total */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Товары ({cartItems.length})</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{deliveryType === "delivery" ? "Доставка" : "Самовывоз"}</span>
                    <span>
                      {deliveryType === "pickup" ? "Бесплатно" : deliveryCost === 0 ? "Бесплатно" : `${deliveryCost} ₽`}
                    </span>
                  </div>
                  {deliveryType === "delivery" &&
                    freeDeliverySettings.enabled &&
                    subtotal >= freeDeliverySettings.threshold && (
                      <div className="text-sm text-green-600">
                        <p>Бесплатная доставка применена</p>
                      </div>
                    )}
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Скидка по промокоду</span>
                      <span>-{discount} ₽</span>
                    </div>
                  )}
                  {formData.addGreetingCard && (
                    <div className="flex justify-between text-green-600">
                      <span>Открытка</span>
                      <span>Бесплатно</span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Итого</span>
                      <span>{total} ₽</span>
                    </div>
                  </div>
                </div>

                {/* Delivery/Pickup Info */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-start">
                    {deliveryType === "delivery" ? (
                      <Truck className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    ) : (
                      <Home className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    )}
                    <div>
                      <h3 className="text-sm font-medium">{deliveryType === "delivery" ? "Доставка" : "Самовывоз"}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {deliveryType === "delivery"
                          ? freeDeliverySettings.enabled
                            ? `Бесплатная доставка при заказе от ${freeDeliverySettings.threshold} ₽`
                            : `Стоимость доставки: ${deliveryInfo?.price || 0} ₽`
                          : "Самовывоз бесплатно из выбранного филиала"}
                      </p>
                    </div>
                  </div>

                  {deliveryType === "delivery" && deliveryInfo && (
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Адрес доставки</h3>
                        <p className="text-xs text-gray-500 mt-1">{formData.address || deliveryInfo.address}</p>
                      </div>
                    </div>
                  )}

                  {deliveryType === "pickup" && selectedPickupBranch && (
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Адрес самовывоза</h3>
                        <p className="text-xs text-gray-500 mt-1">{selectedPickupBranch.address}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium">Дата и время</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {deliveryType === "delivery"
                          ? formData.deliveryDate && formData.timeSlot
                            ? `${formData.deliveryDate}, ${formData.timeSlot}`
                            : "Укажите дату и время доставки"
                          : formData.pickupDate && formData.pickupTime
                            ? `${formData.pickupDate}, ${formData.pickupTime}`
                            : "Укажите дату и время самовывоза"}
                      </p>
                    </div>
                  </div>

                  {formData.addGreetingCard && greetingCard.cardId && (
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium">Открытка</h3>
                        <p className="text-xs text-gray-500 mt-1">Бесплатная открытка будет добавлена к заказу</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center">
              <ShoppingCart className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Ваша корзина пуста</h3>
            <p className="mt-2 text-gray-500">Добавьте товары в корзину, чтобы оформить заказ</p>
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
