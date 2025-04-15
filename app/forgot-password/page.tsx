"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика восстановления пароля
    console.log({ email })
    setSubmitted(true)
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
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Восстановление пароля</h2>
          <p className="mt-2 text-sm text-gray-600">
            Введите email, указанный при регистрации, и мы отправим вам инструкции по восстановлению пароля
          </p>
        </div>

        {!submitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="example@mail.com"
              />
            </div>

            <div>
              <Button type="submit" className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white py-2 px-4 rounded-md">
                Отправить инструкции
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center text-sm font-medium text-[#8bc4c1] hover:text-[#7ab3b0]"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Вернуться на страницу входа
              </Link>
            </div>
          </form>
        ) : (
          <div className="mt-8 text-center">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-900">Проверьте вашу почту</h3>
            <p className="mt-2 text-sm text-gray-600">
              Мы отправили инструкции по восстановлению пароля на адрес {email}
            </p>
            <div className="mt-6">
              <Link href="/login">
                <Button className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white py-2 px-4 rounded-md">
                  Вернуться на страницу входа
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
