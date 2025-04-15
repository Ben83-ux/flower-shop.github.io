"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Upload, Plus, X, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Основные категории
const mainCategories = [
  { id: 1, name: "Цветы", image: "/placeholder.svg?height=200&width=200" },
  { id: 2, name: "Воздушные шары", image: "/placeholder.svg?height=200&width=200" },
  { id: 3, name: "Мягкие игрушки", image: "/placeholder.svg?height=200&width=200" },
]

// Подкатегории для цветов
const flowerSubcategories = [
  { id: 1, name: "Монобукеты", image: "/placeholder.svg?height=150&width=150" },
  { id: 2, name: "Авторские букеты", image: "/placeholder.svg?height=150&width=150" },
  { id: 3, name: "Цветы в коробке", image: "/placeholder.svg?height=150&width=150" },
  { id: 4, name: "Цветы в корзине", image: "/placeholder.svg?height=150&width=150" },
  { id: 5, name: "Цветы поштучно", image: "/placeholder.svg?height=150&width=150" },
  { id: 6, name: "Букеты из сухоцветов", image: "/placeholder.svg?height=150&width=150" },
  { id: 7, name: "Цветы в ящиках", image: "/placeholder.svg?height=150&width=150" },
  { id: 8, name: "Букеты невесты", image: "/placeholder.svg?height=150&width=150" },
  { id: 9, name: "Композиции из цветов", image: "/placeholder.svg?height=150&width=150" },
  { id: 10, name: "Траурные цветы", image: "/placeholder.svg?height=150&width=150" },
  { id: 11, name: "Другое", image: "/placeholder.svg?height=150&width=150" },
]

// Подкатегории для шаров
const balloonSubcategories = [
  { id: 12, name: "Фольгированные шары", image: "/placeholder.svg?height=150&width=150" },
  { id: 13, name: "Латексные шары", image: "/placeholder.svg?height=150&width=150" },
  { id: 14, name: "Композиции из шаров", image: "/placeholder.svg?height=150&width=150" },
  { id: 15, name: "Шары с гелием", image: "/placeholder.svg?height=150&width=150" },
]

// Подкатегории для игрушек
const toySubcategories = [
  { id: 16, name: "Мягкие игрушки маленькие", image: "/placeholder.svg?height=150&width=150" },
  { id: 17, name: "Мягкие игрушки средние", image: "/placeholder.svg?height=150&width=150" },
  { id: 18, name: "Мягкие игрушки большие", image: "/placeholder.svg?height=150&width=150" },
]

// Цвета товаров
const productColors = [
  { id: 1, name: "Красный" },
  { id: 2, name: "Розовый" },
  { id: 3, name: "Оранжевый" },
  { id: 4, name: "Желтый" },
  { id: 5, name: "Зеленый" },
  { id: 6, name: "Синий" },
  { id: 7, name: "Фиолетовый" },
  { id: 8, name: "Черный" },
  { id: 9, name: "Белый" },
  { id: 10, name: "Разноцветный" },
]

// Тематические подборки
const thematicCollections = [
  { id: 1, name: "День космонавтики" },
  { id: 2, name: "День рождения" },
  { id: 3, name: "Пасха" },
  { id: 4, name: "Сезон пикников" },
  { id: 5, name: "Сезон клубники" },
  { id: 6, name: "Последний звонок" },
  { id: 7, name: "Пиономания" },
  { id: 8, name: "Выпускной" },
  { id: 9, name: "День семьи" },
  { id: 10, name: "День торта" },
  { id: 11, name: "День дружбы" },
  { id: 12, name: "1 Сентября" },
  { id: 13, name: "Сезон гортензий" },
  { id: 14, name: "День учителя" },
  { id: 15, name: "День отца" },
  { id: 16, name: "День бабушек и дедушек" },
  { id: 17, name: "День мамы" },
  { id: 18, name: "Хюгге" },
  { id: 19, name: "Рождество" },
  { id: 20, name: "Новый год" },
  { id: 21, name: "Татьянин день" },
  { id: 22, name: "Подарки на 14 февраля" },
  { id: 23, name: "8 Марта" },
]

// Интерфейс для состава товара
interface CompositionItem {
  id: number
  name: string
  quantity: string
}

