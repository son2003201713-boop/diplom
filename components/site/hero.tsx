"use client"

import { useEffect, useState } from "react"
import { FILM } from "@/lib/content"
import { SunSymbol } from "./sun-symbol"
import { SupportButton } from "./support-button"

export function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)

    window.addEventListener("scroll", onScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  const parallax = Math.min(scrollY, 700)

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-linen">
      {/* Верхняя строка */}
      <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 pt-6 sm:px-10 sm:pt-8">
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ink/70 sm:text-xs sm:tracking-[0.28em]">
          Документальный фильм
        </span>

        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ink/70 sm:text-xs sm:tracking-[0.28em]">
          ВГИК · 2026
        </span>
      </header>

      {/* ========================= */}
      {/* DESKTOP */}
      {/* ========================= */}

      <div className="hidden sm:block">
        {/* Three suns */}
        <div className="pointer-events-none absolute left-1/2 top-[48%] z-10 -translate-x-1/2 -translate-y-1/2">
          <div
            className="flex items-center justify-center gap-[2vw] text-thread/45"
            style={{
              transform: `translateY(${parallax * -0.12}px)`,
              opacity: Math.max(0, 1 - parallax / 620),
            }}
          >
            <div className="animate-sun-float [animation-delay:-2s]">
              <SunSymbol
                className="h-[34vw] max-h-[26rem] w-[34vw] max-w-[26rem] min-h-48 min-w-48"
                strength={0.7}
                spin
              />
            </div>

            <div className="animate-sun-float [animation-delay:-5s]">
              <SunSymbol
                className="h-[40vw] max-h-[30rem] w-[40vw] max-w-[30rem] min-h-56 min-w-56 text-thread"
                strength={1}
                spin
              />
            </div>

            <div className="animate-sun-float [animation-delay:-8s]">
              <SunSymbol
                className="h-[34vw] max-h-[26rem] w-[34vw] max-w-[26rem] min-h-48 min-w-48"
                strength={0.7}
                spin
              />
            </div>
          </div>
        </div>

        {/* Чёрный текст справа */}
        <div className="absolute right-[16vw] top-[29vh] z-30 w-[24rem]">
          <p className="text-left text-base font-medium leading-relaxed text-ink">
            {FILM.tagline}
          </p>
        </div>

        {/* Название */}
        <div className="absolute left-1/2 top-[48%] z-20 w-full -translate-x-1/2 -translate-y-1/2 px-5 text-center">
          <h1 className="font-serif text-[clamp(3.5rem,17vw,13rem)] font-semibold leading-[0.86] tracking-tight text-ink">
            {FILM.title}
          </h1>
        </div>

        {/* Красный текст слева */}
        <div className="absolute left-[15vw] top-[61vh] z-30 w-[34rem]">
          <p className="font-serif text-2xl italic leading-snug text-thread">
            Пять творцов. Одна древняя легенда.
            <br />
            Один разговор о том, как культура продолжает жить.
          </p>
        </div>

        {/* Кнопки */}
        <div className="absolute left-1/2 top-[72vh] z-30 -translate-x-1/2">
          <div className="flex items-center justify-center gap-3">
            <SupportButton>
              Поддержать фильм
            </SupportButton>

            <a
              href="#legend"
              className="inline-flex items-center justify-center rounded-full border border-ink/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-linen"
            >
              Узнать историю
            </a>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* MOBILE */}
      {/* ========================= */}

      <div className="relative z-20 flex min-h-[100svh] flex-col items-center px-5 pt-28 text-center sm:hidden">
        {/* Маленькие три солнца */}
        <div className="pointer-events-none absolute left-1/2 top-[31%] -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center justify-center gap-1 text-thread/45">
            <div className="animate-sun-float [animation-delay:-2s]">
              <SunSymbol
                className="h-[30vw] w-[30vw]"
                strength={0.55}
                spin
              />
            </div>

            <div className="animate-sun-float [animation-delay:-5s]">
              <SunSymbol
                className="h-[36vw] w-[36vw] text-thread"
                strength={1}
                spin
              />
            </div>

            <div className="animate-sun-float [animation-delay:-8s]">
              <SunSymbol
                className="h-[30vw] w-[30vw]"
                strength={0.55}
                spin
              />
            </div>
          </div>
        </div>

        {/* Название на телефоне */}
        <div className="mt-[25vh]">
          <h1 className="font-serif text-[19vw] font-semibold leading-[0.78] tracking-tight text-ink">
            <span className="block">ТРИ</span>
            <span className="block">СОЛНЦА</span>
          </h1>
        </div>

        {/* Описание */}
        <p className="mt-6 max-w-xs text-sm font-medium leading-relaxed text-ink">
          {FILM.tagline}
        </p>

        {/* Логлайн */}
        <p className="mt-5 max-w-sm font-serif text-lg italic leading-snug text-thread">
          Пять творцов. Одна древняя легенда.
          <br />
          Один разговор о том, как культура продолжает жить.
        </p>

        {/* Кнопки */}
        <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
          <SupportButton className="w-full">
            Поддержать фильм
          </SupportButton>

          <a
            href="#legend"
            className="inline-flex w-full items-center justify-center rounded-full border border-ink/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink"
          >
            Узнать историю
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2">
        <span className="whitespace-nowrap text-[0.6rem] uppercase tracking-[0.3em] text-ink/40">
          Пролистайте вниз
        </span>
      </div>
    </section>
  )
}