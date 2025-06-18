"use server"

import { prisma } from "@/lib/prisma"

export async function getBarberById(userId: string) {
  try {
    const barber = await prisma.user.findFirst({
      where: {
        id: userId
      },
      include: {
        services: {
          where: {
            status: true
          },
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    })

    return barber
  } catch (error: any) {
    console.log("ERROR:", error?.message)
    return null
  }
}
