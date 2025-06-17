"use server"

import { prisma } from "@/lib/prisma"

export async function getAllServices(userId: string) {
  try {
    const services = await prisma.service.findMany({
      where: {
        userId,
        status: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return services
  } catch (error: any) {
    console.log("ERROR:", error?.message)
    return null
  }
}
