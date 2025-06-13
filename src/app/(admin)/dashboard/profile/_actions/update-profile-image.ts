"use server"

import { prisma } from "@/lib/prisma"

export async function updateProfileImage(image: string, userId: string) {
  try {
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        image
      }
    })
  } catch (error) {
    console.log("ERROR:", error)
    return null
  }
}
