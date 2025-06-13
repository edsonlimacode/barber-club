"use client"
import { Session } from "next-auth"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { ProfileFormData, useProfileFormHook } from "./profile-form-hook"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { generateTimes } from "@/utils/date-ultils"
import { formatPhone, phoneMask } from "@/utils/phone-ultils"
import { toast } from "sonner"
import { updateProfile } from "../../_actions/update-profile"

const START_TIME = "07:00"
const END_TIME = "17:00"

const times = generateTimes(START_TIME, END_TIME)

export function ProfileForm({ session }: { session: Session }) {
  const [timesSelected, setTimesSelected] = useState<string[]>(
    session.user.times
  )

  const form = useProfileFormHook(session)

  async function onSubmit(formData: ProfileFormData) {
    if (timesSelected.length == 0) {
      toast.error("Selecione os horários")
      return
    }

    const data = {
      ...formData,
      phone: formatPhone(formData.phone).trim(),
      times: timesSelected,
      userId: session.userId
    }

    const response = await updateProfile(data)

    if (response?.data) {
      toast.success(response.data)
    }
  }

  function handleSelectTime(time: string) {
    setTimesSelected((prev) => {
      if (prev.includes(time)) {
        return prev.filter((value) => value != time)
      }

      return [...prev, time]
    })
  }

  return (
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
                    const dateFormated = phoneMask(e.target.value)
                    field.onChange(dateFormated)
                  }}
                  className="h-11 border-2 border-zinc-400 bg-zinc-200/50 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <label className="text-sm font-bold text-zinc-600 dark:text-zinc-200">
                Endereço completo
              </label>
              <FormControl>
                <Input
                  placeholder="Endereço"
                  {...field}
                  className="h-11 border-2 border-zinc-400 bg-zinc-200/50 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <span className="text-sm font-bold text-zinc-600 dark:text-zinc-200">
          Horários de funcionamento
        </span>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {times.map((time) => (
            <Button
              key={time}
              onClick={() => handleSelectTime(time)}
              type="button"
              className={cn("cursor-pointer border border-zinc-900", {
                "border-2 border-amber-400": timesSelected.includes(time)
              })}
            >
              {time}
            </Button>
          ))}
        </div>

        <Button
          type="submit"
          className="hover:bg-default bg-default/95 h-11 w-full cursor-pointer text-lg font-bold text-white"
        >
          Enviar
        </Button>
      </form>
    </Form>
  )
}
