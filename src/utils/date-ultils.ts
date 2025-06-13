import { AppointmentProps } from "@/app/(admin)/_components/appointment-content"
import {
  format,
  addMinutes,
  parse,
  intervalToDuration,
  isBefore,
  isAfter
} from "date-fns"

export function generateTimes(inicio = "07:00", fim = "17:00") {
  const formato = "HH:mm"
  let startDate = parse(inicio, formato, new Date()) //06:00
  const endDate = parse(fim, formato, new Date()) //18:00

  const times = []

  while (startDate <= endDate) {
    times.push(format(startDate, formato))
    startDate = addMinutes(startDate, 30)
  }

  return times
}

export function convertIntToMinutos(minute: number) {
  const start = new Date(0)
  const end = addMinutes(start, minute)

  const duracao = intervalToDuration({ start, end })
  const { hours = 0, minutes = 0 } = duracao

  if (hours === 1 && minutes === 30) return "1 hora e meia"
  if (hours === 0 && minutes > 0)
    return `${minutes} minuto${minutes > 1 ? "s" : ""}`
  if (hours > 0 && minutes === 0) return `${hours} hora${hours > 1 ? "s" : ""}`

  const time = []
  if (hours > 0) time.push(`${hours} hora${hours > 1 ? "s" : ""}`)
  if (minutes > 0) time.push(`${minutes} minuto${minutes > 1 ? "s" : ""}`)

  return time.join(" e ")
}

export function isDateBeforeNow(time: string, date: Date) {
  const timeToCompate = parse(time, "HH:mm", date)

  if (isAfter(timeToCompate, new Date())) {
    return false
  }

  return isBefore(timeToCompate, new Date())
}

export function getUnvailableTimesBefore(
  unAvailableTimes: string[],
  times: string[],
  duration: number
) {
  const passos = duration / 30
  const indisponiveis = new Set()

  unAvailableTimes.forEach((time) => {
    const index = times.sort().indexOf(time)
    if (index !== -1) {
      for (let i = 0; i < passos; i++) {
        const indiceAnterior = index - i
        if (indiceAnterior >= 0) {
          indisponiveis.add(times[indiceAnterior])
        }
      }
    }
  })

  return Array.from(indisponiveis).sort()
}

export function getUnvailableTimesAfter(
  appointments: AppointmentProps[],
  times: string[]
) {
  const unavailableTimes = new Set<string>()

  for (const appointment of appointments) {
    const countServiceDuration = Math.ceil(appointment.service.duration / 30)

    const startCountIndex = times.sort().indexOf(appointment.time)

    if (startCountIndex != -1) {
      for (let i = 0; i < countServiceDuration; i++) {
        const blockedTimes = times[startCountIndex + i]

        unavailableTimes.add(blockedTimes)
      }
    }
  }

  const result = Array.from(unavailableTimes)

  return result
}

export function getAppointmentsWithClient(
  appointments: AppointmentProps[],
  userTimes: string[]
): Record<string, AppointmentProps> {
  const appointmentSlots: Record<string, AppointmentProps> = {}
  for (const appointment of appointments) {
    const startIndex = userTimes.sort().indexOf(appointment.time)
    const requiredSlots = Math.ceil(appointment.service.duration / 30)

    if (startIndex != -1) {
      for (let i = 0; i < requiredSlots; i++) {
        const time = userTimes.sort()[startIndex + i]
        appointmentSlots[time] = appointment
      }
    }
  }

  return appointmentSlots
}
