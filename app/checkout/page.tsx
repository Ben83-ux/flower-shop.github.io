"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { ChevronLeft, CreditCard, Truck, MapPin, Calendar, Home, Clock } from "lucide-react"
import YandexMap from "@/components/yandex-map"
import GreetingCardSelector from "@/components/greeting-card-selector"

// Моковые данные для корзины
const cartItems = [
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

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Тип получения заказа (доставка или самовывоз)
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery")

  // Информация о доставке
  const [deliveryInfo, setDeliveryInfo] = useState({
    price: 500, // Устанавливаем значение по умолчанию
    distance: 5.2, // Устанавливаем значение по умолчанию
    eta: 30, // Устанавливаем значение по умолчанию
    branchId: 1, // Устанавливаем значение по умолчанию
    address: "г.Омск, ул. Ленина, д. 15", // Устанавливаем значение по умолчанию
  })

  // Данные формы
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "г.Омск, ул. Ленина, д. 15", // Устанавливаем значение по умолчанию
    deliveryDate: "",
    timeSlot: "",
    pickupBranchId: "1", // Устанавливаем значение по умолчанию
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

  // Загрузка информации о доставке при монтировании компонента
  useEffect(() => {
    // В реальном приложении данные будут загружаться из состояния или localStorage
    const branchId = Number.parseInt(searchParams.get("branchId") || "1")
    const address = searchParams.get("address") || "г.Омск, ул. Ленина, д. 15"
    const price = Number.parseInt(searchParams.get("price") || "500")
    const distance = Number.parseFloat(searchParams.get("distance") || "5.2")
    const eta = Number.parseInt(searchParams.get("eta") || "30")

    setDeliveryInfo({
      price,
      distance,
      eta,
      branchId,
      address,
    })

    setFormData((prev) => ({
      ...prev,
      address,
    }))
  }, [searchParams])

  // Обработчики изменения формы
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

    return deliveryInfo.price
  }

  const deliveryCost = getDeliveryCost()
  const total = subtotal + deliveryCost

  // Получение информации о выбранном филиале для доставки
  const selectedDeliveryBranch = branches.find((b) => b.id === deliveryInfo.branchId)

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
          <Link href="/cart" className="flex items-center text-[#8bc4c1] hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            <span>Назад в корзину</span>
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
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
                  onValueChange={(value) => setDeliveryType(value as "delivery" | "pickup")}
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
                    <div>
                      <Label htmlFor="address">Адрес доставки</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required={deliveryType === "delivery"}
                        className="mt-1"
                      />
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
                            Расстояние: <span className="font-medium">{deliveryInfo.distance} км</span>
                          </p>
                          <p>
                            Примерное время доставки: <span className="font-medium">{deliveryInfo.eta} мин</span>
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

              {/* Privacy Policy */}
              <div className="flex items-start mb-4">
                <div className="flex items-center h-5">
                  <input
                    id="privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="focus:ring-rose-500 h-4 w-4 text-rose-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="privacy" className="font-medium text-gray-700">
                    Я согласен с{" "}
                    <Link href="/privacy-policy" className="text-rose-600 hover:text-rose-800">
                      политикой конфиденциальности
                    </Link>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white py-2">
                Оформить заказ
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
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
                          : `Стоимость доставки: ${deliveryInfo.price} ₽`
                        : "Самовывоз бесплатно из выбранного филиала"}
                    </p>
                  </div>
                </div>

                {deliveryType === "delivery" && (
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
      </div>
    </div>
  )
}
