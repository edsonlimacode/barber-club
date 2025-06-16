"use server"

import { prisma } from "@/lib/prisma"
import { addDays, isAfter } from "date-fns"

export async function checkSubscription(userId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId
      },
      include: {
        subscription: true
      }
    })

    if (user?.subscription && user.subscription.status === "active") {
      return {
        plan: user.subscription.plan,
        status: user.subscription.status
      }
    }

    if (!isAfter(new Date(), addDays(user!.createdAt, 7))) {
      return {
        plan: "TRIAL",
        status: "active"
      }
    }

    return {
      plan: "EXPIRED",
      status: "inactive"
    }
  } catch (error) {}
}
