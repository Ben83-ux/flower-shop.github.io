import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, Clock, ChevronLeft, Share2, Bookmark, Heart } from "lucide-react"

// Имитация данных для отдельной статьи
const article = {
  title: "Искусство составления букетов: от классики до авангарда",
  excerpt:
    "Наши флористы делятся секретами создания уникальных композиций, которые станут идеальным подарком или украшением интерьера.",
  image: "/placeholder.svg?height=600&width=1200",
  category: "Мастер-класс",
  date: "10 апреля 2023",
  readTime: "10 мин",
  author: {
    name: "Екатерина Цветкова",
    role: "Главный флорист",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  content: `
    <p>Искусство составления букетов имеет многовековую историю. Еще в Древнем Египте люди создавали цветочные композиции для украшения храмов и дворцов. В Японии искусство икебаны стало настоящей философией, отражающей гармонию человека и природы.</p>
    
    <h2>Классические букеты</h2>
    
    <p>Классический букет обычно имеет круглую или полусферическую форму. В нем используются традиционные цветы: розы, лилии, хризантемы. Цветовая гамма часто строится на сочетании 2-3 оттенков.</p>
    
    <p>Основные принципы составления классического букета:</p>
    
    <ul>
      <li>Симметричность композиции</li>
      <li>Центральное расположение крупных цветов</li>
      <li>Обрамление мелкими цветами и зеленью</li>
      <li>Гармоничное сочетание оттенков</li>
    </ul>
    
    <h2>Современные тенденции</h2>
    
    <p>Современная флористика отходит от строгих канонов. Сегодня в тренде естественность, асимметрия, необычные сочетания цветов и текстур.</p>
    
    <p>Популярные стили современной флористики:</p>
    
    <ol>
      <li><strong>Букеты в стиле "растрепыш"</strong> - свободные, воздушные композиции, словно только что собранные в саду.</li>
      <li><strong>Монобукеты</strong> - композиции из цветов одного вида, но разных оттенков.</li>
      <li><strong>Вертикальные букеты</strong> - высокие композиции, создающие динамичный силуэт.</li>
      <li><strong>Экостиль</strong> - использование природных материалов, сухоцветов, веток, мха.</li>
    </ol>
    
    <h2>Секреты профессионалов</h2>
    
    <p>Наши флористы делятся несколькими профессиональными секретами:</p>
    
    <ul>
      <li>Всегда обрезайте стебли под углом 45 градусов - это увеличивает площадь поглощения воды.</li>
      <li>Удаляйте листья, которые будут находиться в воде - они вызывают размножение бактерий.</li>
      <li>Используйте специальные пищевые добавки для продления жизни срезанных цветов.</li>
      <li>Учитывайте "язык цветов" при составлении букета для особого случая.</li>
      <li>Не бойтесь экспериментировать с необычными элементами: фруктами, перьями, декоративными вставками.</li>
    </ul>
    
    <h2>Мастер-класс: создаем весенний букет</h2>
    
    <p>Для создания весеннего букета вам понадобятся:</p>
    
    <ul>
      <li>Тюльпаны разных оттенков - 7-9 штук</li>
      <li>Нарциссы - 5 штук</li>
      <li>Мускари (мышиный гиацинт) - 3-5 веточек</li>
      <li>Эвкалипт или другая декоративная зелень</li>
      <li>Флористическая лента</li>
      <li>Красивая упаковка (крафт-бумага, органза)</li>
    </ul>
    
    <p>Шаги по созданию букета:</p>
    
    <ol>
      <li>Подготовьте цветы: обрежьте стебли, удалите лишние листья.</li>
      <li>Начните формировать букет с центральных цветов (тюльпаны).</li>
      <li>Добавьте нарциссы, располагая их немного ниже тюльпанов.</li>
      <li>Вставьте веточки мускари для создания объема и текстуры.</li>
      <li>Обрамите композицию зеленью.</li>
      <li>Закрепите стебли флористической лентой.</li>
      <li>Оформите букет в выбранную упаковку.</li>
    </ol>
    
    <p>Помните, что главное в создании букетов - это ваше творческое видение и любовь к цветам. Не бойтесь экспериментировать и создавать уникальные композиции, которые будут радовать вас и ваших близких!</p>
  `,
  relatedPosts: [
    {
      id: 1,
      title: "Как выбрать идеальный букет для первого свидания",
      image: "/placeholder.svg?height=200&width=300",
      slug: "how-to-choose-perfect-bouquet-for-first-date",
    },
    {
      id: 2,
      title: "Топ-10 цветов для офисного пространства",
      image: "/placeholder.svg?height=200&width=300",
      slug: "top-10-flowers-for-office-space",
    },
    {
      id: 3,
      title: "Сезонные букеты: что актуально этой весной",
      image: "/placeholder.svg?height=200&width=300",
      slug: "seasonal-bouquets-spring-trends",
    },
  ],
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Навигация */}
      <div className="mb-6">
        <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-rose-600 transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Вернуться к блогу
        </Link>
      </div>

      {/* Заголовок статьи */}
      <div className="max-w-4xl mx-auto mb-8">
        <span className="inline-block bg-rose-600 text-white text-xs md:text-sm px-3 py-1 rounded-full mb-4">
          {article.category}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{article.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{article.excerpt}</p>

        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center">
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
              <Image
                src={article.author.avatar || "/placeholder.svg"}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{article.author.name}</p>
              <p className="text-sm text-gray-500">{article.author.role}</p>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <span className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              {article.date}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {article.readTime} чтения
            </span>
          </div>
        </div>
      </div>

      {/* Изображение статьи */}
      <div className="max-w-5xl mx-auto mb-10">
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
          <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        </div>
      </div>

      {/* Содержимое статьи */}
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-4 md:gap-8">
          {/* Боковая панель с действиями */}
          <div className="hidden md:flex flex-col items-center space-y-4 sticky top-24 h-fit">
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Heart className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Bookmark className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Share2 className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Текст статьи */}
          <article className="flex-1 prose prose-rose lg:prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
        </div>

        {/* Мобильная панель с действиями */}
        <div className="md:hidden flex justify-center space-x-6 my-8">
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Heart className="h-5 w-5 text-gray-700" />
          </button>
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Bookmark className="h-5 w-5 text-gray-700" />
          </button>
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Share2 className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        {/* Теги */}
        <div className="mt-8 mb-12">
          <div className="flex flex-wrap gap-2">
            {["Флористика", "Букеты", "Мастер-класс", "Композиции", "Советы"].map((tag, index) => (
              <Link
                key={index}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Автор */}
        <div className="bg-gray-50 rounded-xl p-6 mb-12">
          <div className="flex items-center">
            <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
              <Image
                src={article.author.avatar || "/placeholder.svg"}
                alt={article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-lg">Об авторе</h3>
              <p className="font-medium">{article.author.name}</p>
              <p className="text-gray-600">{article.author.role}</p>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            Екатерина — профессиональный флорист с 10-летним опытом работы. Специализируется на создании уникальных
            букетов и композиций для особых случаев. Регулярно проводит мастер-классы и делится своими знаниями в нашем
            блоге.
          </p>
        </div>

        {/* Похожие статьи */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Похожие статьи</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {article.relatedPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-40">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium group-hover:text-rose-600 transition-colors">{post.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Комментарии */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Комментарии (3)</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((comment) => (
              <div key={comment} className="border-b pb-6">
                <div className="flex items-start mb-2">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={`/placeholder.svg?height=40&width=40`}
                      alt="Аватар пользователя"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Пользователь {comment}</p>
                    <p className="text-sm text-gray-500">5 апреля 2023</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  Отличная статья! Очень полезные советы по составлению букетов. Обязательно попробую создать весенний
                  букет по вашему мастер-классу.
                </p>
              </div>
            ))}
          </div>

          {/* Форма комментария */}
          <div className="mt-8">
            <h4 className="text-xl font-bold mb-4">Оставить комментарий</h4>
            <form>
              <div className="mb-4">
                <textarea
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  rows={4}
                  placeholder="Ваш комментарий..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-rose-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-rose-700 transition-colors"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
