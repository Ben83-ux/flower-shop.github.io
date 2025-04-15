import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PromotionSectionProps {
  title: string
  description: string
  buttonText: string
  buttonLink: string
  imageUrl: string
  bgColor?: string
  reverse?: boolean
}

export default function PromotionSection({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl,
  bgColor = "#e8f4f2",
  reverse = false,
}: PromotionSectionProps) {
  return (
    <section className="py-6 md:py-10" style={{ backgroundColor: bgColor }}>
      <div className="container">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center ${reverse ? "md:flex-row-reverse" : ""}`}
        >
          <div className="space-y-3 md:space-y-4 order-2 md:order-none">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">{title}</h2>
            <p className="text-gray-600 text-sm md:text-base">{description}</p>
            <Link href={buttonLink}>
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0] text-white rounded-full text-sm md:text-base">
                {buttonText}
              </Button>
            </Link>
          </div>
          <div className={`relative h-[200px] md:h-[300px] order-1 md:order-none ${reverse ? "md:order-first" : ""}`}>
            <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
