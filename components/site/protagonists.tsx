import { PROTAGONISTS } from "@/lib/content"
import { Reveal } from "./reveal"

export function Protagonists() {
  return (
    <section className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-16 sm:mb-24">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-thread">
              Пять творцов
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-6xl">
              Пять историй одной легенды
            </h2>
          </div>
        </Reveal>

        {/* connecting red thread */}
        <div className="relative">
          <div
            className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-thread/30 sm:left-1/2 sm:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-20 sm:gap-28">
            {PROTAGONISTS.map((p, i) => {
              const flip = i % 2 === 1

              return (
                <Reveal key={p.num}>
                  <article
                    className={`grid items-center gap-8 sm:grid-cols-2 sm:gap-14 ${
                      flip ? "sm:[direction:rtl]" : ""
                    }`}
                  >
                    {/* photo */}
                    <div className="[direction:ltr]">
                      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-border bg-secondary">
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                              Фото скоро появится
                            </span>
                          </div>
                        )}

                        <span className="absolute left-4 top-4 rounded-sm bg-background/70 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-sm">
                          ФОТО · {p.name}
                        </span>

                        <span className="absolute bottom-4 left-4 font-serif text-6xl text-white/50 drop-shadow-sm">
                          {p.num}
                        </span>
                      </div>
                    </div>

                    {/* text */}
                    <div className="[direction:ltr]">
                      <div className="flex items-baseline gap-4">
                        <span className="font-serif text-2xl text-thread">
                          {p.num}
                        </span>

                        <div>
                          <h3 className="font-serif text-4xl leading-none text-ink sm:text-5xl">
                            {p.name}
                          </h3>

                          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-thread">
                            {p.role}
                          </p>
                          {p.instagram && (
  <a
    href={p.instagram}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-3 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-thread transition-all hover:opacity-70"
  >
    Соцсеть ↗
  </a>
)}
                        </div>
                      </div>

                      <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/80 text-pretty">
                        {p.text}
                      </p>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}