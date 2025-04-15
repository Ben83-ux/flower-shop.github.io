import type { ReactNode } from "react"
import ManagerSidebar from "@/components/manager/sidebar"
import ManagerHeader from "@/components/manager/header"
import ManagerFooter from "@/components/manager/footer"

export default function ManagerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <ManagerHeader />
      <div className="flex flex-1">
        <ManagerSidebar />
        <div className="lg:ml-64 w-full flex flex-col">
          <main className="flex-1 p-4 md:p-6">{children}</main>
          <ManagerFooter />
        </div>
      </div>
    </div>
  )
}
