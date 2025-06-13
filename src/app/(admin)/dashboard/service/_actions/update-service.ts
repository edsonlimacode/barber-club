/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { ServiceFormData } from "../_components/service-form/service-form-hook"

export async function updateService(formData: ServiceFormData) {
  try {
    await prisma.service.update({
      where: {
        id: formData.id
      },
      data: {
        name: formData.name,
        price: formData.price,
        duration: Number(formData.duration)
      }
    })

    revalidatePath("/dashboard/service")

    return {
      data: "Serviço atualizado com sucesso"
    }
  } catch (error: any) {
    console.log("ERROR:", error?.message)
    return null
  }
}
