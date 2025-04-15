import Link from "next/link"
import Image from "next/image"
import { Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer>
      {/* Partners section */}
      <div className="py-6 md:py-10 bg-white">
        <div className="container">
          <h3 className="text-lg md:text-xl font-medium text-center mb-4 md:mb-8">Нам доверяют и партнеры</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12">
            {["БИЛАЙН", "HUAWEI", "СБЕРБАНК", "mail.ru", "Яндекс"].map((partner, index) => (
              <div key={index} className="relative h-8 w-16 md:h-12 md:w-24 lg:w-32">
                <Image src="/placeholder.svg?height=48&width=96" alt={partner} fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-[#1e293b] text-white pt-8 pb-20 md:py-12">
        <div className="container">
          {/* Logo and social */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6 md:mb-8">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="inline-block mb-4">
                <div className="relative w-32 h-16 md:w-40 md:h-20">
                  <Image src="/images/logo.png" alt="NFLOWER.RU" fill className="object-contain brightness-0 invert" />
                </div>
              </Link>
              <div className="flex space-x-4 justify-center md:justify-start">
                <Link
                  href="https://vk.com"
                  className="text-gray-300 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/images/social/vk.png" alt="VK" width={20} height={20} />
                </Link>
                <Link
                  href="https://t.me"
                  className="text-gray-300 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/images/social/telegram.png" alt="Telegram" width={20} height={20} />
                </Link>
                <Link
                  href="https://wa.me/79212345678"
                  className="text-gray-300 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/images/social/whatsapp.png" alt="WhatsApp" width={20} height={20} />
                </Link>
                <Link
                  href="https://instagram.com"
                  className="text-gray-300 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src="/images/social/instagram.png" alt="Instagram" width={20} height={20} />
                </Link>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end mb-2">
                <Phone className="h-4 w-4 mr-2" />
                <span>+7 (921) 234-56-78</span>
              </div>
              <Link href="/callback" className="text-sm text-gray-300 hover:text-white">
                Наши адреса
              </Link>
            </div>
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Company */}
            <div>
              <h3 className="text-lg font-bold mb-3 md:mb-4">О КОМПАНИИ</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/about" className="hover:text-white">
                    О салонах
                  </Link>
                </li>
                <li>
                  <Link href="/delivery" className="hover:text-white">
                    Доставка и оплата
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white">
                    Блог
                  </Link>
                </li>
                <li>
                  <Link href="/corp-clients" className="hover:text-white">
                    Корп. клиентам
                  </Link>
                </li>
                <li>
                  <Link href="/contacts" className="hover:text-white">
                    Контакты
                  </Link>
                </li>
                <li>
                  <Link href="/care" className="hover:text-white">
                    Уход за цветами
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-bold mb-3 md:mb-4">КАТЕГОРИИ</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/live-showcase" className="hover:text-white">
                    Живая витрина
                  </Link>
                </li>
              </ul>
            </div>

            {/* Clients */}
            <div>
              <h3 className="text-lg font-bold mb-3 md:mb-4">КЛИЕНТАМ</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/account" className="hover:text-white">
                    Личный кабинет
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="hover:text-white">
                    Мои заказы
                  </Link>
                </li>
                <li>
                  <Link href="/cashback" className="hover:text-white">
                    CASH-BACK
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-6 md:mt-8 pt-4 md:pt-8 text-xs md:text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
            <p>© Все права защищены.</p>
            <Link href="/privacy" className="hover:text-white mt-2 md:mt-0">
              Политика конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
