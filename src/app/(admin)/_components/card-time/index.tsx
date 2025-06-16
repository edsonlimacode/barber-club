"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
interface CardTimeProps {
  time: string
  handleCancelAppointment?: () => void
  client?: string
}

export function CardTime({
  time,
  handleCancelAppointment,
  client
}: CardTimeProps) {
  return (
    <article
      className={cn(
        "mb-2 flex w-full items-center justify-between rounded-sm border-l-2 border-red-500 bg-zinc-200/70 p-4 font-bold text-zinc-200 dark:bg-zinc-900",
        {
          "border-green-500": !client
        }
      )}
    >
      <div className="flex flex-col gap-2">
        <span className="text-zinc-600 dark:text-zinc-300">{time}</span>
        <small className="text-zinc-500 dark:text-zinc-400">
          {client ?? "Disponível"}
        </small>
      </div>
      <div className="space-x-2">
        {client && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-zinc-600 hover:bg-zinc-500 dark:bg-zinc-800/70 dark:hover:bg-zinc-800">
                <X className="dark:text-default" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-0 bg-zinc-100 dark:bg-zinc-800">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-500">
                  Tem certeza que deeseja cancelar esse agendamento?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-zinc-400">
                  Ao cancelar o agendamento, essa ação não pode mais ser
                  desfeita!
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-0 bg-red-500 text-white hover:text-white dark:bg-red-600 hover:dark:bg-red-500">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-emerald-600 hover:bg-emerald-500"
                  onClick={handleCancelAppointment}
                >
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </article>
  )
}
