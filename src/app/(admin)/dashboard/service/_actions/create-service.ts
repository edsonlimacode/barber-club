/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { ServiceFormData } from "../_components/service-form/service-form-hook"

export async function createService(formData: ServiceFormData) {
  try {
    await prisma.service.create({
      data: {
        name: formData.name,
        price: formData.price,
        duration: Number(formData.duration),
        userId: formData.userId as string
      }
    })

    revalidatePath("/dashboard/service")

    return {
      data: "Serviço cadastrado com sucesso"
    }
  } catch (error: any) {
    console.log("ERROR:", error?.message)
    return null
  }
}
