import { SunSymbol } from "./sun-symbol"
import { Reveal } from "./reveal"

type Step = {
  text: string
  // strengths of the three suns (0 = gone)
  suns: [number, number, number]
  cold?: boolean
  warm?: boolean
}

const STEPS: Step[] = [
  { text: "Когда-то над землёй светили три солнца. Люди не знали ни холода, ни зимы.", suns: [0.85, 1, 0.85] },
  { text: "Но людям стало слишком жарко. И они решили избавиться от двух солнц.", suns: [0, 1, 0.85] },
  { text: "Охотник выстрелил в первое солнце. Оно раскололось на тысячи осколков.", suns: [0, 1, 0] },
  { text: "Вторая стрела ранила другое солнце. Оно побледнело и потеряло свой жар.", suns: [0, 0.35, 0] },
  { text: "Третье солнце успело спастись. Испугавшись людей, оно ушло далеко в небо.", suns: [0, 0.12, 0], cold: true },
  { text: "На землю пришли тьма и холод. И люди поняли, какую ошибку совершили.", suns: [0, 0.12, 0], cold: true },
  {
    text: "Тогда они стали просить у солнца прощения. Три солнца начали вышивать на одежде, рисовать на домах и сохранять в орнаментах.",
    suns: [0.6, 0.85, 0.6],
    warm: true,
  },
]

function SunRow({ suns, size = "h-16 w-16 sm:h-24 sm:w-24" }: { suns: [number, number, number]; size?: string }) {
  return (
    <div className="flex items-center justify-center gap-6 text-linen sm:gap-10" aria-hidden="true">
      {suns.map((s, i) => (
        <div
          key={i}
          className={`${size} transition-all duration-1000`}
          style={{ opacity: s === 0 ? 0 : 1, transform: s < 0.4 && s > 0 ? "scale(0.55)" : "none" }}
        >
          {s > 0 && <SunSymbol className="h-full w-full" strength={s} />}
        </div>
      ))}
    </div>
  )
}

export function Legend() {
  return (
    <section id="legend" className="relative bg-ink text-linen">
      {/* vertical red thread running through the legend */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-thread/50"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-5 py-28 sm:py-40">
        <Reveal className="mb-24 text-center sm:mb-40">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Легенда</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight text-linen sm:text-5xl text-balance">
            История трёх солнц
          </h2>
        </Reveal>

        <div className="flex flex-col gap-28 sm:gap-44">
          {STEPS.map((step, i) => (
            <Reveal key={i} className="flex flex-col items-center gap-10 text-center">
              <SunRow suns={step.suns} />
              <p
                className={`max-w-2xl font-serif text-2xl leading-snug sm:text-4xl text-balance ${
                  step.cold ? "text-linen/55" : step.warm ? "text-thread" : "text-linen"
                }`}
                style={step.warm ? { color: "oklch(0.62 0.16 30)" } : undefined}
              >
                {step.text}
              </p>
              {/* thread node */}
              <span className="block size-2.5 rotate-45 bg-thread" aria-hidden="true" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-32 text-center sm:mt-48">
          <p className="font-serif text-3xl leading-tight text-linen sm:text-5xl text-balance">
          И солнце простило людей. Свет и тепло вернулись на землю.
          </p>
          <p className="mt-6 font-serif text-3xl leading-tight text-gold sm:text-5xl text-balance">
          Утром стало светить спасшееся солнце, ночью — раненое солнце, ставшее Луной, а осколки убитого солнца стали звёздами.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
