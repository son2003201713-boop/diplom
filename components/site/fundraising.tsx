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
  // Донаты, которые были получены не через сайт
  const OFFLINE_DONATIONS = 21700

  // Изначальный бюджет фильма
  const ORIGINAL_BUDGET = 450000

  // Сколько удалось закрыть благодаря скидкам,
  // технике друзей и помощи партнёров
  const PARTNER_SUPPORT = 80906

  // После этой помощи столько нужно было собрать деньгами
  const FUNDRAISING_GOAL = 369094

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
          setRaised(data.raised + OFFLINE_DONATIONS)
        }
      } catch (error) {
        console.error(
          "Не удалось загрузить сумму сбора:",
          error,
        )
      }
    }

    // Загружаем сумму сразу
    loadRaised()

    // И проверяем новые донаты каждые 30 секунд
    const interval = setInterval(loadRaised, 30000)

    return () => clearInterval(interval)
  }, [])

  // Сколько денег осталось собрать прямо сейчас
  const remaining = Math.max(
    FUNDRAISING_GOAL - raised,
    0,
  )

  return (
    <section id="support" className="relative bg-linen">
      <div className="mx-auto max-w-5xl px-5 py-28 sm:py-36">
        {/* Heading */}
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

        {/* Remaining */}
        <Reveal
          delay={100}
          className="mx-auto mt-16 max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-thread">
            Осталось собрать
          </p>

          <p className="mt-3 font-serif text-6xl leading-none text-thread sm:text-8xl">
            {fmt(remaining)} <Ruble />
          </p>

          {/* История сокращения бюджета */}
          <div className="mx-auto mt-8 max-w-xl rounded-sm border border-ink/10 bg-card/60 px-6 py-6">
            <p className="text-sm leading-relaxed text-foreground/75">
              Изначально для производства нам требовалось{" "}
              <span className="font-semibold text-ink">
                {fmt(ORIGINAL_BUDGET)} ₽
              </span>
              .
            </p>

            <p className="mt-2 text-sm leading-relaxed text-foreground/75">
              Благодаря скидкам на аренду и технике, которой с нами
              поделились друзья и партнёры, нам уже помогли сократить бюджет на{" "}
              <span className="font-semibold text-ink">
                {fmt(PARTNER_SUPPORT)} ₽
              </span>
              .
            </p>
          </div>

          <p className="mt-8 text-base leading-relaxed text-foreground/75 text-pretty">
            Остальное складывается из множества небольших поддержек.
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

        {/* Progress */}
        <Reveal
          delay={150}
          className="mx-auto mt-16 max-w-3xl"
        >
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
              из {fmt(FUNDRAISING_GOAL)} <Ruble />
            </p>
          </div>

          <EmbroideryProgress
            raised={raised}
            partnerSupport={PARTNER_SUPPORT}
            originalBudget={ORIGINAL_BUDGET}
          />

          {/* Легенда */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="size-2 rotate-45 bg-thread" />
              <span>Собрано вами</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="size-2 rotate-45 bg-ink/45" />
              <span>Нам пошли навстречу</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="size-2 rotate-45 border border-border" />
              <span>Ещё нужно</span>
            </div>
          </div>

          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground text-pretty">
            Красный орнамент растёт благодаря вашим переводам, а с другой
            стороны ему навстречу идёт помощь друзей и партнёров фильма.
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