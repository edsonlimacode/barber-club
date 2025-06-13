import { getBarberById } from "../_actions/get-baber-by-id"
import { BarberCard } from "../../_components/barber-card"
import { ServiceCard } from "../../_components/service-card"

export default async function Barber({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  const barber = await getBarberById(id)

  return (
    <main className="container mx-auto mt-8 min-h-[calc(100vh-h-5)]">
      <section className="mx-auto max-w-6xl">
        {barber && <BarberCard btnHidden barber={barber} />}
        <div className="mt-4 grid grid-cols-4 gap-4">
          {barber &&
            barber.services &&
            barber.services.map((service) => (
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
