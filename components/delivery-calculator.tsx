"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, MapPin } from "lucide-react"
import YandexMap from "./yandex-map"

// Список филиалов (в реальном приложении будет загружаться из базы данных)
const branches = [
  {
    id: 1,
    name: "Филиал на 21-й Амурской",
    address: "г.Омск, ул. 21-я Амурская, д. 37",
    coords: [73.3845, 55.0293] as [number, number],
  },
  {
    id: 2,
    name: "Филиал на Декабристов",
    address: "г.Омск, ул. Декабристов, д. 98",
    coords: [73.4012, 54.9812] as [number, number],
  },
  {
    id: 3,
    name: "Филиал на 2-й Поселковой",
    address: "г.Омск, ул. 2-я Поселковая, д. 24",
    coords: [73.3156, 54.9923] as [number, number],
  },
]

interface DeliveryCalculatorProps {
  onDeliveryCalculated: (data: {
    price: number
    distance: number
    eta: number
    branchId: number
    address: string
  }) => void
  cartItems: any[]
}

export default function DeliveryCalculator({ onDeliveryCalculated, cartItems }: DeliveryCalculatorProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>("")
  const [deliveryAddress, setDeliveryAddress] = useState<string>("")
  const [isCalculating, setIsCalculating] = useState<boolean>(false)
  const [calculationResult, setCalculationResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showMap, setShowMap] = useState<boolean>(false)

  const handleCalculate = async () => {
    if (!selectedBranch || !deliveryAddress) {
      setError("Пожалуйста, выберите филиал и укажите адрес доставки")
      return
    }

    setError(null)
    setIsCalculating(true)

    try {
      const branch = branches.find((b) => b.id.toString() === selectedBranch)

      if (!branch) {
        throw new Error("Филиал не найден")
      }

      const response = await fetch("/api/delivery/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceAddress: branch.address,
          destinationAddress: deliveryAddress,
          items: cartItems.map((item) => ({
            quantity: item.quantity,
            // Примерные размеры и вес товара
            size: {
              height: 10,
              length: 20,
              width: 15,
            },
            weight: 0.5,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Ошибка при расчете стоимости доставки")
      }

      const data = await response.json()
      setCalculationResult(data)
      setShowMap(true)

      onDeliveryCalculated({
        price: data.price,
        distance: data.distance,
        eta: data.eta,
        branchId: Number.parseInt(selectedBranch),
        address: deliveryAddress,
      })
    } catch (err) {
      console.error("Error calculating delivery:", err)
      setError("Не удалось рассчитать стоимость доставки. Пожалуйста, попробуйте позже.")
    } finally {
      setIsCalculating(false)
    }
  }

  // Получаем выбранный филиал
  const selectedBranchObj = selectedBranch ? branches.find((b) => b.id.toString() === selectedBranch) : null

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="branch">Выберите ближайший филиал</Label>
        <Select
          value={selectedBranch}
          onValueChange={(value) => {
            setSelectedBranch(value)
            setShowMap(false)
            setCalculationResult(null)
          }}
        >
          <SelectTrigger id="branch" className="mt-1">
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

      <div>
        <Label htmlFor="address">Адрес доставки</Label>
        <div className="relative mt-1">
          <Input
            id="address"
            value={deliveryAddress}
            onChange={(e) => {
              setDeliveryAddress(e.target.value)
              setShowMap(false)
              setCalculationResult(null)
            }}
            placeholder="Введите полный адрес доставки"
            className="pr-10"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      <Button
        onClick={handleCalculate}
        disabled={isCalculating || !selectedBranch || !deliveryAddress}
        className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0]"
      >
        {isCalculating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Расчет...
          </>
        ) : (
          "Рассчитать стоимость доставки"
        )}
      </Button>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {calculationResult && !error && (
        <div className="bg-gray-50 p-3 rounded-md">
          <h3 className="font-medium text-sm">Результаты расчета:</h3>
          <div className="mt-2 space-y-1 text-sm">
            <p>
              Стоимость доставки: <span className="font-medium">{calculationResult.price} ₽</span>
            </p>
            <p>
              Расстояние: <span className="font-medium">{calculationResult.distance} км</span>
            </p>
            <p>
              Примерное время доставки: <span className="font-medium">{calculationResult.eta} мин</span>
            </p>
          </div>
        </div>
      )}

      {showMap && selectedBranchObj && deliveryAddress && (
        <div className="mt-4">
          <h3 className="font-medium text-sm mb-2">Маршрут доставки:</h3>
          <YandexMap
            sourceAddress={selectedBranchObj.address}
            destinationAddress={deliveryAddress}
            sourceCoords={selectedBranchObj.coords}
          />
        </div>
      )}
    </div>
  )
}
