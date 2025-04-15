"use client"

import type React from "react"

import { useState } from "react"
import type { User } from "@/types/user"
import { updateUserData } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

interface ProfileInfoProps {
  user: User
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const updatedUser = await updateUserData(formData)
      if (updatedUser) {
        toast({
          title: "Профиль обновлен",
          description: "Ваши данные успешно обновлены",
        })
        setIsEditing(false)
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить профиль",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Личные данные</h2>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} disabled className="bg-gray-100" />
            </div>

            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <Button type="submit" disabled={isLoading} className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">
              {isLoading ? "Сохранение..." : "Сохранить"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Отмена
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Имя</p>
              <p className="font-medium">{user.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Телефон</p>
              <p className="font-medium">{user.phone || "Не указан"}</p>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              className="text-[#8bc4c1] border-[#8bc4c1] hover:bg-[#8bc4c1] hover:text-white"
            >
              Изменить
            </Button>
          </div>
        </div>
      )}

      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Адреса</h3>

        {user.addresses && user.addresses.length > 0 ? (
          <div className="space-y-4">
            {user.addresses.map((address) => (
              <div key={address.id} className="p-4 border rounded-md">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">
                      {address.city}, ул. {address.street}, д. {address.house}
                      {address.apartment && `, кв. ${address.apartment}`}
                    </p>
                    <p className="text-sm text-gray-500">{address.postalCode}</p>
                  </div>
                  {address.isDefault && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Основной</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">У вас пока нет сохраненных адресов</p>
        )}

        <Button className="mt-4 bg-[#8bc4c1] hover:bg-[#7ab3b0]">Добавить адрес</Button>
      </div>
    </div>
  )
}
