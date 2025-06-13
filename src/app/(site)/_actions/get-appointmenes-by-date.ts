"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma"
import { format } from "date-fns"

export async function getAppointmentsByDate(
  userId: string,
  dateToSearch: Date
) {
  const dateFormated = format(dateToSearch, "yyyy-MM-dd")
  const date = new Date(dateFormated)

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })

    if (!user) {
      return []
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
        date
      },
      include: {
        service: true
      }
    })

    const result = appointments.map((appointment) => ({
      ...appointment,
      service: {
        ...appointment.service,
        price: appointment.service.price.toString()
      }
    }))

    if (result) {
      return result
    }

    return []
  } catch (error: any) {
    console.log("ERROR: ", error?.message)
    return []
  }
}
