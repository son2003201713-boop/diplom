"use client"

import { createContext, useCallback, useContext, useState } from "react"

type DonationContextValue = {
  open: boolean
  presetAmount: number | null
  openModal: (amount?: number) => void
  closeModal: () => void
}

const DonationContext = createContext<DonationContextValue | null>(null)

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [presetAmount, setPresetAmount] = useState<number | null>(null)

  const openModal = useCallback((amount?: number) => {
    setPresetAmount(typeof amount === "number" ? amount : null)
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => setOpen(false), [])

  return (
    <DonationContext.Provider value={{ open, presetAmount, openModal, closeModal }}>
      {children}
    </DonationContext.Provider>
  )
}

export function useDonation() {
  const ctx = useContext(DonationContext)
  if (!ctx) throw new Error("useDonation must be used within DonationProvider")
  return ctx
}
