"use client"

import { cn } from "@/lib/utils"
import { useDonation } from "./donation-context"

export function SupportButton({
  children,
  amount,
  variant = "solid",
  className,
}: {
  children: React.ReactNode
  amount?: number
  variant?: "solid" | "outline" | "ivory"
  className?: string
}) {
  const { openModal } = useDonation()
  return (
    <button
      type="button"
      onClick={() => openModal(amount)}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] transition-transform hover:scale-[1.02] active:scale-[0.99]",
        variant === "solid" && "bg-thread text-linen shadow-lg shadow-thread/20",
        variant === "outline" && "border border-thread text-thread hover:bg-thread hover:text-linen",
        variant === "ivory" && "bg-linen text-thread shadow-lg",
        className,
      )}
    >
      {children}
    </button>
  )
}
