"use client"

import { Pencil } from "lucide-react"
import { useServiceModal } from "../../_context/service-modal"
import { Button } from "@/components/ui/button"

export interface ServiceProps {
  id: string
  name: string
  price: string
  duration: string
}

export function ServiceBtnEdit({ service }: { service: ServiceProps }) {
  const { handleOpenToEdit } = useServiceModal()

  return (
    <Button onClick={() => handleOpenToEdit(service)}>
      <Pencil className="dark:text-default h-5 w-5" />
    </Button>
  )
}
