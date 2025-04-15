import type { Metadata } from "next"
import { MessageSquare, Search, Filter, Star, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Сообщения | Личный кабинет менеджера",
  description: "Управление сообщениями и чатами с клиентами",
}

interface Message {
  id: string
  content: string
  timestamp: string
  isOutgoing: boolean
  status?: "sent" | "delivered" | "read"
}

interface Chat {
  id: string
  name: string
  avatar?: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
  isStarred?: boolean
}

export default function MessagesPage() {
  // Моковые данные для чатов
  const chats: Chat[] = [
    {
      id: "1",
      name: "Анна Смирнова",
      lastMessage: "Спасибо за помощь с заказом!",
      timestamp: "10:42",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Иван Петров",
      lastMessage: "Когда будет доставка?",
      timestamp: "Вчера",
      unread: 0,
      online: false,
      isStarred: true,
    },
    {
      id: "3",
      name: "Елена Иванова",
      lastMessage: "Можно заменить розы на пионы?",
      timestamp: "Вчера",
      unread: 1,
      online: false,
    },
    {
      id: "4",
      name: "Дмитрий Козлов",
      lastMessage: "Заказ #1234 оплачен",
      timestamp: "23.05",
      unread: 0,
      online: false,
    },
    {
      id: "5",
      name: "Ольга Николаева",
      lastMessage: "Хочу сделать заказ на свадьбу",
      timestamp: "22.05",
      unread: 0,
      online: true,
    },
  ]

  // Моковые данные для сообщений в активном чате
  const messages: Message[] = [
    {
      id: "m1",
      content: "Здравствуйте! Я хотела бы уточнить детали моего заказа #1234",
      timestamp: "10:30",
      isOutgoing: false,
    },
    {
      id: "m2",
      content: "Добрый день, Анна! Конечно, я сейчас проверю информацию по вашему заказу.",
      timestamp: "10:32",
      isOutgoing: true,
      status: "read",
    },
    {
      id: "m3",
      content: "Ваш заказ будет доставлен завтра с 12:00 до 14:00. Курьер позвонит за 30 минут до прибытия.",
      timestamp: "10:35",
      isOutgoing: true,
      status: "read",
    },
    {
      id: "m4",
      content: "Отлично, спасибо! А можно еще добавить к заказу открытку с поздравлением?",
      timestamp: "10:38",
      isOutgoing: false,
    },
    {
      id: "m5",
      content: "Да, конечно! Я добавила открытку к вашему заказу. Текст поздравления можете отправить мне прямо здесь.",
      timestamp: "10:40",
      isOutgoing: true,
      status: "read",
    },
    {
      id: "m6",
      content: "Спасибо за помощь с заказом!",
      timestamp: "10:42",
      isOutgoing: false,
    },
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold flex items-center">
          <MessageSquare className="mr-2 h-6 w-6" />
          Сообщения
        </h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Фильтры
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Левая панель с чатами */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Поиск сообщений..." className="pl-8" />
            </div>
          </div>

          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <div className="px-3 pt-2">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  Все
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex-1">
                  Непрочитанные
                </TabsTrigger>
                <TabsTrigger value="starred" className="flex-1">
                  Избранные
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 flex items-start hover:bg-gray-50 cursor-pointer ${
                      chat.id === "1" ? "bg-gray-50" : ""
                    }`}
                  >
                    <div className="relative mr-3">
                      <Avatar>
                        <AvatarImage src={chat.avatar || `/placeholder.svg?height=40&width=40`} alt={chat.name} />
                        <AvatarFallback>
                          {chat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm truncate">
                          {chat.name}
                          {chat.isStarred && <Star className="inline-block ml-1 h-3 w-3 text-yellow-400" />}
                        </h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{chat.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && <Badge className="ml-2 bg-[#8bc4c1]">{chat.unread}</Badge>}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="unread" className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y">
                {chats
                  .filter((chat) => chat.unread > 0)
                  .map((chat) => (
                    <div key={chat.id} className="p-3 flex items-start hover:bg-gray-50 cursor-pointer">
                      <div className="relative mr-3">
                        <Avatar>
                          <AvatarImage src={chat.avatar || `/placeholder.svg?height=40&width=40`} alt={chat.name} />
                          <AvatarFallback>
                            {chat.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">
                            {chat.name}
                            {chat.isStarred && <Star className="inline-block ml-1 h-3 w-3 text-yellow-400" />}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                      </div>
                      <Badge className="ml-2 bg-[#8bc4c1]">{chat.unread}</Badge>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="starred" className="flex-1 overflow-y-auto p-0 m-0">
              <div className="divide-y">
                {chats
                  .filter((chat) => chat.isStarred)
                  .map((chat) => (
                    <div key={chat.id} className="p-3 flex items-start hover:bg-gray-50 cursor-pointer">
                      <div className="relative mr-3">
                        <Avatar>
                          <AvatarImage src={chat.avatar || `/placeholder.svg?height=40&width=40`} alt={chat.name} />
                          <AvatarFallback>
                            {chat.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {chat.online && (
                          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">
                            {chat.name}
                            <Star className="inline-block ml-1 h-3 w-3 text-yellow-400" />
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{chat.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread > 0 && <Badge className="ml-2 bg-[#8bc4c1]">{chat.unread}</Badge>}
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Правая панель с активным чатом */}
        <div className="flex-1 flex flex-col">
          {/* Заголовок чата */}
          <div className="p-3 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Анна Смирнова" />
                <AvatarFallback>АС</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-sm flex items-center">
                  Анна Смирнова
                  <span className="ml-2 text-xs text-green-500 font-normal">Онлайн</span>
                </h3>
                <p className="text-xs text-gray-500">Заказ #1234 • Последний визит: сегодня в 10:45</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isOutgoing ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isOutgoing ? "bg-[#e8f4f2] text-gray-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="mt-1 flex items-center justify-end space-x-1">
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                    {message.status === "read" && (
                      <svg className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Форма отправки сообщения */}
          <div className="p-3 border-t">
            <div className="flex items-end space-x-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Paperclip className="h-5 w-5 text-gray-500" />
              </Button>
              <div className="flex-1">
                <Input placeholder="Введите сообщение..." className="rounded-full" />
              </div>
              <Button size="icon" className="rounded-full bg-[#8bc4c1] hover:bg-[#7ab5b2]">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
