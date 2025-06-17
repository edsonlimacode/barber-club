import { Plan } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe/stripe-server"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature") //obtem assinatura unica do stripe para evitar requisições de outras aplicações

  if (!signature) {
    return NextResponse.error()
  }

  const text = await request.text()

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SIGNATURE as string
  )

  switch (event.type) {
    case "checkout.session.completed":
      try {
        const checkoutSession = event.data
          .object as unknown as Stripe.Checkout.Session

        const subscription = await stripe.subscriptions.retrieve(
          checkoutSession.subscription as string
        )

        const user = await prisma.user.findFirst({
          where: {
            stripe_customer_id: subscription.customer?.toString()
          }
        })

        if (!user) {
          return NextResponse.json({
            message: "Unauthorized",
            status: 401
          })
        }

        await prisma.subscription.create({
          data: {
            id: subscription.id,
            userId: user.id,
            status: subscription.status,
            priceId: subscription.items.data[0].price.id,
            plan: checkoutSession?.metadata?.plan as Plan
          }
        })
        return NextResponse.json({ message: "criado com sucesso" })
      } catch (error: any) {
        console.log("ERRO:", error.message)
      }

      break

    case "customer.subscription.deleted":
      try {
        const subscription = event.data.object as Stripe.Subscription

        await prisma.subscription.delete({
          where: {
            id: subscription.id
          }
        })
      } catch (error: any) {
        console.log("ERRO:", error.message)
      }
      return NextResponse.json({ message: "cancelado com sucesso" })

    case "customer.subscription.updated":
      try {
        const subscription = event.data.object as Stripe.Subscription

        const findSubscription = await prisma.subscription.findFirst({
          where: {
            id: subscription.id
          }
        })

        if (!findSubscription) return

        await prisma.subscription.update({
          where: {
            id: findSubscription.id
          },
          data: {
            status: subscription.status,
            priceId: subscription.items.data[0].price.id,
            plan: `${subscription?.plan.id === process.env.STRIPE_BASIC_PRICEID ? "BASIC" : "PROFESSIONAL"}`
          }
        })

        return NextResponse.json({ message: "atualizado com sucesso" })
      } catch (error: any) {
        console.log("ERRO:", error.message)
      }
      break
  }
  revalidatePath("/dashboard/plan")
  return NextResponse.json({})
}
