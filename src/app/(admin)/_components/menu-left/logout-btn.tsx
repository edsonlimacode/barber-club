"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function LogoutBtn() {
  return (
    <LogOut
      onClick={() => signOut()}
      className="dark:text-default text-zinc-500"
    />
  )
}
