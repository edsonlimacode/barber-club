import { prisma } from "@/lib/prisma"
import { getUserSession } from "../../_actions/get-user-session"
import { BasicCardPlan } from "./_components/basic-card-plan"
import { ProCardPlan } from "./_components/pro-card-plan"
import { ManagerCardPlans } from "./_components/manage-card-plan"

export default async function Plans() {
  const session = await getUserSession()

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session.userId
    }
  })

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 lg:grid-cols-3">
      {subscription?.status ? (
        <ManagerCardPlans
          customerId={session?.user.stripe_customer_id}
          plan={subscription?.plan}
        />
      ) : (
        <>
          <BasicCardPlan session={session} />
          <ProCardPlan session={session} />
        </>
      )}
    </div>
  )
}
