import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Доставка и оплата | NFLOWER.RU",
  description: "Информация о способах доставки и оплаты в нашем цветочном магазине",
}

export default function DeliveryPage() {
  return (
    <main className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Доставка и оплата</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Доставка цветов</h2>
          <p className="text-gray-700 mb-4">
            Мы предлагаем быструю и надежную доставку цветов по всему городу и области. Наши курьеры бережно доставят
            ваш заказ в указанное время и место.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Стандартная доставка</h3>
          <p className="text-gray-700 mb-4">
            Доставка осуществляется в течение дня в удобное для вас время. Стоимость доставки зависит от района города и
            рассчитывается автоматически при оформлении заказа.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Экспресс-доставка</h3>
          <p className="text-gray-700 mb-4">
            Если вам нужно срочно доставить букет, мы предлагаем услугу экспресс-доставки. Заказ будет доставлен в
            течение 2 часов с момента оформления.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Бесплатная доставка</h3>
          <p className="text-gray-700 mb-4">
            При заказе на сумму от 5000 рублей доставка по городу осуществляется бесплатно.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Самовывоз</h3>
          <p className="text-gray-700 mb-4">
            Вы можете самостоятельно забрать заказ из любого нашего магазина. При оформлении заказа выберите удобный для
            вас адрес и время.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h3 className="text-xl font-medium mb-4 text-[#8bc4c1]">Зоны доставки</h3>
          <div className="relative h-64 rounded-lg overflow-hidden mb-4">
            <Image
              src="/placeholder.svg?height=300&width=300&text=Карта+доставки"
              alt="Карта зон доставки"
              fill
              className="object-cover"
            />
          </div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span>Зеленая зона - 300 руб.</span>
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              <span>Желтая зона - 500 руб.</span>
            </li>
            <li className="flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              <span>Красная зона - 700 руб.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Способы оплаты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#8bc4c1]">Банковской картой онлайн</h3>
            <p className="text-gray-700 mb-4">
              Вы можете оплатить заказ банковской картой Visa, MasterCard, МИР прямо на сайте. Оплата происходит через
              защищенное соединение.
            </p>
            <div className="flex space-x-2">
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
              <div className="w-12 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#8bc4c1]">Наличными при получении</h3>
            <p className="text-gray-700">
              Вы можете оплатить заказ наличными курьеру при получении. Курьер предоставит вам чек об оплате.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
        <h2 className="text-2xl font-semibold mb-4">Часто задаваемые вопросы</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Как узнать статус моего заказа?</h3>
            <p className="text-gray-700">
              Вы можете отслеживать статус заказа в личном кабинете или связаться с нашей службой поддержки.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Что делать, если получатель отсутствует?</h3>
            <p className="text-gray-700">
              Курьер свяжется с получателем по телефону. Если связаться не удастся, мы свяжемся с вами для решения
              вопроса.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Можно ли изменить адрес доставки после оформления заказа?</h3>
            <p className="text-gray-700">
              Да, вы можете изменить адрес доставки, связавшись с нами по телефону или через форму обратной связи.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Как оформить возврат?</h3>
            <p className="text-gray-700">
              Если вы не удовлетворены качеством товара, свяжитесь с нами в течение 24 часов после получения заказа.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Наши гарантии</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#8bc4c1]">Гарантия свежести</h3>
            <p className="text-gray-700">
              Мы гарантируем свежесть цветов в течение 5 дней после доставки. Если цветы увянут раньше, мы заменим букет
              бесплатно.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#8bc4c1]">Гарантия точной доставки</h3>
            <p className="text-gray-700">
              Мы гарантируем доставку в указанное время с точностью до 15 минут. В случае опоздания мы предоставим
              скидку на следующий заказ.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
