"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  label,
  className,
  variant = "outline",
}: {
  value: string
  label: string
  className?: string
  variant?: "outline" | "solid"
}) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Fallback for older / restricted browsers
      const ta = document.createElement("textarea")
      ta.value = value
      ta.style.position = "fixed"
      ta.style.opacity = "0"
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      try {
        document.execCommand("copy")
      } catch {
        /* ignore */
      }
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={cn(
        "inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors",
        variant === "solid"
          ? "bg-thread text-linen hover:bg-thread/90"
          : "border border-border bg-transparent text-foreground hover:border-thread hover:text-thread",
        className,
      )}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      <span>{copied ? "Скопировано" : label}</span>
    </button>
  )
}
