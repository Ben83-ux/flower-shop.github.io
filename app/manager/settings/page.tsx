"use client"

import { useState } from "react"
import {
  Bell,
  Lock,
  Mail,
  Phone,
  Monitor,
  Moon,
  Sun,
  Clock,
  BellRing,
  Save,
  Smartphone,
  Palette,
  Languages,
  Calendar,
  User,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"

export default function ManagerSettingsPage() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [language, setLanguage] = useState("ru")
  const [timeFormat, setTimeFormat] = useState("24h")
  const [dateFormat, setDateFormat] = useState("dd.mm.yyyy")

  const handleSaveSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Ваши настройки были успешно сохранены",
    })
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Настройки</h1>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Сохранить все изменения
        </Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="appearance">Интерфейс</TabsTrigger>
          <TabsTrigger value="workflow">Рабочий процесс</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Личная информация</CardTitle>
              <CardDescription>Обновите вашу личную информацию и контактные данные</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                  <AvatarFallback>ИМ</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    Изменить фото
                  </Button>
                  <p className="text-sm text-muted-foreground">JPG, PNG или GIF. Максимальный размер 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" defaultValue="Иван" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input id="lastName" defaultValue="Морозов" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-4">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input id="email" defaultValue="ivan.morozov@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <div className="flex items-center space-x-4">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input id="phone" defaultValue="+7 (999) 123-45-67" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Должность</Label>
                <div className="flex items-center space-x-4 p-2 border rounded-md bg-muted/50">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Менеджер</p>
                    <p className="text-sm text-muted-foreground">Филиал: Центральный</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Должность назначается администратором и привязана к филиалу
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">О себе</Label>
                <Textarea
                  id="bio"
                  placeholder="Расскажите немного о себе"
                  defaultValue="Менеджер по работе с клиентами с 5-летним опытом работы в цветочном бизнесе."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>Обновите ваш пароль и настройки безопасности</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Текущий пароль</Label>
                <div className="flex items-center space-x-4">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Input id="currentPassword" type="password" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Новый пароль</Label>
                <div className="flex items-center space-x-4">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Input id="newPassword" type="password" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <div className="flex items-center space-x-4">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Обновить пароль</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>Настройте способы получения уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Все уведомления</p>
                    <p className="text-sm text-muted-foreground">Включить или отключить все уведомления</p>
                  </div>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Каналы уведомлений</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email уведомления</p>
                      <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    disabled={!notificationsEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">SMS уведомления</p>
                      <p className="text-sm text-muted-foreground">Получать уведомления по SMS</p>
                    </div>
                  </div>
                  <Switch
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                    disabled={!notificationsEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <BellRing className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Push-уведомления</p>
                      <p className="text-sm text-muted-foreground">Получать push-уведомления в браузере</p>
                    </div>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                    disabled={!notificationsEnabled}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Типы уведомлений</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Новые заказы</p>
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-medium">Изменения статуса заказа</p>
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-medium">Комментарии к заказам</p>
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-medium">Проблемы с доставкой</p>
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="font-medium">Системные уведомления</p>
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Внешний вид</CardTitle>
              <CardDescription>Настройте внешний вид интерфейса</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Тема</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${theme === "light" ? "border-primary bg-primary/10" : "border-border"}`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-10 w-10 mb-2" />
                    <span>Светлая</span>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${theme === "dark" ? "border-primary bg-primary/10" : "border-border"}`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-10 w-10 mb-2" />
                    <span>Темная</span>
                  </div>
                  <div
                    className={`flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer ${theme === "system" ? "border-primary bg-primary/10" : "border-border"}`}
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="h-10 w-10 mb-2" />
                    <span>Системная</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Palette className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Цветовая схема</p>
                      <p className="text-sm text-muted-foreground">Выберите основной цвет интерфейса</p>
                    </div>
                  </div>
                  <Select defaultValue="pink">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Выберите цвет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pink">Розовый</SelectItem>
                      <SelectItem value="purple">Фиолетовый</SelectItem>
                      <SelectItem value="blue">Синий</SelectItem>
                      <SelectItem value="green">Зеленый</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Компактный режим</p>
                      <p className="text-sm text-muted-foreground">Уменьшить размер элементов интерфейса</p>
                    </div>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Languages className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Язык интерфейса</p>
                      <p className="text-sm text-muted-foreground">Выберите язык интерфейса</p>
                    </div>
                  </div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Выберите язык" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Формат даты и времени</CardTitle>
              <CardDescription>Настройте отображение даты и времени</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Формат времени</p>
                    <p className="text-sm text-muted-foreground">Выберите формат отображения времени</p>
                  </div>
                </div>
                <Select value={timeFormat} onValueChange={setTimeFormat}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Формат времени" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="24h">24-часовой (14:30)</SelectItem>
                    <SelectItem value="12h">12-часовой (2:30 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Формат даты</p>
                    <p className="text-sm text-muted-foreground">Выберите формат отображения даты</p>
                  </div>
                </div>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Формат даты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd.mm.yyyy">ДД.ММ.ГГГГ</SelectItem>
                    <SelectItem value="mm.dd.yyyy">ММ.ДД.ГГГГ</SelectItem>
                    <SelectItem value="yyyy-mm-dd">ГГГГ-ММ-ДД</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Настройки рабочего процесса</CardTitle>
              <CardDescription>Настройте параметры вашего рабочего процесса</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Заказы</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Автоматическое принятие заказов</p>
                    <p className="text-sm text-muted-foreground">Автоматически принимать новые заказы</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Уведомлять о просроченных заказах</p>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления о заказах, которые не были обработаны вовремя
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Приоритет заказов</p>
                    <p className="text-sm text-muted-foreground">Выберите способ сортировки заказов по умолчанию</p>
                  </div>
                  <Select defaultValue="date">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Выберите приоритет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">По дате (сначала новые)</SelectItem>
                      <SelectItem value="date-asc">По дате (сначала старые)</SelectItem>
                      <SelectItem value="price">По сумме (по убыванию)</SelectItem>
                      <SelectItem value="price-asc">По сумме (по возрастанию)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Доставка</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Автоматическое назначение курьера</p>
                    <p className="text-sm text-muted-foreground">Автоматически назначать курьера для доставки</p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Отправлять SMS клиенту при доставке</p>
                    <p className="text-sm text-muted-foreground">
                      Автоматически отправлять SMS клиенту при доставке заказа
                    </p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Отчеты</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Автоматические отчеты</p>
                    <p className="text-sm text-muted-foreground">Получать автоматические отчеты по email</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Частота отчетов</p>
                    <p className="text-sm text-muted-foreground">Выберите частоту получения отчетов</p>
                  </div>
                  <Select defaultValue="weekly">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Выберите частоту" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Ежедневно</SelectItem>
                      <SelectItem value="weekly">Еженедельно</SelectItem>
                      <SelectItem value="monthly">Ежемесячно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Формат отчетов</p>
                    <p className="text-sm text-muted-foreground">Выберите формат отчетов</p>
                  </div>
                  <Select defaultValue="pdf">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Выберите формат" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Шаблоны</h3>

                <div className="space-y-2">
                  <Label htmlFor="orderTemplate">Шаблон комментария к заказу</Label>
                  <Textarea
                    id="orderTemplate"
                    placeholder="Введите шаблон комментария к заказу"
                    defaultValue="Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время для подтверждения деталей."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryTemplate">Шаблон сообщения о доставке</Label>
                  <Textarea
                    id="deliveryTemplate"
                    placeholder="Введите шаблон сообщения о доставке"
                    defaultValue="Ваш заказ №{order_id} доставлен. Спасибо, что выбрали наш магазин!"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
