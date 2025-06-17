import { getBarberById } from "../_actions/get-baber-by-id"
import { BarberCard } from "../../_components/barber-card"
import { ServiceCard } from "../../_components/service-card"
import { checkSubscription } from "@/app/(admin)/dashboard/plan/_actions/check-subscription"

export default async function Barber({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const barber = await getBarberById(id)

  let servicesLimitByPlan = 0

  if (barber) {
    const hasSubscription = await checkSubscription(barber.id)

    servicesLimitByPlan = hasSubscription?.plan === "BASIC" ? 3 : 100000
  }

  return (
    <main className="container mx-auto mt-8 min-h-[calc(100vh-h-5)] px-4">
      <section className="mx-auto max-w-6xl">
        {barber && <BarberCard btnHidden barber={barber} />}
        <div className="my-4 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {barber &&
            barber.services &&
            barber.services.slice(0, servicesLimitByPlan).map((service) => (
              <ServiceCard
                key={service.id}
                service={{
                  id: service.id,
                  name: service.name,
                  price: service.price.toString(),
                  userId: service.userId,
                  times: barber!.times,
                  duration: service.duration
                }}
              />
            ))}
        </div>
      </section>
    </main>
  )
}
