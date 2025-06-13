import { getCookie } from "cookies-next"
import { cookies } from "next/headers"
import { LightMode } from "@/components/theme/light-btn"
import { DarkMode } from "@/components/theme/dark-btn"
import { CustomHeader } from "./_components/costum-header"

export async function Header() {
  const theme = await getCookie("barberclub.theme", { cookies })

  const toggleTheme = theme ? theme : "dark"

  return (
    <CustomHeader>
      <div className="flex cursor-pointer flex-col items-center gap-2">
        {toggleTheme === "dark" ? <LightMode /> : <DarkMode />}
      </div>
    </CustomHeader>
  )
}
