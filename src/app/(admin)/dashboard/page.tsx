import { getUserSession } from "../_actions/get-user-session"
import { AppointmentContent } from "../_components/appointment-content"
import { checkSubscription } from "./plan/_actions/check-subscription"

export default async function AdminHome() {
  const session = await getUserSession()

  const hasSubscription = await checkSubscription(session.userId)

  return (
    <>
      {hasSubscription?.plan !== "EXPIRED" && (
        <AppointmentContent session={session} />
      )}
    </>
  )
}
