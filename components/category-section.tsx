import Image from "next/image"
import Link from "next/link"

const categories = [
  { name: "Монобукеты", image: "/placeholder.svg?height=100&width=100" },
  { name: "Авторские букеты", image: "/placeholder.svg?height=100&width=100" },
  { name: "Цветы в коробке", image: "/placeholder.svg?height=100&width=100" },
  { name: "Цветы в корзине", image: "/placeholder.svg?height=100&width=100" },
  { name: "Цветы поштучно", image: "/placeholder.svg?height=100&width=100" },
  { name: "Букеты из сухоцветов", image: "/placeholder.svg?height=100&width=100" },
  { name: "Цветы в ящиках", image: "/placeholder.svg?height=100&width=100" },
  { name: "Букеты невесты", image: "/placeholder.svg?height=100&width=100" },
  { name: "Композиции из цветов", image: "/placeholder.svg?height=100&width=100" },
  { name: "Траурные цветы", image: "/placeholder.svg?height=100&width=100" },
  { name: "Другое", image: "/placeholder.svg?height=100&width=100" },
]

export default function CategorySection() {
  return (
    <section className="py-4 md:py-6 bg-white">
      <div className="container">
        <h2 className="text-lg font-medium mb-3 md:mb-4 px-1">Категории</h2>
        <div className="flex overflow-x-auto pb-4 gap-3 md:gap-4 scrollbar-hide">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/category/${category.name.toLowerCase()}`}
              className="flex flex-col items-center min-w-[80px] md:min-w-[100px] group"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#f0f0f0] group-hover:border-[#8bc4c1] transition-all">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
              </div>
              <span className="mt-2 text-xs md:text-sm text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
