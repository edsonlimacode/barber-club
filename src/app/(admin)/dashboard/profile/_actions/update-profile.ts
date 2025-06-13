"use server"

import { prisma } from "@/lib/prisma"
import { ProfileFormData } from "../_components/profile-form/profile-form-hook"
import { revalidatePath } from "next/cache"

export async function updateProfile(formData: ProfileFormData) {
  try {
    await prisma.user.update({
      where: {
        id: formData.userId
      },
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        times: formData.times
      }
    })

    revalidatePath("/dashboard/profile")

    return {
      data: "Perfil atualizado com sucesso"
    }
  } catch (error) {
    console.log("ERROR:", error)
    return null
  }
}