export default function AddProductPage() {
  // Текущий шаг формы
  const [currentStep, setCurrentStep] = useState(1)
  const [validationError, setValidationError] = useState<string | null>(null)

  // Выбранные категории
  const [selectedMainCategory, setSelectedMainCategory] = useState<number | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(null)

  // Данные о товаре
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    discount: "",
    width: "",
    height: "",
    description: "",
    minOrder: "1",
    showcase: "general", // general или live
  })

  // Состав товара
  const [composition, setComposition] = useState<CompositionItem[]>([{ id: 1, name: "", quantity: "" }])

  // Выбранные цвета
  const [selectedColors, setSelectedColors] = useState<number[]>([])

  // Выбранные тематические подборки
  const [selectedThemes, setSelectedThemes] = useState<number[]>([])

  // Изображения товара
  const [images, setImages] = useState<{ id: number; file: File | null; preview: string }[]>([
    { id: 1, file: null, preview: "/placeholder.svg?height=300&width=300" },
  ])

  // Обработчик изменения основных полей
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Обработчик изменения состава
  const handleCompositionChange = (id: number, field: "name" | "quantity", value: string) => {
    setComposition((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  // Добавление нового элемента состава
  const addCompositionItem = () => {
    const newId = Math.max(...composition.map((item) => item.id), 0) + 1
    setComposition([...composition, { id: newId, name: "", quantity: "" }])
  }

  // Удаление элемента состава
  const removeCompositionItem = (id: number) => {
    if (composition.length > 1) {
      setComposition(composition.filter((item) => item.id !== id))
    }
  }

  // Переключение цвета
  const toggleColor = (colorId: number) => {
    if (selectedColors.includes(colorId)) {
      setSelectedColors(selectedColors.filter((id) => id !== colorId))
    } else {
      setSelectedColors([...selectedColors, colorId])
    }
  }

  // Переключение тематической подборки
  const toggleTheme = (themeId: number) => {
    if (selectedThemes.includes(themeId)) {
      setSelectedThemes(selectedThemes.filter((id) => id !== themeId))
    } else {
      setSelectedThemes([...selectedThemes, themeId])
    }
  }

  // Обработчик загрузки изображений
  const handleImageChange = (id: number, file: File) => {
    const preview = URL.createObjectURL(file)
    setImages(images.map((img) => (img.id === id ? { ...img, file, preview } : img)))
  }

  // Добавление поля для изображения
  const addImageField = () => {
    const newId = Math.max(...images.map((img) => img.id), 0) + 1
    setImages([...images, { id: newId, file: null, preview: "/placeholder.svg?height=300&width=300" }])
  }

  // Удаление поля для изображения
  const removeImageField = (id: number) => {
    if (images.length > 1) {
      setImages(images.filter((img) => img.id !== id))
    }
  }

  // Валидация перед переходом к следующему шагу
  const validateStep = (step: number): boolean => {
    setValidationError(null)

    switch (step) {
      case 1:
        if (!selectedMainCategory) {
          setValidationError("Пожалуйста, выберите категорию товара")
          return false
        }
        return true

      case 2:
        if (!selectedSubcategory) {
          setValidationError("Пожалуйста, выберите подкатегорию товара")
          return false
        }
        return true

      case 3:
        if (!productData.name || !productData.price) {
          setValidationError("Пожалуйста, заполните обязательные поля: название и цена")
          return false
        }

        // Проверка состава
        const invalidComposition = composition.some((item) => !item.name || !item.quantity)
        if (invalidComposition) {
          setValidationError("Пожалуйста, заполните все поля состава товара")
          return false
        }

        // Проверка размеров
        if (!productData.width || !productData.height) {
          setValidationError("Пожалуйста, укажите размеры товара")
          return false
        }
        return true

      default:
        return true
    }
  }

  // Переход к выбранному шагу с валидацией
  const goToStep = (step: number) => {
    // Если переходим на шаг вперед, проверяем текущий шаг
    if (step > currentStep) {
      // Проверяем все предыдущие шаги
      for (let i = 1; i < step; i++) {
        if (!validateStep(i)) {
          return
        }
      }
    }

    setCurrentStep(step)
    setValidationError(null)
  }

  // Получение подкатегорий в зависимости от выбранной основной категории
  const getSubcategories = () => {
    if (selectedMainCategory === 1) return flowerSubcategories
    if (selectedMainCategory === 2) return balloonSubcategories
    if (selectedMainCategory === 3) return toySubcategories
    return []
  }

  // Отправка формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Проверка наличия обязательных полей
    for (let i = 1; i <= 3; i++) {
      if (!validateStep(i)) {
        goToStep(i)
        return
      }
    }

    // Здесь будет логика сохранения товара
    console.log({
      mainCategory: selectedMainCategory,
      subcategory: selectedSubcategory,
      ...productData,
      composition,
      colors: selectedColors,
      themes: selectedThemes,
      images,
    })

    alert("Товар успешно добавлен!")
  }

  // Отображение текущего шага формы
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Выберите категорию товара</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mainCategories.map((category) => (
                <div
                  key={category.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all ${
                    selectedMainCategory === category.id
                      ? "border-[#8bc4c1] bg-[#e8f4f2] shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow"
                  }`}
                  onClick={() => {
                    setSelectedMainCategory(category.id)
                    setValidationError(null)
                    // Автоматический переход на следующий шаг после выбора категории
                    setTimeout(() => goToStep(2), 300)
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 mb-4">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-medium">{category.name}</h3>
                    {selectedMainCategory === category.id && (
                      <div className="mt-2 text-[#8bc4c1]">
                        <Check className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Выберите подкатегорию товара</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getSubcategories().map((subcategory) => (
                <div
                  key={subcategory.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSubcategory === subcategory.id
                      ? "border-[#8bc4c1] bg-[#e8f4f2] shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow"
                  }`}
                  onClick={() => {
                    setSelectedSubcategory(subcategory.id)
                    setValidationError(null)
                    // Автоматический переход на следующий шаг после выбора подкатегории
                    setTimeout(() => goToStep(3), 300)
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 mb-3">
                      <Image
                        src={subcategory.image || "/placeholder.svg"}
                        alt={subcategory.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-sm font-medium">{subcategory.name}</h3>
                    {selectedSubcategory === subcategory.id && (
                      <div className="mt-2 text-[#8bc4c1]">
                        <Check className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            {/* Блок с фотографиями товара */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Добавить фото товара</h2>
              <p className="text-gray-500 mb-4">
                Вы можете добавить несколько фотографий одновременно. Укажите нужный порядок при загрузке
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={image.id} className="border rounded-md p-3">
                    <div className="relative">
                      <div className="aspect-square bg-gray-100 rounded-md overflow-hidden mb-2">
                        <div className="relative w-full h-full">
                          <img
                            src={image.preview || "/placeholder.svg"}
                            alt={`Изображение ${index + 1}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                        onClick={() => removeImageField(image.id)}
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center">
                        <Input
                          id={`image-${image.id}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleImageChange(image.id, e.target.files[0])
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            document.getElementById(`image-${image.id}`)?.click()
                          }}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Загрузить
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border rounded-md p-3 flex items-center justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-full min-h-[150px] flex flex-col items-center justify-center"
                    onClick={addImageField}
                  >
                    <Plus className="h-6 w-6 mb-2" />
                    <span>Добавить изображение</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Основная информация о товаре */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Основная информация</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Название*</Label>
                      <Input id="name" name="name" value={productData.name} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Цена, RUB *</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={productData.price}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="discount">Скидка, %</Label>
                        <Input
                          id="discount"
                          name="discount"
                          type="number"
                          min="0"
                          max="100"
                          value={productData.discount}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="block mb-2">
                        Описание товара
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        placeholder="Расскажите подробнее о товаре"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label className="block mb-2">Размеры товара*</Label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <Input
                            id="width"
                            name="width"
                            type="number"
                            min="1"
                            value={productData.width}
                            onChange={handleChange}
                            placeholder="Ширина"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            id="height"
                            name="height"
                            type="number"
                            min="1"
                            value={productData.height}
                            onChange={handleChange}
                            placeholder="Высота"
                            required
                          />
                        </div>
                        <span className="text-sm text-gray-500">см</span>
                      </div>
                    </div>

                    <div>
                      <Label className="block mb-2">Состав товара</Label>
                      {composition.map((item, index) => (
                        <div key={item.id} className="flex items-center space-x-2 mb-2">
                          <div className="flex-1">
                            <Label htmlFor={`composition-name-${item.id}`} className="sr-only">
                              Название состава*
                            </Label>
                            <Input
                              id={`composition-name-${item.id}`}
                              value={item.name}
                              onChange={(e) => handleCompositionChange(item.id, "name", e.target.value)}
                              placeholder="Название состава*"
                              required
                            />
                          </div>
                          <div className="w-24">
                            <Label htmlFor={`composition-qty-${item.id}`} className="sr-only">
                              Кол-во*
                            </Label>
                            <Input
                              id={`composition-qty-${item.id}`}
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleCompositionChange(item.id, "quantity", e.target.value)}
                              placeholder="Кол-во*"
                              required
                            />
                          </div>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500">шт.</span>
                            {composition.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeCompositionItem(item.id)}
                                className="ml-1 text-gray-500 hover:text-red-500"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={addCompositionItem} className="mt-1">
                        <Plus className="h-4 w-4 mr-1" />
                        Добавить еще состав
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Дополнительная информация</h3>
                  <div className="space-y-6">
                    <div>
                      <Label className="block mb-3">Цвет товара</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {productColors.map((color) => (
                          <div
                            key={color.id}
                            className={`border rounded-md p-2 cursor-pointer transition-colors ${
                              selectedColors.includes(color.id)
                                ? "border-[#8bc4c1] bg-[#e8f4f2]"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => toggleColor(color.id)}
                          >
                            <div className="flex items-center">
                              <Checkbox
                                checked={selectedColors.includes(color.id)}
                                onCheckedChange={() => toggleColor(color.id)}
                                className="mr-2"
                              />
                              <span>{color.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="block mb-3">Тематические подборки</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {thematicCollections.map((theme) => (
                          <div
                            key={theme.id}
                            className={`border rounded-md p-2 cursor-pointer transition-colors ${
                              selectedThemes.includes(theme.id)
                                ? "border-[#8bc4c1] bg-[#e8f4f2]"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => toggleTheme(theme.id)}
                          >
                            <div className="flex items-center">
                              <Checkbox
                                checked={selectedThemes.includes(theme.id)}
                                onCheckedChange={() => toggleTheme(theme.id)}
                                className="mr-2"
                              />
                              <span>{theme.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="block mb-2">Минимальный заказ</Label>
                      <p className="text-sm text-gray-500 mb-2">
                        Если вы поменяете число, то клиент не сможет сделать заказ на 1 штуку.
                      </p>
                      <div className="flex items-center space-x-2 w-full max-w-xs">
                        <Label htmlFor="minOrder" className="whitespace-nowrap">
                          Минимальный заказ, шт.
                        </Label>
                        <Input
                          id="minOrder"
                          name="minOrder"
                          type="number"
                          min="1"
                          value={productData.minOrder}
                          onChange={handleChange}
                          className="w-20"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="block mb-2">Где показывать?</Label>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="showcase-live"
                            name="showcase"
                            value="live"
                            checked={productData.showcase === "live"}
                            onChange={() => setProductData({ ...productData, showcase: "live" })}
                            className="h-4 w-4"
                          />
                          <Label htmlFor="showcase-live" className="font-medium text-[#8bc4c1]">
                            Живая витрина
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="showcase-general"
                            name="showcase"
                            value="general"
                            checked={productData.showcase === "general"}
                            onChange={() => setProductData({ ...productData, showcase: "general" })}
                            className="h-4 w-4"
                          />
                          <Label htmlFor="showcase-general">Общая витрина</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button type="submit" className="bg-[#8bc4c1] hover:bg-[#7ab3b0]">
                Сохранить товар
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/admin/products" className="text-[#8bc4c1] hover:underline flex items-center mr-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Назад к списку товаров
        </Link>
        <h1 className="text-2xl font-bold">Добавление нового товара</h1>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <>
                <div
                  key={`step-${step}`}
                  className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                    currentStep >= step ? "bg-[#8bc4c1] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                  onClick={() => goToStep(step)}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    key={`line-${step}`}
                    className={`h-1 w-12 ${currentStep > step ? "bg-[#8bc4c1]" : "bg-gray-200"}`}
                  ></div>
                )}
              </>
            ))}
          </div>
          <div className="text-sm text-gray-500">Шаг {currentStep} из 3</div>
        </div>
      </div>

      {validationError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit}>{renderStep()}</form>
        </CardContent>
      </Card>
    </div>
  )
}
