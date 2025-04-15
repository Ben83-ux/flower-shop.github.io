import { NextResponse } from "next/server"

// Типы для Яндекс API
interface YandexDeliveryRequest {
  source_point: {
    coordinates: [number, number] // [долгота, широта]
  }
  destination_point: {
    coordinates: [number, number] // [долгота, широта]
  }
  items: {
    quantity: number
    size: {
      height: number
      length: number
      width: number
    }
    weight: number
  }[]
}

interface YandexDeliveryResponse {
  price: number
  currency: string
  distance: number
  eta: number
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { sourceAddress, destinationAddress, items } = body

    // В реальном приложении здесь будет запрос к API Яндекс.Геокодера для получения координат
    // Для примера используем фиктивные координаты
    const sourceCoordinates = await getCoordinates(sourceAddress)
    const destinationCoordinates = await getCoordinates(destinationAddress)

    // Формируем запрос к API Яндекс Курьера
    const deliveryRequest: YandexDeliveryRequest = {
      source_point: {
        coordinates: sourceCoordinates,
      },
      destination_point: {
        coordinates: destinationCoordinates,
      },
      items: items.map((item: any) => ({
        quantity: item.quantity,
        size: {
          height: 10, // см
          length: 20, // см
          width: 15, // см
        },
        weight: 0.5, // кг
      })),
    }

    // В реальном приложении здесь будет запрос к API Яндекс Курьера
    // Для примера возвращаем фиктивные данные
    const deliveryResponse = await calculateDelivery(deliveryRequest)

    return NextResponse.json({
      price: deliveryResponse.price,
      currency: deliveryResponse.currency,
      distance: deliveryResponse.distance,
      eta: deliveryResponse.eta,
    })
  } catch (error) {
    console.error("Error calculating delivery:", error)
    return NextResponse.json({ error: "Failed to calculate delivery cost" }, { status: 500 })
  }
}

// Функция для получения координат по адресу (в реальном приложении будет использовать API Яндекс.Геокодера)
async function getCoordinates(address: string): Promise<[number, number]> {
  // Имитация запроса к API геокодера
  // В реальном приложении здесь будет запрос к API Яндекс.Геокодера

  // Координаты для филиалов в Омске
  if (address.includes("21-я Амурская")) {
    return [73.3845, 55.0293] // примерные координаты для 21-й Амурской
  } else if (address.includes("Декабристов")) {
    return [73.4012, 54.9812] // примерные координаты для Декабристов
  } else if (address.includes("2-я Поселковая")) {
    return [73.3156, 54.9923] // примерные координаты для 2-й Поселковой
  }
  // Для Омска в целом
  else if (address.toLowerCase().includes("омск")) {
    return [73.3674, 54.9924] // центр Омска
  }
  // Для других адресов возвращаем случайные координаты в пределах Омска
  else {
    const lat = 54.9924 + (Math.random() - 0.5) * 0.1
    const lng = 73.3674 + (Math.random() - 0.5) * 0.1
    return [lng, lat]
  }
}

// Функция для расчета стоимости доставки (в реальном приложении будет использовать API Яндекс Курьера)
async function calculateDelivery(request: YandexDeliveryRequest): Promise<YandexDeliveryResponse> {
  // Имитация запроса к API Яндекс Курьера
  // В реальном приложении здесь будет запрос к API Яндекс Курьера

  // Расчет расстояния между точками (упрощенно)
  const [lng1, lat1] = request.source_point.coordinates
  const [lng2, lat2] = request.destination_point.coordinates

  // Расчет расстояния по формуле гаверсинусов (приблизительно)
  const R = 6371 // Радиус Земли в км
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  // Базовая стоимость доставки
  const basePrice = 150
  // Стоимость за километр
  const pricePerKm = 20
  // Расчет итоговой стоимости
  const price = Math.round(basePrice + distance * pricePerKm)

  // Расчет примерного времени доставки (в минутах)
  const eta = Math.round(15 + distance * 2) // 15 минут + 2 минуты на км

  return {
    price,
    currency: "RUB",
    distance: Math.round(distance * 10) / 10, // Округляем до 1 десятичного знака
    eta,
  }
}
