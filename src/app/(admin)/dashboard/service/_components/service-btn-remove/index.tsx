"use client"
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
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteService } from "../../_actions/delete-service"
import { toast } from "sonner"

export function ServiceBtnRemove({ serviceId }: { serviceId: string }) {
  async function handleRemoveService() {
    const response = await deleteService(serviceId)

    if (response?.data) {
      toast.success(response.data)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Trash2 className="dark:text-default h-5 w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="border-0 bg-zinc-100 dark:bg-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Tem certeza que deseja excluir este item?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Ao exlcuir, o serviços será removido permanentimente e não será mais
            possível restaura-lo
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-0 bg-red-600 text-white hover:bg-red-500 hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="border-0 bg-emerald-600 hover:bg-emerald-500"
            onClick={handleRemoveService}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
