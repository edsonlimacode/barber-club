"use client"
import { Button } from "@/components/ui/button"
import { Loader, User } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export function LoginBtn() {
  const { status } = useSession()
  return (
    <>
      {status === "loading" && (
        <Button className="rounded-full">
          <Loader className="size-5 animate-spin" /> carregando...
        </Button>
      )}

      {status === "authenticated" && (
        <Link href="/dashboard" className="w-full">
          <Button className="flex h-10 w-full items-center rounded-full px-4 text-zinc-200">
            <User className="h-5 w-5 text-zinc-200" /> Entrar
          </Button>
        </Link>
      )}

      {status == "unauthenticated" && (
        <Button
          onClick={() => signIn("google", { redirectTo: "/dashboard" })}
          className="flex h-10 items-center rounded-full px-4 text-zinc-200"
        >
          <Image
            src="/google.png"
            width={20}
            height={20}
            alt=""
            className="h-5 w-5"
          />
          Login com google
        </Button>
      )}
    </>
  )
}
