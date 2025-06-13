"use client"

import { Sun } from "lucide-react"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"

export function LightMode() {
  const router = useRouter()

  async function setLightMode() {
    setCookie("barberclub.theme", "light")
    const html = document.getElementById("toggle-theme")
    html?.classList.remove("dark", "light")
    html?.classList.add("light")
    router.refresh()
  }

  return (
    <Sun
      className="dark:text-default h-6 w-6 text-zinc-400"
      onClick={setLightMode}
    />
  )
}
