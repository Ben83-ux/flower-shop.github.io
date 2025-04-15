import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Новости | NFLOWER.RU",
  description: "Последние новости и события нашего цветочного магазина",
}

// Моковые данные для новостей
const newsItems = [
  {
    id: 1,
    title: "Новая коллекция весенних букетов",
    date: "15 марта 2023",
    excerpt:
      "Мы рады представить нашу новую коллекцию весенних букетов, созданную специально для того, чтобы принести в ваш дом атмосферу весны и обновления.",
    image: "/placeholder.svg?height=400&width=600&text=Весенние+букеты",
  },
  {
    id: 2,
    title: "Открытие нового магазина в центре города",
    date: "28 февраля 2023",
    excerpt:
      "Мы рады сообщить об открытии нашего нового магазина в самом центре города. Приглашаем всех на торжественное открытие 5 марта!",
    image: "/placeholder.svg?height=400&width=600&text=Новый+магазин",
  },
  {
    id: 3,
    title: "Мастер-класс по флористике для начинающих",
    date: "10 февраля 2023",
    excerpt:
      "Приглашаем всех желающих на мастер-класс по флористике, который пройдет в нашем магазине 20 февраля. Вы научитесь создавать красивые композиции своими руками.",
    image: "/placeholder.svg?height=400&width=600&text=Мастер-класс",
  },
  {
    id: 4,
    title: "Специальные предложения ко Дню всех влюбленных",
    date: "1 февраля 2023",
    excerpt:
      "В преддверии Дня всех влюбленных мы подготовили специальные предложения и скидки на самые романтичные букеты и композиции.",
    image: "/placeholder.svg?height=400&width=600&text=День+влюбленных",
  },
  {
    id: 5,
    title: "Новая услуга: подписка на цветы",
    date: "15 января 2023",
    excerpt:
      "Теперь вы можете оформить подписку на регулярную доставку свежих цветов. Выберите периодичность, и мы будем радовать вас или ваших близких красивыми букетами.",
    image: "/placeholder.svg?height=400&width=600&text=Подписка+на+цветы",
  },
  {
    id: 6,
    title: "Итоги благотворительной акции",
    date: "30 декабря 2022",
    excerpt:
      "Подводим итоги нашей благотворительной акции. Благодаря вашей поддержке мы смогли собрать значительную сумму для помощи детскому дому.",
    image: "/placeholder.svg?height=400&width=600&text=Благотворительность",
  },
]

export default function NewsPage() {
  return (
    <main className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Новости</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {newsItems.map((item) => (
          <article key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="relative h-48 md:h-56">
              <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-4 md:p-6">
              <span className="text-sm text-gray-500">{item.date}</span>
              <h2 className="text-xl font-semibold mt-2 mb-3">{item.title}</h2>
              <p className="text-gray-700 mb-4">{item.excerpt}</p>
              <Link href={`/news/${item.id}`} className="text-[#8bc4c1] font-medium hover:underline">
                Читать далее
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 bg-gray-100 p-6 md:p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Подпишитесь на наши новости</h2>
        <p className="text-gray-700 mb-6">
          Будьте в курсе наших последних новостей, акций и специальных предложений. Подпишитесь на нашу рассылку, и мы
          будем присылать вам только самую интересную информацию.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Ваш email"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
          />
          <button className="bg-[#8bc4c1] text-white px-6 py-2 rounded-md hover:bg-[#7ab3b0] transition-colors">
            Подписаться
          </button>
        </div>
      </div>
    </main>
  )
}
