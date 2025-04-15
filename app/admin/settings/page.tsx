"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Store,
  Globe,
  Bell,
  CreditCard,
  Truck,
  Shield,
  Palette,
  Upload,
  Save,
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
} from "lucide-react"

export default function SettingsPage() {
  // Состояние для общих настроек
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "NFLOWER.RU",
    storeEmail: "info@nflower.ru",
    storePhone: "+7 (921) 234-56-78",
    storeAddress: "г. Омск, ул. Ленина, 45",
    workingHours: "Пн-Пт: 8:00-20:00, Сб-Вс: 9:00-19:00",
    logo: null,
    favicon: null,
  })

  // Состояние для SEO настроек
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "NFLOWER.RU - Свежие букеты с доставкой",
    metaDescription: "Интернет-магазин цветов с доставкой по всей России",
    metaKeywords: "цветы, букеты, доставка цветов, флористика",
    ogTitle: "NFLOWER.RU - Свежие букеты с доставкой",
    ogDescription: "Интернет-магазин цветов с доставкой по всей России",
    ogImage: null,
  })

  // Состояние для настроек уведомлений
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    adminEmail: "admin@nflower.ru",
    adminPhone: "+7 (921) 234-56-78",
    newOrderNotification: true,
    orderStatusNotification: true,
    lowStockNotification: true,
    customerRegistrationNotification: false,
  })

  // Состояние для настроек платежей
  const [paymentSettings, setPaymentSettings] = useState({
    cashOnDelivery: true,
    cardOnDelivery: true,
    onlinePayment: true,
    paymentProvider: "yookassa",
    testMode: true,
    apiKey: "test_api_key_123",
    secretKey: "test_secret_key_456",
  })

  // Состояние для настроек доставки
  const [deliverySettings, setDeliverySettings] = useState({
    selfPickup: true,
    standardDelivery: true,
    expressDelivery: true,
    standardDeliveryPrice: 500,
    expressDeliveryPrice: 800,
    freeDeliveryThreshold: 5000,
    enableFreeDelivery: true,
    deliveryProvider: "yandex",
    apiKey: "test_delivery_api_key_789",
  })

  // Состояние для настроек безопасности
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiration: "never",
    loginAttempts: "5",
    sessionTimeout: "30",
    ipRestriction: false,
    allowedIPs: "",
  })

  // Состояние для настроек отображения
  const [displaySettings, setDisplaySettings] = useState({
    theme: "light",
    primaryColor: "#8bc4c1",
    accentColor: "#f5a7b6",
    fontFamily: "Manrope",
    showBanner: true,
    showPopup: false,
    productsPerPage: "12",
  })

  // Состояние для настроек социальных сетей
  const [socialSettings, setSocialSettings] = useState({
    instagram: "https://instagram.com/nflower.ru",
    vk: "https://vk.com/nflower.ru",
    telegram: "https://t.me/nflower.ru",
    whatsapp: "https://wa.me/79212345678",
  })

  // Обработчики изменения настроек
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSeoSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, value: boolean | string) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (name: string, value: boolean | string) => {
    setPaymentSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDeliverySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleDeliveryToggle = (name: string, value: boolean) => {
    setDeliverySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSecurityChange = (name: string, value: string | boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleDisplayChange = (name: string, value: string | boolean) => {
    setDisplaySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSocialSettings((prev) => ({ ...prev, [name]: value }))
  }

  // Обработчик сохранения настроек
  const handleSaveSettings = (tab: string) => {
    // Здесь будет логика сохранения настроек в базу данных
    console.log(`Сохранение настроек для вкладки: ${tab}`)

    // Показываем уведомление об успешном сохранении
    toast({
      title: "Настройки сохранены",
      description: "Настройки успешно обновлены",
    })
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Настройки</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-4">
          <TabsTrigger value="general" className="flex items-center">
            <Store className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Общие</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center">
            <Globe className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Уведомления</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Оплата</span>
          </TabsTrigger>
          <TabsTrigger value="delivery" className="flex items-center">
            <Truck className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Доставка</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Безопасность</span>
          </TabsTrigger>
          <TabsTrigger value="display" className="flex items-center">
            <Palette className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Отображение</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center">
            <Instagram className="h-4 w-4 mr-2" />
            <span className="hidden md:inline">Соц. сети</span>
          </TabsTrigger>
        </TabsList>

        {/* Общие настройки */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Общие настройки</CardTitle>
              <CardDescription>Настройте основную информацию о вашем магазине</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storeName">Название магазина</Label>
                    <Input
                      id="storeName"
                      name="storeName"
                      value={generalSettings.storeName}
                      onChange={handleGeneralChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="storeEmail">Email магазина</Label>
                    <div className="flex items-center mt-1">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        id="storeEmail"
                        name="storeEmail"
                        value={generalSettings.storeEmail}
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="storePhone">Телефон магазина</Label>
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        id="storePhone"
                        name="storePhone"
                        value={generalSettings.storePhone}
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storeAddress">Адрес магазина</Label>
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        id="storeAddress"
                        name="storeAddress"
                        value={generalSettings.storeAddress}
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="workingHours">Часы работы</Label>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <Input
                        id="workingHours"
                        name="workingHours"
                        value={generalSettings.workingHours}
                        onChange={handleGeneralChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="logo">Логотип</Label>
                  <div className="mt-2 flex items-center">
                    <div className="w-32 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                      {generalSettings.logo ? (
                        <img
                          src={URL.createObjectURL(generalSettings.logo) || "/placeholder.svg"}
                          alt="Logo"
                          className="max-w-full max-h-full"
                        />
                      ) : (
                        <Store className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Input
                        id="logo"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setGeneralSettings((prev) => ({ ...prev, logo: e.target.files![0] }))
                          }
                        }}
                      />
                      <Button type="button" variant="outline" onClick={() => document.getElementById("logo")?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Загрузить
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Рекомендуемый размер: 200x100px, формат: PNG, JPG</p>
                </div>

                <div>
                  <Label htmlFor="favicon">Favicon</Label>
                  <div className="mt-2 flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                      {generalSettings.favicon ? (
                        <img
                          src={URL.createObjectURL(generalSettings.favicon) || "/placeholder.svg"}
                          alt="Favicon"
                          className="max-w-full max-h-full"
                        />
                      ) : (
                        <Store className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Input
                        id="favicon"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setGeneralSettings((prev) => ({ ...prev, favicon: e.target.files![0] }))
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("favicon")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Загрузить
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Рекомендуемый размер: 32x32px, формат: ICO, PNG</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]" onClick={() => handleSaveSettings("general")}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить настройки
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* SEO настройки */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO настройки</CardTitle>
              <CardDescription>Настройте метаданные для улучшения поисковой оптимизации</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input id="metaTitle" name="metaTitle" value={seoSettings.metaTitle} onChange={handleSeoChange} />
                  <p className="text-xs text-gray-500 mt-1">Рекомендуемая длина: 50-60 символов</p>
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={seoSettings.metaDescription}
                    onChange={handleSeoChange}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">Рекомендуемая длина: 150-160 символов</p>
                </div>

                <div>
                  <Label htmlFor="metaKeywords">Meta Keywords</Label>
                  <Input
                    id="metaKeywords"
                    name="metaKeywords"
                    value={seoSettings.metaKeywords}
                    onChange={handleSeoChange}
                  />
                  <p className="text-xs text-gray-500 mt-1">Разделяйте ключевые слова запятыми</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Open Graph настройки</h3>
                <p className="text-sm text-gray-500">
                  Настройте, как ваш сайт будет отображаться при шаринге в социальных сетях
                </p>

                <div>
                  <Label htmlFor="ogTitle">OG Title</Label>
                  <Input id="ogTitle" name="ogTitle" value={seoSettings.ogTitle} onChange={handleSeoChange} />
                </div>

                <div>
                  <Label htmlFor="ogDescription">OG Description</Label>
                  <Textarea
                    id="ogDescription"
                    name="ogDescription"
                    value={seoSettings.ogDescription}
                    onChange={handleSeoChange}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="ogImage">OG Image</Label>
                  <div className="mt-2 flex items-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                      {seoSettings.ogImage ? (
                        <img
                          src={URL.createObjectURL(seoSettings.ogImage) || "/placeholder.svg"}
                          alt="OG Image"
                          className="max-w-full max-h-full"
                        />
                      ) : (
                        <Globe className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Input
                        id="ogImage"
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSeoSettings((prev) => ({ ...prev, ogImage: e.target.files![0] }))
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("ogImage")?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Загрузить
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Рекомендуемый размер: 1200x630px, формат: PNG, JPG</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]" onClick={() => handleSaveSettings("seo")}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить настройки
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Настройки уведомлений */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>Настройте уведомления для администраторов и клиентов</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email уведомления</h3>
                      <p className="text-sm text-gray-500">Отправлять уведомления по email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="adminEmail">Email администратора</Label>
                    <Input
                      id="adminEmail"
                      value={notificationSettings.adminEmail}
                      onChange={(e) => handleNotificationChange("adminEmail", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS уведомления</h3>
                      <p className="text-sm text-gray-500">Отправлять уведомления по SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="adminPhone">Телефон администратора</Label>
                    <Input
                      id="adminPhone"
                      value={notificationSettings.adminPhone}
                      onChange={(e) => handleNotificationChange("adminPhone", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Типы уведомлений</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Новый заказ</h4>
                      <p className="text-sm text-gray-500">Уведомление о новом заказе</p>
                    </div>
                    <Switch
                      checked={notificationSettings.newOrderNotification}
                      onCheckedChange={(checked) => handleNotificationChange("newOrderNotification", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Изменение статуса заказа</h4>
                      <p className="text-sm text-gray-500">Уведомление об изменении статуса заказа</p>
                    </div>
                    <Switch
                      checked={notificationSettings.orderStatusNotification}
                      onCheckedChange={(checked) => handleNotificationChange("orderStatusNotification", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Низкий остаток товара</h4>
                      <p className="text-sm text-gray-500">Уведомление о низком остатке товара</p>
                    </div>
                    <Switch
                      checked={notificationSettings.lowStockNotification}
                      onCheckedChange={(checked) => handleNotificationChange("lowStockNotification", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div>
                      <h4 className="font-medium">Регистрация клиента</h4>
                      <p className="text-sm text-gray-500">Уведомление о регистрации нового клиента</p>
                    </div>
                    <Switch
                      checked={notificationSettings.customerRegistrationNotification}
                      onCheckedChange={(checked) =>
                        handleNotificationChange("customerRegistrationNotification", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]" onClick={() => handleSaveSettings("notifications")}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить настройки
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Настройки оплаты */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Настройки оплаты</CardTitle>
              <CardDescription>Настройте способы оплаты и платежные системы</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Наличными при самовывозе</h4>
                    <p className="text-sm text-gray-500">Оплата наличными в магазине</p>
                  </div>
                  <Switch
                    checked={paymentSettings.cashOnDelivery}
                    onCheckedChange={(checked) => handlePaymentChange("cashOnDelivery", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Картой при самовывозе</h4>
                    <p className="text-sm text-gray-500">Оплата картой в магазине</p>
                  </div>
                  <Switch
                    checked={paymentSettings.cardOnDelivery}
                    onCheckedChange={(checked) => handlePaymentChange("cardOnDelivery", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Онлайн-оплата</h4>
                    <p className="text-sm text-gray-500">Оплата картой онлайн</p>
                  </div>
                  <Switch
                    checked={paymentSettings.onlinePayment}
                    onCheckedChange={(checked) => handlePaymentChange("onlinePayment", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Настройки платежной системы</h3>

                <div>
                  <Label htmlFor="paymentProvider">Платежная система</Label>
                  <Select
                    value={paymentSettings.paymentProvider}
                    onValueChange={(value) => handlePaymentChange("paymentProvider", value)}
                  >
                    <SelectTrigger id="paymentProvider">
                      <SelectValue placeholder="Выберите платежную систему" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yookassa">ЮKassa</SelectItem>
                      <SelectItem value="sberbank">Сбербанк</SelectItem>
                      <SelectItem value="tinkoff">Тинькофф</SelectItem>
                      <SelectItem value="robokassa">Robokassa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Тестовый режим</h4>
                    <p className="text-sm text-gray-500">Включить тестовый режим для платежей</p>
                  </div>
                  <Switch
                    checked={paymentSettings.testMode}
                    onCheckedChange={(checked) => handlePaymentChange("testMode", checked)}
                  />
                </div>

                <div>
                  <Label htmlFor="apiKey">API ключ</Label>
                  <Input
                    id="apiKey"
                    value={paymentSettings.apiKey}
                    onChange={(e) => handlePaymentChange("apiKey", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="secretKey">Секретный ключ</Label>
                  <Input
                    id="secretKey"
                    type="password"
                    value={paymentSettings.secretKey}
                    onChange={(e) => handlePaymentChange("secretKey", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]" onClick={() => handleSaveSettings("payments")}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить настройки
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Настройки доставки */}
        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle>Настройки доставки</CardTitle>
              <CardDescription>Настройте способы доставки и их стоимость</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Самовывоз</h4>
                    <p className="text-sm text-gray-500">Самовывоз из магазина</p>
                  </div>
                  <Switch
                    checked={deliverySettings.selfPickup}
                    onCheckedChange={(checked) => handleDeliveryToggle("selfPickup", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Стандартная доставка</h4>
                    <p className="text-sm text-gray-500">Доставка в течение дня</p>
                  </div>
                  <Switch
                    checked={deliverySettings.standardDelivery}
                    onCheckedChange={(checked) => handleDeliveryToggle("standardDelivery", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h4 className="font-medium">Экспресс-доставка</h4>
                    <p className="text-sm text-gray-500">Доставка в течение 2 часов</p>
                  </div>
                  <Switch
                    checked={deliverySettings.expressDelivery}
                    onCheckedChange={(checked) => handleDeliveryToggle("expressDelivery", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Стоимость доставки</h3>

                  <div>
                    <Label htmlFor="standardDeliveryPrice">Стандартная доставка (₽)</Label>
                    <Input
                      id="standardDeliveryPrice"
                      name="standardDeliveryPrice"
                      type="number"
                      min="0"
                      value={deliverySettings.standardDeliveryPrice}
                      onChange={handleDeliveryChange}
                    />
                  </div>

                  <div>
                    <Label htmlFor="expressDeliveryPrice">Экспресс-доставка (₽)</Label>
                    <Input
                      id="expressDeliveryPrice"
                      name="expressDeliveryPrice"
                      type="number"
                      min="0"
                      value={deliverySettings.expressDeliveryPrice}
                      onChange={handleDeliveryChange}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Бесплатная доставка</h4>
                      <p className="text-sm text-gray-500">Включить бесплатную доставку при достижении суммы заказа</p>
                    </div>
                    <Switch
                      checked={deliverySettings.enableFreeDelivery}
                      onCheckedChange={(checked) => handleDeliveryToggle("enableFreeDelivery", checked)}
                    />
                  </div>

                  {deliverySettings.enableFreeDelivery && (
                    <div>
                      <Label htmlFor="freeDeliveryThreshold">Минимальная сумма для бесплатной доставки (₽)</Label>
                      <Input
                        id="freeDeliveryThreshold"
                        name="freeDeliveryThreshold"
                        type="number"
                        min="0"
                        value={deliverySettings.freeDeliveryThreshold}
                        onChange={handleDeliveryChange}
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Настройки службы доставки</h3>

                  <div>
                    <Label htmlFor="deliveryProvider">Служба доставки</Label>
                    <Select
                      value={deliverySettings.deliveryProvider}
                      onValueChange={(value) => handleDeliveryToggle("deliveryProvider", value)}
                    >
                      <SelectTrigger id="deliveryProvider">
                        <SelectValue placeholder="Выберите службу доставки" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yandex">Яндекс Доставка</SelectItem>
                        <SelectItem value="cdek">СДЭК</SelectItem>
                        <SelectItem value="dhl">DHL</SelectItem>
                        <SelectItem value="custom">Собственная служба</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="deliveryApiKey">API ключ службы доставки</Label>
                    <Input
                      id="deliveryApiKey"
                      name="apiKey"
                      value={deliverySettings.apiKey}
                      onChange={handleDeliveryChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]" onClick={() => handleSaveSettings("delivery")}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить настройки
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Настройки безопасности */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Настройки безопасности</CardTitle>
              <CardDescription>Настройте параметры безопасности вашего магазина</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Двухфакторная аутентификация</h3>
                  <p className="text-sm text-gray-500">Требовать двухфакторную аутентификацию для администраторов</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="passwordExpiration">Срок действия пароля</Label>
                  <Select
                    value={securitySettings.passwordExpiration}
                    onValueChange={(value) => handleSecurityChange("passwordExpiration", value)}
                  >
                    <SelectTrigger id="passwordExpiration">
                      <SelectValue placeholder="Выберите срок действия пароля" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Никогда не истекает</SelectItem>
                      <SelectItem value="30days">30 дней</SelectItem>
                      <SelectItem value="60days">60 дней</SelectItem>
                      <SelectItem value="90days">90 дней</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="loginAttempts">Количество попыток входа</Label>
                  <Select
                    value={securitySettings.loginAttempts}
                    onValueChange={(value) => handleSecurityChange("loginAttempts", value)}
                  >
                    <SelectTrigger id="loginAttempts">
                      <SelectValue placeholder="Выберите количество попыток" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 попытки</SelectItem>
                      <SelectItem value="5">5 попыток</SelectItem>
                      <SelectItem value="10">10 попыток</SelectItem>
                      <SelectItem value="unlimited">Без ограничений</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">Тайм-аут сессии (минуты)</Label>
                  <Select
                    value={securitySettings.sessionTimeout}
                    onValueChange={(value) => handleSecurityChange("sessionTimeout", value)}
                  >
                    <SelectTrigger id="sessionTimeout">
                      <SelectValue placeholder="Выберите тайм-аут сессии" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 минут</SelectItem>
                      <SelectItem value="30">30 минут</SelectItem>
                      <SelectItem value="60">60 минут</SelectItem>
                      <SelectItem value="120">2 часа</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Ограничение по IP</h3>
                    <p className="text-sm text-gray-500">Разрешить доступ только с определенных IP-адресов</p>
                  </div>
                  <Switch
                    checked={securitySettings.ipRestriction}
                    onCheckedChange={(checked) => handleSecurityChange("ipRestriction", checked)}
                  />
                </div>

                {securitySettings.ipRestriction && (
                  <div>
                    <Label htmlFor="allowedIPs">Разрешенные IP-адреса</Label>
                    <Textarea
                      id="allowedIPs"
                      value={securitySettings.allowedIPs}
                      onChange={(e) => handleSecurityChange("allowedIPs", e.target.value)}
                      placeholder="Введите IP-адреса, разделенные запятыми"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">Например: 192.168.1.1, 10.0.0.1</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]" onClick={() => handleSaveSettings("security")}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить настройки
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Настройки отображения */}
        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Настройки отображения</CardTitle>
              <CardDescription>Настройте внешний вид вашего магазина</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="theme">Тема оформления</Label>
                  <Select value={displaySettings.theme} onValueChange={(value) => handleDisplayChange("theme", value)}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Выберите тему" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Светлая</SelectItem>
                      <SelectItem value="dark">Темная</SelectItem>
                      <SelectItem value="auto">Автоматически (системная)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fontFamily">Шрифт</Label>
                  <Select
                    value={displaySettings.fontFamily}
                    onValueChange={(value) => handleDisplayChange("fontFamily", value)}
                  >
                    <SelectTrigger id="fontFamily">
                      <SelectValue placeholder="Выберите шрифт" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manrope">Manrope</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="primaryColor">Основной цвет</Label>
                  <div className="flex items-center mt-1">
                    <div
                      className="w-6 h-6 rounded-full mr-2"
                      style={{ backgroundColor: displaySettings.primaryColor }}
                    ></div>
                    <Input
                      id="primaryColor"
                      type="color"
                      value={displaySettings.primaryColor}
                      onChange={(e) => handleDisplayChange("primaryColor", e.target.value)}
                      className="w-12 h-8 p-0 border-0"
                    />
                    <Input
                      type="text"
                      value={displaySettings.primaryColor}
                      onChange={(e) => handleDisplayChange("primaryColor", e.target.value)}
                      className="ml-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="accentColor">Акцентный цвет</Label>
                  <div className="flex items-center mt-1">
                    <div
                      className="w-6 h-6 rounded-full mr-2"
                      style={{ backgroundColor: displaySettings.accentColor }}
                    ></div>
                    <Input
                      id="accentColor"
                      type="color"
                      value={displaySettings.accentColor}
                      onChange={(e) => handleDisplayChange("accentColor", e.target.value)}
                      className="w-12 h-8 p-0 border-0"
                    />
                    <Input
                      type="text"
                      value={displaySettings.accentColor}
                      onChange={(e) => handleDisplayChange("accentColor", e.target.value)}
                      className="ml-2"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Настройки каталога</h3>

                <div>
                  <Label htmlFor="productsPerPage">Товаров на странице</Label>
                  <Select
                    value={displaySettings.productsPerPage}
                    onValueChange={(value) => handleDisplayChange("productsPerPage", value)}
                  >
                    <SelectTrigger id="productsPerPage">
                      <SelectValue placeholder="Выберите количество товаров" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 товаров</SelectItem>
                      <SelectItem value="24">24 товара</SelectItem>
                      <SelectItem value="36">36 товаров</SelectItem>
                      <SelectItem value="48">48 товаров</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Показывать баннер</h4>
                    <p className="text-sm text-gray-500">Отображать баннер на главной странице</p>
                  </div>
                  <Switch
                    checked={displaySettings.showBanner}
                    onCheckedChange={(checked) => handleDisplayChange("showBanner", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Показывать всплывающее окно</h4>
                    <p className="text-sm text-gray-500">Отображать всплывающее окно при входе на сайт</p>
                  </div>
                  <Switch
                    checked={displaySettings.showPopup}
                    onCheckedChange={(checked) => handleDisplayChange("showPopup", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]" onClick={() => handleSaveSettings("display")}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить настройки
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Настройки социальных сетей */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Настройки социальных сетей</CardTitle>
              <CardDescription>Настройте ссылки на социальные сети</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="instagram" className="flex items-center">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={socialSettings.instagram}
                    onChange={handleSocialChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="vk" className="flex items-center">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93V15.07C2 20.67 3.33 22 8.93 22H15.07C20.67 22 22 20.67 22 15.07V8.93C22 3.33 20.67 2 15.07 2ZM18.15 16.27H16.69C16.14 16.27 15.97 15.82 14.86 14.72C13.86 13.77 13.49 13.67 13.27 13.67C12.95 13.67 12.87 13.76 12.87 14.18V15.77C12.87 16.1 12.75 16.27 11.81 16.27C10.22 16.27 8.47 15.35 7.23 13.7C5.4 11.33 4.89 9.53 4.89 9.15C4.89 8.96 4.97 8.79 5.33 8.79H6.8C7.14 8.79 7.27 8.93 7.4 9.28C8.17 11.18 9.56 12.84 10.08 12.84C10.28 12.84 10.36 12.76 10.36 12.28V10.05C10.31 9.33 9.93 9.26 9.93 8.93C9.93 8.79 10.05 8.65 10.23 8.65H12.33C12.63 8.65 12.73 8.79 12.73 9.14V11.8C12.73 12.1 12.86 12.2 12.96 12.2C13.16 12.2 13.33 12.1 13.7 11.73C14.77 10.57 15.54 8.89 15.54 8.89C15.64 8.71 15.79 8.54 16.16 8.54H17.63C18.03 8.54 18.12 8.73 18.03 9.03C17.85 9.77 16.51 11.76 16.51 11.76C16.36 12.01 16.31 12.1 16.51 12.36C16.66 12.55 17.14 12.97 17.45 13.33C18.03 13.97 18.48 14.5 18.63 14.86C18.78 15.22 18.61 15.4 18.25 15.4L18.15 16.27Z" />
                    </svg>
                    VK
                  </Label>
                  <Input id="vk" name="vk" value={socialSettings.vk} onChange={handleSocialChange} className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="telegram" className="flex items-center">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.0069 10.4252 14 10.3933C13.9896 10.3614 13.9731 10.3332 13.9517 10.31C13.89 10.26 13.81 10.28 13.74 10.29C13.65 10.31 12.25 11.24 9.52 13.08C9.12 13.35 8.76 13.49 8.44 13.48C8.08 13.47 7.4 13.28 6.89 13.11C6.26 12.91 5.77 12.8 5.81 12.45C5.83 12.27 6.08 12.09 6.55 11.9C9.47 10.63 11.41 9.79 12.38 9.39C15.16 8.23 15.73 8.03 16.11 8.03C16.19 8.03 16.38 8.05 16.5 8.15C16.6 8.23 16.63 8.35 16.64 8.43C16.63 8.5 16.65 8.69 16.64 8.8Z" />
                    </svg>
                    Telegram
                  </Label>
                  <Input
                    id="telegram"
                    name="telegram"
                    value={socialSettings.telegram}
                    onChange={handleSocialChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsapp" className="flex items-center">
                    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.05 4.91C18.1332 3.98392 17.0412 3.24967 15.8376 2.75005C14.6341 2.25043 13.3431 1.99546 12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91ZM12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.02L7.55 18.84L4.43 19.65L5.25 16.62L5.05 16.31C4.24065 15.0117 3.80296 13.5114 3.8 11.98C3.8 7.37 7.49 3.68 12.03 3.68C14.23 3.68 16.28 4.53 17.85 6.09C18.6175 6.85396 19.2257 7.76266 19.6394 8.76342C20.0531 9.76419 20.2641 10.8371 20.26 11.92C20.27 16.53 16.58 20.15 12.04 20.15ZM16.56 13.99C16.31 13.87 15.09 13.28 14.87 13.19C14.64 13.1 14.48 13.06 14.31 13.3C14.14 13.55 13.67 14.09 13.53 14.26C13.39 14.42 13.25 14.44 13 14.32C12.75 14.2 11.94 13.95 11 13.1C10.26 12.44 9.77 11.63 9.62 11.38C9.48 11.13 9.6 11 9.73 10.87C9.84 10.76 9.98 10.58 10.1 10.44C10.22 10.3 10.27 10.19 10.35 10.03C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.49 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.33 8.7 7.33 8.53 7.33C8.36 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.49 7 9.71C7 10.93 7.89 12.11 8.01 12.27C8.13 12.44 9.77 14.94 12.25 16.01C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.69 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.03 14.26C16.96 14.14 16.81 14.08 16.56 13.99Z" />
                    </svg>
                    WhatsApp
                  </Label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={socialSettings.whatsapp}
                    onChange={handleSocialChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#8bc4c1] hover:bg-[#7ab3b0]" onClick={() => handleSaveSettings("social")}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить настройки
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
