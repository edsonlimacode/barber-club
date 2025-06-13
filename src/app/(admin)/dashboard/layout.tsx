import { ReactNode } from "react"
import { NavMenu } from "../_components/menu-left"
import { getUserSession } from "../_actions/get-user-session"

export default async function AdminLayout({
  children
}: {
  children: ReactNode
}) {
  await getUserSession()

  return (
    <div className="grid min-h-screen grid-cols-[100px_1fr]">
      <NavMenu />
      <main className="bg-zinc-200 px-4 py-6 dark:bg-zinc-900">{children}</main>
    </div>
  )
}
