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
        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/70">
          Документальный фильм
        </span>

        <span className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/70">
          ВГИК · 2026
        </span>
      </header>

      {/* THREE SUNS — тот же центр, что у названия */}
      <div className="pointer-events-none absolute left-1/2 top-[48%] z-10 -translate-x-1/2 -translate-y-1/2">
        <div
          className="flex items-center justify-center gap-[2vw] text-thread/45"
          style={{
            transform: `translateY(${parallax * -0.12}px)`,
            opacity: Math.max(0, 1 - parallax / 620),
          }}
        >
          {/* Левое солнце */}
          <div className="animate-sun-float [animation-delay:-2s]">
            <SunSymbol
              className="h-[34vw] max-h-[26rem] w-[34vw] max-w-[26rem] min-h-48 min-w-48"
              strength={0.7}
              spin
            />
          </div>

          {/* Центральное солнце */}
          <div className="animate-sun-float [animation-delay:-5s]">
            <SunSymbol
              className="h-[40vw] max-h-[30rem] w-[40vw] max-w-[30rem] min-h-56 min-w-56 text-thread"
              strength={1}
              spin
            />
          </div>

          {/* Правое солнце */}
          <div className="animate-sun-float [animation-delay:-8s]">
            <SunSymbol
              className="h-[34vw] max-h-[26rem] w-[34vw] max-w-[26rem] min-h-48 min-w-48"
              strength={0.7}
              spin
            />
          </div>
        </div>
      </div>

      {/* Чёрный текст — справа сверху */}
      <div className="absolute right-[16vw] top-[29vh] z-30 hidden w-[24rem] sm:block">
        <p className="text-left text-sm font-medium leading-relaxed text-ink sm:text-base">
          {FILM.tagline}
        </p>
      </div>

      {/* Название — тот же центр, что у солнц */}
      <div className="absolute left-1/2 top-[48%] z-20 w-full -translate-x-1/2 -translate-y-1/2 px-5 text-center">
        <h1 className="font-serif text-[clamp(3.5rem,17vw,13rem)] font-semibold leading-[0.86] tracking-tight text-ink text-balance">
          {FILM.title}
        </h1>
      </div>

      {/* Красный текст — слева снизу */}
      <div className="absolute left-[15vw] top-[61vh] z-30 hidden w-[31rem] sm:block">
      <p className="font-serif text-xl italic leading-snug text-thread sm:text-2xl">
  Пять творцов. Одна древняя легенда.
  <br />
  Один разговор о том, как культура продолжает жить.
</p>
      </div>

      {/* Кнопки */}
      <div className="absolute left-1/2 top-[72vh] z-30 hidden -translate-x-1/2 sm:block">
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

      {/* Мобильная версия */}
      <div className="relative z-30 flex min-h-[100svh] flex-col items-center justify-end px-5 pb-28 text-center sm:hidden">
        <p className="max-w-xs text-sm font-medium leading-relaxed text-ink">
          {FILM.tagline}
        </p>

        <p className="mt-5 max-w-sm font-serif text-lg italic leading-snug text-thread">
          {FILM.logline}
        </p>

        <div className="mt-7 flex w-full max-w-sm flex-col gap-3">
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

      {/* Подсказка прокрутки */}
      <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2">
        <span className="whitespace-nowrap text-[0.65rem] uppercase tracking-[0.3em] text-ink/40">
          Пролистайте вниз
        </span>
      </div>
    </section>
  )
}