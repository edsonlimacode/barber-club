import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BarberCardProps {
  barber: {
    id: string
    name: string | null
    image: string | null
    address: string | null
    subscription: {
      plan: string
    }
  }
  btnHidden?: boolean
}

export function BarberCard({ barber, btnHidden }: BarberCardProps) {
  return (
    <article className="relative rounded-lg bg-zinc-100 dark:bg-zinc-800">
      <Image
        src={barber?.image ? barber.image : "/hero1.jpg"}
        width={800}
        height={800}
        className="h-[200px] max-h-[200px] w-full rounded-tl-lg rounded-tr-lg object-cover"
        quality={100}
        priority
        alt=""
      />
      {barber.subscription && barber.subscription.plan === "PROFESSIONAL" && (
        <span className="dark:bg-default absolute top-4 left-3 flex items-center gap-2 rounded-full bg-zinc-100 p-2 text-black">
          <Crown className="h-5 w-5" />
        </span>
      )}
      <div className="px-2 py-4">
        <span className="line-clamp-2 text-2xl text-zinc-600 dark:text-zinc-200">
          {barber?.name}
        </span>

        <address className="mt-2 text-sm font-normal text-zinc-400">
          {barber?.address ? barber.address : ""}
        </address>
        {!btnHidden && (
          <Link href={`/barber/${barber.id}`}>
            <Button className="dark:text-default mt-8 w-full cursor-pointer border border-zinc-700 bg-zinc-900 text-white">
              Reservar
            </Button>
          </Link>
        )}
      </div>
    </article>
  )
}
