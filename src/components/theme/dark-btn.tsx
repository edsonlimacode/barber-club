"use client"

import { Moon } from "lucide-react"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"

export function DarkMode() {
  const router = useRouter()

  async function setDarkMode() {
    setCookie("barberclub.theme", "dark")
    const html = document.getElementById("toggle-theme")
    html?.classList.remove("dark", "light")
    html?.classList.add("dark")
    router.refresh()
  }

  return (
    <Moon
      className="dark:text-default h-6 w-6 text-zinc-400"
      onClick={setDarkMode}
    />
  )
}
