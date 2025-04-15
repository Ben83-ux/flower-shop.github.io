import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "О нас | NFLOWER.RU",
  description: "Узнайте больше о нашей компании, нашей истории и ценностях",
}

export default function AboutPage() {
  return (
    <main className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">О нас</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Наша история</h2>
          <p className="text-gray-700 mb-4">
            Компания NFLOWER.RU была основана в 2010 году группой энтузиастов, влюбленных в цветы и флористику. Начав с
            небольшого магазина в центре города, мы постепенно расширили свою сеть и теперь представлены в нескольких
            районах города.
          </p>
          <p className="text-gray-700 mb-4">
            За более чем десятилетнюю историю мы завоевали доверие тысяч клиентов благодаря нашему неизменному качеству,
            свежести цветов и профессионализму наших флористов.
          </p>
          <p className="text-gray-700">
            Сегодня NFLOWER.RU — это современная компания, которая сочетает традиции классической флористики с
            инновационными подходами и технологиями.
          </p>
        </div>
        <div className="relative h-64 md:h-auto rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=400&width=600" alt="Наша команда" fill className="object-cover" />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Наши ценности</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#8bc4c1]">Качество</h3>
            <p className="text-gray-700">
              Мы работаем только с проверенными поставщиками и тщательно отбираем каждый цветок, чтобы гарантировать
              свежесть и долговечность наших букетов.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#8bc4c1]">Креативность</h3>
            <p className="text-gray-700">
              Наши флористы постоянно совершенствуют свое мастерство, изучают новые тренды и создают уникальные
              композиции, которые удивляют и восхищают.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#8bc4c1]">Клиентоориентированность</h3>
            <p className="text-gray-700">
              Мы ценим каждого клиента и стремимся превзойти ожидания, предлагая индивидуальный подход и внимательное
              отношение к деталям.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Наша команда</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Анна Петрова", position: "Главный флорист" },
            { name: "Сергей Иванов", position: "Директор" },
            { name: "Мария Сидорова", position: "Менеджер по работе с клиентами" },
            { name: "Дмитрий Козлов", position: "Логист" },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                <Image
                  src={`/placeholder.svg?height=300&width=300&text=${member.name}`}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-medium">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Наши достижения</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Более 50,000 довольных клиентов</li>
            <li>Участие в международных выставках флористики</li>
            <li>Награды за лучший сервис доставки цветов в городе</li>
            <li>Сотрудничество с ведущими компаниями и организациями</li>
            <li>Благотворительные проекты и социальные инициативы</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
