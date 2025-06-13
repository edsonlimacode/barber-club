"use server"

import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function getUserSession() {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

  return session
}
