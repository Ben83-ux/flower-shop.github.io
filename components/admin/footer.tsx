import Link from "next/link"

export default function AdminFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t py-4 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">&copy; {currentYear} NFLOWER.RU. Все права защищены.</div>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/admin/help" className="text-muted-foreground hover:text-foreground transition-colors">
            Справка
          </Link>
          <Link href="/admin/support" className="text-muted-foreground hover:text-foreground transition-colors">
            Поддержка
          </Link>
          <div className="text-muted-foreground">Версия 1.0.0</div>
        </div>
      </div>
    </footer>
  )
}
