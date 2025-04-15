"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

// Моковые данные для открыток
const greetingCards = [
  {
    id: 1,
    name: "С днем рождения",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    name: "С любовью",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    name: "Поздравляю",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    name: "Спасибо",
    image: "/placeholder.svg?height=200&width=300",
  },
]

interface GreetingCardSelectorProps {
  onCardSelected: (cardId: number, message: string) => void
}

export default function GreetingCardSelector({ onCardSelected }: GreetingCardSelectorProps) {
  const [selectedCard, setSelectedCard] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  const handleCardChange = (value: string) => {
    setSelectedCard(value)
    onCardSelected(Number.parseInt(value), message)
  }

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    if (selectedCard) {
      onCardSelected(Number.parseInt(selectedCard), e.target.value)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label className="block mb-2">Выберите открытку</Label>
        <RadioGroup
          value={selectedCard}
          onValueChange={handleCardChange}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {greetingCards.map((card) => (
            <div key={card.id} className="relative">
              <RadioGroupItem value={card.id.toString()} id={`card-${card.id}`} className="sr-only" />
              <Label
                htmlFor={`card-${card.id}`}
                className={`block cursor-pointer overflow-hidden rounded-lg border-2 ${
                  selectedCard === card.id.toString()
                    ? "border-[#8bc4c1] ring-2 ring-[#8bc4c1]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="relative h-32 w-full">
                  <Image src={card.image || "/placeholder.svg"} alt={card.name} fill className="object-cover" />
                </div>
                <div className="p-2 text-center text-sm">{card.name}</div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {selectedCard && (
        <div>
          <Label htmlFor="card-message">Текст поздравления</Label>
          <Textarea
            id="card-message"
            value={message}
            onChange={handleMessageChange}
            placeholder="Введите текст для открытки..."
            className="mt-1"
            rows={3}
          />
        </div>
      )}
    </div>
  )
}
