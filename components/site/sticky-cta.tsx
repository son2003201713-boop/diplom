"use client"

import { useEffect, useState } from "react"
import { useDonation } from "./donation-context"

export function StickyCTA() {
  const { openModal, open } = useDonation()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (open) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-all duration-500 sm:bottom-6 sm:px-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={() => openModal()}
        className="w-full max-w-md rounded-full bg-thread px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-linen shadow-xl shadow-thread/25 transition-transform hover:scale-[1.02] active:scale-[0.99] sm:w-auto"
      >
        <span className="sm:hidden">Поддержать фильм</span>
        <span className="hidden sm:inline">Поддержать</span>
      </button>
    </div>
  )
}
