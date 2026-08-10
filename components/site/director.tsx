import { DIRECTOR } from "@/lib/content"
import { SunSymbol } from "./sun-symbol"
import { Reveal } from "./reveal"

export function Director() {
  return (
    <section className="relative bg-linen">
      <div className="mx-auto max-w-6xl px-5 py-28 sm:py-36">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-thread">Режиссёр</p>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Portrait placeholder */}
          <Reveal>
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm border border-border bg-secondary">
            <img
    src="/images/dir.JPG"
    alt="Софья Барклай"
    className="absolute inset-0 h-full w-full object-cover"
  />
              <span className="absolute left-4 top-4 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Фото · Софья Барклай
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h2 className="font-serif text-5xl leading-none text-ink sm:text-7xl">{DIRECTOR.name}</h2>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-thread">
              {DIRECTOR.role}
            </p>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-foreground/80 text-pretty">
              {DIRECTOR.bio}
            </p>

            {/* Previous doc */}
            <div className="mt-10 border-t border-border pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Предыдущий фильм
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink">«{DIRECTOR.previous.title}»</h3>
              <p className="mt-1 text-sm text-thread">{DIRECTOR.previous.season}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {DIRECTOR.previous.festivals.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-border px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-foreground/70"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-base leading-relaxed text-foreground/75 text-pretty">
              {DIRECTOR.extra}
            </p>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Победитель
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-8 gap-y-2 font-serif text-lg text-ink">
                {DIRECTOR.awards.map((a) => (
                  <li key={a} className="flex items-center gap-2.5">
                    <span className="size-1.5 rotate-45 bg-gold" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
