"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { managerSubscription } from "../../_actions/manager-subscription"
import { Button } from "@/components/ui/button"

interface ManagerPlansProps {
  customerId: string | null
  plan: string | undefined
}

export function ManagerCardPlans({ customerId, plan }: ManagerPlansProps) {
  async function handleManagerSubscriptions() {
    if (customerId) {
      const response = await managerSubscription(customerId)

      if (response?.url) {
        window.location.href = response.url
      }
    }
  }

  return (
    <Card className="dark:text-default border-0 text-zinc-600 dark:bg-zinc-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold uppercase">{plan}</CardTitle>
        <CardDescription />
      </CardHeader>
      <CardContent>Seu plano atual</CardContent>
      <CardFooter>
        <Button onClick={handleManagerSubscriptions} className="w-full">
          Gerenciar meu plano
        </Button>
      </CardFooter>
    </Card>
  )
}
