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

export default async function Profile() {
  const session = await getUserSession()

  return (
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
  )
}
