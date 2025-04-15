"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика регистрации
    console.log(formData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="relative w-40 h-20 mx-auto">
              <Image src="/images/logo.png" alt="NFLOWER.RU" fill className="object-contain" />
            </div>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Регистрация</h2>
          <p className="mt-2 text-sm text-gray-600">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="font-medium text-[#8bc4c1] hover:text-[#7ab3b0]">
              Войдите
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Имя
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Иван Иванов"
              />
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">Минимум 8 символов, включая буквы и цифры</p>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Подтверждение пароля
              </Label>
              <div className="mt-1 relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm pr-10"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <Label htmlFor="terms" className="text-gray-700">
                  Я согласен с{" "}
                  <Link href="/terms" className="text-[#8bc4c1] hover:text-[#7ab3b0]">
                    условиями использования
                  </Link>{" "}
                  и{" "}
                  <Link href="/privacy" className="text-[#8bc4c1] hover:text-[#7ab3b0]">
                    политикой конфиденциальности
                  </Link>
                </Label>
              </div>
            </div>
          </div>

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

          <div>
            <Button
              type="submit"
              className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white py-2 px-4 rounded-md"
              disabled={!agreeTerms}
            >
              Зарегистрироваться
            </Button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Или зарегистрируйтесь через</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Google
              </button>
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                VK
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
