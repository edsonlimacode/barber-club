"use client"

import { createContext, ReactNode, useContext, useState } from "react"

interface ServiceModalProps {
  isOpen: boolean
  service: ServiceProps | null
  handleOpenModal: () => void
  handleOpenToEdit: (service: ServiceProps) => void
  handleCloseModal: () => void
}

export interface ServiceProps {
  id: string
  name: string
  price: string
  duration: string
}

const ServiceModalContext = createContext({} as ServiceModalProps)

export function ServiceModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [service, setService] = useState<ServiceProps | null>(null)

  function handleOpenModal() {
    setOpen(true)
  }

  function handleOpenToEdit(service: ServiceProps) {
    setService(service)
    setOpen(true)
  }

  function handleCloseModal() {
    setService({
      id: "",
      name: "",
      price: "",
      duration: ""
    })
    setOpen(false)
  }

  return (
    <ServiceModalContext
      value={{
        isOpen,
        service,
        handleOpenModal,
        handleCloseModal,
        handleOpenToEdit
      }}
    >
      {children}
    </ServiceModalContext>
  )
}

export const useServiceModal = () => useContext(ServiceModalContext)
