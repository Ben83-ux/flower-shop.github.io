import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Mail, Phone, FileText, Users, Calendar, Building, Gift, Award, Briefcase } from "lucide-react"

export const metadata: Metadata = {
  title: "Корпоративным клиентам | NFLOWER.RU",
  description:
    "Специальные предложения для корпоративных клиентов: оформление офисов, мероприятий, подарки сотрудникам и партнерам",
}

export default function CorpClientsPage() {
  return (
    <main className="pb-16">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/placeholder.svg?height=800&width=1600"
          alt="Корпоративное оформление цветами"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b]/80 to-[#1e293b]/40 flex items-center">
          <div className="container">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Цветочные решения для бизнеса
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-6">
                Создаем индивидуальные предложения для корпоративных клиентов с учетом всех пожеланий и бюджета
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">
                  Получить коммерческое предложение
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Связаться с менеджером
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Преимущества сотрудничества</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Мы предлагаем комплексные решения для бизнеса любого масштаба. Наша команда профессионалов создаст
            уникальное цветочное оформление, которое подчеркнет статус вашей компании.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Award className="h-10 w-10 text-[#8bc4c1]" />,
                title: "Индивидуальный подход",
                description:
                  "Разработка уникальных концепций оформления с учетом корпоративного стиля и пожеланий клиента",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-[#8bc4c1]" />,
                title: "Гарантия качества",
                description: "Используем только свежие цветы и материалы высокого качества для всех наших композиций",
              },
              {
                icon: <Calendar className="h-10 w-10 text-[#8bc4c1]" />,
                title: "Оперативность",
                description: "Выполняем заказы точно в срок, даже при сжатых временных рамках",
              },
              {
                icon: <Users className="h-10 w-10 text-[#8bc4c1]" />,
                title: "Персональный менеджер",
                description: "За каждым корпоративным клиентом закрепляется персональный менеджер",
              },
              {
                icon: <FileText className="h-10 w-10 text-[#8bc4c1]" />,
                title: "Документооборот",
                description: "Полный пакет документов для бухгалтерии, возможность работы по безналичному расчету",
              },
              {
                icon: <Gift className="h-10 w-10 text-[#8bc4c1]" />,
                title: "Специальные условия",
                description: "Гибкая система скидок для постоянных клиентов и при больших объемах заказов",
              },
            ].map((benefit, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Предлагаем полный спектр услуг по цветочному оформлению для корпоративных клиентов
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Building className="h-8 w-8 text-[#8bc4c1]" />,
                title: "Оформление офисов и бизнес-центров",
                description:
                  "Еженедельное обновление цветочных композиций в офисах, холлах, на ресепшн. Озеленение офисных пространств.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                icon: <Calendar className="h-8 w-8 text-[#8bc4c1]" />,
                title: "Оформление мероприятий",
                description: "Декорирование конференций, презентаций, корпоративных праздников, выставочных стендов.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                icon: <Gift className="h-8 w-8 text-[#8bc4c1]" />,
                title: "Корпоративные подарки",
                description: "Букеты и композиции для сотрудников, клиентов и партнеров к праздникам и значимым датам.",
                image: "/placeholder.svg?height=300&width=500",
              },
              {
                icon: <Briefcase className="h-8 w-8 text-[#8bc4c1]" />,
                title: "Бизнес-сувениры",
                description: "Брендированные цветочные композиции, подарочные наборы с логотипом компании.",
                image: "/placeholder.svg?height=300&width=500",
              },
            ].map((service, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-sm">
                <div className="relative w-full md:w-1/2 h-[200px] rounded-lg overflow-hidden">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center gap-2 mb-3">
                    {service.icon}
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button
                    variant="outline"
                    className="text-[#8bc4c1] border-[#8bc4c1] hover:bg-[#8bc4c1] hover:text-white"
                  >
                    Подробнее
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Специальные предложения</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Для наших корпоративных клиентов мы разработали выгодные условия сотрудничества
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Стартовый",
                price: "от 10 000 ₽/мес",
                features: [
                  "Еженедельное обновление 2-3 композиций",
                  "Скидка 5% на все дополнительные заказы",
                  "Персональный менеджер",
                  "Доставка в пределах города",
                ],
                isPopular: false,
              },
              {
                title: "Бизнес",
                price: "от 30 000 ₽/мес",
                features: [
                  "Еженедельное обновление 5-7 композиций",
                  "Скидка 10% на все дополнительные заказы",
                  "Персональный менеджер",
                  "Бесплатная доставка в пределах города",
                  "Экстренная замена композиций при необходимости",
                ],
                isPopular: true,
              },
              {
                title: "Премиум",
                price: "от 50 000 ₽/мес",
                features: [
                  "Еженедельное обновление 10+ композиций",
                  "Скидка 15% на все дополнительные заказы",
                  "VIP-менеджер на связи 24/7",
                  "Бесплатная доставка в пределах города",
                  "Экстренная замена композиций при необходимости",
                  "Сезонное оформление входной группы",
                ],
                isPopular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`border ${plan.isPopular ? "border-[#8bc4c1]" : "border-gray-200"} relative overflow-hidden`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-[#8bc4c1] text-white px-4 py-1 text-sm font-medium">
                    Популярный
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                  <p className="text-2xl font-semibold mb-4">{plan.price}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#8bc4c1] mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.isPopular ? "bg-[#8bc4c1] hover:bg-[#7ab3b0]" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    Выбрать план
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Не нашли подходящий вариант? Мы разработаем индивидуальное предложение специально для вас.
            </p>
            <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">Получить индивидуальное предложение</Button>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Наши работы</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Примеры оформления мероприятий и офисных пространств для наших корпоративных клиентов
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="relative h-[250px] rounded-lg overflow-hidden group">
                <Image
                  src={`/placeholder.svg?height=500&width=500&text=Пример ${index + 1}`}
                  alt={`Пример корпоративного оформления ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-medium">Корпоративное оформление</h3>
                    <p className="text-sm text-white/80">Описание проекта</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" className="text-[#8bc4c1] border-[#8bc4c1] hover:bg-[#8bc4c1] hover:text-white">
              Смотреть все работы
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Отзывы наших клиентов</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Что говорят о нас корпоративные клиенты, которые уже оценили качество нашей работы
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Анна Смирнова",
                position: "HR-директор, ООО «ТехноПром»",
                text: "Сотрудничаем с NFLOWER.RU уже более 2 лет. Еженедельно обновляют композиции в нашем офисе, всегда свежие и красивые цветы. Отдельное спасибо за оперативность при организации корпоративных мероприятий!",
              },
              {
                name: "Дмитрий Ковалев",
                position: "Генеральный директор, «Инвест Групп»",
                text: "Благодарим команду NFLOWER.RU за профессиональный подход к оформлению нашего юбилея компании. Все было выполнено точно в срок и с учетом всех пожеланий. Гости были в восторге от цветочных композиций.",
              },
              {
                name: "Елена Петрова",
                position: "Руководитель отдела маркетинга, «МедиаХолдинг»",
                text: "Заказывали оформление выставочного стенда. Результат превзошел все ожидания! Креативный подход, внимание к деталям и качественные материалы. Обязательно продолжим сотрудничество.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center text-yellow-400 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 md:py-16 bg-[#1e293b] text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="mb-6">
                Оставьте заявку, и наш менеджер свяжется с вами в ближайшее время для обсуждения деталей сотрудничества
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-[#8bc4c1] mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Телефон</h3>
                    <p>+7 (921) 234-56-78</p>
                    <p className="text-sm text-gray-300">Пн-Пт: 9:00-18:00</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-[#8bc4c1] mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p>corporate@nflower.ru</p>
                    <p className="text-sm text-gray-300">Для корпоративных клиентов</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/10 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Наши клиенты</h3>
                <div className="flex flex-wrap gap-4">
                  {["Компания 1", "Компания 2", "Компания 3", "Компания 4", "Компания 5"].map((company, index) => (
                    <div key={index} className="bg-white/20 px-3 py-1 rounded text-sm">
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white text-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Заполните форму</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Ваше имя *
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Название компании *
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Интересующая услуга
                  </label>
                  <select
                    id="service"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
                  >
                    <option value="">Выберите услугу</option>
                    <option value="office">Оформление офиса</option>
                    <option value="events">Оформление мероприятий</option>
                    <option value="gifts">Корпоративные подарки</option>
                    <option value="subscription">Цветочная подписка</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#8bc4c1]"
                    placeholder="Опишите ваши пожелания или задайте вопрос"
                  ></textarea>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" id="privacy" className="mt-1 mr-2" required />
                  <label htmlFor="privacy" className="text-sm text-gray-600">
                    Я согласен с{" "}
                    <Link href="/privacy" className="text-[#8bc4c1] hover:underline">
                      политикой конфиденциальности
                    </Link>
                  </label>
                </div>
                <Button type="submit" className="w-full bg-[#8bc4c1] hover:bg-[#7ab3b0]">
                  Отправить заявку
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Часто задаваемые вопросы</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
            Ответы на популярные вопросы о корпоративном сотрудничестве
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Как оформить заказ на корпоративное обслуживание?",
                answer:
                  "Для оформления заказа вы можете оставить заявку на сайте, позвонить нам или отправить запрос на электронную почту. Наш менеджер свяжется с вами для обсуждения деталей и подготовки коммерческого предложения.",
              },
              {
                question: "Какие документы необходимы для заключения договора?",
                answer:
                  "Для заключения договора потребуются реквизиты вашей компании, включая ИНН, КПП, юридический адрес и банковские реквизиты. Мы предоставляем полный пакет документов для бухгалтерии.",
              },
              {
                question: "Возможна ли доставка в нерабочее время?",
                answer:
                  "Да, мы можем организовать доставку в нерабочее время или выходные дни по предварительной договоренности. Для корпоративных клиентов мы стараемся быть максимально гибкими.",
              },
              {
                question: "Как часто происходит обновление цветочных композиций в офисе?",
                answer:
                  "Стандартно обновление происходит раз в неделю, но график может быть скорректирован в соответствии с вашими пожеланиями и особенностями помещения.",
              },
              {
                question: "Можно ли заказать оформление с учетом корпоративного стиля компании?",
                answer:
                  "Да, мы создаем композиции с учетом корпоративного стиля компании, включая цветовую гамму, логотип и другие элементы фирменного стиля. Наши флористы разработают уникальные решения, которые будут соответствовать имиджу вашей компании.",
              },
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Не нашли ответ на свой вопрос?</p>
            <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">Задать вопрос</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-[#e8f4f2]">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Готовы начать сотрудничество?</h2>
            <p className="text-gray-600 mb-6">
              Оставьте заявку сейчас и получите специальное предложение для новых корпоративных клиентов
            </p>
            <Button size="lg" className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">
              Получить коммерческое предложение
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
