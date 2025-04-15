import Link from "next/link"

export default function ManagerFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-4 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">&copy; {currentYear} NFLOWER.RU. Все права защищены.</div>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/manager/help" className="text-muted-foreground hover:text-foreground transition-colors">
            Руководство
          </Link>
          <Link href="/manager/faq" className="text-muted-foreground hover:text-foreground transition-colors">
            Частые вопросы
          </Link>
          <div className="text-muted-foreground">Филиал: Центральный</div>
        </div>
      </div>
    </footer>
  )
}
