"use server"

import { prisma } from "@/lib/prisma"

export async function cancelAppointment(id: string) {
  try {
    await prisma.appointment.delete({
      where: {
        id
      }
    })

    return {
      data: "Deletado com sucesso!"
    }
  } catch (error: any) {
    console.log("ERRO:", error?.message)
    return null
  }
}
