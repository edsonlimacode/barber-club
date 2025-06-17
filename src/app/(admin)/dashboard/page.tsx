import { Suspense } from "react"
import { getUserSession } from "../_actions/get-user-session"
import { AppointmentContent } from "../_components/appointment-content"
import { checkSubscription } from "./plan/_actions/check-subscription"
import { Loading } from "../_components/loading"

export default async function AdminHome() {
  const session = await getUserSession()

  const hasSubscription = await checkSubscription(session.userId)

  return (
    <>
      {hasSubscription?.plan !== "EXPIRED" && (
        <Suspense fallback={<Loading />}>
          <AppointmentContent session={session} />
        </Suspense>
      )}
    </>
  )
}
