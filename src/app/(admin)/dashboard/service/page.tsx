import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceFormModal } from "./_components/service-form"
import { getUserSession } from "../../_actions/get-user-session"
import { getAllServices } from "./_actions/get-all-services"
import { convertIntToMinutos } from "@/utils/date-ultils"
import { ServiceBtnEdit } from "./_components/service-btn-edit"
import { ServiceBtnRemove } from "./_components/service-btn-remove"
import { ServiceModalProvider } from "./_context/service-modal"
import { formatCurrency } from "@/utils/currency-ultils"
import { checkSubscription } from "../plan/_actions/check-subscription"

export default async function Service() {
  const session = await getUserSession()

  const services = await getAllServices(session.userId)

  const hasSubscription = await checkSubscription(session.userId)

  return (
    <>
      {hasSubscription?.plan !== "EXPIRED" && (
        <ServiceModalProvider>
          <Card className="mx-auto max-w-3xl border-0 bg-zinc-100 dark:bg-zinc-800">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-default text-2xl">Serviços</CardTitle>
              <ServiceFormModal userId={session.userId} />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-300 hover:bg-transparent dark:border-zinc-700">
                    <TableHead className="text-zinc-600 dark:text-zinc-300">
                      Nome
                    </TableHead>
                    <TableHead className="text-zinc-600 dark:text-zinc-300">
                      Valor
                    </TableHead>
                    <TableHead className="text-zinc-600 dark:text-zinc-300">
                      Duração
                    </TableHead>
                    <TableHead className="text-end text-zinc-600 dark:text-zinc-300">
                      Ações
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services &&
                    services.map((service) => (
                      <TableRow
                        key={service.id}
                        className="h-11 border-zinc-300 text-zinc-400 hover:bg-transparent dark:border-zinc-700"
                      >
                        <TableCell className="text-zinc-500 dark:text-zinc-400">
                          {service.name}
                        </TableCell>
                        <TableCell className="text-zinc-500 dark:text-zinc-400">
                          {formatCurrency(Number(service.price))}
                        </TableCell>
                        <TableCell className="text-zinc-500 dark:text-zinc-400">
                          {convertIntToMinutos(service.duration)}
                        </TableCell>
                        <TableCell className="flex items-center justify-end gap-4">
                          <ServiceBtnEdit
                            service={{
                              id: service.id,
                              name: service.name,
                              price: service.price.toString(),
                              duration: service.duration.toString()
                            }}
                          />
                          <ServiceBtnRemove serviceId={service.id} />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </ServiceModalProvider>
      )}
    </>
  )
}
