import { MANIFESTO_LINES } from "@/lib/content"
import { Reveal } from "./reveal"

export function Manifesto() {
  return (
    <section className="relative overflow-hidden bg-thread text-linen">
      <div className="relative mx-auto max-w-4xl px-5 py-32 text-center sm:py-48">
        <Reveal>
          <h2 className="font-serif text-[clamp(2.5rem,9vw,6rem)] font-medium leading-[0.95] text-linen text-balance">
            Культура живёт,
            <br />
            пока её продолжают.
          </h2>
        </Reveal>

        <div className="mx-auto mt-20 flex max-w-md flex-col gap-5 sm:mt-28">
          {MANIFESTO_LINES.map((line, i) => (
            <Reveal key={line} delay={i * 90}>
              <p className="font-serif text-2xl leading-snug text-linen/85 sm:text-3xl">{line}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
