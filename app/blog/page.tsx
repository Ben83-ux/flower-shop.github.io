import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, Clock, Tag } from "lucide-react"

// Имитация данных для блога
const blogPosts = [
  {
    id: 1,
    title: "Как выбрать идеальный букет для первого свидания",
    excerpt:
      "Первое свидание — это всегда волнительно. Узнайте, какие цветы подарить, чтобы произвести правильное впечатление.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Советы",
    date: "15 апреля 2023",
    readTime: "5 мин",
    slug: "how-to-choose-perfect-bouquet-for-first-date",
  },
  {
    id: 2,
    title: "Топ-10 цветов для офисного пространства",
    excerpt:
      "Растения в офисе не только украшают пространство, но и повышают продуктивность. Рассказываем о лучших вариантах.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Интерьер",
    date: "2 апреля 2023",
    readTime: "7 мин",
    slug: "top-10-flowers-for-office-space",
  },
  {
    id: 3,
    title: "Сезонные букеты: что актуально этой весной",
    excerpt: "Каждый сезон диктует свои тренды в флористике. Рассказываем о самых актуальных весенних композициях.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Тренды",
    date: "28 марта 2023",
    readTime: "6 мин",
    slug: "seasonal-bouquets-spring-trends",
  },
  {
    id: 4,
    title: "Язык цветов: что означают разные растения и их цвета",
    excerpt: "Цветы могут рассказать целую историю. Узнайте о скрытых значениях разных растений и их оттенков.",
    image: "/placeholder.svg?height=400&width=600",
    category: "История",
    date: "15 марта 2023",
    readTime: "8 мин",
    slug: "flower-language-meanings",
  },
  {
    id: 5,
    title: "Как продлить жизнь срезанным цветам: проверенные методы",
    excerpt:
      "Хотите, чтобы ваш букет радовал вас как можно дольше? Делимся секретами правильного ухода за срезанными цветами.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Уход",
    date: "5 марта 2023",
    readTime: "5 мин",
    slug: "how-to-extend-cut-flowers-life",
  },
  {
    id: 6,
    title: "Флористические тренды 2023 года",
    excerpt: "Какие цветы, композиции и стили будут популярны в этом году? Обзор главных трендов от наших флористов.",
    image: "/placeholder.svg?height=400&width=600",
    category: "Тренды",
    date: "20 февраля 2023",
    readTime: "7 мин",
    slug: "floristry-trends-2023",
  },
]

// Категории для фильтрации
const categories = ["Все", "Советы", "Интерьер", "Тренды", "История", "Уход", "Мероприятия"]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Заголовок блога */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Блог о цветах и флористике</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Полезные статьи, советы по уходу за цветами, тренды флористики и интересные истории из мира растений
        </p>
      </div>

      {/* Фильтр по категориям */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 md:space-x-4 min-w-max pb-2">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
                index === 0 ? "bg-rose-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Популярная статья */}
      <div className="mb-12">
        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full">
            <Image
              src="/placeholder.svg?height=500&width=1200"
              alt="Искусство составления букетов"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <span className="inline-block bg-rose-600 text-white text-xs md:text-sm px-3 py-1 rounded-full mb-3">
              Мастер-класс
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Искусство составления букетов: от классики до авангарда
            </h2>
            <p className="text-gray-200 mb-4 max-w-3xl">
              Наши флористы делятся секретами создания уникальных композиций, которые станут идеальным подарком или
              украшением интерьера.
            </p>
            <div className="flex items-center text-sm md:text-base space-x-4">
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                10 апреля 2023
              </span>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                10 мин чтения
              </span>
            </div>
            <Link
              href="/blog/art-of-bouquet-making"
              className="mt-4 inline-block bg-white text-rose-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Читать статью
            </Link>
          </div>
        </div>
      </div>

      {/* Список статей */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {blogPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <article className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 md:h-56">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="flex items-center mr-4">
                    <Tag className="h-3 w-3 mr-1" />
                    {post.category}
                  </span>
                  <span className="flex items-center mr-4">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-rose-600 transition-colors">{post.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Пагинация */}
      <div className="mt-12 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="px-4 py-2 border rounded-md text-gray-500 bg-white hover:bg-gray-50">&laquo; Назад</button>
          <button className="px-4 py-2 border rounded-md bg-rose-600 text-white">1</button>
          <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50">2</button>
          <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50">3</button>
          <span className="px-2">...</span>
          <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50">8</button>
          <button className="px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Вперед &raquo;
          </button>
        </nav>
      </div>

      {/* Подписка на блог */}
      <div className="mt-16 bg-gray-50 rounded-xl p-6 md:p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Подпишитесь на наш блог</h3>
          <p className="text-gray-600 mb-6">
            Получайте свежие статьи, советы по уходу за цветами и новости о специальных предложениях прямо на вашу почту
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
            <button
              type="submit"
              className="bg-rose-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-700 transition-colors"
            >
              Подписаться
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
