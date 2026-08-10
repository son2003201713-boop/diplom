import { SunSymbol } from "./sun-symbol"
import { SupportButton } from "./support-button"
import { Reveal } from "./reveal"

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink text-linen">
      <div className="mx-auto max-w-3xl px-5 py-32 text-center sm:py-48">
        {/* Three suns connected by the red thread */}
        <Reveal className="mb-16">
          <div className="relative mx-auto flex max-w-md items-center justify-between text-thread">
            <span
              className="pointer-events-none absolute left-[12%] right-[12%] top-1/2 h-px -translate-y-1/2 bg-thread"
              aria-hidden="true"
            />
            <SunSymbol className="relative h-16 w-16 sm:h-20 sm:w-20" strength={0.9} />
            <SunSymbol className="relative h-20 w-20 sm:h-28 sm:w-28" strength={1} />
            <SunSymbol className="relative h-16 w-16 sm:h-20 sm:w-20" strength={0.9} />
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-6">
          <p className="font-serif text-2xl leading-snug text-linen sm:text-4xl text-balance">
          Ничто не остаётся неизменным. Традиция живёт, пока каждое поколение переосмысляет её заново.
          </p>
          <p className="font-serif text-2xl leading-snug text-gold sm:text-4xl text-balance">
          Традиция — это не поклонение пеплу. Это передача огня дальше.
          </p>
          <p className="mt-2 font-serif text-3xl leading-snug text-linen sm:text-5xl text-balance">
          Помогите нам передать этот огонь дальше.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-14 flex flex-col items-center gap-5">
          <SupportButton variant="ivory">Поддержать «Три солнца»</SupportButton>
          <p className="text-sm leading-relaxed text-linen/60 text-pretty">
            Даже 5 ₽ становятся частью этого фильма.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
