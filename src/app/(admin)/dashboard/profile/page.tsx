import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { getUserSession } from "../../_actions/get-user-session"
import { ProfileForm } from "./_components/profile-form"
import { ProfileImage } from "./_components/profile-image"
import { checkSubscription } from "../plan/_actions/check-subscription"

export default async function Profile() {
  const session = await getUserSession()

  const hasSubscription = await checkSubscription(session.userId)

  return (
    <>
      {hasSubscription?.plan !== "EXPIRED" && (
        <Card className="mx-auto max-w-3xl border-0 bg-zinc-100 dark:bg-zinc-800">
          <CardHeader>
            <CardTitle className="text-default text-2xl">
              Atualizar perfil
            </CardTitle>
            <CardDescription />
          </CardHeader>
          <CardContent>
            <ProfileImage image={session.user.image} userId={session.userId} />
            <ProfileForm session={session} />
          </CardContent>
        </Card>
      )}
    </>
  )
}
