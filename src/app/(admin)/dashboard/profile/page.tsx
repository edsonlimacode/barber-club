import ProfileContent from "./_components/profile-content"
import { Suspense } from "react"
import { Loading } from "../../_components/loading"

export default async function Profile() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileContent />
    </Suspense>
  )
}
