import { Banknote, CalendarCheck, Scissors, UserPen } from "lucide-react"
import Link from "next/link"
import { LogoutBtn } from "./logout-btn"
import { oswald } from "@/app/layout"
import { DarkMode } from "../../../../components/theme/dark-btn"
import { LightMode } from "../../../../components/theme/light-btn"
import { getCookie } from "cookies-next"
import { cookies } from "next/headers"

export async function NavMenu() {
  const theme = await getCookie("barberclub.theme", { cookies })

  const toggleTheme = theme ? theme : "dark"

  return (
    <nav className="flex h-full flex-col items-center gap-4 bg-zinc-100 p-4 dark:bg-zinc-800">
      <div className="flex h-full flex-col gap-4">
        <p
          className={`${oswald.className} mb-8 text-center text-lg leading-[1.5] font-bold text-zinc-500 uppercase dark:text-zinc-200`}
        >
          Barber <span className="text-default">club</span>
        </p>
        <Link href="/dashboard" className="flex flex-col items-center gap-2">
          <CalendarCheck className="dark:text-default text-zinc-500" />
          <small className="text-zinc-500 dark:text-zinc-300">Agenda</small>
        </Link>

        <Link
          href="/dashboard/service"
          className="flex flex-col items-center gap-2"
        >
          <Scissors className="dark:text-default text-zinc-500" />
          <small className="text-zinc-500 dark:text-zinc-300">Serviços</small>
        </Link>

        <Link
          href="/dashboard/plans"
          className="flex flex-col items-center gap-2"
        >
          <Banknote className="dark:text-default text-zinc-500" />
          <small className="text-zinc-500 dark:text-zinc-300">Planos</small>
        </Link>

        <Link
          href="/dashboard/profile"
          className="flex flex-col items-center gap-2"
        >
          <UserPen className="dark:text-default text-zinc-500" />
          <small className="text-zinc-500 dark:text-zinc-300">Perfil</small>
        </Link>

        <div className="flex cursor-pointer flex-col items-center gap-2">
          <LogoutBtn />
          <small className="text-zinc-500 dark:text-zinc-300">Sair</small>
        </div>
      </div>
      <div className="flex cursor-pointer flex-col items-center gap-2">
        {toggleTheme === "dark" ? <LightMode /> : <DarkMode />}
      </div>
    </nav>
  )
}
