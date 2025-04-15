import type { ReactNode } from "react"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"
import AdminFooter from "@/components/admin/footer"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="lg:ml-64 w-full flex flex-col">
          <main className="flex-1 p-4 md:p-6">{children}</main>
          <AdminFooter />
        </div>
      </div>
    </div>
  )
}
