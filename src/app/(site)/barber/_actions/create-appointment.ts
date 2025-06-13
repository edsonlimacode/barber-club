/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { prisma } from "@/lib/prisma"

interface AppointmentProps {
  name: string
  email: string | undefined
  date: Date
  phone: string
  serviceId: string
  userId: string
  time: string
}

export async function createAppointment(appointment: AppointmentProps) {
  try {
    const barber = await prisma.appointment.create({
      data: {
        name: appointment.name,
        email: appointment.email,
        phone: appointment.phone,
        date: appointment.date,
        time: appointment.time,
        serviceId: appointment.serviceId,
        userId: appointment.userId
      }
    })

    if (barber) {
      return {
        data: "Reserva efetuada com successo"
      }
    }

    return barber
  } catch (error: any) {
    console.log("ERROR:", error?.message)
    return null
  }
}
