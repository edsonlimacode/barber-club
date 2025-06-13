import { phoneMask } from "@/utils/phone-ultils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Session } from "next-auth"
import { useForm } from "react-hook-form"
import { z } from "zod"

const profileSchema = z.object({
  name: z.string().min(1, { message: "Nome é obgrigatório" }),
  email: z
    .string()
    .min(1, { message: "E-mail é obgrigatório" })
    .email({ message: "e-mail inválido" }),
  phone: z.string(),
  address: z.string(),
  times: z.array(z.string()),
  userId: z.string().optional()
})

export type ProfileFormData = z.infer<typeof profileSchema>

export function useProfileFormHook(session: Session) {
  return useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: session.user.name ?? "",
      email: session.user.email ?? "",
      phone: phoneMask(session.user.phone as string) ?? "",
      address: session.user.address ?? "",
      times: session.user.times ?? []
    }
  })
}
