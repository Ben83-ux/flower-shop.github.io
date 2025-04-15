"use client"

import type React from "react"

import { useState } from "react"
import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CallbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CallbackModal({ isOpen, onClose }: CallbackModalProps) {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [time, setTime] = useState("any")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  // Функция для форматирования номера телефона
  const formatPhoneNumber = (value: string) => {
    // Удаляем все нецифровые символы
    const phoneNumber = value.replace(/\D/g, "")

    // Форматируем номер телефона
    if (phoneNumber.length <= 1) {
      return phoneNumber === "7" || phoneNumber === "8" ? "+7" : phoneNumber ? `+7${phoneNumber}` : ""
    } else if (phoneNumber.length <= 4) {
      return `+7 (${phoneNumber.substring(1)}`
    } else if (phoneNumber.length <= 7) {
      return `+7 (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4)}`
    } else if (phoneNumber.length <= 10) {
      return `+7 (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7)}`
    } else {
      return `+7 (${phoneNumber.substring(1, 4)}) ${phoneNumber.substring(4, 7)}-${phoneNumber.substring(7, 9)}-${phoneNumber.substring(9, 11)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Валидация
    if (!name.trim()) {
      setError("Пожалуйста, введите ваше имя")
      return
    }

    if (!phone || phone.replace(/\D/g, "").length < 11) {
      setError("Пожалуйста, введите корректный номер телефона")
      return
    }

    setError("")
    setIsSubmitting(true)

    // Имитация отправки данных на сервер
    try {
      // В реальном приложении здесь был бы запрос к API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsSubmitted(true)
      setIsSubmitting(false)

      // Сбрасываем форму через 3 секунды
      setTimeout(() => {
        setName("")
        setPhone("")
        setTime("any")
        setIsSubmitted(false)
        onClose()
      }, 3000)
    } catch (err) {
      setError("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.")
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-4 md:p-5 border-b">
          <h3 className="text-xl font-semibold text-gray-900">Заказать обратный звонок</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Содержимое модального окна */}
        <div className="p-4 md:p-5">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                  Ваше имя
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8bc4c1] focus:border-[#8bc4c1] block w-full p-2.5"
                  placeholder="Иван Иванов"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
                  Номер телефона
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8bc4c1] focus:border-[#8bc4c1] block w-full p-2.5"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="time" className="block mb-2 text-sm font-medium text-gray-900">
                  Удобное время для звонка
                </label>
                <select
                  id="time"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#8bc4c1] focus:border-[#8bc4c1] block w-full p-2.5"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="any">В любое время</option>
                  <option value="morning">Утро (9:00 - 12:00)</option>
                  <option value="afternoon">День (12:00 - 18:00)</option>
                  <option value="evening">Вечер (18:00 - 21:00)</option>
                </select>
              </div>

              {error && <div className="mb-4 p-2 text-sm text-red-800 rounded-lg bg-red-50">{error}</div>}

              <Button
                type="submit"
                className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Отправка...
                  </span>
                ) : (
                  "Заказать звонок"
                )}
              </Button>

              <p className="mt-2 text-xs text-gray-500">
                Нажимая кнопку, вы соглашаетесь с нашей{" "}
                <a href="/privacy" className="text-[#8bc4c1] hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Спасибо за заявку!</h3>
              <p className="text-gray-500">Мы перезвоним вам в ближайшее время.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
