import { Reveal } from "./reveal"

export function Diary() {
  return (
    <section className="relative bg-linen">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-thread">Дневник</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-ink sm:text-5xl text-balance">
            Дневник «Трёх солнц»
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-foreground/80 text-pretty">
            С 9 сентября мы отправимся в экспедицию. Будем показывать дорогу, съёмочные дни, наших
            героев и то, как постепенно собирается фильм.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <span className="inline-flex items-center gap-3 rounded-full border border-dashed border-border px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            <span className="size-2 rotate-45 bg-thread" aria-hidden="true" />
            Ссылка на дневник появится скоро
          </span>
        </Reveal>
      </div>
    </section>
  )
}
