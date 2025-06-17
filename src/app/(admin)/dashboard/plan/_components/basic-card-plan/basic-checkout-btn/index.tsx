"use client"

import { Button } from "@/components/ui/button"
import { checkOut } from "../../../_actions/checkout"
import { getStripeClient } from "@/lib/stripe/stripe-client"

export function CheckoutBasicBtn({ userId }: { userId: string }) {
  async function handleCheckout() {
    const response = await checkOut(userId, "BASIC")

    if (response?.sessionId) {
      const stripe = await getStripeClient()
      stripe?.redirectToCheckout({
        sessionId: response.sessionId
      })
    }
  }

  return (
    <Button onClick={handleCheckout} className="w-full uppercase">
      contratar
    </Button>
  )
}
