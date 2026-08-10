"use client"

import { useEffect, useState } from "react"
import { FILM } from "@/lib/content"
import { SunSymbol } from "./sun-symbol"
import { SupportButton } from "./support-button"

export function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const parallax = Math.min(scrollY, 700)

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-linen">
      {/* Three suns */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="flex items-center justify-center gap-[6vw] text-thread/45 sm:gap-[7vw]"
          style={{
            transform: `translateY(calc(-7vh + ${parallax * -0.12}px))`,
            opacity: Math.max(0, 1 - parallax / 620),
          }}
        >
          <div className="animate-sun-float [animation-delay:-3s]">
            <SunSymbol className="h-[26vw] max-h-64 w-[26vw] max-w-64 min-h-32 min-w-32" strength={0.7} spin />
          </div>
          <div className="animate-sun-float -translate-y-[6%]">
            <SunSymbol className="h-[34vw] max-h-80 w-[34vw] max-w-80 min-h-40 min-w-40 text-thread" strength={1} spin />
          </div>
          <div className="animate-sun-float [animation-delay:-6s]">
            <SunSymbol className="h-[26vw] max-h-64 w-[26vw] max-w-64 min-h-32 min-w-32" strength={0.7} spin />
          </div>
        </div>
      </div>

      {/* Top brand row */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-6 sm:px-10 sm:pt-8">
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/70">
          Документальный фильм
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/70">ВГИК · 2026</span>
      </header>

      {/* Center content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center">
        <h1 className="font-serif text-[clamp(3.5rem,17vw,13rem)] font-semibold leading-[0.86] tracking-tight text-ink text-balance">
          {FILM.title}
        </h1>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/80 sm:text-base text-pretty">
          {FILM.tagline}
        </p>
        <p className="mt-8 max-w-xl font-serif text-lg italic leading-snug text-thread sm:text-2xl text-balance">
          {FILM.logline}
        </p>

        <div className="mt-10 flex w-full max-w-md flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <SupportButton className="w-full sm:w-auto">Поддержать фильм</SupportButton>
          <a
            href="#legend"
            className="inline-flex w-full items-center justify-center rounded-full border border-ink/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-linen sm:w-auto"
          >
            Узнать историю
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-10 flex justify-center pb-8">
        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-ink/40">Пролистайте вниз</span>
      </div>
    </section>
  )
}
