"use server"

import { stripe } from "@/lib/stripe/stripe-server"

export async function managerSubscription(customerId: string) {
  try {
    const portal = await stripe.billingPortal.sessions.create({
      customer: customerId
    })

    return {
      url: portal.url
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
