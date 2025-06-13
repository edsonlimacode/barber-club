"use client"

import Image from "next/image"
import Link from "next/link"
import { LoginBtn } from "../login-btn"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function CustomHeader({ children }: { children: ReactNode }) {
  const path = usePathname()

  return (
    <header
      className={cn("relative z-20 flex min-h-20 w-full items-center", {
        "bg-zinc-900": path != "/"
      })}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center text-white uppercase">
          Barber
          <Image src="/barber-logo.png" alt="" width={60} height={60} />
          <span>lube</span>
        </Link>
        <nav className="flex items-center gap-6">
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
