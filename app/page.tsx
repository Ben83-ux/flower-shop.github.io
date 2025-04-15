import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CategorySection from "@/components/category-section"
import ProductGrid from "@/components/product-grid"
import PromotionSection from "@/components/promotion-section"
// Добавьте импорт для LiveShowcase компонента
import LiveShowcase from "@/components/live-showcase"

// Добавьте компонент LiveShowcase после секции Hero и перед CategorySection
export default function Home() {
  return (
    <main className="min-h-screen pb-16 md:pb-0">
      {/* Live Showcase Section */}
      <LiveShowcase />

      {/* Categories */}
      <CategorySection />

      {/* Popular Products */}
      <section className="py-4 md:py-8 bg-white">
        <div className="container">
          <ProductGrid title="Популярные букеты" showMoreLink="/products" />
        </div>
      </section>

      {/* Promotion Banner */}
      <PromotionSection
        title="Соберите индивидуальный букет"
        description="Создайте уникальный букет по вашему вкусу"
        buttonText="Создать букет"
        buttonLink="/custom-bouquet"
        imageUrl="/placeholder.svg?height=300&width=400"
      />

      {/* Live Flowers Section */}
      <section className="py-4 md:py-8 bg-white">
        <div className="container">
          <ProductGrid title="Live-букеты" limit={4} />
        </div>
      </section>

      {/* Gift Section */}
      <PromotionSection
        title="Подарочные наборы"
        description="Дополните ваш букет подарком"
        buttonText="Выбрать подарок"
        buttonLink="/gifts"
        imageUrl="/placeholder.svg?height=300&width=400"
        reverse={true}
      />

      {/* More Products */}
      <section className="py-4 md:py-8 bg-white">
        <div className="container">
          <ProductGrid title="Букеты сезона" />
        </div>
      </section>

      {/* Custom Bouquet CTA */}
      <section className="py-6 md:py-10 bg-[#e8f4f2]">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Соберите индивидуальный букет</h2>
            <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">
              Выберите цветы, упаковку и дополнения для создания уникального букета
            </p>
            <Link href="/custom-bouquet">
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white px-6 md:px-8 py-2 md:py-3 rounded-full">
                Собрать букет
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-6 md:py-10 bg-white">
        <div className="container">
          <h2 className="text-lg md:text-2xl font-semibold mb-4 md:mb-6 px-1">Наш блог</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-40 md:h-48">
                  <Image src="/placeholder.svg?height=200&width=400" alt="Блог" fill className="object-cover" />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-medium text-base md:text-lg mb-1 md:mb-2">Как ухаживать за цветами</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3">
                    Советы по уходу за срезанными цветами для продления их жизни
                  </p>
                  <Link href="/blog/1">
                    <Button
                      variant="outline"
                      className="w-full border-[#8bc4c1] text-[#8bc4c1] hover:bg-[#8bc4c1] hover:text-white text-sm"
                    >
                      Читать
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
