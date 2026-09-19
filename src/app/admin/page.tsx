import type { Metadata } from "next"
import AdminDashboard from "@/components/admin/AdminDashboard"

export const metadata: Metadata = {
  title: "Review dashboard | Violet Bali Driver",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center bg-dark-surface px-6 py-20">
      <AdminDashboard />
    </main>
  )
}
