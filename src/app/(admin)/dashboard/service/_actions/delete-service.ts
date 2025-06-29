"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteService(serviceId: string) {
  try {
    await prisma.service.update({
      where: {
        id: serviceId
      },
      data: {
        status: false
      }
    })

    revalidatePath("/dashboard/service")

    return {
      data: "Serviço deletado com sucesso"
    }
  } catch (error: any) {
    console.log("ERROR:", error?.message)
    return null
  }
}
