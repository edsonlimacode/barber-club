import { ReactNode } from "react"
import { NavMenu } from "../_components/menu-left"
import { getUserSession } from "../_actions/get-user-session"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { checkSubscription } from "./plan/_actions/check-subscription"

export default async function AdminLayout({
  children
}: {
  children: ReactNode
}) {
  const session = await getUserSession()

  const hasSubscription = await checkSubscription(session.userId)

  return (
    <div className="grid grid-cols-1 lg:min-h-screen lg:grid-cols-[100px_1fr]">
      <NavMenu />
      <main className="bg-zinc-200 px-4 py-6 dark:bg-zinc-900">
        {hasSubscription?.plan === "TRIAL" &&
          hasSubscription?.status === "active" && (
            <div className="mx-auto mb-2 max-w-6xl">
              <Alert
                variant="destructive"
                className="border-red-400 bg-red-300"
              >
                <AlertCircleIcon />
                <AlertTitle className="text-lg font-bold text-red-600">
                  Plano atual TRIAL
                </AlertTitle>
                <AlertDescription>
                  <p>
                    Você tem 7 dias grátis para testar todas as funcionalidades.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          )}
        {hasSubscription?.plan === "EXPIRED" &&
          hasSubscription?.status === "inactive" && (
            <div className="mx-auto mb-2 max-w-6xl">
              <Alert
                variant="destructive"
                className="border-red-400 bg-red-300"
              >
                <AlertCircleIcon />
                <AlertTitle className="text-lg font-bold text-red-600">
                  Plano atual expirou
                </AlertTitle>
                <AlertDescription>
                  <p>
                    Seu plano expirou, assine um dos nossos planos e tenha
                    acesso a todas as funcionalidades
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          )}
        {children}
      </main>
    </div>
  )
}
