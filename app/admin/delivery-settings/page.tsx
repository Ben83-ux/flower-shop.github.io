"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function DeliverySettingsPage() {
  const [deliverySettings, setDeliverySettings] = useState({
    standardDelivery: 500,
    expressDelivery: 800,
    freeDeliveryThreshold: 5000,
    enableFreeDelivery: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDeliverySettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setDeliverySettings((prev) => ({
      ...prev,
      enableFreeDelivery: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика сохранения настроек в базу данных
    console.log("Сохранение настроек доставки:", deliverySettings)

    // Показываем уведомление об успешном сохранении
    toast({
      title: "Настройки сохранены",
      description: "Настройки доставки успешно обновлены",
    })
  }

  return (
    <div className="container py-6">
      <Toaster />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Настройки доставки</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Основные настройки</TabsTrigger>
          <TabsTrigger value="zones">Зоны доставки</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Стоимость доставки</CardTitle>
              <CardDescription>Настройте стоимость доставки и условия бесплатной доставки</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="standardDelivery">Стандартная доставка (₽)</Label>
                    <Input
                      id="standardDelivery"
                      name="standardDelivery"
                      type="number"
                      min="0"
                      value={deliverySettings.standardDelivery}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expressDelivery">Экспресс-доставка (₽)</Label>
                    <Input
                      id="expressDelivery"
                      name="expressDelivery"
                      type="number"
                      min="0"
                      value={deliverySettings.expressDelivery}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium">Бесплатная доставка</h3>
                      <p className="text-sm text-gray-500">
                        Включить бесплатную доставку при достижении определенной суммы заказа
                      </p>
                    </div>
                    <Switch checked={deliverySettings.enableFreeDelivery} onCheckedChange={handleSwitchChange} />
                  </div>

                  {deliverySettings.enableFreeDelivery && (
                    <div className="space-y-2">
                      <Label htmlFor="freeDeliveryThreshold">Минимальная сумма для бесплатной доставки (₽)</Label>
                      <Input
                        id="freeDeliveryThreshold"
                        name="freeDeliveryThreshold"
                        type="number"
                        min="0"
                        value={deliverySettings.freeDeliveryThreshold}
                        onChange={handleChange}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">
                  Сохранить настройки
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="zones">
          <Card>
            <CardHeader>
              <CardTitle>Зоны доставки</CardTitle>
              <CardDescription>Настройте стоимость доставки для разных зон</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Функция настройки зон доставки будет доступна в следующем обновлении.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
