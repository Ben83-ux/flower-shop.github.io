import type React from "react"
import type { Metadata } from "next"
import { Manrope } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  // Можно настроить различные варианты начертания
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Цветочный магазин - Свежие букеты с доставкой",
  description: "Интернет-магазин цветов с доставкой по всей России",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <head>{/* Мета-теги и другие элементы head будут добавлены автоматически */}</head>
      <body className={manrope.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}


import './globals.css'