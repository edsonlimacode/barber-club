import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Check } from "lucide-react"
import { CheckoutProBtn } from "./pro-checkout-btn"
import { Session } from "next-auth"

export async function ProCardPlan({ session }: { session: Session }) {
  return (
    <Card className="border-0 dark:bg-zinc-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-zinc-600 uppercase dark:text-zinc-100">
          PRO
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Ideal para médias e grandes clinicas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-zinc-700 dark:text-zinc-500">
              Até 3 serviços cadastrados
            </span>
          </li>

          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-zinc-700 dark:text-zinc-500">
              Agendamento ilimitados
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-zinc-700 dark:text-zinc-500">
              Relatório básicos
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-zinc-500 dark:text-zinc-500">
              Suporte 24 horas, 7 dias da semana
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-zinc-500 dark:text-zinc-500">
              Envio de e-mails ilimitados
            </span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="h-5 w-5 text-emerald-500" />
            <span className="text-sm text-zinc-500 dark:text-zinc-500">
              Relatórios completos
            </span>
          </li>
          <li className="mt-8">
            <span className="inline-block text-3xl font-bold text-emerald-500">
              R$ 57,90
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <CheckoutProBtn userId={session.userId} />
      </CardFooter>
    </Card>
  )
}
