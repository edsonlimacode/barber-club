"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const appointmentSchema = z.object({
  name: z.string().min(2, {
    message: "Nome é obrigatório"
  }),
  email: z.string().optional(),
  phone: z.string().min(1, { message: "Telefone é obrigatório" })
})

export type AppointmentFormData = z.infer<typeof appointmentSchema>

export function useAppointmentFormHook() {
  return useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    }
  })
}
