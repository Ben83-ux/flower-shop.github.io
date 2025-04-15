import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Flower, Droplets, Scissors, Thermometer, Sun, Moon, Leaf } from "lucide-react"

export default function CarePage() {
  return (
    <main className="container py-8 md:py-12">
      {/* Hero section */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 md:mb-12 rounded-lg overflow-hidden">
        <Image
          src="/placeholder.svg?height=400&width=1200"
          alt="Уход за цветами"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="px-6 md:px-12 max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Инструкция по уходу за срезанными цветами
            </h1>
            <p className="text-white/90 text-lg md:text-xl">Продлите жизнь вашим букетам с нашими советами</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <p className="text-lg text-gray-700 mb-6">
              Правильный уход за срезанными цветами может значительно продлить их жизнь и сохранить красоту. Следуйте
              нашим рекомендациям, чтобы ваши букеты радовали вас как можно дольше.
            </p>
          </section>

          <section className="space-y-6">
            {careInstructions.map((instruction, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-pink-100 p-3 rounded-full text-pink-600">{instruction.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{instruction.title}</h3>
                    <p className="text-gray-700">{instruction.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="bg-pink-50 rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Важные примечания</h2>
            <ul className="space-y-4">
              {importantNotes.map((note, index) => (
                <li key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-pink-200 flex items-center justify-center text-pink-700 mt-1">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{note}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">Заключение</h2>
            <p className="text-gray-700 mb-4">
              Если вы будете выполнять все эти инструкции четко и точно, вы сможете продлить жизнь своих срезанных
              цветов и наслаждаться их красотой и свежестью на протяжении более длительного времени. Помните, что каждый
              вид цветов может иметь свои особенности ухода, поэтому стоит обратить внимание на индивидуальные
              рекомендации для конкретных цветов, которые вы приобрели.
            </p>
            <p className="text-gray-700">
              Если у вас возникли вопросы по уходу за конкретными видами цветов, обратитесь к нашим флористам по
              указанным на сайте контактам.
            </p>
          </section>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Sidebar with additional info */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Особенности ухода за популярными цветами</h3>
            <ul className="space-y-4">
              {flowerCareSpecifics.map((flower, index) => (
                <li key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <h4 className="font-medium text-lg mb-1">{flower.name}</h4>
                  <p className="text-gray-600 text-sm">{flower.care}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Приобрести средства для ухода</h3>
            <p className="text-gray-700 mb-4">
              В нашем магазине вы можете приобрести специальные средства для продления жизни срезанных цветов.
            </p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-center gap-2 text-gray-700">
                <ArrowRight className="h-4 w-4 text-pink-500" />
                <span>Питательный раствор Cryzal</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <ArrowRight className="h-4 w-4 text-pink-500" />
                <span>Специальные ножницы для цветов</span>
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <ArrowRight className="h-4 w-4 text-pink-500" />
                <span>Вазы различных форм и размеров</span>
              </li>
            </ul>
            <Link
              href="/catalog/accessories"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Перейти в каталог
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-4">Нужна помощь?</h3>
            <p className="text-gray-700 mb-4">
              Если у вас возникли вопросы по уходу за цветами, наши флористы всегда готовы помочь.
            </p>
            <Link
              href="/contacts"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors w-full text-center"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

const careInstructions = [
  {
    icon: <Flower className="h-6 w-6" />,
    title: "Сохранение формы",
    description: "Цветы после получения не разбирать, в собранном состоянии (в букете) они простоят гораздо дольше.",
  },
  {
    icon: <Scissors className="h-6 w-6" />,
    title: "Прием воды",
    description:
      "После получения цветы нужно подрезать на 2-5 см острым ножом или садовыми ножницами под углом 45 градусов, освежить срезы растений под проточной водой. Это поможет увеличить поверхность поглощения воды.",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Удаление лишних листьев",
    description:
      "Отделите нижние листья от стеблей, чтобы они не оказывали влияния на качество воды и не загнивали. Оставьте только верхние листья, которые украшают букет. Поставьте цветы в чистый сосуд с пресной водой.",
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: "Добавление питательного раствора",
    description:
      "Используйте специальные пакетики с питательным раствором Cryzal, которые можно приобрести отдельно в магазине. Этот раствор содержит питательные вещества, которые продлевают жизнь цветов и помогают им сохранять свежесть и яркость.",
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: "Поддерживайте чистоту воды",
    description:
      "Меняйте воду у цветов каждый день и подрезайте их на 2-3 см каждые два дня. Удаляйте умершие листья или цветы из букета, чтобы они не загнивали и не заражали остальные цветы.",
  },
  {
    icon: <Sun className="h-6 w-6" />,
    title: "Установка в правильном месте",
    description:
      "Разместите букет или цветы в прохладном и светлом месте, но избегайте прямых солнечных лучей, сквозняков и источников тепла, таких как батарея. Цветы чувствительны к температурным изменениям и быстрее увядают при повышенной температуре.",
  },
  {
    icon: <Moon className="h-6 w-6" />,
    title: "Ночной уход",
    description:
      "На ночь желательно ставить цветы в холодное место, например балкон. Желательная температура от 4 до 10 градусов.",
  },
  {
    icon: <Thermometer className="h-6 w-6" />,
    title: "Избегайте контакта с плодами и овощами",
    description:
      "Некоторые плоды и овощи выделяют газ этилена, который может ускорить процесс старения цветов. Поэтому старайтесь не размещать цветы рядом со спелыми фруктами или овощами.",
  },
  {
    icon: <Flower className="h-6 w-6" />,
    title: "Обработка особенных видов цветов",
    description:
      "Некоторые виды цветов требуют особого ухода. Например, розы могут понадобиться обрезка шипов, хризантемы - удаление нижних листьев. Также цветы нельзя опрыскивать (они начнут из-за этого гнить). Исключение гортензия, ее как раз нужно каждый день опрыскивать — она это очень любит.",
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: "Избегайте пересыхания",
    description:
      "Убедитесь, что уровень воды в сосуде достаточный, чтобы стебли цветов были полностью погружены. Избегайте пересыхания букета, так как это может привести к увяданию цветов.",
  },
  {
    icon: <Scissors className="h-6 w-6" />,
    title: "Поддерживайте чистоту и свежесть",
    description:
      "Регулярно удаляйте увядшие или умершие цветы из букета. Это не только сохранит красоту букета, но и позволит остальным цветам дольше оставаться свежими.",
  },
  {
    icon: <Droplets className="h-6 w-6" />,
    title: "Используйте специальные средства",
    description:
      "В магазинах можно найти специальные продукты, которые помогают продлить жизнь срезанных цветов. Они содержат ингредиенты, которые предотвращают развитие бактерий, питают цветы и улучшают поглощение воды.",
  },
  {
    icon: <Flower className="h-6 w-6" />,
    title: "Бережное обращение",
    description:
      "Переносите букет срезанных цветов осторожно, чтобы не повредить нежные лепестки или сломать стебли. Избегайте резких движений, которые могут повредить цветы.",
  },
]

const importantNotes = [
  "Если после подрезки цветы начнут вянуть - значит вода не поступает в основание цветка и нужно подрезать стебель еще раз. Если цветы сохнут - значит они стоят в очень теплом помещении и влага быстрее испаряется чем попадает через стебель в основание цветка, нужно поставить цветы срочно в прохладное место и еще раз подрезать.",
  "Если цветы принесли с холода, не стоит их сразу ставить в воду. Их необходимо адаптировать к теплу. Дайте букету «согреться» 20 минут и только после этого ставьте в воду.",
]

const flowerCareSpecifics = [
  {
    name: "Розы",
    care: "Подрезайте стебли под углом 45°, удаляйте шипы и нижние листья. Меняйте воду ежедневно.",
  },
  {
    name: "Тюльпаны",
    care: "Продолжают расти после срезки. Подрезайте стебли прямо, а не под углом. Любят прохладную воду.",
  },
  {
    name: "Гортензии",
    care: "Требуют ежедневного опрыскивания. Подрезайте стебли и обжигайте их кончики для лучшего поглощения воды.",
  },
  {
    name: "Лилии",
    care: "Удаляйте пыльники, чтобы избежать загрязнения. Держите подальше от других цветов, так как выделяют сильный аромат.",
  },
  {
    name: "Хризантемы",
    care: "Очень долго стоят в срезке. Удаляйте нижние листья и меняйте воду каждые 2-3 дня.",
  },
]
