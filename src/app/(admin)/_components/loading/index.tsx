import { Loader } from "lucide-react"

export function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-60px)] w-full items-center justify-center">
      <Loader className="h-8 w-8 animate-spin text-zinc-500" />
    </div>
  )
}
