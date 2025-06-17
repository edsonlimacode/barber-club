import { Suspense } from "react"
import ServiceContent from "./_components/service-content"
import { Loading } from "../../_components/loading"

export default async function Service() {
  return (
    <Suspense fallback={<Loading />}>
      <ServiceContent />
    </Suspense>
  )
}
