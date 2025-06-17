import { getAllBarbers } from "./_actions/get-all-babers"
import { BarberCard } from "./_components/barber-card"
import { Hero } from "./_components/hero"
import { Banner } from "./_components/hero/banner"

export default async function WebHome() {
  const barbers = await getAllBarbers()

  return (
    <>
      <div className="relative -mt-24 h-[880px] w-full">
        <Banner />
        <Hero />
      </div>
      <main className="min-h-screen">
        <section id="barbers">
          <div className="flex flex-col items-center pt-8">
            <h2 className="text-default text-2xl font-bold tracking-wide dark:font-thin">
              Barbearias
            </h2>
            <p className="mt-2 text-3xl font-semibold text-zinc-600 lg:text-5xl dark:text-zinc-200">
              Mais Populares
            </p>
          </div>

          <div className="container mx-auto">
            <div className="mt-8 grid grid-cols-1 gap-4 px-4 lg:grid-cols-5">
              {barbers?.length == 0 && (
                <div className="col-span-full text-center text-red-500">
                  Nenhuma barbearia encontrada
                </div>
              )}
              {barbers &&
                barbers.map((barber) => (
                  <BarberCard key={barber.id} barber={barber} />
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
