"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const profileSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Nome é obgrigatório" }),
  price: z.string().min(1, { message: "Preço é obgrigatório" }),
  duration: z.string().min(1, { message: "Selecione a duração" }),
  userId: z.string().optional()
})

export type ServiceFormData = z.infer<typeof profileSchema>

export function useServiceFormHook() {
  return useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      id: "",
      name: "",
      price: "",
      duration: ""
    }
  })
}
