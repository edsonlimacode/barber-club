"use server"

import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe/stripe-server"

export async function checkOut(userId: string, plan: "BASIC" | "PROFESSIONAL") {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      }
    })

    let custumerId = user?.stripe_customer_id

    if (!custumerId) {
      const custumer = await stripe.customers.create({
        name: user?.name as string,
        email: user?.email
      })

      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          stripe_customer_id: custumer.id
        }
      })

      custumerId = custumer.id
    }

    const checkout = await stripe.checkout.sessions.create({
      customer: custumerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: `${plan === "BASIC" ? (process.env.STRIPE_BASIC_PRICEID as string) : (process.env.STRIPE_PRO_PRICEID as string)}`,
          quantity: 1
        }
      ],
      metadata: {
        plan: plan
      },
      success_url: process.env.STRIPE_CALLBACK_URL,
      cancel_url: process.env.STRIPE_CALLBACK_URL
    })

    return {
      sessionId: checkout.id
    }
  } catch (error: any) {
    console.log("ERROR: ", error.message)
    return null
  }
}
