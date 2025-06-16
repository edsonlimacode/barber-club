"use client"

import Image from "next/image"
import Link from "next/link"
import { LoginBtn } from "../login-btn"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"

export function CustomHeader({ children }: { children: ReactNode }) {
  const path = usePathname()

  return (
    <header
      className={cn("relative z-20 flex min-h-20 w-full items-center", {
        "bg-zinc-900": path != "/"
      })}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center text-white uppercase">
          Barber
          <Image src="/barber-logo.png" alt="" width={60} height={60} />
          <span>lube</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="text-zinc-100 lg:hidden" />
          </SheetTrigger>
          <SheetContent className="[&>button>svg]:dark:text-default border-0 text-zinc-600">
            <SheetHeader>
              <SheetTitle />
              <SheetDescription />
              <nav className="flex flex-col items-center gap-6 lg:flex-row">
                <Link
                  href="/"
                  className="text-xl text-zinc-500 dark:text-zinc-200"
                >
                  Home
                </Link>

                <LoginBtn />

                {children}
              </nav>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link href="/" className="text-xl text-zinc-200">
            Home
          </Link>

          <LoginBtn />

          {children}
        </nav>
      </div>
    </header>
  )
}
