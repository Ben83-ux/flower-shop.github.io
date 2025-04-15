"use client"

import type { User } from "@/types/user"
import { formatPrice } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface CashbackInfoProps {
  user: User
}

export default function CashbackInfo({ user }: CashbackInfoProps) {
  // Расчет прогресса до следующего уровня
  const nextLevelThresholds: Record<string, number> = {
    BLACK: Number.POSITIVE_INFINITY, // Максимальный уровень
    GOLD: 50000,
    SILVER: 20000,
    STANDARD: 5000,
    BASIC: 0,
  }

  const currentLevelIndex = Object.keys(nextLevelThresholds).indexOf(user.bonusLevel)
  const nextLevel = currentLevelIndex > 0 ? Object.keys(nextLevelThresholds)[currentLevelIndex - 1] : null

  const currentThreshold = nextLevelThresholds[user.bonusLevel]
  const nextThreshold = nextLevel ? nextLevelThresholds[nextLevel] : null

  // Расчет прогресса в процентах
  const progress =
    nextThreshold && nextThreshold !== Number.POSITIVE_INFINITY
      ? Math.min(100, (user.cashback / nextThreshold) * 100)
      : 100

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Бонусная программа и CASH-BACK</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Ваш статус</h3>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-white font-bold">
              {user.bonusLevel}
            </div>
            <div>
              <p className="font-bold text-xl">{user.bonusLevel}</p>
              <p className="text-sm text-gray-500">Ваш текущий уровень</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Текущий кэшбэк</span>
              {nextLevel && <span>До уровня {nextLevel}</span>}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex justify-between text-sm">
            <span>{formatPrice(user.cashback)} ₽</span>
            {nextThreshold && nextThreshold !== Number.POSITIVE_INFINITY && <span>{formatPrice(nextThreshold)} ₽</span>}
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-600">
              Ваша текущая скидка: <span className="font-bold">{user.discountPercent}%</span>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Как работает CASH-BACK</h3>

          <div className="space-y-4">
            <p className="text-sm">
              За каждый заказ вы получаете бонусы, которые можно использовать для оплаты следующих заказов.
            </p>

            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">1</div>
                <p className="text-sm">Совершайте покупки и получайте кэшбэк</p>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">2</div>
                <p className="text-sm">Накапливайте бонусы для повышения уровня</p>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">3</div>
                <p className="text-sm">Используйте накопленные бонусы при оплате</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Уровни программы:</h4>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>BASIC</span>
                <span>Кэшбэк 5%</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>STANDARD</span>
                <span>Кэшбэк 7%</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>SILVER</span>
                <span>Кэшбэк 10%</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>GOLD</span>
                <span>Кэшбэк 15%</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>BLACK</span>
                <span>Кэшбэк 20%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Баланс CASH-BACK</h3>
        <p className="text-2xl font-bold">{formatPrice(user.cashback)} ₽</p>
        <p className="text-sm text-gray-500 mt-1">Вы можете использовать накопленные бонусы при оформлении заказа</p>
      </div>
    </div>
  )
}
