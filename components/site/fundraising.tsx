"use client"

import { useEffect, useState } from "react"
import { FUNDRAISING, MONEY_USAGE } from "@/lib/content"
import { EmbroideryProgress } from "./embroidery-progress"
import { SupportButton } from "./support-button"
import { Reveal } from "./reveal"
import { Ruble } from "./ruble"

function fmt(n: number) {
  return n.toLocaleString("ru-RU")
}

export function Fundraising() {
  const [raised, setRaised] = useState(FUNDRAISING.raised)

  useEffect(() => {
    async function loadRaised() {
      try {
        const response = await fetch("/api/fundraising", {
          cache: "no-store",
        })

        if (!response.ok) return

        const data = await response.json()

        if (typeof data.raised === "number") {
          setRaised(data.raised)
        }
      } catch (error) {
        console.error("Не удалось загрузить сумму сбора:", error)
      }
    }

    loadRaised()

    const interval = setInterval(loadRaised, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="support" className="relative bg-linen">
      <div className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
        {/* Heading + framing */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl leading-tight text-ink sm:text-5xl text-balance">
            Помогите нам снять «Три солнца»
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-foreground/80 text-pretty">
            Значительную часть основной техники и производственной базы
            предоставляет ВГИК. Но чтобы провести съёмки, часть производства
            нам необходимо оплатить самостоятельно.
          </p>
        </Reveal>

        {/* Goal + achievability */}
        <Reveal
          delay={100}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-thread">
            Цель сбора
          </p>

          <p className="mt-3 font-serif text-6xl leading-none text-thread sm:text-8xl">
            {fmt(FUNDRAISING.goal)} <Ruble />
          </p>

          <p className="mt-8 text-base leading-relaxed text-foreground/75 text-pretty">
            Эта сумма складывается из множества небольших поддержек.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-serif text-xl text-ink sm:text-2xl">
            <span>
              5 <Ruble /> помогают.
            </span>

            <span>
              10 <Ruble /> помогают.
            </span>
          </div>

          <p className="mt-5 text-base leading-relaxed text-foreground/75 text-pretty">
            Каждый перевод приближает один из наших съёмочных дней.
          </p>
        </Reveal>

        {/* Progress embroidery */}
        <Reveal delay={150} className="mx-auto mt-16 max-w-3xl">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Собрано
              </p>

              <p className="mt-1 font-serif text-4xl leading-none text-thread sm:text-5xl">
                {fmt(raised)} <Ruble />
              </p>
            </div>

            <p className="text-right text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              из {fmt(FUNDRAISING.goal)} <Ruble />
            </p>
          </div>

          <EmbroideryProgress raised={raised} />

          <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground text-pretty">
            С каждой поддержкой красный орнамент вышивается дальше.
          </p>
        </Reveal>

        {/* What the money is for */}
        <div className="mt-24">
          <Reveal className="mb-10 text-center">
            <h3 className="font-serif text-2xl text-ink sm:text-3xl">
              На что пойдут средства
            </h3>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {MONEY_USAGE.map((item, i) => (
              <Reveal
                key={item.title}
                delay={(i % 3) * 70}
                className="bg-card"
              >
                <div className="h-full px-6 py-7">
                  <span
                    className="inline-block size-2 rotate-45 bg-thread"
                    aria-hidden="true"
                  />

                  <h4 className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink">
                    {item.title}
                  </h4>

                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/75 text-pretty">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 5000 support / credits */}
        <Reveal className="mt-20">
          <div className="flex flex-col items-center gap-6 rounded-sm border border-gold/50 bg-gold/10 px-6 py-12 text-center sm:px-12">
            <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl text-balance">
              Поддержали фильм на 5 000 <Ruble /> или больше?
            </p>

            <p className="max-w-lg text-base leading-relaxed text-foreground/80 text-pretty">
              Мы укажем ваше имя в благодарностях в финальных титрах фильма.
            </p>

            <SupportButton amount={5000}>
              Поддержать на 5 000 ₽
            </SupportButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}