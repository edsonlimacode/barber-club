import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative -top-[500px] z-10 mx-auto flex max-w-2xl flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-5xl font-bold text-zinc-300/90 lg:text-7xl">
        Clube do barbeiro
      </h1>
      <p className="text-center text-xl font-normal text-zinc-300/90 lg:text-2xl">
        Descubra barbearias de confiança com serviços <br /> de alta qualidade
        perto de você.
      </p>
      <Link
        href="#barbers"
        className="text-default hover:text-default z-300 mt-8 flex h-11 w-[300px] cursor-pointer items-center justify-center rounded-lg border px-8 hover:bg-transparent"
      >
        Agendar agora
      </Link>
    </div>
  )
}
