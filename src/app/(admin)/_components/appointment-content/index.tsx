"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { AlertCircleIcon, Calendar, Loader } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAppointmentsByDate } from "@/app/(site)/_actions/get-appointmenes-by-date"
import {
  getAppointmentsWithClient,
  getUnvailableTimesAfter,
  isDateBeforeNow
} from "@/utils/date-ultils"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"
import { useEffect, useState } from "react"
import { CardTime } from "../card-time"
import { format, parse } from "date-fns"
import { cancelAppointment } from "../../_actions/delete-appointment"
import { toast } from "sonner"

export type AppointmentProps = {
  id: string
  name: string
  time: string
  service: {
    name: string
    duration: number
  }
}

export function AppointmentContent({ session }: { session: Session }) {
  const [unavailableTimes, setUnavailableTimes] = useState<string[]>([])
  const [times, setTimes] = useState<string[]>([])
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"))
  const [appointmentSlots, setAppointmentSlots] = useState<
    Record<string, AppointmentProps>
  >({})

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (date) {
      getAppointmetns()
    }
  }, [date])

  async function getAppointmetns() {
    setLoading(false)
    const dateToFormat = parse(date, "yyyy-MM-dd", new Date())

    const appointments = await getAppointmentsByDate(
      session.userId,
      dateToFormat
    )

    const unavailableTimes = getUnvailableTimesAfter(
      appointments,
      session.user.times
    )
    setUnavailableTimes(unavailableTimes)

    const isTimesPast = session.user.times
      .sort()
      .filter((time) => !isDateBeforeNow(time, dateToFormat))

    const times = isTimesPast.filter(
      (time) => !unavailableTimes?.includes(time)
    )
    setTimes(times)

    const appointmentsClients = getAppointmentsWithClient(
      appointments,
      session.user.times
    )
    setAppointmentSlots(appointmentsClients)
  }

  async function handleCancelAppointment(id: string) {
    const response = await cancelAppointment(id)

    if (response?.data) {
      getAppointmetns()
      toast.success(response.data)
    }
  }

  function handleOpenCalendar() {
    return (
      document.getElementById("calender") as HTMLInputElement
    ).showPicker()
  }

  return (
    <Card className="mx-auto max-w-6xl border-0 bg-zinc-100 lg:max-h-[800px] dark:bg-zinc-800">
      <CardHeader>
        <CardTitle className="text-default text-2xl">Horários</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent className="lg:h-[650px] lg:max-h-[650px]">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader className="h-10 w-10 animate-spin text-zinc-400" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={date}
                  id="calender"
                  onChange={(e) => setDate(e.target.value)}
                  className="hide-calendar-icon h-12 w-full rounded-sm bg-zinc-300 px-4 font-bold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
                />
                <Button className="h-12 w-12" onClick={handleOpenCalendar}>
                  <Calendar />
                </Button>
              </div>
              <ScrollArea className="h-[600px]">
                <div className="w-full">
                  {times.length === 0 ? (
                    <Alert
                      variant="destructive"
                      className="border-red-400 bg-red-300"
                    >
                      <AlertCircleIcon />
                      <AlertTitle className="text-lg font-bold text-red-600">
                        Horários indisponíveis.
                      </AlertTitle>
                      <AlertDescription>
                        <p>
                          Ainda não tem nenhum horario disponível no momento.
                        </p>
                      </AlertDescription>
                    </Alert>
                  ) : (
                    times
                      .sort()
                      .map((time) => <CardTime key={time} time={time} />)
                  )}
                </div>
              </ScrollArea>
            </div>
            <ScrollArea className="h-[600px]">
              <div className="w-full">
                {unavailableTimes.length === 0 ? (
                  <Alert
                    variant="destructive"
                    className="border-red-400 bg-red-300"
                  >
                    <AlertCircleIcon />
                    <AlertTitle className="text-lg font-bold text-red-600">
                      Nenhum horário marcado.
                    </AlertTitle>
                    <AlertDescription>
                      <p>Ainda não tem nenhum horario marcado no momento.</p>
                    </AlertDescription>
                  </Alert>
                ) : (
                  unavailableTimes.sort()?.map((time) => {
                    return (
                      <CardTime
                        key={time}
                        time={time}
                        client={`${appointmentSlots[time].name} - ${appointmentSlots[time].service.name}`}
                        handleCancelAppointment={() =>
                          handleCancelAppointment(appointmentSlots[time].id)
                        }
                      />
                    )
                  })
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
