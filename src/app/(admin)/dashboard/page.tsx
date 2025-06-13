import { getUserSession } from "../_actions/get-user-session"
import { AppointmentContent } from "../_components/appointment-content"

export default async function AdminHome() {
  const session = await getUserSession()

  return <AppointmentContent session={session} />
}
