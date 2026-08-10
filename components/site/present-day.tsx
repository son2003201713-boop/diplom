import { OrnamentBand } from "./ornament-band"
import { Reveal } from "./reveal"

export function PresentDay() {
  return (
    <section className="relative overflow-hidden bg-linen">
      <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:py-40">
        <Reveal>
          <h2 className="font-serif text-3xl leading-[1.08] text-ink sm:text-6xl text-balance">
            Сегодня традиция продолжает жить в руках тех, кто создаёт новое.
          </h2>
        </Reveal>

        <Reveal delay={150} className="mt-16 flex flex-col items-center gap-8">
          <p className="max-w-xl font-serif text-xl italic leading-snug text-thread sm:text-3xl text-balance">
            Мы отправляемся в Чувашию, чтобы это увидеть.
          </p>
          {/* red thread transforming into ornament */}
          <div className="flex w-full max-w-md items-center gap-4">
            <span className="h-px flex-1 bg-thread/40" />
            <span className="size-2 rotate-45 bg-thread" />
            <span className="h-px flex-1 bg-thread/40" />
          </div>
          <OrnamentBand className="w-full" />
        </Reveal>
      </div>
    </section>
  )
}
