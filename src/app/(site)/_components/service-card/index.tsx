"use client"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { ptBR } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  AppointmentFormData,
  useAppointmentFormHook
} from "./appointment-form-hook"
import { cn } from "@/lib/utils"

import { formatCurrency } from "@/utils/currency-ultils"
import { toast } from "sonner"
import { formatPhone, phoneMask } from "@/utils/phone-ultils"
import { createAppointment } from "../../barber/_actions/create-appointment"
import {
  getUnvailableTimesAfter,
  getUnvailableTimesBefore,
  isDateBeforeNow
} from "@/utils/date-ultils"
import { getAppointmentsByDate } from "../../_actions/get-appointmenes-by-date"
import {
  format,
  isAfter,
  isBefore,
  isToday,
  isWeekend,
  startOfDay
} from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { CalendarCheck, ChevronDownIcon } from "lucide-react"

interface ServiceProps {
  service: {
    name: string
    id: string
    price: string
    times: string[]
    userId: string
    duration: number
  }
}

export function ServiceCard({ service }: ServiceProps) {
  const [isOpen, setOpen] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [timeSelected, setTimeSelected] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [unAvailableTimes, setUnavailableTimes] = useState<string[]>([])
  const form = useAppointmentFormHook()

  function handleOpenAppointment() {
    getAppointments()
    setOpen(true)
  }

  useEffect(() => {
    getAppointments()
  }, [date, service.duration])

  async function getAppointments() {
    const dateToSearch = date ? date : new Date()
    const appointments = await getAppointmentsByDate(
      service.userId,
      dateToSearch
    )

    const result = getUnvailableTimesAfter(appointments, service.times)

    if (result) {
      setUnavailableTimes(result)
    }
  }

  async function onSubmit(formData: AppointmentFormData) {
    if (!timeSelected || isDateBeforeNow(timeSelected, date!)) {
      toast.error("Selecione um horário disponivel")
      return
    }

    const dateTime = date ? date : new Date()
    const newDate = new Date(format(dateTime, "yyyy-MM-dd"))

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formatPhone(formData.phone),
      date: newDate,
      time: timeSelected,
      serviceId: service.id,
      userId: service.userId
    }

    const response = await createAppointment(data)

    if (response?.data) {
      toast.success(response.data)
      setOpen(false)
      setTimeSelected("")
      setDate(new Date())
      form.reset()
    }
  }

  return (
    <article className="w-full rounded-md bg-zinc-100 p-2 dark:bg-zinc-800">
      <div className="flex items-center gap-4">
        <Image src="/barber.png" alt="" width={64} height={64} />
        <div className="space-x-6">
          <span className="mb-2 block text-zinc-600 dark:text-zinc-200">
            {service.name}
          </span>
          <span className="text-default">
            {formatCurrency(Number(service.price))}
          </span>
        </div>
      </div>
      <Button
        onClick={handleOpenAppointment}
        className="dark:text-default mt-4 w-full cursor-pointer"
      >
        Reservar
      </Button>
      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetContent className="[&>button>svg]:dark:text-default w-[600px] overflow-auto border-0 bg-zinc-100 p-4 dark:bg-zinc-800">
          <SheetHeader>
            <SheetTitle className="dark:text-default text-2xl text-zinc-600">
              Reserva
            </SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-sm font-bold text-zinc-600 dark:text-zinc-200">
                      Nome
                    </label>
                    <FormControl>
                      <Input
                        placeholder="Nome"
                        {...field}
                        className="h-11 border-2 border-zinc-400 bg-zinc-200/50 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-sm font-bold text-zinc-600 dark:text-zinc-200">
                      E-mail
                    </label>
                    <FormControl>
                      <Input
                        placeholder="E-mail"
                        {...field}
                        className="h-11 border-2 border-zinc-400 bg-zinc-200/50 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <label className="text-sm font-bold text-zinc-600 dark:text-zinc-200">
                      Telefone
                    </label>
                    <FormControl>
                      <Input
                        placeholder="Telefone"
                        {...field}
                        onChange={(e) => {
                          const phone = phoneMask(e.target.value)
                          field.onChange(phone)
                        }}
                        className="h-11 border-2 border-zinc-400 bg-zinc-200/50 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <div className="w-full">
                <Calendar
                  mode="single"
                  locale={ptBR}
                  selected={date}
                  onSelect={(value) => {
                    const dateSelected = value ? value : new Date()
                    setDate(dateSelected)
                  }}
                  disabled={(date) => isBefore(date, startOfDay(new Date()))}
                  className="w-full rounded-md text-zinc-50 dark:bg-zinc-900"
                  classNames={{
                    day_selected: "bg-default text-white dark:hover:bg-default",
                    day_today: "border border-amber-400",
                    nav_button:
                      "hover:bg-default hover:text-white hover:bg-default rounded-md p-2"
                  }}
                />
              </div> */}
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-zinc-600 dark:text-zinc-200">
                  Data
                </label>
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="h-11 border-2 border-zinc-400 bg-zinc-200/50 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-transparent"
                    >
                      {date ? date.toLocaleDateString() : "Selecione uma data"}
                      <CalendarCheck />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={date}
                      captionLayout="dropdown"
                      disabled={(date) =>
                        isBefore(date, startOfDay(new Date())) ||
                        isWeekend(date)
                      }
                      onSelect={(value) => {
                        const dateSelected = value ? value : new Date()
                        setDate(dateSelected)
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <span className="text-sm font-bold text-zinc-600 dark:text-zinc-200">
                Horários disponíveis
              </span>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {service.times.sort().map((time) => {
                  const isDateBefore = isDateBeforeNow(time, date!)

                  const result = getUnvailableTimesBefore(
                    unAvailableTimes,
                    service.times,
                    service.duration
                  )

                  const blockedTimes = result.includes(time)

                  return (
                    <Button
                      key={time}
                      onClick={() => setTimeSelected(time)}
                      type="button"
                      disabled={isDateBefore || blockedTimes}
                      className={cn("cursor-pointer border border-zinc-900", {
                        "border-2 border-amber-400":
                          timeSelected == time && !isDateBefore
                      })}
                    >
                      {time}
                    </Button>
                  )
                })}
              </div>

              <Button
                type="submit"
                className="hover:bg-default bg-default/95 h-11 w-full cursor-pointer text-lg font-bold text-white"
              >
                Enviar
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </article>
  )
}
