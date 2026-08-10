import { AFTER_FILMING } from "@/lib/content"
import { Reveal } from "./reveal"

export function AfterFilming() {
  return (
    <section className="relative bg-linen">
      <div className="mx-auto max-w-4xl px-5 py-28 sm:py-36">
        <Reveal className="mb-14 text-center">
          <h2 className="font-serif text-3xl leading-tight text-ink sm:text-5xl text-balance">
            Что будет с фильмом после съёмок
          </h2>
        </Reveal>

        <ol className="relative mx-auto max-w-md">
          <span
            className="pointer-events-none absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-thread/30"
            aria-hidden="true"
          />
          {AFTER_FILMING.map((step, i) => (
            <Reveal key={step} delay={i * 90} as="li">
              <div className="flex items-center gap-5 py-4">
                <span className="relative z-10 size-4 shrink-0 rotate-45 border-2 border-thread bg-linen" />
                <span className="font-serif text-xl text-ink sm:text-2xl">{step}</span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120} className="mx-auto mt-14 max-w-2xl text-center">
          <p className="text-lg leading-relaxed text-foreground/80 text-pretty">
            После завершения работы мы хотим продолжить жизнь фильма за пределами дипломного показа:
            отправлять его на фестивали, организовывать показы в Чувашии и искать возможности
            показывать фильм на культурных площадках.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
