"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { PlusCircle } from "lucide-react"
import { ServiceFormData, useServiceFormHook } from "./service-form-hook"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createService } from "../../_actions/create-service"
import { toast } from "sonner"
import { useServiceModal } from "../../_context/service-modal"
import { useEffect } from "react"
import { updateService } from "../../_actions/update-service"
import {
  currencyMask,
  currencyMaskToEdit,
  formatValueToDecimal
} from "@/utils/currency-ultils"

export function ServiceFormModal({ userId }: { userId: string }) {
  const form = useServiceFormHook()

  const { isOpen, service, handleOpenModal, handleCloseModal } =
    useServiceModal()

  useEffect(() => {
    if (service && isOpen) {
      form.setValue("id", service.id)
      form.setValue("name", service.name)
      form.setValue(
        "price",
        service.price && currencyMaskToEdit(Number(service.price))
      )
      form.setValue("duration", service.duration.toString())
    }
  }, [service, isOpen, form])

  async function onSubmit(formData: ServiceFormData) {
    if (formData.id) {
      const data = {
        ...formData,
        price: formatValueToDecimal(formData.price)
      }
      const response = await updateService(data)

      if (response?.data) {
        toast.success(response.data)
        form.reset()
        handleCloseModal()
      }
    } else {
      const data = {
        ...formData,
        price: formatValueToDecimal(formData.price),
        userId
      }

      const response = await createService(data)

      if (response?.data) {
        toast.success(response.data)
        form.reset()
        handleCloseModal()
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <Button onClick={handleOpenModal} className="dark:text-default">
        <PlusCircle />
        Cadastrar
      </Button>
      <DialogContent className="[&>button>svg]:dark:text-default border-0 sm:max-w-[425px] dark:bg-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-default">Edit profile</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-bold text-zinc-600 dark:text-zinc-200">
                    Nome
                  </label>
                  <FormControl>
                    <Input
                      placeholder="Nome"
                      {...field}
                      className="h-11 border-2 border-zinc-400 bg-zinc-200/50 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-bold text-zinc-600 dark:text-zinc-200">
                    Valor
                  </label>
                  <FormControl>
                    <Input
                      placeholder="0,00"
                      {...field}
                      onChange={(e) => {
                        const formatedValue = currencyMask(e.target.value)
                        field.onChange(formatedValue)
                      }}
                      className="h-11 border-2 border-zinc-400 bg-zinc-200/50 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-bold text-zinc-600 dark:text-zinc-200">
                    Duração
                  </label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="!h-11 w-full border-2 border-zinc-400 bg-zinc-200/50 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-900">
                        <SelectValue placeholder="Selecione a duração do serviço" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-2 border-zinc-400 text-zinc-600 dark:border-zinc-600 dark:!bg-zinc-900 dark:text-zinc-200">
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="90">1:30 minutos</SelectItem>
                      <SelectItem value="120">2:00 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="dark:text-default h-11 w-full text-white"
            >
              Cadastrar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
