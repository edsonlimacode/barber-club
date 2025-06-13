/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { prisma } from "@/lib/prisma"

export async function getAllBarbers() {
  try {
    const barbers = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc"
      }
    })

    return barbers
  } catch (error: any) {
    console.log("ERROR:", error?.message)
    return null
  }
}
