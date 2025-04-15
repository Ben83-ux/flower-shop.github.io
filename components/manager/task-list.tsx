"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

// Моковые данные для задач
const initialTasks = [
  {
    id: 1,
    title: "Подтвердить заказ #ORD-005",
    description: "Связаться с клиентом для подтверждения деталей заказа",
    dueDate: "Сегодня, 12:00",
    priority: "Высокий",
    completed: false,
  },
  {
    id: 2,
    title: "Проверить наличие цветов для заказов на завтра",
    description: "Убедиться, что все необходимые цветы есть в наличии",
    dueDate: "Сегодня, 15:00",
    priority: "Средний",
    completed: false,
  },
  {
    id: 3,
    title: "Обновить статус доставки заказа #ORD-002",
    description: "Отметить заказ как доставленный после подтверждения курьера",
    dueDate: "Сегодня, 18:00",
    priority: "Низкий",
    completed: false,
  },
  {
    id: 4,
    title: "Подготовить отчет по продажам за неделю",
    description: "Сформировать отчет по продажам и отправить руководителю",
    dueDate: "Завтра, 10:00",
    priority: "Средний",
    completed: true,
  },
  {
    id: 5,
    title: "Обработать возврат по заказу #ORD-001",
    description: "Связаться с клиентом и оформить возврат средств",
    dueDate: "Завтра, 12:00",
    priority: "Высокий",
    completed: false,
  },
]

export default function TaskList() {
  const [tasks, setTasks] = useState(initialTasks)

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Высокий":
        return "bg-red-100 text-red-600"
      case "Средний":
        return "bg-amber-100 text-amber-600"
      case "Низкий":
        return "bg-blue-100 text-blue-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className={`p-3 border rounded-md ${task.completed ? "bg-gray-50 opacity-60" : ""}`}>
          <div className="flex items-start">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleTaskCompletion(task.id)}
              className="mt-1 mr-3"
            />
            <div className="flex-1">
              <div className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</div>
              <div className="text-sm text-gray-500 mt-1">{task.description}</div>
              <div className="flex items-center mt-2 text-xs">
                <div className="flex items-center text-gray-500 mr-3">
                  <Clock className="h-3 w-3 mr-1" />
                  {task.dueDate}
                </div>
                <Badge className={`font-normal ${getPriorityColor(task.priority)}`}>{task.priority}</Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
