import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string
      email: string
      emailVerified: Date | null
      image: string | null
      address: string | null
      phone: string | null
      status: boolean
      timeZone: string | null
      stripe_customer_id: string | null
      times: string[]
      createdAt: Date
      updatedAt: Date
    }
    userId: string
  }
}
