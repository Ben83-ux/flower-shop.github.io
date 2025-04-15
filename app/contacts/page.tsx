import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Контакты | NFLOWER.RU",
  description: "Свяжитесь с нами по телефону, email или посетите наши магазины",
}

// Моковые данные для магазинов
const stores = [
  {
    id: 1,
    name: "NFLOWER Центральный",
    address: "ул. Ленина, 45, Омск",
    phone: "+7 (3812) 123-45-67",
    hours: "Пн-Пт: 8:00-20:00, Сб-Вс: 9:00-19:00",
  },
  {
    id: 2,
    name: "NFLOWER Кировский",
    address: "ул. Профсоюзов, 12, Омск",
    phone: "+7 (3812) 234-56-78",
    hours: "Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-20:00",
  },
  {
    id: 3,
    name: "NFLOWER Советский",
    address: "пр. Мира, 56, Омск",
    phone: "+7 (3812) 345-67-89",
    hours: "Пн-Пт: 8:00-20:00, Сб-Вс: 9:00-19:00",
  },
]

export default function ContactsPage() {
  return (
    <main className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Контакты</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Свяжитесь с нами</h2>
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-[#8bc4c1] mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Телефон</h3>
                <p className="text-gray-700">+7 (921) 234-56-78</p>
                <p className="text-gray-500 text-sm">Ежедневно с 8:00 до 22:00</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-[#8bc4c1] mt-1 mr-3" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-700">info@nflower.ru</p>
                <p className="text-gray-500 text-sm">Мы отв��чаем в течение 24 часов</p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4">Форма обратной связи</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
                placeholder="Иван Иванов"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
                placeholder="example@mail.ru"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Телефон
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
                placeholder="+7 (XXX) XXX-XX-XX"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Сообщение
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
                placeholder="Ваше сообщение..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#8bc4c1] text-white px-6 py-2 rounded-md hover:bg-[#7ab3b0] transition-colors"
            >
              Отправить
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Наши магазины</h2>
          <div className="space-y-6">
            {stores.map((store) => (
              <div key={store.id} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium mb-3 text-[#8bc4c1]">{store.name}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                    <span className="text-gray-700">{store.address}</span>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                    <span className="text-gray-700">{store.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-gray-500 mt-1 mr-3" />
                    <span className="text-gray-700">{store.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Карта</h2>
            <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
              <p className="text-gray-500">Здесь будет карта с расположением магазинов</p>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              * Для просмотра интерактивной карты необходимо подключение к Яндекс.Картам
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 p-6 md:p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Часто задаваемые вопросы</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Как заказать цветы с доставкой?</h3>
            <p className="text-gray-700">
              Вы можете оформить заказ на нашем сайте, выбрав понравившийся букет и указав адрес доставки, или позвонить
              нам по телефону.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Какие способы оплаты вы принимаете?</h3>
            <p className="text-gray-700">
              Мы принимаем оплату банковскими картами онлайн, наличными при получении, а также банковской картой при
              получении.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Можно ли заказать индивидуальный букет?</h3>
            <p className="text-gray-700">
              Да, вы можете заказать индивидуальный букет, связавшись с нами по телефону или через форму обратной связи.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
