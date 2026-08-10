import { PRODUCTION_FACTS } from "@/lib/content"
import { Reveal } from "./reveal"

export function Production() {
  return (
    <section className="relative bg-ink text-linen">
      <div className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
        <Reveal className="mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Производство</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight sm:text-5xl text-balance">
            Мы уже готовимся к съёмкам
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 border-t border-linen/15 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTION_FACTS.map((fact, i) => (
            <Reveal
              key={fact.value}
              delay={(i % 3) * 80}
              className="border-b border-linen/15 px-2 py-8 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:[&]:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <p className="font-serif text-3xl leading-none text-linen sm:text-4xl text-balance">
                {fact.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-linen/60">{fact.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="font-serif text-2xl italic leading-snug text-gold sm:text-3xl text-balance">
            Следующий шаг — провести съёмки.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
